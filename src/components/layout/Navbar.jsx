import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { APP_START_PATH, useInstalledAppMode } from '@/lib/appMode';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Recettes', path: '/recettes' },
  { label: 'Suivi', path: '/suivi' },
  { label: 'Plans', path: '/plans' },
  { label: 'Blog', path: '/blog' },
];

const appNavLinks = navLinks.filter(link => link.path !== '/');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const isInstalledApp = useInstalledAppMode();
  const visibleNavLinks = isInstalledApp ? appNavLinks : navLinks;
  const brandPath = isInstalledApp ? APP_START_PATH : '/';

  const getLinkClassName = (path) => {
    const isActive = isInstalledApp && path !== APP_START_PATH
      ? location.pathname.startsWith(path)
      : location.pathname === path;

    if (isInstalledApp) {
      return `px-4 py-2 rounded-[8px] text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground/70 hover:text-foreground hover:bg-[#e8efdf]'
      }`;
    }

    return `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground/70 hover:text-foreground hover:bg-muted'
    }`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    const client = supabase;
    if (!client) {
      return;
    }

    await client.auth.signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isInstalledApp
        ? 'bg-[#f7f9f2]/90 backdrop-blur-xl shadow-sm border-b border-[#dfe8d5]'
        : scrolled
        ? 'bg-background/70 backdrop-blur-lg shadow-sm border-b border-border/40'
        : 'bg-background/55 backdrop-blur-md border-b border-border/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isInstalledApp || scrolled ? 'h-16' : 'h-20'
        }`}>
          <Link to={brandPath} className="flex items-center gap-2 group">
            <div className={`${isInstalledApp ? 'rounded-[8px]' : 'rounded-full'} w-9 h-9 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              NutriVie
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {visibleNavLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={getLinkClassName(link.path)}
              >
                {link.label}
              </Link>
            ))}
            {!isInstalledApp ? (
              <Link
                to="/rendez-vous"
                className="ml-2 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 hover:scale-105"
              >
                Prendre RDV
              </Link>
            ) : null}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`ml-2 border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-full'}`}
              >
                Deconnexion
              </button>
            ) : !isInstalledApp ? (
              <Link
                to="/signup"
                className="ml-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                S'inscrire
              </Link>
            ) : null}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${isInstalledApp ? 'rounded-[8px] hover:bg-[#e8efdf]' : 'rounded-full hover:bg-muted'}`}
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
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {!isAuthenticated && !isInstalledApp ? (
                <div className="mb-3 rounded-3xl bg-slate-900 p-5 text-white">
                  <p className="text-lg font-semibold">Accedez a votre espace</p>
                  <p className="mt-1 text-sm text-white/75">
                    Connectez-vous ou creez un compte pour retrouver votre suivi.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-2xl border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      S'inscrire
                    </Link>
                  </div>
                </div>
              ) : null}
              {visibleNavLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-base font-medium transition-all ${
                    isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'
                  } ${
                    location.pathname === link.path || (isInstalledApp && link.path !== APP_START_PATH && location.pathname.startsWith(link.path))
                      ? 'bg-primary text-primary-foreground'
                      : isInstalledApp
                      ? 'text-foreground/70 hover:bg-[#e8efdf]'
                      : 'text-foreground/70 hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isInstalledApp ? (
                <Link
                  to="/rendez-vous"
                  className="block px-4 py-3 rounded-2xl bg-secondary text-secondary-foreground text-base font-semibold text-center mt-2"
                >
                  Prendre rendez-vous
                </Link>
              ) : null}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={`block w-full px-4 py-3 border border-slate-300 text-base font-semibold text-center mt-2 ${isInstalledApp ? 'rounded-[8px]' : 'rounded-2xl'}`}
                >
                  Deconnexion
                </button>
              ) : null}
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
