import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaUpload, FaSave, FaCheck } from 'react-icons/fa';
import CroppedImageUpload from '../../components/CroppedImageUpload.jsx';

const WebsiteSettings = () => {
  const [settings, setSettings] = useState({
    heroHeadline: '',
    heroSubtitle: '',
    officeAddress: '',
    officePhone: '',
    officeEmail: '',
    whatsappNumber: '',
    socialLinks: { linkedin: '', twitter: '', facebook: '' },
    defaultSeoTitle: '',
    defaultSeoDescription: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Files State
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/api/settings');
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append('heroHeadline', settings.heroHeadline);
    formData.append('heroSubtitle', settings.heroSubtitle);
    formData.append('officeAddress', settings.officeAddress);
    formData.append('officePhone', settings.officePhone);
    formData.append('officeEmail', settings.officeEmail);
    formData.append('whatsappNumber', settings.whatsappNumber);
    formData.append('linkedin', settings.socialLinks.linkedin);
    formData.append('twitter', settings.socialLinks.twitter);
    formData.append('facebook', settings.socialLinks.facebook);
    formData.append('defaultSeoTitle', settings.defaultSeoTitle);
    formData.append('defaultSeoDescription', settings.defaultSeoDescription);

    if (heroImageFile) {
      formData.append('heroImage', heroImageFile);
    }
    if (cvFile) {
      formData.append('cvUrl', cvFile);
    }

    try {
      const res = await api.put('/api/settings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setSettings(res.data.data);
        setSuccess(true);
        // Clear files
        setHeroImageFile(null);
        setCvFile(null);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save website configurations.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl bg-white dark:bg-navy p-6 sm:p-10 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section settings */}
        <div>
          <h4 className="font-serif text-base font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gray-150 dark:border-gold/10 uppercase tracking-wider">
            Hero Configuration
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Hero Title / Headline</label>
              <input
                type="text"
                name="heroHeadline"
                value={settings.heroHeadline}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Hero Subtitle</label>
              <textarea
                rows="2"
                name="heroSubtitle"
                value={settings.heroSubtitle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Hero Advocate Image</label>
                <CroppedImageUpload value={heroImageFile} onChange={setHeroImageFile} aspect={4 / 5} label="Advocate Profile" />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Advocate Profile PDF (CV)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                />
                {cvFile && <span className="text-[10px] text-gold mt-1">Pending save: {cvFile.name}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Office Address & Phone */}
        <div>
          <h4 className="font-serif text-base font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gray-150 dark:border-gold/10 uppercase tracking-wider">
            Chambers Contacts
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Phone</label>
              <input
                type="text"
                name="officePhone"
                value={settings.officePhone}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                name="officeEmail"
                value={settings.officeEmail}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">WhatsApp (format: 923001234567)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Office Location Chambers Address</label>
              <input
                type="text"
                name="officeAddress"
                value={settings.officeAddress}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social channels */}
        <div>
          <h4 className="font-serif text-base font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gray-150 dark:border-gold/10 uppercase tracking-wider">
            Social Media Links
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">LinkedIn Profile URL</label>
              <input
                type="text"
                name="linkedin"
                value={settings.socialLinks?.linkedin}
                onChange={handleSocialChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Twitter URL</label>
              <input
                type="text"
                name="twitter"
                value={settings.socialLinks?.twitter}
                onChange={handleSocialChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Facebook Page URL</label>
              <input
                type="text"
                name="facebook"
                value={settings.socialLinks?.facebook}
                onChange={handleSocialChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Search Engine Optimization */}
        <div>
          <h4 className="font-serif text-base font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gray-150 dark:border-gold/10 uppercase tracking-wider">
            Search Engine Settings (SEO)
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Default Title Tag</label>
              <input
                type="text"
                name="defaultSeoTitle"
                value={settings.defaultSeoTitle}
                onChange={handleChange}
                className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Default Meta Description</label>
              <textarea
                rows="3"
                name="defaultSeoDescription"
                value={settings.defaultSeoDescription}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gold/10 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="btn-gold-grad px-8 py-3 rounded font-bold text-sm shadow-gold-glow flex items-center gap-2 disabled:opacity-50"
          >
            <FaSave /> {saving ? 'Saving...' : 'Save Configuration'}
          </button>
          
          {success && (
            <span className="text-green-500 font-bold text-xs flex items-center gap-1">
              <FaCheck /> Configurations updated successfully!
            </span>
          )}
        </div>

      </form>
    </div>
  );
};

export default WebsiteSettings;
