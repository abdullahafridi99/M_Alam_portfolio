import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const AppointmentPage = () => {
  const { t, language } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
  ];

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await api.get('/api/practiceareas');
        if (res.data.success) {
          setPracticeAreas(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching practice areas for booking dropdown:', err);
      }
    };
    fetchAreas();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setStatus({ success: null, message: '' });
      const res = await api.post('/api/appointments', data);
      if (res.data.success) {
        setStatus({ success: true, message: t('formSuccess') });
        reset();
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: err.response?.data?.message || 'Failed to request consultation slot.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Book Legal Consultation - Advocate Mubashir Alam"
        description="Schedule a private consultation appointment with Advocate Mubashir Alam by choosing your date, time slot, and legal practice area."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {t('navBook')}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'مشاورت کا وقت بک کریں' : 'Request a confidential consultation slot with Advocate Mubashir Alam'}
          </p>
        </div>
      </section>

      {/* Booking Form Layout */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white dark:bg-navy rounded-xl shadow-luxury border border-black/5 dark:border-gold/15 p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-gold tracking-widest uppercase">Consultation Scheduling</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy dark:text-white mt-1">
                {language === 'ur' ? 'تفصیلات درج کریں' : 'Submit Consultation Request'}
              </h2>
              <p className="text-slate-500 dark:text-gray-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                Fill in the details below. Our legal coordinator will review dates and email/phone you to verify schedules.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formName')} *</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-1">Name is required</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formEmail')} *</label>
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-1">Valid email is required</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formPhone')} *</label>
                  <input
                    type="text"
                    {...register('phone', { required: true })}
                    placeholder="e.g. +92 300 1234567"
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 mt-1">Phone number is required</span>}
                </div>

                {/* Practice Area selector */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formArea')} *</label>
                  <select
                    {...register('practiceArea', { required: true })}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  >
                    <option value="">-- Select Area --</option>
                    {practiceAreas.map((area) => (
                      <option key={area._id} value={area.title}>{area.title}</option>
                    ))}
                  </select>
                  {errors.practiceArea && <span className="text-[10px] text-red-500 mt-1">Practice area is required</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formDate')} *</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]} // block previous dates
                    {...register('date', { required: true })}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                  {errors.date && <span className="text-[10px] text-red-500 mt-1">Preferred date is required</span>}
                </div>

                {/* Preferred Time slot */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">{t('formTime')} *</label>
                  <select
                    {...register('time', { required: true })}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  >
                    <option value="">-- Select Time Slot --</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <span className="text-[10px] text-red-500 mt-1">Preferred time slot is required</span>}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Brief case description</label>
                <textarea
                  rows="4"
                  {...register('message')}
                  placeholder="Outline the dispute coordinates..."
                  className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-gold-grad w-full py-3.5 rounded font-bold shadow-gold-glow flex items-center justify-center text-sm disabled:opacity-50"
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
      </section>
    </>
  );
};

export default AppointmentPage;
