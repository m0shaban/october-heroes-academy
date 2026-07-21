import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SportsSection from './components/SportsSection';
import CoachSection from './components/CoachSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync language with popstate (browser back/forward history navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang');
      if (lang === 'ar' || lang === 'en') {
        if (i18n.language !== lang) {
          i18n.changeLanguage(lang);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [i18n]);

  // Monitor scroll for floating Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;

    // Automatically append default language query parameter if missing to support history popstate sync
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (!url.searchParams.has('lang')) {
          url.searchParams.set('lang', i18n.language);
          const relativeUrl = url.pathname + url.search + url.hash;
          window.history.replaceState({}, '', relativeUrl);
        }
      } catch (e) {
        console.warn('history.replaceState failed:', e);
      }
    }
  }, [i18n.language]);

  // Cursor glow effect (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current && window.innerWidth > 768) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const siteUrl = 'https://octoberheroes.app';
  const canonicalLang = i18n.language;

  const jsonLdSportsClub = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "@id": `${siteUrl}/#sportsclub`,
    "name": "أكاديمية أبطال أكتوبر",
    "alternateName": ["October Heroes Academy", "OHA", "أبطال أكتوبر"],
    "description": "أكاديمية رياضية متخصصة في الرياضات القتالية — كاراتيه، كونغ فو، كيك بوكسينج، جمباز، إيروبكس، MMA — في مدينة 6 أكتوبر، الجيزة، مصر. تأسست لبناء أبطال من جميع الأعمار.",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpg`,
      "width": 512,
      "height": 512
    },
    "image": [
      `${siteUrl}/hero-banner.jpeg`,
      `${siteUrl}/banner-group.jpeg`,
      `${siteUrl}/photo-facility-equipment.jpeg`
    ],
    "telephone": ["+201004945997", "+201144050600", "+201033111786"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع مصطفى مشرفة، خلف مسجد أبوبكر الصديق، مبنى 2151",
      "addressLocality": "مدينة 6 أكتوبر",
      "addressRegion": "الجيزة",
      "addressCountry": "EG",
      "postalCode": "12566"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9571059,
      "longitude": 30.9509875
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Saturday"],
        "opens": "09:00",
        "closes": "22:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "EGP",
    "paymentAccepted": "Cash",
    "sport": ["Karate", "Kung Fu", "Kickboxing", "Gymnastics", "Aerobics", "MMA"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "برامج تدريبية",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "كاراتيه", "description": "فن قتالي ياباني يركز على الضربات والركلات" } },
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "كيك بوكسينج", "description": "رياضة قتالية تمزج الكاراتيه والملاكمة" } },
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "كونغ فو", "description": "فنون قتالية صينية تقليدية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "جمباز وباليه", "description": "مرونة وتوازن وأناقة" } },
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "إيروبكس", "description": "تمارين إيقاعية لصحة القلب" } },
        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "MMA (قتال مختلط)", "description": "مزيج متكامل من أقوى الفنون القتالية الأرضية والدفاعية والهجومية" } }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/october.heroes.academy",
      "https://www.instagram.com/october.heroes.academy",
      `${siteUrl}`
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5"
    }
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    "name": "أكاديمية أبطال أكتوبر",
    "image": `${siteUrl}/hero-banner.jpeg`,
    "telephone": "+201144050600",
    "url": siteUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع مصطفى مشرفة، مجاورة 7، حي ثاني",
      "addressLocality": "6 أكتوبر",
      "addressRegion": "الجيزة",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9571059,
      "longitude": 30.9509875
    }
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هي الرياضات التي تقدمها أكاديمية أبطال أكتوبر؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تقدم الأكاديمية برامج تدريبية في: الكاراتيه، كيك بوكسينج، كونغ فو، جمباز وباليه، إيروبكس، وMMA."
        }
      },
      {
        "@type": "Question",
        "name": "ما هي أعمار المتدربين المقبولين في الأكاديمية؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تقبل الأكاديمية جميع الأعمار بدءاً من 3 سنوات، بنين وبنات."
        }
      },
      {
        "@type": "Question",
        "name": "أين تقع أكاديمية أبطال أكتوبر؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تقع الأكاديمية في مدينة 6 أكتوبر، الحي الثاني، المجاورة السابعة، شارع مصطفى مشرفة، خلف مسجد أبوبكر الصديق، مبنى 2151."
        }
      },
      {
        "@type": "Question",
        "name": "كيف أتواصل مع أكاديمية أبطال أكتوبر؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "يمكن التواصل عبر: 01004945997 أو 01144050600 أو 01033111786، أو عبر واتساب على 01144050600."
        }
      },
      {
        "@type": "Question",
        "name": "هل تؤهل الأكاديمية للبطولات؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، تؤهل الأكاديمية المتدربين لاجتياز اختبارات الأحزمة والمشاركة في البطولات المحلية والإقليمية والعالمية."
        }
      }
    ]
  };

  return (
    <div className={`min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 ${i18n.language === 'ar' ? 'font-ar' : 'font-en'}`}>

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Cursor Glow (desktop only) */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow hidden md:block"
        aria-hidden="true"
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999]"
        style={{
          scaleX,
          transformOrigin: i18n.language === 'ar' ? 'right' : 'left',
          background: 'linear-gradient(90deg, #003B8E, #EAB308)',
        }}
      />

      {/* SEO Head */}
      <Helmet htmlAttributes={{ lang: canonicalLang, dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
        <title>
          {i18n.language === 'ar'
            ? 'أكاديمية أبطال أكتوبر | كاراتيه، كيك بوكسينج، كونغ فو، جمباز، MMA - 6 أكتوبر'
            : 'October Heroes Academy | Karate, Kickboxing, Kung Fu, Gymnastics, MMA - 6th October City'}
        </title>
        <meta
          name="description"
          content={i18n.language === 'ar'
            ? 'أكاديمية أبطال أكتوبر — أفضل أكاديمية رياضية قتالية في مدينة 6 أكتوبر. برامج كاراتيه، كيك بوكسينج، كونغ فو، جمباز، إيروبكس، MMA لجميع الأعمار من 3 سنوات. مدربون محترفون وبطل مصر والعالم.'
            : 'October Heroes Academy — the best martial arts academy in 6th October City. Programs in Karate, Kickboxing, Kung Fu, Gymnastics, Aerobics, and MMA for all ages from 3 years. Professional coaches and Egypt & World Champions.'}
        />
        <meta
          name="keywords"
          content="أكاديمية أبطال أكتوبر, كاراتيه 6 أكتوبر, كيك بوكسينج, كونغ فو, جمباز, إيروبكس, رياضات قتالية, مدينة 6 أكتوبر, الجيزة, مصر, October Heroes Academy, karate, kickboxing, kung fu, gymnastics, martial arts, 6th october city, egypt"
        />
        <meta name="author" content="أكاديمية أبطال أكتوبر" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#003B8E" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:site_name" content="أكاديمية أبطال أكتوبر" />
        <meta property="og:title" content="أكاديمية أبطال أكتوبر | October Heroes Academy" />
        <meta property="og:description" content="أكاديمية رياضية متخصصة في الرياضات القتالية في مدينة 6 أكتوبر — كاراتيه، كيك بوكسينج، كونغ فو، جمباز لجميع الأعمار." />
        <meta property="og:image" content={`${siteUrl}/hero-banner.jpeg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={i18n.language === 'ar' ? 'ar_EG' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'ar' ? 'en_US' : 'ar_EG'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${siteUrl}/`} />
        <meta name="twitter:title" content="أكاديمية أبطال أكتوبر | October Heroes Academy" />
        <meta name="twitter:description" content="أكاديمية رياضية متخصصة في الرياضات القتالية — كاراتيه، كيك بوكسينج، كونغ فو — مدينة 6 أكتوبر." />
        <meta name="twitter:image" content={`${siteUrl}/hero-banner.jpeg`} />

        {/* Canonical & hreflang */}
        <link rel="canonical" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="ar" href={`${siteUrl}/?lang=ar`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLdSportsClub)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdLocalBusiness)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFAQ)}</script>
      </Helmet>

      {/* Page Layout */}
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <SportsSection />
        <GallerySection />
        <CoachSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating CTA (WhatsApp + Mobile sticky bar) */}
      <FloatingCTA />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => {
              const behavior = (typeof window !== 'undefined' && window.navigator.webdriver) ? 'auto' : 'smooth';
              window.scrollTo({ top: 0, behavior });
            }}
            className="back-to-top text-yellow-400"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
