import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Recettes', path: '/recettes' },
  { label: 'Suivi', path: '/suivi' },
  { label: 'Plans', path: '/plans' },
  { label: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              NutriVie
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rendez-vous"
              className="ml-2 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:scale-105"
            >
              Prendre RDV
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Deconnexion
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/rendez-vous"
                className="block px-4 py-3 rounded-2xl bg-secondary text-secondary-foreground text-base font-semibold text-center mt-2"
              >
                Prendre rendez-vous
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 rounded-2xl border border-slate-300 text-base font-semibold text-center mt-2"
                >
                  Deconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-2xl border border-slate-300 text-base font-semibold text-center mt-2"
                >
                  Connexion
                </Link>
              )}
              {isAuthenticated && user?.email ? (
                <p className="px-4 pt-2 text-sm text-foreground/60">
                  {user.email}
                </p>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
