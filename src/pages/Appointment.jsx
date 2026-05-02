import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, User, Mail, Phone, Target, AlertCircle, MessageSquare, Calendar } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const GOALS = [
  { value: 'perte-de-poids', label: 'Perte de poids', icon: '📉' },
  { value: 'prise-de-masse', label: 'Prise de masse', icon: '💪' },
  { value: 'reequilibrage', label: 'Rééquilibrage', icon: '⚖️' },
  { value: 'sante-digestive', label: 'Santé digestive', icon: '🌿' },
  { value: 'energie', label: 'Plus d\'énergie', icon: '⚡' },
  { value: 'sport', label: 'Performance sport', icon: '🏃' },
  { value: 'autre', label: 'Autre', icon: '🎯' },
];

const STEPS = ['Objectif', 'Informations', 'Habitudes', 'Confirmation'];

const INITIAL_FORM = {
  full_name: '',
  email: '',
  phone: '',
  preferred_date: '',
  preferred_time: '',
  goal: '',
  allergies: '',
  habits: '',
  message: '',
};

export default function Appointment() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 0) return form.goal;
    if (step === 1) return form.full_name && form.email;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const appointment = {
      ...form,
      goal_label: GOALS.find(g => g.value === form.goal)?.label || form.goal,
      id: Date.now(),
      created_date: new Date().toISOString(),
    };

    try {
      if (!supabase) {
        throw new Error("L'envoi d'email n'est pas configuré.");
      }

      const { error } = await supabase.functions.invoke('appointment-email', {
        body: appointment,
      });

      if (error) {
        throw error;
      }

      const appointments = JSON.parse(localStorage.getItem('nutrivie_appointments') || '[]');
      appointments.push(appointment);
      localStorage.setItem('nutrivie_appointments', JSON.stringify(appointments));
      setSuccess(true);
      toast.success('Rendez-vous demandé avec succès !');
    } catch (error) {
      console.error(error);
      toast.error("Impossible d'envoyer la demande pour le moment. Réessayez dans quelques instants.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <AnimatedSection className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
            Demande envoyée !
          </h2>
          <p className="text-muted-foreground mb-8">
            Nous vous recontacterons dans les 24h pour confirmer votre rendez-vous.
          </p>
          <button
            onClick={() => { setSuccess(false); setStep(0); setForm(INITIAL_FORM); }}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all"
          >
            Nouveau rendez-vous
          </button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-4">
            Prendre <span className="italic font-semibold text-primary">rendez-vous</span>
          </h1>
          <p className="text-muted-foreground">
            Répondez à quelques questions pour préparer votre consultation
          </p>
        </AnimatedSection>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`} />
              <p className={`text-xs mt-1.5 text-center hidden sm:block ${
                i <= step ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
                  Quel est votre objectif principal ?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {GOALS.map(goal => (
                    <button
                      key={goal.value}
                      onClick={() => updateForm('goal', goal.value)}
                      className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                        form.goal === goal.value
                          ? 'bg-primary/10 border-primary ring-2 ring-primary/20'
                          : 'bg-card border-border/50 hover:border-primary/30'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{goal.icon}</span>
                      <span className="text-sm font-medium">{goal.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
                  Vos informations
                </h2>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <User className="w-4 h-4 text-primary" /> Nom complet
                  </label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={e => updateForm('full_name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Marie Dupont"
                  />
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 text-primary" /> Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="marie@email.com"
                  />
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 text-primary" /> Téléphone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => updateForm('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-5 border border-border/50">
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 text-primary" /> Date
                    </label>
                    <input
                      type="date"
                      value={form.preferred_date}
                      onChange={e => updateForm('preferred_date', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="bg-card rounded-2xl p-5 border border-border/50">
                    <label className="text-sm font-medium mb-2 block">Heure</label>
                    <select
                      value={form.preferred_time}
                      onChange={e => updateForm('preferred_time', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Choisir</option>
                      {['9h00', '10h00', '11h00', '14h00', '15h00', '16h00', '17h00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">
                  Parlez-nous de vous
                </h2>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <AlertCircle className="w-4 h-4 text-secondary" /> Allergies / intolérances
                  </label>
                  <input
                    type="text"
                    value={form.allergies}
                    onChange={e => updateForm('allergies', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Gluten, lactose..."
                  />
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Target className="w-4 h-4 text-primary" /> Habitudes alimentaires
                  </label>
                  <textarea
                    value={form.habits}
                    onChange={e => updateForm('habits', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Décrivez vos habitudes actuelles..."
                  />
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border/50">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" /> Message libre
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => updateForm('message', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border-0 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Quelque chose à ajouter ?"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Tout est prêt !
                </h2>
                <div className="bg-card rounded-3xl p-6 border border-border/50 text-left space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Objectif</span>
                    <span className="font-medium">{GOALS.find(g => g.value === form.goal)?.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="font-medium">{form.full_name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{form.email}</span>
                  </div>
                  {form.preferred_date && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date souhaitée</span>
                      <span className="font-medium">{form.preferred_date} {form.preferred_time}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
            disabled={!canProceed() || submitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : step < 3 ? (
              <>
                Continuer
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              'Confirmer le rendez-vous'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
