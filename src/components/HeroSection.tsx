import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Trophy, Star, Users } from 'lucide-react';

const heroImages = [
  '/hero-banner.jpeg',
  '/banner-group.jpeg',
  '/photo-facility-equipment.jpeg',
  '/photo-facility-reception.jpeg',
  '/photo-gymnastics.jpeg',
  '/photo-kickboxing.jpeg',
];

const stats = [
  { labelKey: 'stat_trainees', value: 500, suffix: '+', icon: Users },
  { labelKey: 'stat_sports', value: 5, suffix: '', icon: Trophy },
  { labelKey: 'stat_years', value: 10, suffix: '+', icon: Star },
];

// Simple animated counter
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="counter-value">
      {count}{suffix}
    </span>
  );
}

// Gold particle
function Particle({ index }: { index: number; key?: any }) {
  const style = {
    left: `${Math.random() * 100}%`,
    animationDuration: `${6 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 5}s`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
    opacity: 0.3 + Math.random() * 0.5,
  };
  return (
    <div
      className="particle animate-float"
      style={style}
      key={index}
    />
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, nextSlide]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000d22] pt-20"
      aria-label="Hero section"
    >
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="crossfade">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide]}
              alt={`Hero background ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000d22]/80 via-[#000d22]/60 to-[#000d22]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000d22]/90 via-transparent to-[#000d22]/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-blue-600/10 blur-[120px]"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.5, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-yellow-500/5 blur-[100px]"
        />
      </div>

      {/* Gold Particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 z-10 max-w-6xl relative flex flex-col items-center text-center py-16">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-badge mb-6"
        >
          <Trophy className="w-4 h-4" />
          <span>{t('academy_name')}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="section-title text-white mb-6 max-w-4xl"
        >
          {t('hero_title_1')}{' '}
          <span className="gradient-text-gold text-glow-gold">
            {t('hero_title_2')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-blue-100/80 max-w-2xl leading-relaxed mb-10"
        >
          {t('hero_desc')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center"
        >
          <motion.a
            href="#sports"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base md:text-lg min-w-[180px]"
          >
            {t('hero_btn_explore')}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary text-base md:text-lg min-w-[180px]"
          >
            {t('hero_btn_contact')}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-lg"
        >
          {stats.map(({ labelKey, value, suffix }, i) => (
            <motion.div
              key={labelKey}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-4 text-center"
            >
              <div className="text-2xl md:text-4xl font-black gradient-text-gold mb-1">
                <AnimatedCounter value={value} suffix={suffix} />
              </div>
              <div className="text-xs md:text-sm text-blue-200/70 font-medium">
                {t(labelKey)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-2 mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`hero-carousel-dot transition-all duration-300 ${i === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <span className="text-xs tracking-widest uppercase opacity-60">scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
