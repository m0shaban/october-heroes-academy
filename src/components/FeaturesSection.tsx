import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Target, Shield, Users, Award, Zap, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  key?: any;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default"
    >
      <div
        className={`h-full rounded-[1.5rem] p-7 border transition-all duration-400 relative overflow-hidden ${
          isHovered
            ? 'bg-gradient-to-br from-[#003B8E]/40 to-[#001538]/60 border-yellow-500/40 shadow-[0_20px_50px_rgba(234,179,8,0.15)]'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-blue-500/5"
          />
        )}

        {/* Glow dot top-right */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-yellow-500/40 group-hover:bg-yellow-400 transition-colors" />

        {/* Icon */}
        <motion.div
          style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}
          transition={{ duration: 0.3 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
            isHovered
              ? 'bg-yellow-500/20 border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
              : 'bg-slate-800 border border-slate-700'
          }`}
        >
          <div className={`transition-colors duration-300 ${isHovered ? 'text-yellow-400' : 'text-yellow-500'}`}>
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            {description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { icon: <Target className="w-7 h-7" />, title: t('feature_tech_title'), description: t('feature_tech_desc') },
    { icon: <Zap className="w-7 h-7" />, title: t('feature_gym_title'), description: t('feature_gym_desc') },
    { icon: <Users className="w-7 h-7" />, title: t('feature_ages_title'), description: t('feature_ages_desc') },
    { icon: <Award className="w-7 h-7" />, title: t('feature_champ_title'), description: t('feature_champ_desc') },
    { icon: <Brain className="w-7 h-7" />, title: t('feature_prep_title'), description: t('feature_prep_desc') },
    { icon: <Shield className="w-7 h-7" />, title: t('feature_elite_title'), description: t('feature_elite_desc') },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px]" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(234,179,8,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mx-auto w-fit mb-4"
          >
            <Award className="w-4 h-4" />
            <span>{t('nav_features')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('features_title_1')}{' '}
            <span className="gradient-text-gold">{t('features_title_2')}</span>
          </motion.h2>

          <div className="section-divider" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-4"
          >
            {t('features_desc')}
          </motion.p>
        </div>

        {/* Features grid with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
