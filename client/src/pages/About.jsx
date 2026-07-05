import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import SEO from '../components/SEO.jsx';
import { FaGraduationCap, FaBriefcase, FaAward, FaBookOpen } from 'react-icons/fa';

const About = () => {
  const { t, language } = useLanguage();

  const timelineData = [
    {
      year: '2020 - Present',
      title: 'Senior Advocate High Court',
      institution: 'Sindh High Court Bar Association',
      desc: 'Representing clients in complex corporate mergers, white-collar crimes, and civil partitions. Advising governmental boards on legislative alignments.',
      icon: <FaBriefcase />,
    },
    {
      year: '2014 - 2020',
      title: 'Advocate High Court',
      institution: 'Karachi High Court',
      desc: 'Represented clients in broad ranges of civil litigations, rent disputes, criminal bail petitions, and family settlements.',
      icon: <FaBriefcase />,
    },
    {
      year: '2012',
      title: 'LL.M (Master of Laws)',
      institution: 'University of Karachi',
      desc: 'Specialized in Corporate Jurisprudence and Constitutional Legal Frameworks.',
      icon: <FaGraduationCap />,
    },
    {
      year: '2009',
      title: 'LL.B (Bachelor of Laws)',
      institution: 'S.M. Law College, Karachi',
      desc: 'Graduated with honors, majoring in Criminal Procedure Code, Civil Procedure Code, and Equity Rules.',
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <>
      <SEO 
        title="About Advocate Mubashir Alam"
        description="Learn about the educational credentials, legal philosophy, bar associations, and milestones of Advocate Mubashir Alam."
      />

      {/* Banner / Header */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {t('aboutBio')}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'تعلیمی اور پیشہ ورانہ تعارف' : 'Education, Milestones & Legal Philosophy'}
          </p>
        </div>
      </section>

      {/* Biography Details */}
      <section className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Biography Main */}
            <div className="lg:col-span-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy dark:text-white border-b-2 border-gold/30 pb-3 mb-6">
                {language === 'ur' ? 'پیشہ ورانہ سفر' : 'Professional Biography'}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                Advocate Mubashir Alam has been practicing law for over a decade, representing individuals, business entities, and organizations across high courts, district sessions courts, and regulatory tribunals. With a solid reputation for detailed file preparation and robust litigation strategy, he stands as a beacon of legal support.
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                After graduating with honors from S.M. Law College and completing post-graduate law research from Karachi University, he started practicing criminal defence and civil litigation. Over the years, his services expanded into corporate compliance, intellectual property registrations, and complex tax advisories.
              </p>

              {/* Mission / Vision Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="glass-card p-6 rounded-lg border border-black/5">
                  <h3 className="font-serif text-lg font-bold text-gold mb-3 flex items-center gap-2">
                    <FaAward /> {t('aboutMission')}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                    To deliver result-oriented, ethical, and high-caliber legal representation that shields our clients' interests, ensuring accessibility and justice under the constitution.
                  </p>
                </div>
                <div className="glass-card p-6 rounded-lg border border-black/5">
                  <h3 className="font-serif text-lg font-bold text-gold mb-3 flex items-center gap-2">
                    <FaBookOpen /> {t('aboutVision')}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                    To set premier industry standards in litigation preparation and alternative dispute resolutions, fostering a legally compliant and secure corporate ecosystem.
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy dark:text-white border-b-2 border-gold/30 pb-3 mb-6">
                {t('aboutPhilosophy')}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed italic border-l-4 border-gold pl-4 bg-gray-50 dark:bg-navy-light/20 py-4 pr-4 mb-6 rounded-r">
                "Justice is not merely a decree; it is a system of balance. My philosophy rests on absolute transparent communication with clients, intense legal research, and persistent courtroom advocacy. We do not leave any files unturned."
              </p>
            </div>

            {/* Side Highlights Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Credentials / Details Box */}
              <div className="bg-gray-50 dark:bg-navy-light/20 rounded-xl p-6 border border-black/5">
                <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gold/20">
                  {language === 'ur' ? 'کوائف' : 'Advocate Profiles'}
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-300">
                  <li><strong>License:</strong> Advocate High Court (Bar No. SHC-9844)</li>
                  <li><strong>Practice Cities:</strong> Karachi, Islamabad, Lahore</li>
                  <li><strong>Languages:</strong> English, Urdu, Sindhi</li>
                  <li><strong>Affiliations:</strong> High Court Bar Association Sindh, Karachi Bar Association</li>
                  <li><strong>Specialties:</strong> Corporate Litigation, Bail trial defense, Partition suites</li>
                </ul>
              </div>

              {/* Achievements Column */}
              <div className="bg-gray-50 dark:bg-navy-light/20 rounded-xl p-6 border border-black/5">
                <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gold/20">
                  {t('aboutAchievements')}
                </h3>
                <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-gold font-bold">✔</span>
                    <span>Successfully defended executive directors in a 100M PKR corporate audit.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold font-bold">✔</span>
                    <span>Resolved a 15-year old family partition suit through structured arbitration.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold font-bold">✔</span>
                    <span>Keynote speaker at Legal Tech Seminar on SECP regulatory compliance.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-extrabold text-navy dark:text-white mb-4">
              {t('aboutTimeline')}
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="relative border-l-2 border-gold/30 ml-4 md:ml-32">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-12 relative pl-8">
                {/* Timeline dot */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-navy border border-gold text-gold flex items-center justify-center text-xs">
                  {item.icon}
                </div>
                
                {/* Floating year badge on left for desktop */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                  <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                    {item.year}
                  </span>
                </div>

                <div className="glass-card p-6 rounded-lg border border-black/5">
                  <span className="md:hidden inline-block text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20 mb-3">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-navy dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gold text-xs font-semibold mt-0.5 mb-3">
                    {item.institution}
                  </p>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
