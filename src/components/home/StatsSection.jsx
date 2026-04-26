import AnimatedSection from '../ui/AnimatedSection';

const stats = [
  { number: '500+', label: 'Patients accompagnés', icon: '👥' },
  { number: '97%', label: 'Taux de satisfaction', icon: '⭐' },
  { number: '12 ans', label: "D'expérience", icon: '🏆' },
  { number: '-5kg', label: 'Moyenne sur 3 mois', icon: '📉' },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="bg-card rounded-3xl p-6 lg:p-8 text-center shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-500 group">
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                <p className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}