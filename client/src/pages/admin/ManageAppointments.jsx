import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaCheckCircle, FaTimesCircle, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/appointments/${id}`, { status });
      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      }
    } catch (err) {
      console.error('Error updating appointment status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment request?')) {
      try {
        const res = await api.delete(`/api/appointments/${id}`);
        if (res.data.success) {
          setAppointments((prev) => prev.filter((app) => app._id !== id));
        }
      } catch (err) {
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">Approved</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">Cancelled</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">Pending</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-navy p-6 rounded-xl border border-gray-200 dark:border-gold/10 shadow-sm">
      
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gold/15 text-slate-400">
                <th className="pb-3 font-semibold">Client Info</th>
                <th className="pb-3 font-semibold">Practice Area</th>
                <th className="pb-3 font-semibold">Requested Schedule</th>
                <th className="pb-3 font-semibold">Brief Summary</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 dark:hover:bg-navy-light/10 transition-colors">
                    <td className="py-4">
                      <p className="font-bold text-navy dark:text-white">{app.name}</p>
                      <p className="text-xs text-slate-400">{app.email}</p>
                      <p className="text-xs text-slate-400">{app.phone}</p>
                    </td>
                    <td className="py-4 text-xs font-semibold">{app.practiceArea}</td>
                    <td className="py-4">
                      <p className="text-xs font-semibold">
                        {new Date(app.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-slate-400">{app.time}</p>
                    </td>
                    <td className="py-4 max-w-xs">
                      <p className="text-xs text-slate-600 dark:text-gray-300 truncate" title={app.message}>
                        {app.message || '-'}
                      </p>
                    </td>
                    <td className="py-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(app._id, 'approved')}
                            className="p-1.5 bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white rounded transition-all"
                            title="Approve Slot"
                          >
                            <FaCheck size={12} />
                          </button>
                        )}
                        {app.status === 'approved' && (
                          <button
                            onClick={() => handleUpdateStatus(app._id, 'completed')}
                            className="p-1.5 bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white rounded transition-all"
                            title="Mark Completed"
                          >
                            <FaCheckCircle size={12} />
                          </button>
                        )}
                        {app.status !== 'cancelled' && app.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus(app._id, 'cancelled')}
                            className="p-1.5 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white rounded transition-all"
                            title="Cancel Appointment"
                          >
                            <FaTimes size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-1.5 bg-gray-500/10 text-gray-500 hover:bg-gray-500 hover:text-white rounded transition-all"
                          title="Delete Request"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    No consultation bookings requested yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ManageAppointments;
