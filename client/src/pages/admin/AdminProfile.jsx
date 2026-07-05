import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../../context/AuthContext.jsx';
import { FaUser, FaLock, FaCheck, FaTimes } from 'react-icons/fa';

const AdminProfile = () => {
  const { user, checkUserSession } = useAuth();
  
  // Profile Details Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [detailsSaving, setDetailsSaving] = useState(false);
  const [detailsSuccess, setDetailsSuccess] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  // Password Update Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passSaving, setPassSaving] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setDetailsSaving(true);
    setDetailsSuccess(false);
    setDetailsError(null);

    try {
      const res = await api.put('/api/auth/updatedetails', { name, email });
      if (res.data.success) {
        setDetailsSuccess(true);
        await checkUserSession(); // Sync global AuthContext user
        setTimeout(() => setDetailsSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
      setDetailsError(err.response?.data?.message || 'Failed to update details');
    } finally {
      setDetailsSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassSaving(true);
    setPassSuccess(false);
    setPassError(null);

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match');
      setPassSaving(false);
      return;
    }

    try {
      const res = await api.put('/api/auth/updatepassword', { currentPassword, newPassword });
      if (res.data.success) {
        setPassSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPassSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
      setPassError(err.response?.data?.message || 'Failed to update security key');
    } finally {
      setPassSaving(false);
    }
  };

  return (
    <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Update Profile details block */}
      <div className="bg-white dark:bg-navy p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gold/10 flex items-center gap-2">
          <FaUser className="text-gold" /> Personal Profile
        </h3>

        <form onSubmit={handleUpdateDetails} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 rounded text-sm text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 rounded text-sm text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-500">Security Clearance</label>
            <input
              type="text"
              disabled
              value={user?.role?.toUpperCase() || 'ADMIN'}
              className="px-4 py-2 bg-gray-100 dark:bg-navy-light/5 border border-black/5 rounded text-sm text-slate-400 cursor-not-allowed select-none"
            />
          </div>

          {detailsError && (
            <p className="text-xs font-bold text-red-500">{detailsError}</p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={detailsSaving}
              className="btn-gold-grad px-6 py-2.5 rounded text-xs font-bold shadow-sm"
            >
              {detailsSaving ? 'Saving...' : 'Save Profile'}
            </button>
            {detailsSuccess && (
              <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                <FaCheck /> Details updated!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Update Password block */}
      <div className="bg-white dark:bg-navy p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gold/10 flex items-center gap-2">
          <FaLock className="text-gold" /> Security Key / Password
        </h3>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 rounded text-sm text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 rounded text-sm text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 rounded text-sm text-slate-800 dark:text-white focus:outline-none"
            />
          </div>

          {passError && (
            <p className="text-xs font-bold text-red-500">{passError}</p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={passSaving}
              className="btn-gold-grad px-6 py-2.5 rounded text-xs font-bold shadow-sm"
            >
              {passSaving ? 'Updating...' : 'Update Password'}
            </button>
            {passSuccess && (
              <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                <FaCheck /> Password updated!
              </span>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};

export default AdminProfile;
