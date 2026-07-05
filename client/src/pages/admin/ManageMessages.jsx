import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaTrash, FaCheck, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/contact');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await api.put(`/api/contact/${id}/read`);
      if (res.data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
        );
      }
    } catch (err) {
      console.error('Error marking message read:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const res = await api.delete(`/api/contact/${id}`);
        if (res.data.success) {
          setMessages((prev) => prev.filter((msg) => msg._id !== id));
        }
      } catch (err) {
        console.error('Error deleting message:', err);
      }
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
                <th className="pb-3 font-semibold">Sender Details</th>
                <th className="pb-3 font-semibold">Subject Matter</th>
                <th className="pb-3 font-semibold">Message Body</th>
                <th className="pb-3 font-semibold">Date Submitted</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-gray-50/50 dark:hover:bg-navy-light/10 transition-colors ${!msg.isRead ? 'font-bold bg-gold/5' : ''}`}>
                    <td className="py-4">
                      <p className="text-navy dark:text-white">{msg.name}</p>
                      <p className="text-xs text-slate-400">{msg.email}</p>
                      <p className="text-xs text-slate-400">{msg.phone || 'No phone'}</p>
                    </td>
                    <td className="py-4 text-xs font-semibold max-w-xs truncate">{msg.subject}</td>
                    <td className="py-4 max-w-sm">
                      <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed truncate" title={msg.message}>
                        {msg.message}
                      </p>
                    </td>
                    <td className="py-4 text-xs">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 text-xs">
                      {msg.isRead ? (
                        <span className="text-slate-400 flex items-center gap-1"><FaEnvelopeOpen /> Read</span>
                      ) : (
                        <span className="text-gold flex items-center gap-1"><FaEnvelope /> Unread</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!msg.isRead && (
                          <button
                            onClick={() => handleMarkRead(msg._id)}
                            className="p-1.5 bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white rounded transition-all"
                            title="Mark Read"
                          >
                            <FaCheck size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-all"
                          title="Delete"
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
                    No contact form submissions found.
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

export default ManageMessages;
