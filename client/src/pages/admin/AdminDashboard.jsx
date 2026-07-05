import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaCalendarAlt, FaBookOpen, FaEnvelope, FaGavel, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    blogs: 0,
    cases: 0,
    unreadMessages: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, blogRes, caseRes, contactRes] = await Promise.all([
          api.get('/api/appointments').catch(() => ({ data: { success: false, data: [] } })),
          api.get('/api/blogs').catch(() => ({ data: { success: false, blogs: [] } })),
          api.get('/api/cases').catch(() => ({ data: { success: false, data: [] } })),
          api.get('/api/contact').catch(() => ({ data: { success: false, data: [] } })),
        ]);

        const appointments = appRes.data.data || [];
        const blogs = blogRes.data.blogs || [];
        const cases = caseRes.data.data || [];
        const contacts = contactRes.data.data || [];

        setStats({
          appointments: appointments.length,
          blogs: blogs.length,
          cases: cases.length,
          unreadMessages: contacts.filter((c) => !c.isRead).length,
        });

        // Take last 5 appointments
        setRecentAppointments(appointments.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded flex items-center gap-1 w-fit"><FaCheckCircle /> Approved</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded flex items-center gap-1 w-fit"><FaCheckCircle /> Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded flex items-center gap-1 w-fit"><FaExclamationCircle /> Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded flex items-center gap-1 w-fit"><FaClock /> Pending</span>;
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
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* App stats */}
        <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gold/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Consultations</p>
            <h3 className="text-3xl font-extrabold mt-1 text-navy dark:text-white">{stats.appointments}</h3>
          </div>
          <div className="p-4 bg-gold/10 text-gold rounded-lg text-2xl">
            <FaCalendarAlt />
          </div>
        </div>

        {/* Blogs stats */}
        <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gold/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Blogs Published</p>
            <h3 className="text-3xl font-extrabold mt-1 text-navy dark:text-white">{stats.blogs}</h3>
          </div>
          <div className="p-4 bg-gold/10 text-gold rounded-lg text-2xl">
            <FaBookOpen />
          </div>
        </div>

        {/* Cases stats */}
        <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gold/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Cases Resolved</p>
            <h3 className="text-3xl font-extrabold mt-1 text-navy dark:text-white">{stats.cases}</h3>
          </div>
          <div className="p-4 bg-gold/10 text-gold rounded-lg text-2xl">
            <FaGavel />
          </div>
        </div>

        {/* Unread message stats */}
        <div className="bg-white dark:bg-navy p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gold/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Unread Messages</p>
            <h3 className="text-3xl font-extrabold mt-1 text-navy dark:text-white">{stats.unreadMessages}</h3>
          </div>
          <div className="p-4 bg-gold/10 text-gold rounded-lg text-2xl">
            <FaEnvelope />
          </div>
        </div>

      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent appointments */}
        <div className="lg:col-span-8 bg-white dark:bg-navy p-6 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-150 dark:border-gold/10">
            <h3 className="font-serif text-lg font-bold text-navy dark:text-white">Recent Consultation Requests</h3>
            <Link to="/admin/appointments" className="text-xs font-bold text-gold hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gold/15 text-slate-400">
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Practice Area</th>
                  <th className="pb-3 font-semibold">Date & Time</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
                {recentAppointments.length > 0 ? (
                  recentAppointments.map((app) => (
                    <tr key={app._id}>
                      <td className="py-3.5">
                        <p className="font-bold text-navy dark:text-white">{app.name}</p>
                        <p className="text-xs text-slate-400">{app.email}</p>
                      </td>
                      <td className="py-3.5 text-xs font-semibold">{app.practiceArea}</td>
                      <td className="py-3.5">
                        <p className="text-xs font-semibold">
                          {new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] text-slate-400">{app.time}</p>
                      </td>
                      <td className="py-3.5">{getStatusBadge(app.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-slate-500">
                      No recent appointment requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick controls pane */}
        <div className="lg:col-span-4 bg-white dark:bg-navy p-6 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-navy dark:text-white mb-4 pb-2 border-b border-gray-150 dark:border-gold/10">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 gap-3">
            <Link to="/admin/blogs" className="btn-navy-grad text-center py-3 rounded text-sm text-white">
              Write New Blog
            </Link>
            <Link to="/admin/settings" className="border border-gold text-gold hover:bg-gold/10 text-center py-3 rounded text-sm transition-colors">
              Update Site Settings
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
