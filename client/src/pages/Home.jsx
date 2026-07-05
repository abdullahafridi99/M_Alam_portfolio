import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { 
  FaBalanceScale, FaGavel, FaBriefcase, FaUsers, FaArrowRight, 
  FaUserShield, FaAward, FaCalendarCheck, FaFolderOpen, FaArrowAltCircleUp 
} from 'react-icons/fa';

// Testimonials import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const { t, language } = { ...useLanguage() };
  const [settings, setSettings] = useState(null);
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [services, setServices] = useState([]);
  const [cases, setCases] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, practiceRes, servicesRes, casesRes, testimonialsRes, blogsRes, faqsRes] = await Promise.all([
          api.get('/api/settings').catch(() => ({ data: { success: false } })),
          api.get('/api/practiceareas').catch(() => ({ data: { success: false } })),
          api.get('/api/services').catch(() => ({ data: { success: false } })),
          api.get('/api/cases').catch(() => ({ data: { success: false } })),
          api.get('/api/testimonials').catch(() => ({ data: { success: false } })),
          api.get('/api/blogs?limit=3').catch(() => ({ data: { success: false } })),
          api.get('/api/faqs').catch(() => ({ data: { success: false } })),
        ]);

        if (settingsRes.data.success) setSettings(settingsRes.data.data);
        if (practiceRes.data.success) setPracticeAreas(practiceRes.data.data);
        if (servicesRes.data.success) setServices(servicesRes.data.data);
        if (casesRes.data.success) setCases(casesRes.data.data);
        if (testimonialsRes.data.success) setTestimonials(testimonialsRes.data.data);
        if (blogsRes.data.success) setBlogs(blogsRes.data.blogs);
        if (faqsRes.data.success) setFaqs(faqsRes.data.data.slice(0, 5)); // show first 5 FAQs on homepage
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };
    fetchData();
  }, []);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'FaBalanceScale': return <FaBalanceScale />;
      case 'FaGavel': return <FaGavel />;
      case 'FaBriefcase': return <FaBriefcase />;
      case 'FaUsers': return <FaUsers />;
      default: return <FaGavel />;
    }
  };

  return (
    <>
      <SEO 
        title={settings?.defaultSeoTitle}
        description={settings?.defaultSeoDescription}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-dark text-white pt-10">
        {/* Animated Background Gradients & Scale */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light via-navy-dark to-navy-dark opacity-80 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-light/40 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center relative py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Scale Icon */}
            <div className="flex justify-center mb-6 text-gold text-5xl md:text-6xl animate-float">
              <FaBalanceScale />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wider text-white mb-4">
              {settings?.heroHeadline || t('heroTitle')}
            </h1>

            <p className="text-gold font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-wide mb-8 max-w-3xl mx-auto">
              {settings?.heroSubtitle || t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/appointments" className="btn-gold-grad px-8 py-4 rounded text-base shadow-gold-glow w-full sm:w-auto text-center font-bold">
                {t('heroCtaBook')}
              </Link>
              <Link to="/services" className="px-8 py-4 rounded text-base border border-gold text-gold hover:bg-gold/10 transition-all w-full sm:w-auto text-center font-bold">
                {t('heroCtaServices')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom diagonal separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[50px] fill-current text-gray-50 dark:text-navy-dark" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120 1200 0z"></path>
          </svg>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Info Column */}
            <div data-aos="fade-right">
              <span className="text-xs font-bold tracking-widest text-gold uppercase border-b-2 border-gold pb-1">
                {language === 'ur' ? 'وکالت نامہ' : 'MEET THE ADVOCATE'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mt-4 mb-6">
                {t('secAboutTitle')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('secAboutText')}
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
                {language === 'ur' 
                  ? 'ہمارا مقصد ہر موکل کو سستا اور فوری انصاف فراہم کرنا ہے۔ ہم قانونی چارہ جوئی کے دوران شفافیت، سچائی اور محنت کے اصولوں پر کاربند رہتے ہیں اور ہمیشہ موکل کی کامیابی کے لیے کوشاں رہتے ہیں۔' 
                  : 'We focus on shielding clients through meticulous strategy, comprehensive file prep, and direct advocate representation. We believe in providing access to premier, solution-oriented representation in all legal environments.'}
              </p>

              {/* Achievements short list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <FaUserShield className="text-gold text-xl" />
                  <span className="text-sm font-semibold text-navy dark:text-white">Confidential & Secure</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaAward className="text-gold text-xl" />
                  <span className="text-sm font-semibold text-navy dark:text-white">12+ Years High Court Practice</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarCheck className="text-gold text-xl" />
                  <span className="text-sm font-semibold text-navy dark:text-white">Direct Client Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaFolderOpen className="text-gold text-xl" />
                  <span className="text-sm font-semibold text-navy dark:text-white">500+ Cases Settled</span>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center gap-2 text-gold font-bold hover:text-gold-light transition-all">
                {language === 'ur' ? 'سوانح عمری دیکھیں' : 'Read Full Biography'} <FaArrowRight size={14} />
              </Link>
            </div>

            {/* Right Graphics/Image Column */}
            <div className="relative flex justify-center" data-aos="fade-left">
              {/* Luxury Frame decoration */}
              <div className="absolute inset-0 bg-gold rounded-2xl transform rotate-3 scale-95 opacity-20 -z-10"></div>
              <div className="absolute inset-0 border-2 border-gold rounded-2xl transform -rotate-3 scale-95 opacity-40 -z-10"></div>
              <img
                src={settings?.heroImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                alt="Advocate Mubashir Alam"
                className="rounded-2xl shadow-luxury max-h-[500px] w-full object-cover border border-gold/20"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase border-b-2 border-gold pb-1">
              {language === 'ur' ? 'قانونی دائرہ کار' : 'FIELDS OF SERVICE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mt-4 mb-4">
              {t('secPracticeTitle')}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('secPracticeSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.length > 0 ? (
              practiceAreas.map((area, index) => (
                <div
                  key={area._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="glass-card hover:shadow-luxury rounded-xl p-6 transition-all duration-300 border border-black/5 flex flex-col justify-between group hover:-translate-y-2"
                >
                  <div>
                    {/* Icon mapping */}
                    <div className="w-12 h-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center text-2xl mb-6 group-hover:bg-gold group-hover:text-navy transition-all">
                      {getIconComponent(area.icon)}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-3">
                      {area.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {area.description}
                    </p>
                  </div>
                  <Link
                    to="/practice-areas"
                    className="flex items-center gap-2 text-sm font-bold text-gold group-hover:text-gold-light transition-all"
                  >
                    {language === 'ur' ? 'تفصیلات دیکھیں' : 'Learn More'} <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 dark:text-gray-400">
                No practice areas available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case Studies Snippet */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase border-b-2 border-gold pb-1">
              {language === 'ur' ? 'کامیاب نظیریں' : 'LEGAL RECORD'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mt-4 mb-4">
              {t('secCaseTitle')}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('secCaseSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.length > 0 ? (
              cases.slice(0, 2).map((item, index) => (
                <div
                  key={item._id}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  className="bg-white dark:bg-navy rounded-xl shadow-md border border-black/5 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-luxury"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80'}
                    alt={item.title}
                    className="w-full md:w-48 object-cover min-h-[200px]"
                    loading="lazy"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <span className="px-2.5 py-1 bg-gold/10 text-gold text-xs font-semibold rounded uppercase">
                        {item.clientType}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-navy dark:text-white mt-3 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 text-xs line-clamp-3 mb-4 leading-relaxed">
                        <strong>Challenge:</strong> {item.challenge}
                      </p>
                    </div>
                    <Link
                      to="/case-studies"
                      className="text-xs font-bold text-gold inline-flex items-center gap-1.5 hover:text-gold-light"
                    >
                      {language === 'ur' ? 'تفصیلات' : 'View Outcome Details'} <FaArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 dark:text-gray-400">
                No featured case studies found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase border-b-2 border-gold pb-1">
              {language === 'ur' ? 'عوامی رائے' : 'TESTIMONIALS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mt-4 mb-4">
              {t('secTestimonialTitle')}
            </h2>
            <p className="text-slate-500 dark:text-gray-400">
              {t('secTestimonialSub')}
            </p>
          </div>

          {testimonials.length > 0 ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              className="pb-12"
            >
              {testimonials.map((test) => (
                <SwiperSlide key={test._id}>
                  <div className="text-center px-6">
                    <p className="text-lg md:text-xl font-serif italic text-slate-700 dark:text-gray-200 leading-relaxed mb-6">
                      "{test.review}"
                    </p>
                    {/* Star ratings */}
                    <div className="flex justify-center gap-1 text-gold text-lg mb-4">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <h4 className="font-bold text-navy dark:text-white text-base">
                      {test.clientName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                      {test.designation}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-slate-500 dark:text-gray-400">
              No testimonials available.
            </div>
          )}
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-gold uppercase border-b-2 border-gold pb-1">
              {language === 'ur' ? 'سوال و جواب' : 'GETTING ANSWERS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy dark:text-white mt-4 mb-4">
              {t('secFaqTitle')}
            </h2>
            <p className="text-slate-500 dark:text-gray-400">
              {t('secFaqSub')}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq._id}
                    className="bg-white dark:bg-navy rounded-lg shadow-sm border border-black/5 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left font-serif text-base md:text-lg font-bold text-navy dark:text-white focus:outline-none"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-gold font-bold text-lg">{isOpen ? '−' : '+'}</span>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out px-6 ${
                        isOpen ? 'max-h-96 py-4 border-t border-gray-100 dark:border-gold/10' : 'max-h-0 py-0 overflow-hidden'
                      }`}
                    >
                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-500 dark:text-gray-400">
                No FAQs available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call To Action - Appointment booking link */}
      <section className="relative py-20 bg-navy text-white text-center overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6 text-white">
            {language === 'ur' ? 'آج ہی اپنی قانونی مشاورت کا آغاز کریں' : 'Schedule a Private Consultation with Advocate Mubashir Alam'}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-base">
            {language === 'ur' 
              ? 'اپنے قانونی حقوق کے تحفظ کے لیے پہلا قدم اٹھائیں۔ ہماری ٹیم آپ کو بہترین ممکنہ مدد فراہم کرنے کے لیے تیار ہے۔' 
              : 'Our legal experts analyze challenges and deliver strategic blueprints tailored to your case parameters. Take the first step by setting up your scheduling slot.'}
          </p>
          <Link to="/appointments" className="btn-gold-grad px-8 py-4 rounded text-base shadow-gold-glow font-bold inline-block">
            {t('navBook')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
