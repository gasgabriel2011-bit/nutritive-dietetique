import { Link } from 'react-router-dom';
import { Leaf, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-background">NutriVie</span>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              Une approche bienveillante et scientifique de la nutrition, 
              pour des changements durables et un bien-être authentique.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Recettes', path: '/recettes' },
                { label: 'Suivi nutrition', path: '/suivi' },
                { label: 'Plans alimentaires', path: '/plans' },
                { label: 'Blog', path: '/blog' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/60">
                <Mail className="w-4 h-4 text-primary" />
                contact@nutrivie.fr
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <Phone className="w-4 h-4 text-primary" />
                01 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 text-primary" />
                Paris, France
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Rendez-vous</h4>
            <p className="text-sm text-background/60 mb-4">
              Prenez rendez-vous pour une consultation personnalisée.
            </p>
            <Link
              to="/rendez-vous"
              className="inline-block px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-all"
            >
              Réserver un créneau
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} NutriVie. Tous droits réservés.
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-secondary" /> pour votre santé
          </p>
        </div>
      </div>
    </footer>
  );
}