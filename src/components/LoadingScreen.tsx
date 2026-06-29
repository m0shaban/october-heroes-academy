import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown this session or if running in automated test environment
    const isTest = typeof window !== 'undefined' && (window.navigator.webdriver || window.location.search.includes('test') || sessionStorage.getItem('splash_shown'));
    if (isTest) {
      setVisible(false);
      return;
    }

    let start: number | null = null;
    const duration = 2200;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem('splash_shown', '1');
        }, 300);
      }
    };

    requestAnimationFrame(step);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="loading-screen"
        >
          {/* Background animated orbs */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-96 h-96 rounded-full blur-[120px] bg-blue-600/20 top-1/4 -left-24"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1, 1.5, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute w-80 h-80 rounded-full blur-[100px] bg-yellow-500/10 bottom-1/4 -right-20"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Rotating ring */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-28 h-28 rounded-full border-2 border-transparent border-t-yellow-500 border-r-yellow-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-blue-400 border-l-blue-400/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.img
                  src="/logo.jpg"
                  alt="Academy Logo"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-20 h-20 rounded-full object-cover border-2 border-yellow-500/50"
                />
              </div>
            </div>

            {/* Academy Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl font-black text-white text-center mb-2"
            >
              أكاديمية{' '}
              <span className="gradient-text-gold">أبطال أكتوبر</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-slate-400 mb-8 tracking-widest uppercase"
            >
              October Heroes Academy
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #003B8E, #EAB308)',
                  width: `${progress}%`,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <span className="text-xs text-slate-500 font-mono">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
