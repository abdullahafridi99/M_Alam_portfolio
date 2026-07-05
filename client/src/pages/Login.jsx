import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth, api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { FaLock, FaEnvelope, FaKey, FaChevronLeft } from 'react-icons/fa';

const Login = () => {
  const { login, user, error, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // View states: 'login' | 'forgot' | 'reset'
  const [viewMode, setViewMode] = useState('login');
  
  // Custom States
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [localError, setLocalError] = useState(null);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const onSubmitLogin = async (data) => {
    setLocalError(null);
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/admin');
    }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setLocalError(null);
    setSuccessMsg(null);

    try {
      const res = await api.post('/api/auth/forgotpassword', { email: resetEmail });
      if (res.data.success) {
        setSuccessMsg('OTP code sent successfully. Please check your inbox.');
        // Transition to Reset input screen
        setTimeout(() => {
          setViewMode('reset');
          setSuccessMsg(null);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setLocalError(err.response?.data?.message || 'SMTP request failed. Verify email settings.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setLocalError(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      setActionLoading(false);
      return;
    }

    try {
      const res = await api.post('/api/auth/resetpassword', {
        email: resetEmail,
        otp: otpCode,
        newPassword,
      });

      if (res.data.success) {
        setSuccessMsg('Password updated successfully. Logging you in...');
        // Auto sign-in by logging in using the Context
        setTimeout(async () => {
          await login(resetEmail, newPassword);
          navigate('/admin');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setLocalError(err.response?.data?.message || 'Failed to reset password. Verify OTP.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Chamber Portal - Advocate Mubashir Alam"
        description="Secure login and credential recovery panel for Advocate Mubashir Alam's portfolio admin dashboard."
      />

      <section className="min-h-screen flex items-center justify-center bg-navy text-white px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-light/40 rounded-full filter blur-[150px]"></div>

        <div className="max-w-md w-full glass-card p-8 rounded-xl border border-gold/25 relative z-10 shadow-luxury transition-all duration-300">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-3xl text-gold font-bold">⚖</span>
            <h1 className="font-serif text-2xl font-bold mt-2 text-white">Chamber Portal</h1>
            <p className="text-gray-400 text-xs mt-1">Authorized Administrative Access Only</p>
          </div>

          {/* VIEW: LOGIN FORM */}
          {viewMode === 'login' && (
            <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 text-gray-300">Admin Email</label>
                <div className="relative">
                  <input
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="admin@mubashiralam.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white focus:outline-none focus:border-gold"
                  />
                  <FaEnvelope className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
                {errors.email && <span className="text-[10px] text-red-400 mt-1">Valid email is required</span>}
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-gray-300">Security Key</label>
                  <button
                    type="button"
                    onClick={() => {
                      setLocalError(null);
                      setViewMode('forgot');
                    }}
                    className="text-[10px] text-gold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    {...register('password', { required: true })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white focus:outline-none focus:border-gold"
                  />
                  <FaLock className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
                {errors.password && <span className="text-[10px] text-red-400 mt-1">Security key is required</span>}
              </div>

              {(error || localError) && (
                <p className="text-xs font-bold text-red-400 text-center">
                  {error || localError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold-grad w-full py-3 rounded font-bold shadow-gold-glow flex items-center justify-center text-sm disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD (REQUEST OTP) */}
          {viewMode === 'forgot' && (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 text-gray-300">Enter Admin Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@mubashiralam.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white focus:outline-none focus:border-gold"
                  />
                  <FaEnvelope className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5">We will send a 6-digit OTP code to verify your request.</p>
              </div>

              {localError && (
                <p className="text-xs font-bold text-red-400 text-center">{localError}</p>
              )}
              {successMsg && (
                <p className="text-xs font-bold text-green-400 text-center">{successMsg}</p>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-gold-grad w-full py-3 rounded font-bold shadow-gold-glow flex items-center justify-center text-sm disabled:opacity-50"
                >
                  {actionLoading ? 'Sending OTP...' : 'Send Verification OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="text-xs text-gray-300 hover:text-gold flex items-center justify-center gap-1.5 mt-2"
                >
                  <FaChevronLeft size={10} /> Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* VIEW: RESET PASSWORD (INPUT OTP & NEW PASSWORD) */}
          {viewMode === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-gray-300">6-Digit OTP Code</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-Digit OTP"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white tracking-widest text-center font-bold focus:outline-none focus:border-gold"
                  />
                  <FaKey className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-gray-300">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white focus:outline-none focus:border-gold"
                  />
                  <FaLock className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-gray-300">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-4 py-2.5 bg-navy-dark border border-gold/15 rounded text-sm text-white focus:outline-none focus:border-gold"
                  />
                  <FaLock className="absolute left-3.5 top-3.5 text-gold/60" size={12} />
                </div>
              </div>

              {localError && (
                <p className="text-xs font-bold text-red-400 text-center">{localError}</p>
              )}
              {successMsg && (
                <p className="text-xs font-bold text-green-400 text-center">{successMsg}</p>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="btn-gold-grad w-full py-3 rounded font-bold shadow-gold-glow flex items-center justify-center text-sm disabled:opacity-50"
                >
                  {actionLoading ? 'Resetting password...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('forgot')}
                  className="text-xs text-gray-300 hover:text-gold flex items-center justify-center gap-1.5 mt-2"
                >
                  <FaChevronLeft size={10} /> Request New OTP
                </button>
              </div>
            </form>
          )}

        </div>
      </section>
    </>
  );
};

export default Login;
