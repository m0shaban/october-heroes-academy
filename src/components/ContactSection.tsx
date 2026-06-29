import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    formRef.current?.reset();
  };

  const phones = [
    { number: '01004945997', href: 'tel:01004945997' },
    { number: '01144050600', href: 'tel:01144050600', primary: true },
    { number: '01033111786', href: 'tel:01033111786' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-[#020617] relative border-t border-slate-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mx-auto w-fit mb-4"
          >
            <Phone className="w-4 h-4" />
            <span>{t('nav_contact')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('contact_title_1')}{' '}
            <span className="gradient-text-gold">{t('contact_title_2')}</span>
          </motion.h2>
          <div className="section-divider" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mx-auto mt-4"
          >
            {t('contact_desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Address + Phone */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Address card */}
            <div className="bg-slate-900/80 rounded-[1.5rem] border border-slate-800 hover:border-yellow-500/30 transition-all p-7 group">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('contact_address')}</h3>
                  <p className="text-slate-400 text-sm whitespace-pre-line leading-relaxed">
                    {t('contact_address_val')}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.7765288027163!2d30.9509875!3d29.9571059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145857d265265017%3A0x36ba4cf28fad8bc3!2z2KfZg9in2K_ZitmF2YrYqSDYo9it2LfYp9mEINij2YPYqtmI2KjYsSAtIE9jdG9iZXIgSGVyb2VzIEFjYWRlbXk!5e0!3m2!1sen!2seg!4v1782478074549!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Academy Location Map"
                />
              </div>

              <a
                href="https://maps.app.goo.gl/mP8VWA1f9Xa83xxm7"
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full block text-center py-3 rounded-xl bg-slate-800 hover:bg-yellow-500 hover:text-[#001538] text-slate-300 font-bold text-sm transition-all duration-300"
              >
                {t('open_in_maps')}
              </a>
            </div>

            {/* Phone card */}
            <div className="bg-slate-900/80 rounded-[1.5rem] border border-slate-800 hover:border-yellow-500/30 transition-all p-7 group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('contact_phones')}</h3>
              </div>

              <div className="space-y-3">
                {phones.map(({ number, href, primary }) => (
                  <a
                    key={number}
                    href={href}
                    className={`flex items-center justify-between px-5 py-3 rounded-xl font-mono text-base transition-all duration-300 ${
                      primary
                        ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-transparent'
                    }`}
                  >
                    <span dir="ltr">{number}</span>
                    {primary && <Phone className="w-4 h-4" />}
                  </a>
                ))}
              </div>

              <a
                href="https://www.facebook.com/messages/t/october.heroes.academy/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full block text-center py-3 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:text-white font-bold text-sm transition-all duration-300"
              >
                {t('contact_via_messenger')}
              </a>
            </div>
          </motion.div>

          {/* Right column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-slate-900/80 rounded-[1.5rem] border border-slate-800 hover:border-yellow-500/20 transition-all overflow-hidden h-full">
              {/* Background image */}
              <div className="absolute inset-0 bg-[url('/photo-facility-reception.jpeg')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/80 to-slate-900/90" />

              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  {t('contact_form_title')}
                </h3>
                <p className="text-slate-400 text-sm mb-8">{t('form_subtitle')}</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('form_success_title')}</h4>
                    <p className="text-slate-400 text-sm">{t('form_success_desc')}</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                    {/* Name field */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          focused === 'name' ? 'text-yellow-400' : 'text-slate-400'
                        }`}
                      >
                        {t('form_name')}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-slate-950/80 border rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                          focused === 'name'
                            ? 'border-yellow-500 shadow-[0_0_0_3px_rgba(234,179,8,0.1)]'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                        placeholder={t('form_name_placeholder')}
                      />
                    </div>

                    {/* Phone field */}
                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          focused === 'phone' ? 'text-yellow-400' : 'text-slate-400'
                        }`}
                      >
                        {t('form_phone')}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        pattern="01[0-9]{9}"
                        dir="ltr"
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-slate-950/80 border rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none transition-all duration-300 ${
                          focused === 'phone'
                            ? 'border-yellow-500 shadow-[0_0_0_3px_rgba(234,179,8,0.1)]'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                        placeholder="01xxxxxxxxx"
                      />
                    </div>

                    {/* Sport select */}
                    <div className="relative">
                      <label
                        htmlFor="sport"
                        className={`block text-sm font-medium mb-2 transition-colors ${
                          focused === 'sport' ? 'text-yellow-400' : 'text-slate-400'
                        }`}
                      >
                        {t('form_sport')}
                      </label>
                      <select
                        id="sport"
                        onFocus={() => setFocused('sport')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-slate-950/80 border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all duration-300 appearance-none ${
                          focused === 'sport'
                            ? 'border-yellow-500 shadow-[0_0_0_3px_rgba(234,179,8,0.1)]'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <option value="">{t('form_select_sport')}</option>
                        <option value="karate">{t('sport_karate')}</option>
                        <option value="kungfu">{t('sport_kungfu')}</option>
                        <option value="kickboxing">{t('sport_kickboxing')}</option>
                        <option value="aerobics">{t('sport_aerobics')}</option>
                        <option value="gymnastics">{t('sport_gymnastics')}</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <div className="mt-auto pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary py-4 text-base flex items-center justify-center gap-3"
                      >
                        <Send className="w-5 h-5" />
                        {t('form_submit')}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
