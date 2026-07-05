import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import CroppedImageUpload from '../../components/CroppedImageUpload.jsx';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [designation, setDesignation] = useState('Client');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/testimonials');
      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenForm = (t = null) => {
    if (t) {
      setEditId(t._id);
      setClientName(t.clientName);
      setDesignation(t.designation);
      setReview(t.review);
      setRating(t.rating);
    } else {
      setEditId(null);
      setClientName('');
      setDesignation('Client');
      setReview('');
      setRating(5);
    }
    setImageFile(null);
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('clientName', clientName);
    formData.append('designation', designation);
    formData.append('review', review);
    formData.append('rating', rating);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editId) {
        const res = await api.put(`/api/testimonials/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchTestimonials();
          setIsOpen(false);
        }
      } else {
        const res = await api.post('/api/testimonials', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchTestimonials();
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      alert(err.response?.data?.message || 'Failed to submit testimonial.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await api.delete(`/api/testimonials/${id}`);
        if (res.data.success) {
          setTestimonials((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (err) {
        console.error('Error deleting testimonial:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white">Testimonials List</h3>
        <button
          onClick={() => handleOpenForm()}
          className="btn-gold-grad px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <FaPlus size={10} /> Add Testimonial
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
                  <th className="p-4 font-semibold">Client Name</th>
                  <th className="p-4 font-semibold">Designation</th>
                  <th className="p-4 font-semibold">Review content</th>
                  <th className="p-4 font-semibold">Stars</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-navy-light/10 transition-colors">
                      <td className="p-4 font-bold text-navy dark:text-white">{item.clientName}</td>
                      <td className="p-4 text-xs font-semibold">{item.designation}</td>
                      <td className="p-4 text-xs max-w-xs truncate">{item.review}</td>
                      <td className="p-4 text-xs text-gold">{'★'.repeat(item.rating)}</td>
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
                      No testimonials found. Click "Add Testimonial" to show client approvals.
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
                {editId ? 'Edit Testimonial Details' : 'Add New Testimonial'}
              </h4>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-gold">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Designation */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Designation *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rating */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Rating (1 to 5 Stars) *</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              {/* Upload Image */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Client Image</label>
                <CroppedImageUpload value={imageFile} onChange={setImageFile} aspect={1 / 1} label="Client Image" />
              </div>

              {/* Review */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Client Review Details *</label>
                <textarea
                  rows="4"
                  required
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
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
                  Save Testimonial
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageTestimonials;
