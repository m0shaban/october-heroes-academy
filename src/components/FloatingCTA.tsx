import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WHATSAPP_NUMBER = '201144050600';
const PHONE_NUMBER = '01144050600';

export default function FloatingCTA() {
  const { t, i18n } = useTranslation();
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [isWAExpanded, setIsWAExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    i18n.language === 'ar'
      ? 'مرحباً، أريد الاستفسار عن برامج الأكاديمية'
      : 'Hello, I would like to inquire about the academy programs'
  );

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed z-[100]" style={{ bottom: '2rem', insetInlineEnd: '2rem' }}>
        <AnimatePresence>
          {isWAExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute bottom-16 end-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
              {/* Chat header */}
              <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.jpg"
                    alt="Academy"
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{t('academy_name')}</p>
                    <p className="text-green-100 text-xs">{t('wa_online')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsWAExpanded(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat bubble */}
              <div className="p-4 bg-[#ECE5DD]">
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%] text-sm text-slate-700">
                  {t('wa_greeting')}
                  <p className="text-[10px] text-slate-400 mt-1 text-end">
                    {new Date().toLocaleTimeString(i18n.language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Open WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold text-sm hover:bg-[#22c55e] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t('wa_open_chat')}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main WhatsApp button */}
        <motion.button
          onClick={() => setIsWAExpanded(!isWAExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="whatsapp-btn text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)]"
          aria-label="Open WhatsApp chat"
        >
          <AnimatePresence mode="wait">
            {isWAExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="wa"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse rings */}
        {!isWAExpanded && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
          </>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {showMobileCTA && !dismissed && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mobile-cta md:hidden"
          >
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              {t('cta_call')}
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t('cta_whatsapp')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
