import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { FaSun, FaMoon, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navPractice'), path: '/practice-areas' },
    { name: t('navServices'), path: '/services' },
    { name: t('navCases'), path: '/case-studies' },
    { name: t('navBlog'), path: '/blog' },
    { name: t('navContact'), path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-navy dark:text-white flex items-center gap-2">
                <span className="text-gold">⚖</span> MUBASHIR ALAM
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest text-gold font-semibold uppercase">
                {language === 'ur' ? 'ایڈووکیٹ ہائی کورٹ' : 'Advocate High Court'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 lg:ml-auto lg:mr-12 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 hover:text-gold ${
                  isActive(item.path)
                    ? 'text-gold border-b-2 border-gold pb-1'
                    : 'text-navy dark:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Utilities (Theme, Lang, Book Consultation) */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-navy dark:text-gray-200 hover:text-gold transition-colors duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-xs font-bold border border-navy dark:border-gray-200 text-navy dark:text-gray-200 hover:border-gold hover:text-gold rounded transition-colors duration-300"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* Admin Profile indicator or Login */}
            {user ? (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-navy-light text-gold rounded border border-gold/30 hover:bg-navy transition-all"
              >
                <FaUser size={12} /> {t('navDashboard')}
              </Link>
            ) : null}

            {/* Book CTA */}
            <Link to="/appointments" className="btn-gold-grad px-5 py-2.5 rounded text-sm shadow-gold-glow">
              {t('navBook')}
            </Link>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex lg:hidden items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={toggleTheme}
              className="p-2 text-navy dark:text-gray-200 hover:text-gold"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 text-xs font-bold border border-navy dark:border-gray-200 text-navy dark:text-gray-200 rounded"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy dark:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`lg:hidden fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-white dark:bg-navy-dark z-40 transition-all duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-10 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-semibold tracking-wide ${
                isActive(item.path) ? 'text-gold' : 'text-navy dark:text-gray-200'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-gold font-semibold"
            >
              <FaUser size={14} /> {t('navDashboard')}
            </Link>
          )}

          <Link
            to="/appointments"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gold-grad w-full text-center py-3 rounded shadow-gold-glow max-w-xs"
          >
            {t('navBook')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
