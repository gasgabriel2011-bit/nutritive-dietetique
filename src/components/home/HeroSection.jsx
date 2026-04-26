import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              Diététique fondée sur les preuves
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-6">
              Votre nutrition,{' '}
              <span className="font-semibold italic text-primary">pensée pour durer</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              Une approche bienveillante et personnalisée de votre alimentation. 
              Pas de régime restrictif, mais des habitudes durables pour une vie plus saine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/rendez-vous"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/suivi"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground text-base font-semibold hover:bg-muted transition-all duration-300"
              >
                Suivi nutrition
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10">
              <img
                src={heroImage}
                alt="Alimentation saine et équilibrée"
                className="w-full h-[400px] lg:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">97%</p>
                  <p className="text-xs text-muted-foreground">de patients satisfaits</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}