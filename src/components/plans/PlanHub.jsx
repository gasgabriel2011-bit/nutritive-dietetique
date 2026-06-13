import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Star, Clock, Flame, Target, CheckSquare, Square } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function PlanHub({ config }) {
  const storageKey = `nutrivie_${config.slug}_tracking`;
  const [trackData, setTrackData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  });

  const save = (d) => { setTrackData(d); localStorage.setItem(storageKey, JSON.stringify(d)); };
  const toggleCheck = (di, field) => save({ ...trackData, [`${di}_${field}`]: !trackData[`${di}_${field}`] });
  const setEnergy = (di, val) => save({ ...trackData, [`${di}_energy`]: val });
  const setNote = (di, val) => save({ ...trackData, [`${di}_note`]: val });
  const checked = (di, field) => !!trackData[`${di}_${field}`];

  return (
    <div className="pt-20 pb-20 bg-background">
      {/* HERO */}
      <div className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
          <AnimatedSection>
            <Link to="/plans" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux plans
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {config.badges.map(b => (
                <span key={b} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{b}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-foreground mb-3">
              {config.titleLine1} <span className="italic font-semibold text-primary">{config.titleLine2}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-5 max-w-2xl">{config.subtitle}</p>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{config.duration}</span>
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-secondary" />{config.calories}</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-primary" />{config.focus}</span>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/70 rounded-xl px-4 py-2.5 border border-border inline-block">
              ⚠️ Programme indicatif, à adapter à votre situation personnelle.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* POURQUOI CE PROGRAMME */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-6">
            Pourquoi ce <span className="italic font-semibold text-primary">programme</span> ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {config.reasons.map(([icon, title, desc]) => (
              <div key={title} className="bg-card rounded-2xl p-5 border border-border/50 flex gap-4 hover:shadow-md transition-shadow duration-300">
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* NAVIGATION HUB */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            Explorer le <span className="italic font-semibold text-primary">programme</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8">Chaque section est accessible en page dédiée.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.navCards.map((card, i) => (
              <AnimatedSection key={card.to} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link to={card.to} className="block bg-card rounded-3xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-400 group">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{card.icon}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium">{card.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-medium">
                      Accéder <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* SUIVI */}
        <AnimatedSection delay={0.1}>
          <h2 className="font-display text-3xl font-light text-foreground mb-2">
            <Calendar className="inline w-8 h-8 text-primary mr-2" />
            Mon <span className="italic font-semibold text-primary">suivi</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Données sauvegardées localement sur votre appareil.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DAYS.map((day, idx) => (
              <div key={day} className="bg-card rounded-2xl p-4 border border-border/50">
                <h3 className="font-semibold text-sm mb-3 text-center text-primary">{day}</h3>
                <div className="space-y-2">
                  {config.trackFields.map(([field, label]) => (
                    <button key={field} onClick={() => toggleCheck(idx, field)} className="w-full flex items-center gap-2 text-xs text-left hover:opacity-80 transition-opacity">
                      {checked(idx, field)
                        ? <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                        : <Square className="w-4 h-4 text-muted-foreground shrink-0" />}
                      <span className={checked(idx, field) ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
                    </button>
                  ))}
                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-1.5">Énergie</p>
                    <div className="flex gap-1">
                      {['😔', '🙂', '🤩'].map((e, ei) => (
                        <button key={ei} onClick={() => setEnergy(idx, ei)}
                          className={`flex-1 py-1 rounded-lg text-sm transition-all ${trackData[`${idx}_energy`] === ei ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted hover:bg-muted/60'}`}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input type="text" placeholder="Note..."
                    value={trackData[`${idx}_note`] || ''}
                    onChange={e => setNote(idx, e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-muted border-0 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 sm:p-12 text-center border border-border/50">
            <Star className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-3">
              Prêt à <span className="italic font-semibold text-primary">commencer ?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Un suivi personnalisé avec notre diététicienne pour adapter ce programme à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rendez-vous" className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                Prendre rendez-vous
              </Link>
              <Link to="/plans" className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-all">
                Retour aux plans
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
