import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { isPlanUnlocked, unlockPlan } from '../lib/planAuth';

export default function PlanGate({ children }) {
  const [unlocked, setUnlocked] = useState(isPlanUnlocked);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unlockPlan(code)) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setCode('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-card rounded-3xl border border-border shadow-xl p-8 sm:p-12 w-full max-w-md text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-semibold text-foreground mb-2">Accès programme</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Ce programme est réservé aux membres. Entrez votre code d'accès pour continuer.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <input
                type={show ? 'text' : 'password'}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Code d'accès"
                maxLength={10}
                className={`w-full px-5 py-3.5 rounded-2xl bg-muted border-2 text-center text-xl tracking-widest font-semibold outline-none transition-all ${
                  error ? 'border-destructive text-destructive' : 'border-border focus:border-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </motion.div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-destructive text-sm"
              >
                Code incorrect. Réessayez.
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Déverrouiller
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-6">
            Le code restera mémorisé sur cet appareil.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}