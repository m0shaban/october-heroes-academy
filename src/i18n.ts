import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      "academy_name": "أكاديمية أبطال أكتوبر",
      "nav_programs": "برامجنا",
      "nav_features": "المميزات",
      "nav_coaches": "المدربون",
      "nav_contact": "تواصل معنا",
      "nav_join": "انضم الآن",
      "nav_gallery": "معرض الصور",

      "hero_title_1": "أكاديمية",
      "hero_title_2": "أبطال أكتوبر",
      "hero_desc": "أكاديمية رياضية متخصصة في تقديم برامج تدريبية متكاملة في مختلف الرياضات القتالية. انضم إلينا لتطوير مهاراتك البدنية والذهنية في أجواء مليئة بالتحدي والتحفيز.",
      "hero_btn_explore": "استكشف برامجنا",
      "hero_btn_contact": "تواصل معنا",
      "hero_trainees": "+500 متدرب نشط",
      "stat_trainees": "متدرب نشط",
      "stat_sports": "رياضات",
      "stat_years": "سنوات خبرة",

      "features_title_1": "لماذا تختار",
      "features_title_2": "أكاديميتنا؟",
      "features_desc": "نقدم بيئة رياضية متكاملة تجمع بين الخبرة، الاحترافية، والاهتمام الشخصي بكل متدرب.",

      "sports_title_1": "برامجنا",
      "sports_title_2": "الرياضية",
      "sports_desc": "مجموعة متنوعة من الرياضات تناسب جميع الأعمار والمستويات",

      "coaches_title_1": "فريق",
      "coaches_title_2": "الأبطال",
      "coaches_desc": "نخبة من أفضل المدربين والخبراء في الألعاب القتالية",
      "director_title": "مدير الأكاديمية",
      "director_badge": "إشراف فني وإداري",
      "director_subtitle": "بطل مصر والعالم",
      "director_desc": "خبرة تمتد لعقود في صناعة الأبطال وإعداد الأجيال رياضياً وأخلاقياً. هدفنا ليس فقط تعليم الحركات القتالية، بل بناء شخصية قوية وواثقة قادرة على مواجهة تحديات الحياة بروح الأبطال.",
      "coaches_group_title": "يد واحدة، هدف واحد",

      "gallery_badge": "معرض الصور",
      "gallery_title_1": "لحظات",
      "gallery_title_2": "لا تُنسى",
      "gallery_all": "الكل",
      "gallery_facility": "المنشأة",
      "gallery_training": "التدريب",
      "gallery_team": "الفريق",
      "alt_facility_equipment": "معدات تدريب الأكاديمية",
      "alt_facility_reception": "استقبال أكاديمية أبطال أكتوبر",
      "alt_facility_waiting": "قاعة الانتظار في الأكاديمية",
      "alt_gymnastics": "تدريب الجمباز في الأكاديمية",
      "alt_kickboxing": "تدريب الكيك بوكسينج",
      "alt_kungfu": "تدريب الكونغ فو",
      "alt_group": "مجموعة مدربي أكاديمية أبطال أكتوبر",
      "alt_director": "مدير أكاديمية أبطال أكتوبر",
      "alt_coaches": "فريق المدربين",

      "contact_title_1": "تواصل",
      "contact_title_2": "معنا",
      "contact_desc": "نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار البرنامج المناسب لك.",
      "contact_address": "العنوان",
      "contact_address_val": "مدينة 6 أكتوبر - الحي الثاني\nالمجاورة السابعة\nشارع مصطفى مشرفة\nخلف مسجد أبوبكر الصديق\nمبنى رقم 2151",
      "contact_phones": "أرقام التواصل",
      "contact_form_title": "سجل اهتمامك",
      "contact_via_messenger": "تواصل عبر ماسنجر",
      "open_in_maps": "فتح في خرائط جوجل",
      "form_name": "الاسم بالكامل",
      "form_name_placeholder": "أدخل اسمك",
      "form_phone": "رقم الهاتف",
      "form_sport": "الرياضة المفضلة",
      "form_select_sport": "اختر الرياضة",
      "form_submit": "إرسال الطلب",
      "form_subtitle": "سنتواصل معك في أقرب وقت ممكن",
      "form_success_title": "تم الإرسال بنجاح!",
      "form_success_desc": "شكراً لاهتمامك، سنتواصل معك قريباً.",

      "footer_desc": "نبني أجيالاً قوية ومستعدة لمواجهة التحديات بروح الأبطال من خلال رياضات الدفاع عن النفس.",
      "footer_rights": "أكاديمية أبطال أكتوبر. جميع الحقوق محفوظة.",
      "footer_est": "أكاديمية أبطال أكتوبر // تأسست",
      "footer_location": "6 أكتوبر، مصر",

      "feature_tech_title": "تقنيات حديثة",
      "feature_tech_desc": "التدريب على أعلى مستوى من التقنيات الحديثة في عالم التدريب.",
      "feature_gym_title": "صالة مجهزة",
      "feature_gym_desc": "الصالة مجهزة للتدريب بأحدث نظم وأفضل كفاءة للمتدربين.",
      "feature_ages_title": "جميع المراحل",
      "feature_ages_desc": "تقبل الأكاديمية جميع المراحل من ٣ سنوات بنين وبنات.",
      "feature_champ_title": "تأهيل للبطولات",
      "feature_champ_desc": "تؤهل الأكاديمية اللاعب لاجتياز جميع اختبارات الأحزمة والبطولات المحلية والعالمية.",
      "feature_prep_title": "إعداد شامل",
      "feature_prep_desc": "لإعداد جيل من الشباب بدنياً وفكرياً في بيئة صحية ومحفزة.",
      "feature_elite_title": "مدربين نخبة",
      "feature_elite_desc": "يقوم بالتدريب نخبة من أفضل المدربين في كل رياضة.",

      "sport_karate": "كاراتيه",
      "sport_karate_desc": "فن قتالي ياباني يركز على الضربات والركلات والدفاع عن النفس، يعزز الانضباط والتركيز.",
      "sport_kungfu": "كونغ فو",
      "sport_kungfu_desc": "فنون قتالية صينية تقليدية تجمع بين الحركات السريعة والتأمل لتعزيز القوة الداخلية.",
      "sport_kickboxing": "كيك بوكسينج",
      "sport_kickboxing_desc": "رياضة قتالية ديناميكية تمزج بين ركلات الكاراتيه ولكمات الملاكمة، ممتازة للياقة البدنية.",
      "sport_aerobics": "إيروبكس",
      "sport_aerobics_desc": "تمارين رياضية إيقاعية تعزز صحة القلب والأوعية الدموية وتساعد في حرق الدهون.",
      "sport_gymnastics": "باليه وجمباز",
      "sport_gymnastics_desc": "مزيج من المرونة والقوة والتوازن والأناقة، لتأسيس جسم رياضي رشيق منذ الصغر.",
      "sport_mma": "MMA (قتال مختلط)",
      "sport_mma_desc": "مزيج متكامل من أقوى الفنون القتالية الأرضية والدفاعية والهجومية لبناء مقاتل شامل.",

      "coach_mma": "كابتن MMA",
      "coach_kickboxing": "كابتن كيك بوكسينج",
      "coach_karate": "كابتن كاراتيه",
      "coach_kungfu": "كابتن كونغ فو",
      "coach_gymnastics": "كابتن جمباز",

      "lang_en": "English",
      "lang_ar": "العربية",
      "alt_logo": "شعار أكاديمية أبطال أكتوبر",

      "wa_greeting": "مرحباً! 👋 أنا هنا للمساعدة. كيف يمكنني مساعدتك اليوم؟",
      "wa_online": "متصل الآن",
      "wa_open_chat": "فتح في واتساب",
      "cta_call": "اتصل الآن",
      "cta_whatsapp": "واتساب",
    }
  },
  en: {
    translation: {
      "academy_name": "October Heroes Academy",
      "nav_programs": "Programs",
      "nav_features": "Features",
      "nav_coaches": "Coaches",
      "nav_contact": "Contact Us",
      "nav_join": "Join Now",
      "nav_gallery": "Gallery",

      "hero_title_1": "October Heroes",
      "hero_title_2": "Academy",
      "hero_desc": "A specialized sports academy providing comprehensive training programs in various martial arts. Join us to develop your physical and mental skills in a challenging and motivating environment.",
      "hero_btn_explore": "Explore Programs",
      "hero_btn_contact": "Contact Us",
      "hero_trainees": "500+ Active Trainees",
      "stat_trainees": "Active Trainees",
      "stat_sports": "Sports",
      "stat_years": "Years Experience",

      "features_title_1": "Why Choose",
      "features_title_2": "Our Academy?",
      "features_desc": "We offer a complete sports environment combining experience, professionalism, and personal attention to every trainee.",

      "sports_title_1": "Our Sports",
      "sports_title_2": "Programs",
      "sports_desc": "A variety of sports suitable for all ages and skill levels",

      "coaches_title_1": "Team of",
      "coaches_title_2": "Champions",
      "coaches_desc": "An elite group of the best coaches and experts in martial arts",
      "director_title": "Academy Director",
      "director_badge": "Technical & Admin Supervision",
      "director_subtitle": "Egypt & World Champion",
      "director_desc": "Decades of experience in making champions and preparing generations physically and morally. Our goal is not just to teach martial arts, but to build strong, confident personalities capable of facing life's challenges with a champion's spirit.",
      "coaches_group_title": "One Hand, One Goal",

      "gallery_badge": "Photo Gallery",
      "gallery_title_1": "Unforgettable",
      "gallery_title_2": "Moments",
      "gallery_all": "All",
      "gallery_facility": "Facility",
      "gallery_training": "Training",
      "gallery_team": "Team",
      "alt_facility_equipment": "Academy Training Equipment",
      "alt_facility_reception": "October Heroes Academy Reception",
      "alt_facility_waiting": "Academy Waiting Area",
      "alt_gymnastics": "Gymnastics Training at the Academy",
      "alt_kickboxing": "Kickboxing Training",
      "alt_kungfu": "Kung Fu Training",
      "alt_group": "October Heroes Academy Coaches Group",
      "alt_director": "October Heroes Academy Director",
      "alt_coaches": "Coaching Team",

      "contact_title_1": "Contact",
      "contact_title_2": "Us",
      "contact_desc": "We are here to answer all your inquiries and help you choose the right program for you.",
      "contact_address": "Address",
      "contact_address_val": "6th of October City - 2nd District\n7th Neighborhood\nMoustafa Moshrafa St.\nBehind Abu Bakr El Seddiq Mosque\nBuilding 2151",
      "contact_phones": "Phone Numbers",
      "contact_form_title": "Register Your Interest",
      "contact_via_messenger": "Message via Messenger",
      "open_in_maps": "Open in Google Maps",
      "form_name": "Full Name",
      "form_name_placeholder": "Enter your name",
      "form_phone": "Phone Number",
      "form_sport": "Preferred Sport",
      "form_select_sport": "Select Sport",
      "form_submit": "Submit Request",
      "form_subtitle": "We'll get back to you as soon as possible",
      "form_success_title": "Sent Successfully!",
      "form_success_desc": "Thank you for your interest. We'll contact you soon.",

      "footer_desc": "Building strong generations ready to face challenges with the spirit of champions through martial arts.",
      "footer_rights": "October Heroes Academy. All rights reserved.",
      "footer_est": "OCTOBER HEROES ACADEMY // EST.",
      "footer_location": "6th of October, Egypt",

      "feature_tech_title": "Modern Techniques",
      "feature_tech_desc": "Training at the highest level with modern techniques in the coaching world.",
      "feature_gym_title": "Equipped Gym",
      "feature_gym_desc": "The gym is equipped for training with the latest systems and best efficiency.",
      "feature_ages_title": "All Ages",
      "feature_ages_desc": "The academy accepts all ages starting from 3 years old, boys and girls.",
      "feature_champ_title": "Championship Prep",
      "feature_champ_desc": "We prepare athletes to pass all belt tests and local/international championships.",
      "feature_prep_title": "Comprehensive Prep",
      "feature_prep_desc": "Preparing a generation of youth physically and mentally in a healthy environment.",
      "feature_elite_title": "Elite Coaches",
      "feature_elite_desc": "Training is provided by an elite group of the best coaches in each sport.",

      "sport_karate": "Karate",
      "sport_karate_desc": "A Japanese martial art focusing on strikes, kicks, and self-defense, enhancing discipline.",
      "sport_kungfu": "Kung Fu",
      "sport_kungfu_desc": "Traditional Chinese martial arts combining fast movements and meditation for inner strength.",
      "sport_kickboxing": "Kickboxing",
      "sport_kickboxing_desc": "A dynamic martial art mixing Karate kicks and Boxing punches, excellent for fitness.",
      "sport_aerobics": "Aerobics",
      "sport_aerobics_desc": "Rhythmic exercises that boost cardiovascular health and help burn fat.",
      "sport_gymnastics": "Ballet & Gymnastics",
      "sport_gymnastics_desc": "A mix of flexibility, strength, balance, and elegance to build a fit body from a young age.",
      "sport_mma": "Mixed Martial Arts (MMA)",
      "sport_mma_desc": "An ultimate combination of striking, grappling, and defense to build a complete fighter.",

      "coach_mma": "MMA Coach",
      "coach_kickboxing": "Kickboxing Coach",
      "coach_karate": "Karate Coach",
      "coach_kungfu": "Kung Fu Coach",
      "coach_gymnastics": "Gymnastics Coach",

      "lang_en": "English",
      "lang_ar": "العربية",
      "alt_logo": "October Heroes Academy Logo",

      "wa_greeting": "Hello! 👋 I'm here to help. How can I assist you today?",
      "wa_online": "Online now",
      "wa_open_chat": "Open in WhatsApp",
      "cta_call": "Call Now",
      "cta_whatsapp": "WhatsApp",
    }
  }
};

const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'ar' || langParam === 'en') return langParam;
    const localLang = localStorage.getItem('i18nextLng');
    if (localLang === 'ar' || localLang === 'en') return localLang;
  }
  return 'ar';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'ar',
    interpolation: { escapeValue: false }
  });

export default i18n;
