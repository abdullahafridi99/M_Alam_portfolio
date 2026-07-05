import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const ManageFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/faqs');
      if (res.data.success) {
        setFaqs(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenForm = (faq = null) => {
    if (faq) {
      setEditId(faq._id);
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setCategory(faq.category || 'General');
    } else {
      setEditId(null);
      setQuestion('');
      setAnswer('');
      setCategory('General');
    }
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { question, answer, category };

    try {
      if (editId) {
        const res = await api.put(`/api/faqs/${editId}`, payload);
        if (res.data.success) {
          fetchFaqs();
          setIsOpen(false);
        }
      } else {
        const res = await api.post('/api/faqs', payload);
        if (res.data.success) {
          fetchFaqs();
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error('Error submitting FAQ:', err);
      alert(err.response?.data?.message || 'Failed to submit FAQ.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const res = await api.delete(`/api/faqs/${id}`);
        if (res.data.success) {
          setFaqs((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (err) {
        console.error('Error deleting FAQ:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white">FAQs Accordion List</h3>
        <button
          onClick={() => handleOpenForm()}
          className="btn-gold-grad px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <FaPlus size={10} /> Add FAQ
        </button>
      </div>

      {/* Grid list */}
      {loading ? (
        <div className="min-h-[30vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-navy rounded-xl border border-gray-200 dark:border-gold/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gold/15 text-slate-400">
                  <th className="p-4 font-semibold">Question Query</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Answer Explanation</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
                {faqs.length > 0 ? (
                  faqs.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-navy-light/10 transition-colors">
                      <td className="p-4 font-bold text-navy dark:text-white max-w-xs truncate">{item.question}</td>
                      <td className="p-4 text-xs font-semibold">{item.category}</td>
                      <td className="p-4 text-xs max-w-md truncate">{item.answer}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenForm(item)}
                            className="p-1.5 bg-gold/10 text-gold hover:bg-gold hover:text-navy rounded transition-all"
                            title="Edit"
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
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
                    <td colSpan="4" className="text-center py-8 text-slate-500">
                      No FAQs found. Click "Add FAQ" to configure.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dialog Overlay Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy w-full max-w-lg rounded-xl shadow-luxury overflow-hidden border border-gold/15">
            <div className="h-16 border-b border-gray-200 dark:border-gold/10 flex items-center justify-between px-6 bg-gray-50 dark:bg-navy-light/10">
              <h4 className="font-serif font-bold text-navy dark:text-white text-base">
                {editId ? 'Edit FAQ Details' : 'Add New FAQ'}
              </h4>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-gold">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Question */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Question Title *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="General">General</option>
                  <option value="Appointments">Appointments</option>
                  <option value="Chambers Location">Chambers Location</option>
                  <option value="Pricing">Pricing</option>
                </select>
              </div>

              {/* Answer */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Answer Explanation *</label>
                <textarea
                  rows="4"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gold/10 pt-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-2.5 rounded text-xs font-semibold border border-gray-300 dark:border-gold/20 hover:bg-gray-100 dark:hover:bg-navy-light/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold-grad px-6 py-2.5 rounded text-xs font-semibold shadow-sm"
                >
                  Save FAQ
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageFAQs;
