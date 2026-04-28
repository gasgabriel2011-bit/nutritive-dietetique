import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase, supabaseConfigError } from "../lib/supabase"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = async () => {
    if (supabaseConfigError) {
      setErrorMessage(supabaseConfigError)
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")
    setMessage("")

    const { error } = await supabase.auth.signUp({ email, password })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setMessage("Compte cree. Verifie ton email pour confirmer l'inscription.")
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
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
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-400"
          />
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        {message ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}

        <button
          onClick={handleSignup}
          disabled={isSubmitting}
          className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
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
