import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GalleryImage {
  src: string;
  altKey: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/photo-facility-equipment.jpeg', altKey: 'alt_facility_equipment', category: 'facility' },
  { src: '/photo-facility-reception.jpeg', altKey: 'alt_facility_reception', category: 'facility' },
  { src: '/photo-facility-waiting.jpeg', altKey: 'alt_facility_waiting', category: 'facility' },
  { src: '/photo-gymnastics.jpeg', altKey: 'alt_gymnastics', category: 'training' },
  { src: '/photo-kickboxing.jpeg', altKey: 'alt_kickboxing', category: 'training' },
  { src: '/photo-kungfu.jpeg', altKey: 'alt_kungfu', category: 'training' },
  { src: '/banner-group.jpeg', altKey: 'alt_group', category: 'team' },
  { src: '/academy-director.jpeg', altKey: 'alt_director', category: 'team' },
  { src: '/group-of-coaches.jpeg', altKey: 'alt_coaches', category: 'team' },
];

export default function GallerySection() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const constraintsRef = useRef(null);

  const categories = [
    { key: 'all', labelKey: 'gallery_all' },
    { key: 'facility', labelKey: 'gallery_facility' },
    { key: 'training', labelKey: 'gallery_training' },
    { key: 'team', labelKey: 'gallery_team' },
  ];

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/photo-facility-equipment.jpeg')] bg-cover bg-center opacity-3 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-900" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mx-auto w-fit mb-4"
          >
            <ZoomIn className="w-4 h-4" />
            <span>{t('gallery_badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('gallery_title_1')}{' '}
            <span className="gradient-text-gold">{t('gallery_title_2')}</span>
          </motion.h2>

          <div className="section-divider" />
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {categories.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === key
                  ? 'bg-yellow-500 text-[#001538] shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-yellow-500/40 hover:text-yellow-400'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          ref={constraintsRef}
          layout
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((img, index) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openLightbox(index)}
                className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-yellow-500/40 transition-all duration-300 mb-4"
              >
                <img
                  src={img.src}
                  alt={t(img.altKey)}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/50 backdrop-blur-sm flex items-center justify-center text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-[90vw] max-h-[85vh] flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={t(filtered[lightboxIndex].altKey)}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute -left-16 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden md:flex"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute -right-16 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden md:flex"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
