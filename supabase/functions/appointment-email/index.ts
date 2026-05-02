const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AppointmentPayload = {
  full_name?: string;
  email?: string;
  phone?: string;
  preferred_date?: string;
  preferred_time?: string;
  goal?: string;
  goal_label?: string;
  allergies?: string;
  habits?: string;
  message?: string;
  created_date?: string;
};

const requiredEnv = (name: string) => {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
};

const clean = (value?: string) => value?.trim() || "Non renseigné";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const line = (label: string, value?: string) => `
  <tr>
    <td style="padding:8px 12px;color:#667085;width:170px;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#101828;font-weight:600;">${escapeHtml(clean(value))}</td>
  </tr>
`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const appointment = (await request.json()) as AppointmentPayload;

    if (!appointment.full_name?.trim() || !appointment.email?.trim()) {
      return new Response(JSON.stringify({ error: "Nom et email obligatoires" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = requiredEnv("RESEND_API_KEY");
    const emailTo = Deno.env.get("APPOINTMENT_EMAIL_TO") || "contact@nutrivie.fr";
    const emailFrom = Deno.env.get("APPOINTMENT_EMAIL_FROM") || "NutriVie <onboarding@resend.dev>";
    const subject = `Nouvelle demande de rendez-vous - ${appointment.full_name}`;
    const date = [appointment.preferred_date, appointment.preferred_time].filter(Boolean).join(" ");
    const createdAt = appointment.created_date
      ? new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Paris",
        }).format(new Date(appointment.created_date))
      : undefined;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
        <h1 style="font-size:24px;color:#101828;margin:0 0 16px;">Nouvelle demande de rendez-vous</h1>
        <p style="color:#475467;margin:0 0 24px;">Une personne vient de remplir le formulaire NutriVie.</p>
        <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:12px;overflow:hidden;">
          ${line("Nom", appointment.full_name)}
          ${line("Email", appointment.email)}
          ${line("Téléphone", appointment.phone)}
          ${line("Objectif", appointment.goal_label || appointment.goal)}
          ${line("Date souhaitée", date)}
          ${line("Allergies", appointment.allergies)}
          ${line("Habitudes", appointment.habits)}
          ${line("Message", appointment.message)}
          ${line("Demande reçue", createdAt)}
        </table>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: emailTo,
        reply_to: appointment.email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(details || "Email provider rejected the message");
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: "Email send failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
