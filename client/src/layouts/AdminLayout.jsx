import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FaTh, FaFileAlt, FaGavel, FaCogs, FaBookOpen, FaQuestionCircle, 
  FaStar, FaCalendarAlt, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaHome,
  FaUser
} from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTh /> },
    { name: 'Manage Appointments', path: '/admin/appointments', icon: <FaCalendarAlt /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <FaBookOpen /> },
    { name: 'Manage Practice Areas', path: '/admin/practice-areas', icon: <FaGavel /> },
    { name: 'Manage Services', path: '/admin/services', icon: <FaFileAlt /> },
    { name: 'Manage Cases', path: '/admin/cases', icon: <FaBookOpen /> },
    { name: 'Manage Testimonials', path: '/admin/testimonials', icon: <FaStar /> },
    { name: 'Manage FAQs', path: '/admin/faqs', icon: <FaQuestionCircle /> },
    { name: 'View Messages', path: '/admin/messages', icon: <FaEnvelope /> },
    { name: 'Website Settings', path: '/admin/settings', icon: <FaCogs /> },
    { name: 'Admin Profile', path: '/admin/profile', icon: <FaUser /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-navy-dark text-slate-800 dark:text-gray-100 flex">
      {/* Sidebar for Desktop */}
      <aside className={`w-64 bg-navy border-r border-gold/20 flex flex-col fixed h-full z-30 transition-all duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="h-20 border-b border-gold/20 flex items-center justify-between px-6">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-lg font-bold text-white tracking-widest flex items-center gap-1.5">
              <span className="text-gold">⚖</span> MUBASHIR ALAM
            </span>
            <span className="text-[10px] tracking-widest text-gold font-semibold uppercase">Admin Panel</span>
          </Link>
          <button 
            className="lg:hidden text-gold hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all ${
                isActive(item.path)
                  ? 'bg-gold text-navy font-bold'
                  : 'text-gray-300 hover:bg-navy-light hover:text-gold'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer / User Info */}
        <div className="p-4 border-t border-gold/20 flex flex-col gap-2">
          <div className="px-4 py-2">
            <p className="text-xs text-gray-400">Logged in as:</p>
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded text-sm font-medium text-gray-300 hover:bg-navy-light hover:text-gold"
          >
            <FaHome /> Visit Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all text-left"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-grow lg:pl-64 flex flex-col min-h-screen">
        {/* Header Bar */}
        <header className="h-20 bg-white dark:bg-navy border-b border-gray-200 dark:border-gold/15 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-navy dark:text-white hover:text-gold"
            >
              <FaBars size={20} />
            </button>
            <h2 className="text-lg font-serif font-bold text-navy dark:text-white">
              {menuItems.find((item) => isActive(item.path))?.name || 'Admin'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded border border-gold/20">
              System Admin
            </span>
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-grow p-6 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
