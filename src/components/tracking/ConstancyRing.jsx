import { motion } from 'framer-motion';

export default function ConstancyRing({ score }) {
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r="54"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="60" cy="60" r="54"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-foreground">{score}%</span>
        <span className="text-xs text-muted-foreground">Constance</span>
      </div>
    </div>
  );
}