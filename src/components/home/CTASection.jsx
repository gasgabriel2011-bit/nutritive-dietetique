import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

export default function CTASection({ lifestyleImage }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={lifestyleImage}
              alt="Mode de vie sain"
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 max-w-xl">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-background mb-4 leading-tight">
                  Commencez votre{' '}
                  <span className="italic font-semibold">transformation</span>
                </h2>
                <p className="text-background/80 text-base lg:text-lg mb-8 leading-relaxed">
                  Chaque petit pas compte. Découvrez une approche nutritionnelle 
                  adaptée à votre vie, sans frustration ni privation.
                </p>
                <Link
                  to="/rendez-vous"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Prendre rendez-vous
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}