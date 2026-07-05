import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FaFolderOpen, FaArrowRight } from 'react-icons/fa';

const CaseStudies = () => {
  const { language } = useLanguage();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await api.get('/api/cases');
        if (res.data.success) {
          setCases(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching case studies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  return (
    <>
      <SEO
        title="Case Studies - Advocate Mubashir Alam"
        description="Review legal case studies and successfully resolved disputes in Civil, Corporate and Criminal Litigation handled by Advocate Mubashir Alam."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {language === 'ur' ? 'اہم مقدمات' : 'Case Studies'}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'شواہد پر مبنی کامیاب عدالتی ریکارڈ' : 'Showcasing legal challenges, strategy formulations, and results'}
          </p>
        </div>
      </section>

      {/* Cases Listing */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {cases.map((item, index) => (
                <div
                  key={item._id}
                  data-aos="fade-up"
                  className={`bg-gray-50 dark:bg-navy-light/10 rounded-2xl overflow-hidden shadow-md border border-black/5 flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image banner */}
                  <div className="w-full lg:w-1/3 min-h-[300px] relative">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:hidden"></div>
                    <span className="absolute top-4 left-4 bg-gold text-navy font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {item.clientType}
                    </span>
                  </div>

                  {/* Detail Panel */}
                  <div className="w-full lg:w-2/3 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-navy dark:text-white mb-6">
                        {item.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Challenge */}
                        <div className="border-l-2 border-red-500/40 pl-4">
                          <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">
                            {language === 'ur' ? 'مسئلہ / چیلنج' : 'Challenge'}
                          </h4>
                          <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* Strategy */}
                        <div className="border-l-2 border-gold/40 pl-4">
                          <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
                            {language === 'ur' ? 'حکمت عملی' : 'Strategy'}
                          </h4>
                          <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                            {item.strategy}
                          </p>
                        </div>

                        {/* Outcome */}
                        <div className="border-l-2 border-green-500/40 pl-4">
                          <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">
                            {language === 'ur' ? 'نتیجہ / ڈگری' : 'Result'}
                          </h4>
                          <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed font-semibold">
                            {item.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gold/10 pt-4 mt-6">
                      <span className="text-xs text-slate-400">
                        Resolved successfully
                      </span>
                      <a
                        href="/appointments"
                        className="btn-gold-grad px-5 py-2 rounded text-xs"
                      >
                        Inquire Similar Dispute
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default CaseStudies;
