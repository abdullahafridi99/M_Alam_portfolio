import React, { useState, useEffect } from 'react';
import { api } from '../../context/AuthContext.jsx';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import CroppedImageUpload from '../../components/CroppedImageUpload.jsx';

const ManageCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [clientType, setClientType] = useState('Private Entity');
  const [challenge, setChallenge] = useState('');
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/cases');
      if (res.data.success) {
        setCases(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleOpenForm = (c = null) => {
    if (c) {
      setEditId(c._id);
      setTitle(c.title);
      setClientType(c.clientType);
      setChallenge(c.challenge);
      setStrategy(c.strategy);
      setResult(c.result);
    } else {
      setEditId(null);
      setTitle('');
      setClientType('Private Entity');
      setChallenge('');
      setStrategy('');
      setResult('');
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
    formData.append('title', title);
    formData.append('clientType', clientType);
    formData.append('challenge', challenge);
    formData.append('strategy', strategy);
    formData.append('result', result);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editId) {
        const res = await api.put(`/api/cases/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchCases();
          setIsOpen(false);
        }
      } else {
        const res = await api.post('/api/cases', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data.success) {
          fetchCases();
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error('Error submitting case study:', err);
      alert(err.response?.data?.message || 'Failed to submit case study.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        const res = await api.delete(`/api/cases/${id}`);
        if (res.data.success) {
          setCases((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (err) {
        console.error('Error deleting case study:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-navy dark:text-white">Case Studies List</h3>
        <button
          onClick={() => handleOpenForm()}
          className="btn-gold-grad px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <FaPlus size={10} /> Add Case Study
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
                  <th className="p-4 font-semibold">Case Title</th>
                  <th className="p-4 font-semibold">Client Type</th>
                  <th className="p-4 font-semibold">Result outcome</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gold/10">
                {cases.length > 0 ? (
                  cases.map((item) => (
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
                      <td className="p-4 font-bold text-navy dark:text-white max-w-sm truncate">
                        {item.title}
                      </td>
                      <td className="p-4 text-xs font-semibold">{item.clientType}</td>
                      <td className="p-4 text-xs max-w-xs truncate">{item.result}</td>
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
                      No case studies found. Click "Add Case Study" to represent court record.
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
                {editId ? 'Edit Case Study Details' : 'Add New Case Study'}
              </h4>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-gold">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Case Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Client type */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Client Type *</label>
                  <input
                    type="text"
                    required
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    placeholder="e.g. Private Landlord"
                    className="px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Upload Image */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-gray-300">Case Banner Image</label>
                <CroppedImageUpload value={imageFile} onChange={setImageFile} aspect={16 / 9} label="Case Banner Image" />
              </div>

              {/* Challenge */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Challenge Details *</label>
                <textarea
                  rows="3"
                  required
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="Outline the client's initial legal threat..."
                  className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Strategy */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Legal Strategy / Solution *</label>
                <textarea
                  rows="3"
                  required
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="Outline what evidence audit or legal clauses were filed..."
                  className="w-full px-4 py-2.5 rounded bg-gray-50 dark:bg-navy-light/10 border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                ></textarea>
              </div>

              {/* Result */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1 text-slate-600 dark:text-gray-300">Outcome / Result *</label>
                <textarea
                  rows="2"
                  required
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="e.g. Acquitted, Partition decreed, Compromise deed registered..."
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
                  Save Case Study
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCases;
