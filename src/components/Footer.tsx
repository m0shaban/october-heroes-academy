import { motion } from 'motion/react';
import { Trophy, MapPin, Phone, Heart, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    const behavior = (typeof window !== 'undefined' && window.navigator.webdriver) ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  const sports = ['sport_karate', 'sport_kungfu', 'sport_kickboxing', 'sport_aerobics', 'sport_gymnastics'];

  return (
    <footer className="bg-[#020617] relative overflow-hidden border-t border-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-blue-900/10 blur-[80px]" />
        <div className="absolute inset-0 opacity-2"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(234,179,8,0.15) 1px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 mb-5"
            >
              <img
                src="/logo.jpg"
                alt={t('alt_logo')}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              />
              <div>
                <span className="text-xl font-black text-white block leading-tight">
                  <span className="text-yellow-400">أبطال</span> أكتوبر
                </span>
                <span className="text-xs text-slate-500 font-mono">October Heroes Academy</span>
              </div>
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer_desc')}
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4 text-yellow-500/60 flex-shrink-0" />
              <span>{t('footer_location')}</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-5">
              {t('nav_programs')}
            </h4>
            <ul className="space-y-3">
              {sports.map((sportKey) => (
                <li key={sportKey}>
                  <a
                    href="#sports"
                    className="text-slate-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500 transition-colors" />
                    {t(sportKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-5">
              {t('nav_contact')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-500/60 flex-shrink-0" />
                <div className="space-y-1">
                  {['01004945997', '01144050600', '01033111786'].map((num) => (
                    <a
                      key={num}
                      href={`tel:${num}`}
                      dir="ltr"
                      className="block text-slate-400 hover:text-yellow-400 transition-colors text-sm font-mono"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick join */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-bold hover:bg-yellow-500/20 transition-all"
            >
              <Trophy className="w-4 h-4" />
              {t('nav_join')}
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-mono uppercase tracking-wider">
          <div>
            {t('footer_est')} {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2">
            <span>{t('footer_rights')}</span>
          </div>
          <span
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-yellow-400 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3 h-3" />
            BACK TO TOP
          </span>
        </div>
      </div>
    </footer>
  );
}
