import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { FaFileInvoice, FaShieldAlt, FaHandshake, FaEdit, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.jsx';

const Services = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/api/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getServiceIcon = (title) => {
    const term = title.toLowerCase();
    if (term.includes('notice') || term.includes('draft')) return <FaEdit className="text-gold text-2xl" />;
    if (term.includes('court') || term.includes('represent')) return <FaShieldAlt className="text-gold text-2xl" />;
    if (term.includes('consult')) return <FaFileInvoice className="text-gold text-2xl" />;
    return <FaHandshake className="text-gold text-2xl" />;
  };

  return (
    <>
      <SEO
        title="Services - Advocate Mubashir Alam"
        description="Comprehensive list of legal services provided by Advocate Mubashir Alam, including court representations, drafting notices, contract reviews, mediation, and arbitration."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {language === 'ur' ? 'قانونی خدمات' : 'Legal Services'}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'پیشہ ورانہ قانونی خدمات اور چارہ جوئی' : 'Professional Legal consultation, drafting, and representation'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white dark:bg-navy p-8 rounded-xl shadow-md border border-black/5 flex flex-col justify-between group hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
                        {getServiceIcon(service.title)}
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-gold transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <a
                    href="/appointments"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-gold group-hover:text-gold-light transition-all"
                  >
                    {language === 'ur' ? 'مشاورت بک کریں' : 'Book Consultation'} <FaChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Services;
