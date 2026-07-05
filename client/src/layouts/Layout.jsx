import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingWhatsApp from '../components/FloatingWhatsApp.jsx';
import { FaChevronUp } from 'react-icons/fa';

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300 dark:bg-navy-dark dark:text-gray-100">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 p-3 bg-gold text-navy rounded-full shadow-luxury hover:bg-gold-light transition-all duration-300 transform ${
          showScrollTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FaChevronUp size={18} />
      </button>
    </div>
  );
};

export default Layout;
