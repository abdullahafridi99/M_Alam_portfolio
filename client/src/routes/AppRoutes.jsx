import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Layouts
import Layout from '../layouts/Layout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

// Public Pages
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import PracticeAreas from '../pages/PracticeAreas.jsx';
import Services from '../pages/Services.jsx';
import CaseStudies from '../pages/CaseStudies.jsx';
import BlogList from '../pages/BlogList.jsx';
import BlogDetail from '../pages/BlogDetail.jsx';
import Contact from '../pages/Contact.jsx';
import AppointmentPage from '../pages/AppointmentPage.jsx';
import Login from '../pages/Login.jsx';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ManageBlogs from '../pages/admin/ManageBlogs.jsx';
import ManageServices from '../pages/admin/ManageServices.jsx';
import ManagePracticeAreas from '../pages/admin/ManagePracticeAreas.jsx';
import ManageCases from '../pages/admin/ManageCases.jsx';
import ManageTestimonials from '../pages/admin/ManageTestimonials.jsx';
import ManageAppointments from '../pages/admin/ManageAppointments.jsx';
import ManageMessages from '../pages/admin/ManageMessages.jsx';
import ManageFAQs from '../pages/admin/ManageFAQs.jsx';
import WebsiteSettings from '../pages/admin/WebsiteSettings.jsx';
import AdminProfile from '../pages/admin/AdminProfile.jsx';

// Helper component for Route Guards
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy text-gold">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Main Header/Footer Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="practice-areas" element={<PracticeAreas />} />
        <Route path="services" element={<Services />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appointments" element={<AppointmentPage />} />
      </Route>

      {/* Admin Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Secure Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="practice-areas" element={<ManagePracticeAreas />} />
        <Route path="cases" element={<ManageCases />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="appointments" element={<ManageAppointments />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="faqs" element={<ManageFAQs />} />
        <Route path="settings" element={<WebsiteSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-white text-center px-4">
            <h1 className="text-8xl font-serif text-gold font-bold mb-4">404</h1>
            <p className="text-xl mb-6 font-semibold">The page you are looking for does not exist.</p>
            <a href="/" className="btn-gold-grad px-6 py-3 rounded shadow-gold-glow">
              Return Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
