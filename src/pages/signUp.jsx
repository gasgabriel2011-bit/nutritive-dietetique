import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { APP_START_PATH, getAuthRedirectPath, useInstalledAppMode } from "@/lib/appMode"
import { supabase, supabaseConfigError } from "../lib/supabase"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isInstalledApp = useInstalledAppMode()

  const redirectAfterAuth = () => {
    if (!isInstalledApp) {
      return "/"
    }

    return getAuthRedirectPath(location.state?.from, APP_START_PATH)
  }

  const getRedirectUrl = () => {
    if (typeof window === "undefined") {
      return "https://dtitnpbbxyvteotoagoh.supabase.co"
    }

    return `${window.location.origin}/`
  }

  const handleSignup = async () => {
    if (supabaseConfigError) {
      setErrorMessage(supabaseConfigError)
      return
    }

    const client = supabase
    if (!client) {
      setErrorMessage("La connexion est indisponible pour le moment.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")
    setMessage("")

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectUrl(),
      },
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    if (isInstalledApp && data?.session) {
      navigate(redirectAfterAuth(), { replace: true })
      return
    }

    setMessage(
      isInstalledApp
        ? "Compte cree. Verifie ton email, puis reviens dans l'app pour te connecter."
        : "Compte cree. Verifie ton email: le lien te ramenera directement sur le site."
    )
  }

  return (
    <div className={isInstalledApp ? "min-h-screen bg-[#f7f9f2] px-4 py-10 flex items-center" : "min-h-screen bg-slate-50 px-4 py-10"}>
      <div className={isInstalledApp ? "mx-auto w-full max-w-md rounded-[8px] bg-white p-8 shadow-sm ring-1 ring-[#dfe8d5]" : "mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"}>
        {isInstalledApp ? (
          <div className="mb-6 inline-flex rounded-[8px] bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
            NutriVie
          </div>
        ) : null}

        <h2 className="text-3xl font-semibold text-slate-900">Inscription</h2>
        <p className="mt-2 text-sm text-slate-600">
          Cree ton compte pour activer la connexion.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}
          />
        </div>

        {errorMessage ? (
          <p className={`mt-4 bg-red-50 px-4 py-3 text-sm text-red-700 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}>
            {errorMessage}
          </p>
        ) : null}

        {message ? (
          <p className={`mt-4 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}>
            {message}
          </p>
        ) : null}

        <button
          onClick={handleSignup}
          disabled={isSubmitting}
          className={`mt-6 w-full bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}
        >
          {isSubmitting ? "Creation du compte..." : "Creer un compte"}
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Deja un compte ?{" "}
          <Link to="/login" className="font-medium text-slate-900 underline underline-offset-4">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
