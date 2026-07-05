import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  const { t, language } = useLanguage();
  const [settings, setSettings] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState({ success: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Contact page settings fetch error:', err);
      }
    };
    fetchSettings();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setStatus({ success: null, message: '' });
      const res = await api.post('/api/contact', data);
      if (res.data.success) {
        setStatus({ success: true, message: t('formSuccess') });
        reset();
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: err.response?.data?.message || 'Failed to send message.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Office - Advocate Mubashir Alam"
        description="Get in touch with Advocate Mubashir Alam for direct court representations, consultations, legal drafting, or legal questions."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {t('navContact')}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'قانونی چارہ جوئی اور سوالات کے لیے رابطہ فارم' : 'Submit direct inquiries or find office coordinates'}
          </p>
        </div>
      </section>

      {/* Contact Grid details */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-gold tracking-widest uppercase">
                  {language === 'ur' ? 'رابطہ کی تفصیلات' : 'Contact Office'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mt-1 mb-4">
                  {language === 'ur' ? 'ہمارے چیمبرز تشریف لائیں' : 'Chambers Address & Details'}
                </h2>
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                  Have questions, concerns, or need immediate legal notice representations? Submit your details to receive prompt feedback.
                </p>
              </div>

              {/* Detail Blocks */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy dark:text-white text-sm">Chamber Address</h4>
                    <p className="text-slate-600 dark:text-gray-300 text-xs mt-1 leading-relaxed">
                      {settings?.officeAddress || 'Chamber 12, District Courts Complex, Karachi, Pakistan'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy dark:text-white text-sm">Phone Hotline</h4>
                    <p className="text-slate-600 dark:text-gray-300 text-xs mt-1">
                      {settings?.officePhone || '+92 300 1234567'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy dark:text-white text-sm">Email Mailbox</h4>
                    <p className="text-slate-600 dark:text-gray-300 text-xs mt-1">
                      {settings?.officeEmail || 'mubashir.alam@legal.com'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy dark:text-white text-sm">WhatsApp Live</h4>
                    <p className="text-slate-600 dark:text-gray-300 text-xs mt-1">
                      +{settings?.whatsappNumber || '923001234567'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-gold/20 pt-6">
                <h4 className="font-serif text-sm font-bold text-navy dark:text-white mb-3">Connect on Social Channels</h4>
                <div className="flex gap-4 text-slate-500">
                  <a href={settings?.socialLinks?.linkedin || 'https://linkedin.com'} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors"><FaLinkedin size={22} /></a>
                  <a href={settings?.socialLinks?.twitter || 'https://twitter.com'} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors"><FaTwitter size={22} /></a>
                  <a href={settings?.socialLinks?.facebook || 'https://facebook.com'} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors"><FaFacebook size={22} /></a>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Column */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-navy-light/20 p-8 sm:p-10 rounded-xl border border-black/5">
              <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-6">
                {language === 'ur' ? 'پیغام بھیجیں' : 'Send Message'}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formName')} *</label>
                    <input
                      type="text"
                      {...register('name', { required: true })}
                      className="px-4 py-2.5 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/15 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-1">Name is required</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formEmail')} *</label>
                    <input
                      type="email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      className="px-4 py-2.5 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/15 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 mt-1">Valid email is required</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formPhone')}</label>
                    <input
                      type="text"
                      {...register('phone')}
                      className="px-4 py-2.5 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/15 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formSubject')} *</label>
                    <input
                      type="text"
                      {...register('subject', { required: true })}
                      className="px-4 py-2.5 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/15 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
                    />
                    {errors.subject && <span className="text-[10px] text-red-500 mt-1">Subject is required</span>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formMessage')} *</label>
                  <textarea
                    rows="5"
                    {...register('message', { required: true })}
                    className="w-full px-4 py-2.5 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/15 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
                  ></textarea>
                  {errors.message && <span className="text-[10px] text-red-500 mt-1">Message detail is required</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold-grad w-full py-3 rounded font-bold shadow-gold-glow flex items-center justify-center text-sm disabled:opacity-50"
                >
                  {submitting ? t('formSending') : t('formSubmit')}
                </button>

                {status.success !== null && (
                  <p className={`text-xs font-bold text-center mt-3 ${status.success ? 'text-green-500' : 'text-red-500'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>

          </div>

          {/* Map placeholder */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-black/5 dark:border-gold/15 shadow-md h-96 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115814.73752538138!2d67.01358055610817!3d24.890693529367123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06a72e8ebd%3A0x6d9f6ec3cbbbc6b3!2sKarachi%20High%20Court!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
