import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { key: 'nav_programs', href: '#sports' },
  { key: 'nav_features', href: '#features' },
  { key: 'nav_coaches', href: '#coaches' },
  { key: 'nav_contact', href: '#contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
    try {
      localStorage.setItem('i18nextLng', nextLang);
    } catch (e) {
      console.warn('localStorage.setItem failed:', e);
    }
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', nextLang);
        const relativeUrl = url.pathname + url.search + url.hash;
        window.history.pushState({}, '', relativeUrl);
      } catch (e) {
        console.warn('history.pushState failed:', e);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        {/* Gradient separator when scrolled */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
          />
        )}

        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <img
                src="/logo.jpg"
                alt={t('alt_logo')}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-all duration-300"
              />
              <div className="absolute -inset-1 rounded-full border border-yellow-500/20 group-hover:border-yellow-500/50 transition-colors" />
            </div>
            <span className="text-xl font-black tracking-tight text-white hidden sm:block leading-tight">
              <span className="text-yellow-400">أبطال</span> أكتوبر
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ key, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={key}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 group ${
                    isActive ? 'text-yellow-400' : 'text-blue-100 hover:text-yellow-400'
                  }`}
                >
                  {t(key)}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                </a>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-blue-100 hover:text-yellow-400 transition-colors text-sm font-bold px-3 h-11 rounded-lg hover:bg-white/5"
              aria-label={`Switch to ${i18n.language === 'ar' ? 'English' : 'Arabic'}`}
            >
              <Globe className="w-4 h-4" />
              {i18n.language === 'ar' ? 'EN' : 'عربي'}
            </button>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-sm px-6 py-2.5 hidden md:inline-flex"
            >
              {t('nav_join')}
            </motion.a>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:border-yellow-500/40 transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: i18n.language === 'ar' ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: i18n.language === 'ar' ? '100%' : '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 bottom-0 inset-inline-end-0 w-80 z-50 md:hidden"
              style={{ right: i18n.language === 'ar' ? 0 : 'auto', left: i18n.language === 'ar' ? 'auto' : 0 }}
            >
              <div className="h-full bg-[#000d22] border-s border-yellow-500/20 flex flex-col">
                {/* Drawer header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <img src="/logo.jpg" alt={t('alt_logo')} className="w-10 h-10 rounded-full border border-yellow-500/50" />
                    <span className="font-black text-white text-lg">القائمة</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 p-6 space-y-1">
                  {navLinks.map(({ key, href }, index) => {
                    const sectionId = href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                      <motion.a
                        key={key}
                        href={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-base transition-all ${
                          isActive
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : 'text-blue-100 hover:bg-white/5 hover:text-yellow-400'
                        }`}
                      >
                        <ChevronDown className={`w-4 h-4 rotate-${i18n.language === 'ar' ? '90' : '-90'} opacity-40`} />
                        {t(key)}
                      </motion.a>
                    );
                  })}
                </nav>

                {/* Drawer footer actions */}
                <div className="p-6 border-t border-white/5">
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 px-4 rounded-xl btn-primary text-sm"
                  >
                    {t('nav_join')}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
