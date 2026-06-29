import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Dumbbell, Flame, Sword, Music, ArrowRight, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Sport {
  id: string;
  titleKey: string;
  icon: React.ReactNode;
  image: string;
  descKey: string;
  color: string;
}

export default function SportsSection() {
  const { t, i18n } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sports: Sport[] = [
    {
      id: 'karate',
      titleKey: 'sport_karate',
      icon: <Sword className="w-8 h-8" />,
      image: '/icon-karate.jpeg',
      descKey: 'sport_karate_desc',
      color: 'from-red-500/20 to-orange-500/10',
    },
    {
      id: 'kungfu',
      titleKey: 'sport_kungfu',
      icon: <Flame className="w-8 h-8" />,
      image: '/photo-kungfu.jpeg',
      descKey: 'sport_kungfu_desc',
      color: 'from-purple-500/20 to-pink-500/10',
    },
    {
      id: 'kickboxing',
      titleKey: 'sport_kickboxing',
      icon: <Activity className="w-8 h-8" />,
      image: '/photo-kickboxing.jpeg',
      descKey: 'sport_kickboxing_desc',
      color: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      id: 'aerobics',
      titleKey: 'sport_aerobics',
      icon: <Dumbbell className="w-8 h-8" />,
      image: '/photo-facility-equipment.jpeg',
      descKey: 'sport_aerobics_desc',
      color: 'from-green-500/20 to-emerald-500/10',
    },
    {
      id: 'gymnastics',
      titleKey: 'sport_gymnastics',
      icon: <Music className="w-8 h-8" />,
      image: '/photo-gymnastics.jpeg',
      descKey: 'sport_gymnastics_desc',
      color: 'from-pink-500/20 to-rose-500/10',
    },
    {
      id: 'mma',
      titleKey: 'sport_mma',
      icon: <Shield className="w-8 h-8" />,
      image: '/coach-mma.jpeg',
      descKey: 'sport_mma_desc',
      color: 'from-amber-600/20 to-yellow-500/10',
    },
  ];

  const isRTL = i18n.language === 'ar';

  return (
    <section id="sports" className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-[#020617] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-yellow-500/5"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/5"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mx-auto w-fit mb-4"
          >
            <Activity className="w-4 h-4" />
            <span>{t('nav_programs')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('sports_title_1')}{' '}
            <span className="gradient-text-gold">{t('sports_title_2')}</span>
          </motion.h2>

          <div className="section-divider" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-4"
          >
            {t('sports_desc')}
          </motion.p>
        </div>

        {/* Sports grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sports.map((sport, index) => (
            <motion.article
              key={sport.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHoveredId(sport.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 hover:border-yellow-500/50 transition-all duration-500 cursor-pointer min-h-[360px] flex flex-col"
              style={{ boxShadow: hoveredId === sport.id ? '0 20px 60px rgba(234,179,8,0.1), 0 0 0 1px rgba(234,179,8,0.2)' : 'none' }}
            >
              {/* Background image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={sport.image}
                  alt={t(sport.titleKey)}
                  width={400}
                  height={360}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredId === sport.id ? 1.12 : 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/20" />
                {/* Color overlay on hover */}
                <AnimatePresence>
                  {hoveredId === sport.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${sport.color}`}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div className="relative z-10 p-7 flex flex-col flex-1 items-center justify-end text-center">
                {/* Icon */}
                <motion.div
                  animate={{ y: hoveredId === sport.id ? -8 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-16 h-16 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-5 shadow-[0_0_20px_rgba(234,179,8,0.15)] group-hover:bg-yellow-500/30 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all duration-500"
                >
                  {sport.icon}
                </motion.div>

                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {t(sport.titleKey)}
                </h3>

                <motion.p
                  animate={{ opacity: hoveredId === sport.id ? 1 : 0.6, y: hoveredId === sport.id ? 0 : 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-100/70 text-sm leading-relaxed mb-5"
                >
                  {t(sport.descKey)}
                </motion.p>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hoveredId === sport.id ? 1 : 0, y: hoveredId === sport.id ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-yellow-400 text-sm font-bold hover:gap-3 transition-all"
                >
                  {t('nav_join')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
