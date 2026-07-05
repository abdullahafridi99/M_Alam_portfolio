import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { FaBalanceScale, FaGavel, FaBriefcase, FaUsers, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.jsx';

const PracticeAreas = () => {
  const { language } = useLanguage();
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await api.get('/api/practiceareas');
        if (res.data.success) {
          setPracticeAreas(res.data.data);
          // Set first area selected by default if available
          if (res.data.data.length > 0) {
            setSelectedArea(res.data.data[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching practice areas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Practice Areas - Advocate Mubashir Alam"
        description="Explore the legal practice fields of Advocate Mubashir Alam, including Civil Law, Criminal Law, Corporate Law, and Family Law."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {language === 'ur' ? 'قانونی دائرہ کار' : 'Practice Areas'}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'ہمارے قانونی شعبے اور مہارتیں' : 'Our Professional Legal Fields & Core Competencies'}
          </p>
        </div>
      </section>

      {/* Main Grid View */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Practice Cards List */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-serif text-xl font-bold text-navy dark:text-white mb-6 uppercase tracking-wider">
                {language === 'ur' ? 'شعبہ جات کی فہرست' : 'Areas of Expertise'}
              </h2>
              {practiceAreas.map((area) => (
                <button
                  key={area._id}
                  onClick={() => setSelectedArea(area)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 flex items-center justify-between group ${
                    selectedArea?._id === area._id
                      ? 'bg-navy border-gold text-white dark:bg-navy-light'
                      : 'bg-gray-50 border-black/5 hover:border-gold/50 text-slate-800 dark:bg-navy-light/10 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl ${selectedArea?._id === area._id ? 'text-gold' : 'text-slate-400 group-hover:text-gold'}`}>
                      {getIconComponent(area.icon)}
                    </span>
                    <span className="font-serif font-bold text-base sm:text-lg">{area.title}</span>
                  </div>
                  <FaArrowRight size={14} className={`transform transition-transform ${selectedArea?._id === area._id ? 'text-gold translate-x-1' : 'text-slate-400 group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>

            {/* Right Column: Dynamic Deep Detail Panel */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-navy-light/20 rounded-xl p-6 sm:p-8 border border-black/5">
              {selectedArea ? (
                <div>
                  {/* Title & Banner Image */}
                  <div className="mb-6">
                    <span className="text-xs font-bold text-gold tracking-widest uppercase">
                      {language === 'ur' ? 'شعبہ کی تفصیل' : 'Practice Area Details'}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mt-1">
                      {selectedArea.title}
                    </h3>
                  </div>

                  {selectedArea.image && (
                    <img
                      src={selectedArea.image}
                      alt={selectedArea.title}
                      className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-sm border border-gold/15 mb-6"
                      loading="lazy"
                    />
                  )}

                  {/* Description */}
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm mb-8">
                    {selectedArea.description}
                  </p>

                  {/* Associated Sub-Services */}
                  {selectedArea.services && selectedArea.services.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-serif text-lg font-bold text-navy dark:text-white mb-4 border-b border-gold/20 pb-2">
                        {language === 'ur' ? 'شعبہ سے وابستہ خدمات' : 'Specialized Legal Services'}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-gray-300">
                        {selectedArea.services.map((service, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-gold font-bold">✔</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Area FAQs */}
                  {selectedArea.faqs && selectedArea.faqs.length > 0 && (
                    <div>
                      <h4 className="font-serif text-lg font-bold text-navy dark:text-white mb-4 border-b border-gold/20 pb-2">
                        {language === 'ur' ? 'اکثر پوچھے گئے سوالات' : 'Frequently Asked Questions'}
                      </h4>
                      <div className="space-y-4">
                        {selectedArea.faqs.map((faq, index) => (
                          <div key={index} className="p-4 bg-white dark:bg-navy rounded-lg border border-black/5">
                            <h5 className="font-bold text-navy dark:text-white text-sm mb-2">
                              Q: {faq.question}
                            </h5>
                            <p className="text-slate-600 dark:text-gray-300 text-xs leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center text-slate-500 py-12">
                  Select a practice area from the list to view its deep details.
                </div>
              )}
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default PracticeAreas;
