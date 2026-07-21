import { motion, AnimatePresence } from 'motion/react';
import { Medal, Star, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CoachSection() {
  const { t } = useTranslation();

  const coaches = [
    { name: t('coach_mma'), sport: 'MMA', image: '/coach-mma.jpeg' },
    { name: t('coach_kickboxing'), sport: t('sport_kickboxing'), image: '/coach-kickboxing.jpeg' },
    { name: t('coach_karate'), sport: t('sport_karate'), image: '/coach-karate.jpeg' },
    { name: t('coach_karate'), sport: t('sport_karate'), image: '/coach-karate-2.jpeg' },
    { name: t('coach_jody'), sport: t('coach_jody_title'), image: '/coach-karate-girl.jpeg' },
    { name: t('coach_kungfu'), sport: t('sport_kungfu'), image: '/coach-kungfu.jpeg' },
    { name: t('coach_gymnastics'), sport: t('sport_gymnastics'), image: '/coach-gymnastics.jpeg' },
  ];

  return (
    <section id="coaches" className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(234,179,8,0.05) 0px, rgba(234,179,8,0.05) 1px, transparent 1px, transparent 40px)',
          }}
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
            <Star className="w-4 h-4" />
            <span>{t('nav_coaches')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('coaches_title_1')}{' '}
            <span className="gradient-text-gold">{t('coaches_title_2')}</span>
          </motion.h2>
          <div className="section-divider" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-4"
          >
            {t('coaches_desc')}
          </motion.p>
        </div>

        {/* Director Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 rounded-[2.5rem] overflow-hidden border border-blue-500/20 shadow-[0_0_60px_rgba(0,59,142,0.3)] relative"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-yellow-500/10 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            {/* Text side */}
            <div className="bg-gradient-to-br from-[#003B8E] to-[#001538] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500/5 blur-[80px]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 mb-6 text-sm self-start">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{t('director_badge')}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">
                  {t('director_title')}
                </h3>

                <h4 className="text-xl text-yellow-400 mb-6 font-semibold flex items-center gap-3">
                  <Medal className="w-6 h-6" />
                  {t('director_subtitle')}
                </h4>

                <p className="text-lg text-blue-100/80 leading-relaxed">
                  {t('director_desc')}
                </p>
              </div>
            </div>

            {/* Image side */}
            <div className="relative overflow-hidden min-h-[300px]">
              <img
                src="/academy-director.jpeg"
                alt={t('director_title')}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#001538] via-[#001538]/20 to-transparent md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001538] via-transparent to-transparent md:hidden" />
            </div>
          </div>
        </motion.div>

        {/* Group Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative rounded-[2rem] overflow-hidden border border-slate-800 group"
        >
          <img
            src="/banner-group.jpeg"
            alt={t('coaches_group_title')}
            className="w-full object-cover max-h-[400px] transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent flex items-end">
            <div className="p-8">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black text-white flex items-center gap-3"
              >
                <ShieldCheck className="w-8 h-8 text-yellow-400" />
                {t('coaches_group_title')}
              </motion.h3>
            </div>
          </div>
        </motion.div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {coaches.map((coach, index) => (
            <motion.div
              key={`${coach.image}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group rounded-[1.5rem] overflow-hidden bg-slate-900 border border-slate-800 hover:border-yellow-500/40 transition-all duration-400 cursor-pointer"
              style={{
                boxShadow: 'none',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Coach info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <motion.div
                    initial={{ y: 5, opacity: 0.8 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    <h4 className="text-base font-bold text-white mb-0.5">{coach.name}</h4>
                    <p className="text-yellow-400 font-medium text-xs">{coach.sport}</p>
                  </motion.div>
                </div>

                {/* Star badge */}
                <div className="absolute top-3 start-3 w-7 h-7 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
