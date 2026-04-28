import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert("Erreur : " + error.message)
    } else {
      alert("Compte créé ! Vérifie tes emails.")
    }
  }

  return (
    <div>
      <h2>Inscription</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Créer un compte</button>
    </div>
  )
}