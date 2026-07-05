import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FaLinkedin, FaTwitter, FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { api } from '../context/AuthContext.jsx';

const Footer = () => {
  const { t, language } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Footer setting fetch error:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-navy text-gray-300 border-t border-gold/20 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div>
            <Link to="/" className="flex flex-col mb-4">
              <span className="font-serif text-2xl font-bold tracking-wider text-white flex items-center gap-2">
                <span className="text-gold">⚖</span> MUBASHIR ALAM
              </span>
              <span className="text-xs tracking-widest text-gold font-semibold uppercase">
                {language === 'ur' ? 'ایڈووکیٹ ہائی کورٹ' : 'Advocate High Court'}
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {t('secAboutText')}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={settings?.socialLinks?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={settings?.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4 border-b border-gold/30 pb-2 inline-block">
              {language === 'ur' ? 'فوری لنکس' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/practice-areas" className="hover:text-gold transition-colors">
                  {t('navPractice')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  {t('navServices')}
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-gold transition-colors">
                  {t('navCases')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">
                  {t('navBlog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4 border-b border-gold/30 pb-2 inline-block">
              {language === 'ur' ? 'رابطہ کی تفصیلات' : 'Contact Office'}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" />
                <span>{settings?.officeAddress || 'Chamber 12, District Courts Complex, Karachi, Pakistan'}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gold flex-shrink-0" />
                <span>{settings?.officePhone || '+92 300 1234567'}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gold flex-shrink-0" />
                <span>{settings?.officeEmail || 'mubashir.alam@legal.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4 border-b border-gold/30 pb-2 inline-block">
              {language === 'ur' ? 'خبرنامہ' : 'Newsletter'}
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {language === 'ur' ? 'تازہ ترین قانونی خبروں اور اپڈیٹس کے لیے سبسکرائب کریں۔' : 'Subscribe to receive the latest legal updates, guidelines and insights.'}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={language === 'ur' ? 'ای میل درج کریں' : 'Enter your email'}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-2.5 bg-navy-light text-white rounded border border-gray-700 focus:outline-none focus:border-gold text-sm"
                required
              />
              <button type="submit" className="btn-gold-grad py-2 rounded text-sm font-semibold">
                {language === 'ur' ? 'سبسکرائب کریں' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-gold mt-2">
                {language === 'ur' ? 'سبسکرائب کرنے کا شکریہ!' : 'Thank you for subscribing!'}
              </p>
            )}
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Advocate Mubashir Alam. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-gold transition-colors">
              {t('navAdmin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
