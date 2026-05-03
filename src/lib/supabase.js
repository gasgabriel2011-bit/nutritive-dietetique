import { createClient } from "@supabase/supabase-js"

const DEFAULT_SUPABASE_URL = "https://dtitnpbbxyvteotoagoh.supabase.co"
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_yOh1Srad4TTAZ1WaYf7Y0Q_o4msazOd"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

function getSupabaseConfigError() {
  if (!supabaseUrl || !supabaseKey) {
    return "Les variables Supabase sont manquantes dans le fichier d'environnement."
  }

  try {
    const { hostname, protocol } = new URL(supabaseUrl)
    const looksLikeSupabaseHost =
      hostname.endsWith(".supabase.co") ||
      hostname.endsWith(".supabase.in") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"

    if (!protocol.startsWith("http") || !looksLikeSupabaseHost) {
      return "L'URL Supabase n'a pas le bon format. Elle doit ressembler a https://votre-projet.supabase.co."
    }
  } catch {
    return "L'URL Supabase est invalide."
  }

  return null
}

export const supabaseConfigError = getSupabaseConfigError()
export const isSupabaseConfigured = !supabaseConfigError

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
