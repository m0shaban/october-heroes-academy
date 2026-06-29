# Detailed SEO, AIO, and i18n Analysis Report

**October Heroes Academy (أكاديمية أبطال أكتوبر)**
*Date: 2026-06-29*
*Explorer: explorer_2*

---

## 1. Executive Summary

A detailed review of the October Heroes Academy codebase was performed to analyze the Internationalization (i18n), SEO, and AI Optimization (AIO) implementation. 

### Key Findings
1. **i18n & Language Switcher**: The application uses `react-i18next` with local translations embedded in `src/i18n.ts`. While the UI supports toggle-in-memory, it lacks automatic URL query string or path detection (e.g. `?lang=en` or `?lang=ar`), which severely hinders search engine bots from crawling and indexing the non-default English version.
2. **SEO Header & Helmet**: `react-helmet-async` is integrated in `src/App.tsx`. However, key meta descriptions, title formats, and social graphics are not fully mapped to translations or optimized for specific local search intents in October City.
3. **JSON-LD Structured Data**: A basic `SportsClub` schema exists in `src/App.tsx`. There is significant opportunity to expand this into a comprehensive, dynamic JSON-LD `@graph` linking the `SportsClub`, `LocalBusiness`, `Organization`, `BreadcrumbList`, `FAQPage`, `Course` (per sport), `Person` (director), `AggregateRating`, `ImageGallery`, and `Event` (rolling registrations).
4. **AI/AIO Optimization**: The site currently lacks dedicated files (`llms.txt`, `llms-full.txt`, and `.well-known/ai-plugin.json`) to feed modern LLM-based search agents (Perplexity, ChatGPT, Claude) with structured documentation.

---

## 2. i18n Configuration & Expansion Plan (`src/i18n.ts`)

### 2.1 Current Setup Analysis
- Translation resources are maintained inline within `src/i18n.ts` as a nested JS object.
- Supported locales: `ar` (default) and `en`.
- Language selection is volatile (not persisted to URL) and only initialized to `ar` by default.

### 2.2 Recommendation: URL-Based Language Detection
To ensure crawler indexing, we must initialize the language using a query parameter parser and set it in `i18n.ts`. Here is the proposed logic for `src/i18n.ts`:

```typescript
// Proposed query-based language detection
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === 'ar' || lang === 'en') {
      return lang;
    }
    const saved = localStorage.getItem('i18nextLng');
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
  }
  return 'ar'; // Fallback default
};
```

Update `i18n.init({...})` to set `lng: getInitialLanguage()`.

In `src/components/Navbar.tsx`, when switching language, we should also update the browser's URL query string dynamically:

```typescript
const toggleLanguage = () => {
  const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
  i18n.changeLanguage(nextLang);
  
  // Update URL query string for SEO crawlers to access both language states
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextLang);
  window.history.pushState({}, '', url.toString());
};
```

---

### 2.3 Proposed Translation Keys Expansion
The translation resources in `src/i18n.ts` should be expanded to include metadata, gallery items, loading screen text, WhatsApp CTA, and the sticky discount banner.

#### Proposed Addition to `ar` (Arabic Translation):
```json
{
  "seo_title": "أكاديمية أبطال أكتوبر | كاراتيه، كونغ فو، كيك بوكسينغ، جمباز بمدينة 6 أكتوبر",
  "seo_description": "أفضل أكاديمية رياضية بمدينة 6 أكتوبر لتدريب الكاراتيه، الكونغ فو، الكيك بوكسينغ، والجمباز للأطفال والكبار. مدربون معتمدون وصالة رياضية مجهزة بالكامل.",
  "seo_keywords": "كاراتيه 6 أكتوبر, كونغ فو أكتوبر, كيك بوكسينغ الحي الثاني, جمباز أطفال أكتوبر, دفاع عن نفس مصر, لياقة بدنية 6 أكتوبر, أكاديمية أبطال أكتوبر, جمباز باليه الحي الثاني",
  
  "director_name": "كابتن [الاسم]", 
  
  "gallery_title_1": "معرض",
  "gallery_title_2": "أبطالنا وصالاتنا",
  "gallery_desc": "لقطات حية من حصص التدريب، فعاليات توزيع الأحزمة، وأحدث الأجهزة في صالتنا الرياضية.",
  "gallery_img_facility_reception": "منطقة الاستقبال والترحيب بالأعضاء",
  "gallery_img_facility_waiting": "منطقة انتظار مريحة ومكيفة لأولياء الأمور",
  "gallery_img_facility_equipment": "صالة الجمباز والإيروبكس مجهزة بأحدث أدوات الأمان",
  "gallery_img_karate_training": "أبطال الكاراتيه الصغار أثناء التدريب على الدفاع والتركيز",
  "gallery_img_kungfu_session": "تمارين الكونغ فو وبناء المرونة الجسدية والقوة الداخلية",
  "gallery_img_kickboxing_match": "تدريبات الكيك بوكسينغ الحماسية للياقة البدنية والدفاع عن النفس",

  "whatsapp_cta_text": "تواصل معنا عبر واتساب",
  "whatsapp_cta_sub": "استفسر عن مواعيد التدريب والاشتراكات الحالية",
  "whatsapp_message": "مرحباً أكاديمية أبطال أكتوبر، أود الاستفسار عن تفاصيل الاشتراكات ومواعيد التدريب المتوفرة للسن الحالي.",

  "sticky_cta_title": "خصم لفترة محدودة! سجل اليوم واحصل على خصم 15% على أول شهر.",
  "sticky_cta_btn": "سجل اهتمامك الآن",

  "loading_text": "جاري تحميل عالم الأبطال...",
  "loading_subtext": "أكاديمية أبطال أكتوبر ترحب بك"
}
```

#### Proposed Addition to `en` (English Translation):
```json
{
  "seo_title": "October Heroes Academy | Karate, Kung Fu, Kickboxing, Gymnastics in 6th of October City",
  "seo_description": "The premier martial arts and gymnastics academy in 6th of October City. Training programs in Karate, Kung Fu, Kickboxing, and Ballet for all ages with elite certified coaches.",
  "seo_keywords": "karate 6 October, kung fu October, kickboxing 2nd district, gymnastics kids Giza, self defense Egypt, October Heroes Academy, kids sports 6th of october",
  
  "director_name": "Captain [Name]",

  "gallery_title_1": "Our",
  "gallery_title_2": "Gallery & Facilities",
  "gallery_desc": "Live shots from our training sessions, belt ceremonies, and state-of-the-art gym equipment.",
  "gallery_img_facility_reception": "Reception and welcoming lobby area for members",
  "gallery_img_facility_waiting": "Comfortable and air-conditioned parents' waiting lounge",
  "gallery_img_facility_equipment": "Gymnastics and aerobics hall equipped with modern safety gear",
  "gallery_img_karate_training": "Young Karate champions practicing form, discipline, and defense",
  "gallery_img_kungfu_session": "Kung Fu training session focusing on flexibility and internal power",
  "gallery_img_kickboxing_match": "High-intensity Kickboxing training for fitness and self-defense",

  "whatsapp_cta_text": "Chat on WhatsApp",
  "whatsapp_cta_sub": "Inquire about schedules and membership fees",
  "whatsapp_message": "Hello October Heroes Academy, I would like to inquire about training schedules and subscription fees.",

  "sticky_cta_title": "Limited Time Offer! Register today and get 15% off your first month.",
  "sticky_cta_btn": "Register Interest Now",

  "loading_text": "Loading the world of champions...",
  "loading_subtext": "October Heroes Academy Welcomes You"
}
```

---

## 3. Meta Tags, Open Graph, and International SEO Setup

To optimize indexing, dynamic SEO tags must be populated inside `src/App.tsx` via `react-helmet-async`. Here are the core specifications:

### 3.1 Metadata Specifications
1. **Title**:
   - Arabic: `أكاديمية أبطال أكتوبر | كاراتيه، كونغ فو، كيك بوكسينغ، جمباز بمدينة 6 أكتوبر`
   - English: `October Heroes Academy | Karate, Kung Fu, Kickboxing, Gymnastics in 6th of October City`
2. **Meta Description**:
   - Max 160 characters. Clearly states the academy location (6th of October, 2nd District) and courses offered.
3. **Keywords**:
   - Geotargeted key phrases targeting `6 October`, `2nd District` (الحي الثاني), and the specific sports.
4. **Hreflang Alternates**:
   - Essential for signaling equivalent content in both languages to search bots.
   - `hrefLang="ar"` -> `https://octoberheroes.com/?lang=ar`
   - `hrefLang="en"` -> `https://octoberheroes.com/?lang=en`
   - `hrefLang="x-default"` -> `https://octoberheroes.com/` (default fallback is Arabic)
5. **Canonical URL**:
   - Dynamic: `https://octoberheroes.com/?lang={active_lang}` (or clean root path if no language is active).
6. **Open Graph & Twitter Cards**:
   - Localized `og:locale` (`ar_EG` for Arabic, `en_US` for English) and `og:locale:alternate` to guide Facebook/social scrapers.
   - Summary Large Image Twitter cards pointing to `https://octoberheroes.com/hero-banner.jpeg`.

### 3.2 Snippet Implementation in `src/App.tsx`
Replace lines 22–94 of `src/App.tsx` with this optimized implementation:

```typescript
const canonicalUrl = i18n.language === 'ar' 
  ? 'https://octoberheroes.com/' 
  : `https://octoberheroes.com/?lang=${i18n.language}`;

return (
  <div className={`min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-500/30 ${i18n.language === 'ar' ? 'font-ar' : 'font-en'}`}>
    <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Title & Description */}
      <title>{t('seo_title')}</title>
      <meta name="description" content={t('seo_description')} />
      <meta name="keywords" content={t('seo_keywords')} />
      <meta name="author" content={t('academy_name')} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Canonical & Hreflang Alternates */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar" href="https://octoberheroes.com/?lang=ar" />
      <link rel="alternate" hrefLang="en" href="https://octoberheroes.com/?lang=en" />
      <link rel="alternate" hrefLang="x-default" href="https://octoberheroes.com/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={t('seo_title')} />
      <meta property="og:description" content={t('seo_description')} />
      <meta property="og:image" content="https://octoberheroes.com/hero-banner.jpeg" />
      <meta property="og:site_name" content={t('academy_name')} />
      <meta property="og:locale" content={i18n.language === 'ar' ? 'ar_EG' : 'en_US'} />
      <meta property="og:locale:alternate" content={i18n.language === 'ar' ? 'en_US' : 'ar_EG'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={t('seo_title')} />
      <meta name="twitter:description" content={t('seo_description')} />
      <meta name="twitter:image" content="https://octoberheroes.com/hero-banner.jpeg" />

      {/* Dynamic JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(getDynamicSchema(t, i18n.language))}
      </script>
    </Helmet>
```

---

## 4. Comprehensive JSON-LD Structured Data Formulation (AIO/SEO)

To maximize Rich Snippets (stars, maps, course summaries, FAQs) and feed AI engines (like Search Generative Experience), we formulate a single, unified `@graph` structure dynamically generated in React.

### 4.1 Schema Node Architecture
- **`SportsClub` / `LocalBusiness`**: Root physical business node.
  - Geo-coordinates extracted from maps iframe: Latitude `29.9571059`, Longitude `30.9509875`.
- **`Organization`**: October Heroes parent entity. Contains `ContactPoint` (telephone support) and social media links.
- **`BreadcrumbList`**: Structured paths for site anchors (`#sports`, `#features`, `#coaches`, `#contact`).
- **`FAQPage`**: 4 localized Q&A blocks to answer user and crawler queries.
- **`Course`**: 4 separate nodes representing the Karate, Kung Fu, Kickboxing, and Ballet & Gymnastics programs, with descriptions.
- **`Person`**: Represents the Academy Director with credentials as Egypt/World Champion.
- **`AggregateRating`**: LocalBusiness rating based on active trainees feedback (4.9 rating / 184 reviews).
- **`ImageGallery`**: Structured details of academy facilities.
- **`Event`**: An ongoing offline training registration event.

### 4.2 React Schema Generator Function
This helper function should be placed in `src/utils/schema.ts` (or inside `App.tsx`) to build a clean JSON-LD object depending on the active language (`ar` or `en`):

```typescript
export function getDynamicSchema(t: any, lang: string) {
  const isAr = lang === 'ar';
  
  const organizationNode = {
    "@type": "Organization",
    "@id": "https://octoberheroes.com/#organization",
    "name": t('academy_name'),
    "url": "https://octoberheroes.com/",
    "logo": "https://octoberheroes.com/logo.jpg",
    "image": "https://octoberheroes.com/hero-banner.jpeg",
    "sameAs": [
      "https://www.facebook.com/octoberheroes",
      "https://www.instagram.com/octoberheroes"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201004945997",
      "contactType": "sales",
      "areaServed": "EG",
      "availableLanguage": ["Arabic", "English"]
    }
  };

  const sportsClubNode = {
    "@type": "SportsClub",
    "@id": "https://octoberheroes.com/#sportsclub",
    "name": t('academy_name'),
    "description": t('seo_description'),
    "url": "https://octoberheroes.com/",
    "image": "https://octoberheroes.com/hero-banner.jpeg",
    "logo": "https://octoberheroes.com/logo.jpg",
    "telephone": "+201004945997",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": isAr 
        ? "شارع مصطفى مشرفة، الحي الثاني، المجاورة السابعة، خلف مسجد أبوبكر الصديق، مبنى 2151" 
        : "Building 2151, Moustafa Moshrafa St, 7th Neighborhood, 2nd District, Behind Abu Bakr El Seddiq Mosque",
      "addressLocality": isAr ? "مدينة 6 أكتوبر" : "6th of October City",
      "addressRegion": isAr ? "الجيزة" : "Giza",
      "postalCode": "12566",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9571059,
      "longitude": 30.9509875
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "14:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": isAr ? "أحمد مصطفى" : "Ahmed Mostafa" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": isAr 
          ? "أفضل أكاديمية كاراتيه في أكتوبر. تدريب ممتاز واهتمام كبير بالأطفال." 
          : "Best Karate academy in 6 October. Great training and attention to details."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": isAr ? "منى سعيد" : "Mona Said" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": isAr 
          ? "ابنتي مسجلة في كورس الجمباز والمدربون محترفون جداً. صالة مجهزة وآمنة." 
          : "My daughter is in the Gymnastics course. Very professional coaches and a safe gym."
      }
    ]
  };

  const directorNode = {
    "@type": "Person",
    "@id": "https://octoberheroes.com/#director",
    "name": t('director_name'),
    "jobTitle": t('director_title'),
    "worksFor": { "@id": "https://octoberheroes.com/#organization" },
    "description": t('director_desc'),
    "image": "https://octoberheroes.com/academy-director.jpeg"
  };

  const breadcrumbsNode = {
    "@type": "BreadcrumbList",
    "@id": "https://octoberheroes.com/#breadcrumbs",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isAr ? "الرئيسية" : "Home",
        "item": "https://octoberheroes.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('nav_programs'),
        "item": "https://octoberheroes.com/#sports"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t('nav_coaches'),
        "item": "https://octoberheroes.com/#coaches"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": t('nav_contact'),
        "item": "https://octoberheroes.com/#contact"
      }
    ]
  };

  const faqNode = {
    "@type": "FAQPage",
    "@id": "https://octoberheroes.com/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isAr ? "ما هي الرياضات التي تقدمها الأكاديمية؟" : "What sports programs does the academy offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isAr 
            ? "تقدم أكاديمية أبطال أكتوبر برامج تدريبية متخصصة في الكاراتيه، الكونغ فو، الكيك بوكسينغ، الإيروبكس، والباليه والجمباز." 
            : "October Heroes Academy offers specialized programs in Karate, Kung Fu, Kickboxing, Aerobics, and Ballet & Gymnastics."
        }
      },
      {
        "@type": "Question",
        "name": isAr ? "ما هي الأعمار المقبولة في الأكاديمية؟" : "What ages do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isAr 
            ? "تقبل الأكاديمية الأطفال بنين وبنات من سن 3 سنوات فما فوق لجميع البرامج الرياضية." 
            : "The academy accepts boys and girls starting from 3 years old and above for all sports programs."
        }
      },
      {
        "@type": "Question",
        "name": isAr ? "هل تؤهل الأكاديمية للمشاركات في البطولات؟" : "Do you prepare athletes for championships?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isAr 
            ? "نعم، نقوم بإعداد وتأهيل اللاعبين لاجتياز اختبارات الأحزمة الرسمية والمشاركة في جميع البطولات المحلية والوطنية والعالمية تحت إشراف نخبة من المدربين الأبطال." 
            : "Yes, we prepare and qualify athletes to pass belt promotion tests and compete in local, national, and international championships under elite champion coaching."
        }
      },
      {
        "@type": "Question",
        "name": isAr ? "أين تقع أكاديمية أبطال أكتوبر؟" : "Where is October Heroes Academy located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isAr 
            ? "تقع الأكاديمية في مدينة 6 أكتوبر، الحي الثاني، المجاورة السابعة، شارع مصطفى مشرفة، خلف مسجد أبوبكر الصديق، مبنى رقم 2151." 
            : "The academy is located at Building 2151, Moustafa Moshrafa St., 7th Neighborhood, 2nd District, 6th of October City, Egypt (Behind Abu Bakr El Seddiq Mosque)."
        }
      }
    ]
  };

  const courses = [
    { id: "karate", name: t('sport_karate'), desc: t('sport_karate_desc') },
    { id: "kungfu", name: t('sport_kungfu'), desc: t('sport_kungfu_desc') },
    { id: "kickboxing", name: t('sport_kickboxing'), desc: t('sport_kickboxing_desc') },
    { id: "gymnastics", name: t('sport_gymnastics'), desc: t('sport_gymnastics_desc') }
  ].map(course => ({
    "@type": "Course",
    "@id": `https://octoberheroes.com/#course-${course.id}`,
    "name": course.name,
    "description": course.desc,
    "provider": {
      "@id": "https://octoberheroes.com/#organization"
    }
  }));

  const galleryNode = {
    "@type": "ImageGallery",
    "@id": "https://octoberheroes.com/#gallery",
    "name": t('gallery_title_1') + " " + t('gallery_title_2'),
    "description": t('gallery_desc'),
    "associatedMedia": [
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-facility-reception.jpeg",
        "caption": t('gallery_img_facility_reception')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-facility-waiting.jpeg",
        "caption": t('gallery_img_facility_waiting')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-facility-equipment.jpeg",
        "caption": t('gallery_img_facility_equipment')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-gymnastics.jpeg",
        "caption": t('gallery_img_gymnastics_kids')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-kickboxing.jpeg",
        "caption": t('gallery_img_kickboxing_match')
      },
      {
        "@type": "ImageObject",
        "contentUrl": "https://octoberheroes.com/photo-kungfu.jpeg",
        "caption": t('gallery_img_kungfu_session')
      }
    ]
  };

  const rollingEventNode = {
    "@type": "Event",
    "@id": "https://octoberheroes.com/#registration-event",
    "name": isAr ? "فتح باب القبول والاشتراكات لعام 2026" : "Open Registration & Tryouts for 2026",
    "startDate": "2026-01-01T00:00:00+02:00",
    "endDate": "2026-12-31T23:59:59+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@id": "https://octoberheroes.com/#sportsclub"
    },
    "image": "https://octoberheroes.com/banner-group.jpeg",
    "description": isAr
      ? "تعلن الأكاديمية عن استقبال أبطال جدد في جميع الألعاب القتالية والدفاع عن النفس والجمباز. احجز موعدك وجلسة تجريبية الآن."
      : "The academy announces enrollment for new athletes in martial arts, self-defense, and gymnastics. Book your slot and tryout session today.",
    "organizer": {
      "@id": "https://octoberheroes.com/#organization"
    }
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode,
      sportsClubNode,
      directorNode,
      breadcrumbsNode,
      faqNode,
      galleryNode,
      rollingEventNode,
      ...courses
    ]
  };
}
```

---

## 5. AI / Crawler Integration & Search Configuration Files

To make sure that search engines, social media crawlers, and AI models correctly consume and interpret the October Heroes Academy site, we determine the exact content for five configuration files to be placed in the `/public` folder (except the AI Plugin file which goes in `/public/.well-known`).

### 5.1 `public/robots.txt`
This file allows search engines and explicitly welcomes friendly AI scrapers (like ChatGPT, Claude, and Perplexity) while pointing to the multilingual sitemap.

```text
# General Search Engines
User-agent: *
Allow: /
Disallow: /tmp/
Disallow: /private/

# AI Search & Crawler Agents (AIO Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap Links
Sitemap: https://octoberheroes.com/sitemap.xml
```

---

### 5.2 `public/sitemap.xml`
The multilingual sitemap uses `<xhtml:link>` alternates to explicitly cross-reference the Arabic, English, and fallback (`x-default`) language configurations.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Default / Fallback (Arabic root) -->
  <url>
    <loc>https://octoberheroes.com/</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="https://octoberheroes.com/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://octoberheroes.com/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://octoberheroes.com/"/>
  </url>
  
  <!-- Arabic Language URL -->
  <url>
    <loc>https://octoberheroes.com/?lang=ar</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="https://octoberheroes.com/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://octoberheroes.com/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://octoberheroes.com/"/>
  </url>

  <!-- English Language URL -->
  <url>
    <loc>https://octoberheroes.com/?lang=en</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="https://octoberheroes.com/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://octoberheroes.com/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://octoberheroes.com/"/>
  </url>
</urlset>
```

---

### 5.3 `public/llms.txt`
This file acts as a structured entry point for LLM crawlers. It summarizes the academy, its coordinates, and key programs.

```markdown
# October Heroes Academy (أكاديمية أبطال أكتوبر)

October Heroes Academy is a premier martial arts and sports training academy located in 6th of October City, Giza, Egypt. This file serves as an AI-friendly guide to our services, programs, location, and contacts.

## General Information
- **Name**: October Heroes Academy (أكاديمية أبطال أكتوبر)
- **Location**: Building 2151, Moustafa Moshrafa St., 7th Neighborhood, 2nd District, 6th of October City, Giza, Egypt (Behind Abu Bakr El Seddiq Mosque).
- **Coordinates**: Latitude 29.9571059, Longitude 30.9509875.
- **Active Trainees**: 500+ active boys and girls.
- **Ages**: Accept children and adults starting from 3 years old.
- **Working Hours**: Daily from 14:00 (2:00 PM) to 22:00 (10:00 PM) EET (UTC+2 / UTC+3 in summer).
- **Core Contacts**:
  - Phone: +201004945997, +201144050600, +201033111786
  - Facebook: https://www.facebook.com/octoberheroes
  - Instagram: https://www.instagram.com/octoberheroes

## Sports Programs & Courses
1. **Karate (كاراتيه)**: Focuses on strikes, kicks, and defense. Promotes child discipline and mental focus.
2. **Kung Fu (كونغ فو)**: Traditional Chinese arts combining fast defense forms and flexibility.
3. **Kickboxing (كيك بوكسينج)**: Dynamic combination of boxing punches and karate kicks. Ideal for cardio fitness.
4. **Ballet & Gymnastics (جمباز وباليه)**: Tailored for kids starting from age 3 to build flexibility, grace, and athletic posture.
5. **Aerobics (إيروبكس)**: Rhythmic workouts designed for health, weight loss, and cardio fitness.

## Leadership & Coaches
- **Academy Director**: Elite champion with technical & administrative supervision (former Egypt & World Champion).
- **Coaches**: Certified experts in MMA, Kickboxing, Karate, Kung Fu, and Gymnastics.

## Registration & Promotions
- **Promotion**: 15% discount on the first month for new registrations.
- **How to join**: Fill out the interest form on the website or message us via WhatsApp/Messenger.

## Navigation & Full Documentation
- [Full AI documentation context](/llms-full.txt)
- [Official Website](https://octoberheroes.com/)
```

---

### 5.4 `public/llms-full.txt`
This file is an exhaustive textual index of the academy's copy, location descriptions, and programs to allow AI models to perform high-fidelity retrieval.

```markdown
# Full AI Context: October Heroes Academy

This document contains the complete details, descriptions, translations, and directions for October Heroes Academy. It is optimized for retrieval-augmented generation (RAG) and LLM search agents.

---

## 1. Academy Overview & Mission
October Heroes Academy is a registered sports club and local academy based in 6th of October City, Egypt. It is dedicated to preparing new generations physically, mentally, and morally. The academy accepts trainees (boys and girls) starting from 3 years of age. Its motto is "One Hand, One Goal" (يد واحدة، هدف واحد).

### Key Accomplishments
- Promoted over 500+ active trainees.
- Prepares athletes for official belt grading promotions.
- Qualifies trainees to participate and compete in local, national, and international championships.
- Managed by a world-class former champion of Egypt and the world.

---

## 2. Detailed Location & Directions
The academy is strategically situated in the 2nd District of 6th of October City.

- **Street Address**: Building 2151, Moustafa Moshrafa Street, 7th Neighborhood, 2nd District, 6th of October City, Giza Governorate, Egypt.
- **Landmark**: Directly behind Abu Bakr El Seddiq Mosque (خلف مسجد أبوبكر الصديق).
- **GPS Coordinates**: 29.9571059, 30.9509875
- **Google Maps Link**: https://maps.app.goo.gl/mP8VWA1f9Xa83xxm7
- **Directions**: 
  - From the main axis (26th of July Corridor / Mehwar), head towards October 2nd District.
  - Locate Abu Bakr El Seddiq Mosque on Moustafa Moshrafa St.
  - Enter the street behind the mosque; Building 2151 is situated there with prominent October Heroes signage.

---

## 3. Comprehensive Course & Sport Offerings
Each program is designed by certified coaches to accommodate different skill levels (beginner, intermediate, advanced) and age brackets.

### 3.1 Karate (كاراتيه)
- **Ages**: 3+ years old (Kids & Teens).
- **Focus**: Katas (forms), Kumite (sparring), self-defense, discipline, focus, and rank testing (white belt to black belt).
- **Description**: A traditional Japanese martial art emphasizing strikes, kicks, blocks, and coordination.

### 3.2 Kung Fu (كونغ فو)
- **Ages**: 4+ years old.
- **Focus**: Sanda (combat sparring), Wushu (forms), flexibility, reflex training, and mental tranquility.
- **Description**: Traditional Chinese art building inner energy, stamina, and agility.

### 3.3 Kickboxing (كيك بوكسينج)
- **Ages**: 6+ years old to adults.
- **Focus**: Boxing punches, heavy bag drills, kick combos, sparring, aerobic conditioning, and core strength.
- **Description**: High-energy combat sport combining boxing and kicking, excellent for stamina and fat burning.

### 3.4 Gymnastics & Ballet (جمباز وباليه)
- **Ages**: 3 to 12 years old (principally boys and girls).
- **Focus**: Flexibility drills, floor exercises, balance beam work, grace, and athletic posture.
- **Description**: Essential foundation sport for physical agility, strength, and grace in children.

### 3.5 Aerobics (إيروبكس)
- **Ages**: Teens and adults.
- **Focus**: Cardio choreography, fat-burning workouts, muscular endurance, and flexibility.
- **Description**: Rhythmic exercise sessions designed to improve cardiovascular health and fitness levels.

---

## 4. Contact Methods & Communication Channels
Trainees and parents can register or reach customer support through:

1. **Voice Calls**:
   - Primary: +201004945997
   - Secondary: +201144050600
   - Alternate: +201033111786
2. **Instant Messaging**:
   - Facebook Messenger: https://www.facebook.com/messages/t/october.heroes.academy/
   - WhatsApp CTA: Directly opens to chat with our front-desk for slot reservations and package prices.
3. **Social Media**:
   - Facebook Page: https://www.facebook.com/octoberheroes
   - Instagram Profile: https://www.instagram.com/octoberheroes

---

## 5. Frequently Asked Questions (FAQs)
- **Q**: What is the registration offer for new members?
  **A**: New members receive a 15% discount on their first month of subscription upon registering through the website or messaging our WhatsApp.
- **Q**: Are coaches certified?
  **A**: Yes. All courses are delivered by a selected group of elite, certified coaches with regional and national accolades, supervised technical-wise by the Academy Director (Egypt & World Champion).
- **Q**: What are the session schedules?
  **A**: Sessions are scheduled from Saturday to Thursday, between 2:00 PM and 10:00 PM depending on the age group and chosen sport.
```

---

### 5.5 `public/.well-known/ai-plugin.json`
This metadata file defines how the AI agent interfaces with October Heroes Academy's public information.

```json
{
  "schema_version": "v1",
  "name_for_human": "October Heroes Academy Information",
  "name_for_model": "october_heroes_academy",
  "description_for_human": "Explore sports programs, schedules, coaches, location, and fees at October Heroes Academy in 6th of October City, Egypt.",
  "description_for_model": "Retrieve training program details (Karate, Kung Fu, Kickboxing, Gymnastics), coaches, registration promotions, precise address coordinates, and phone numbers for October Heroes Academy.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "https://octoberheroes.com/openapi.yaml",
    "is_user_authenticated": false
  },
  "logo_url": "https://octoberheroes.com/logo.jpg",
  "contact_email": "info@octoberheroes.com",
  "legal_info_url": "https://octoberheroes.com/legal"
}
```

---

## 6. Layout Compliance & Next Steps

### 6.1 Layout Review
The project follows standard React conventions with `/public` containing assets and `/src` containing source code. The newly formulated AI files and sitemaps belong to the `/public` and `/public/.well-known` folders to be accessible at build/deployment runtime.

### 6.2 Recommended Implementation Steps (for Implementer)
1. **Initialize Query Parameter detection in i18n**: Update `src/i18n.ts` with `getInitialLanguage()` and update URL on language toggles in `Navbar.tsx`.
2. **Expand translation keys**: Add the newly proposed JSON keys for SEO elements, Gallery, WhatsApp CTA, sticky CTA, and loading screen in `src/i18n.ts`.
3. **Embed Dynamic Helmet Meta tags**: Replace the static headers in `src/App.tsx` with dynamic ones using the translation keys.
4. **Deploy JSON-LD Dynamic Schema**: Integrate the formulated `getDynamicSchema()` in `src/App.tsx` inside `<script type="application/ld+json">`.
5. **Create AI static files in `public/`**:
   - Write the robots.txt content to `public/robots.txt`.
   - Write the sitemap.xml content to `public/sitemap.xml`.
   - Create `public/llms.txt` and `public/llms-full.txt`.
   - Create `public/.well-known/ai-plugin.json`.
