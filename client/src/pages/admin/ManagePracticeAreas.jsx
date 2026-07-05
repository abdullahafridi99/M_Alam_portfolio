import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import CroppedImageUpload from '../../components/CroppedImageUpload.jsx';

const ManagePracticeAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('FaGavel');
  const [services, setServices] = useState('');
  const [faqList, setFaqList] = useState([{ question: '', answer: '' }]);
  const [imageFile, setImageFile] = useState(null);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/practiceareas');
      if (res.data.success) {
        setAreas(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching practice areas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleOpenForm = (area = null) => {
    if (area) {
      setEditId(area._id);
      setTitle(area.title);
      setDescription(area.description);
      setIcon(area.icon || 'FaGavel');
      setServices(area.services ? area.services.join(', ') : '');
      setFaqList(area.faqs && area.faqs.length > 0 ? area.faqs : [{ question: '', answer: '' }]);
    } else {
      setEditId(null);
      setTitle('');
      setDescription('');
      setIcon('FaGavel');
      setServices('');
      setFaqList([{ question: '', answer: '' }]);
    }
    setImageFile(null);
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqList];
    updated[index][field] = value;
    setFaqList(updated);
  };

  const addFaqRow = () => {
    setFaqList([...faqList, { question: '', answer: '' }]);
  };

  const removeFaqRow = (index) => {
    setFaqList(faqList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('icon', icon);
    
    // Process services: convert to array, stringify for multipart
    const serviceArray = services.split(',').map((s) => s.trim()).filter((s) => s !== '');
    formData.append('services', JSON.stringify(serviceArray));
    
    // Process FAQs: filter empty and stringify
    const filteredFaq = faqList.filter((f) => f.question !== '' && f.answer !== '');
    formData.append('faqs', JSON.stringify(filteredFaq));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editId) {
        const res = await api.put(`/api/practiceareas/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchAreas();
          setIsOpen(false);
        }
      } else {
        const res = await api.post('/api/practiceareas', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchAreas();
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error('Error submitting practice area:', err);
      alert(err.response?.data?.message || 'Failed to submit practice area.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this practice area?')) {
      try {
        const res = await api.delete(`/api/practiceareas/${id}`);
        if (res.data.success) {
          setAreas((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (err) {
        console.error('Error deleting practice area:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white">Practice Areas List</h3>
        <button
          onClick={() => handleOpenForm()}
          className="btn-gold-grad px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <FaPlus size={10} /> Add Practice Area
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
                  <th className="p-4 font-semibold">Thumbnail</th>
                  <th className="p-4 font-semibold">Area Title</th>
                  <th className="p-4 font-semibold">Associated Services</th>
                  <th className="p-4 font-semibold">FAQs Count</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
                {areas.length > 0 ? (
                  areas.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-navy-light/10 transition-colors">
                      <td className="p-4">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-10 object-cover rounded border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-slate-400">No Img</div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-navy dark:text-white">
                        {item.title}
                      </td>
                      <td className="p-4 text-xs max-w-xs truncate">
                        {item.services ? item.services.join(', ') : '-'}
                      </td>
                      <td className="p-4 text-xs font-semibold">
                        {item.faqs ? item.faqs.length : 0} items
                      </td>
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
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      No practice areas configured yet. Click "Add Practice Area" to define.
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
          <div className="bg-white dark:bg-navy w-full max-w-2xl rounded-xl shadow-luxury overflow-hidden border border-gold/15 my-8">
            <div className="h-16 border-b border-gray-200 dark:border-gold/10 flex items-center justify-between px-6 bg-gray-50 dark:bg-navy-light/10">
              <h4 className="font-serif font-bold text-navy dark:text-white text-base">
                {editId ? 'Edit Practice Area' : 'Define New Practice Area'}
              </h4>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-gold">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Title */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Practice Area Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Icon string */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Icon Component Class *</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  >
                    <option value="FaGavel">FaGavel (Gavel Scale)</option>
                    <option value="FaBalanceScale">FaBalanceScale (Balance Scale)</option>
                    <option value="FaBriefcase">FaBriefcase (Briefcase)</option>
                    <option value="FaUsers">FaUsers (Family/Users)</option>
                  </select>
                </div>

                {/* Sub-services */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Associated Services (comma separated)</label>
                  <input
                    type="text"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="e.g. Title Vetting, Rent Litigations"
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Upload Image */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Banner Image</label>
                <CroppedImageUpload value={imageFile} onChange={setImageFile} aspect={16 / 9} label="Banner Image" />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Detailed Description *</label>
                <textarea
                  rows="4"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Accordion FAQs builder */}
              <div className="border-t border-gold/15 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Practice Area FAQs</label>
                  <button
                    type="button"
                    onClick={addFaqRow}
                    className="text-[10px] font-bold text-gold border border-gold/25 px-2.5 py-1 rounded hover:bg-gold/10"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="space-y-4">
                  {faqList.map((faq, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-navy-light/5 border border-black/5 rounded-lg space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => removeFaqRow(index)}
                        className="absolute right-3 top-3 text-red-500 hover:text-red-600 text-xs font-bold"
                      >
                        Delete
                      </button>

                      <div className="flex flex-col max-w-[85%]">
                        <label className="text-[10px] font-semibold text-slate-500 mb-1">Question</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          placeholder="What details are required?"
                          className="px-3 py-1.5 rounded bg-white dark:bg-navy border border-black/5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[10px] font-semibold text-slate-500 mb-1">Answer</label>
                        <textarea
                          rows="2"
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                          placeholder="Provide the explanation..."
                          className="w-full px-3 py-1.5 rounded bg-white dark:bg-navy border border-black/5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                        ></textarea>
                      </div>
                    </div>
                  ))}
                </div>
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
                  Save Practice Area
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManagePracticeAreas;
