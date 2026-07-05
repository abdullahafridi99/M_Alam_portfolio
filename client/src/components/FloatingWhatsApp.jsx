import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { api } from '../context/AuthContext.jsx';

const FloatingWhatsApp = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('923001234567');

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data.success && res.data.data.whatsappNumber) {
          setWhatsappNumber(res.data.data.whatsappNumber);
        }
      } catch (err) {
        console.error('WhatsApp setting fetch error:', err);
      }
    };
    fetchSetting();
  }, []);

  const handleClick = () => {
    // Open whatsapp URL
    const url = `https://wa.me/${whatsappNumber}?text=Hello%20Advocate%20Mubashir%20Alam,%20I%20would%20like%20to%20inquire%20about%20your%20legal%20services.`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-luxury transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce"
      aria-label="Chat on WhatsApp"
      style={{ animationDuration: '3s' }}
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default FloatingWhatsApp;
