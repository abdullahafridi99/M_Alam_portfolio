import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BlogList = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(['All', 'Civil Law', 'Criminal Law', 'Corporate Law', 'Family Law']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/api/blogs?category=${selectedCategory}&search=${searchTerm}&page=${currentPage}&limit=6`
      );
      if (res.data.success) {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  return (
    <>
      <SEO
        title="Legal Blog & Guidelines - Advocate Mubashir Alam"
        description="Stay updated with legal guides, insights, and constitutional alerts written by Advocate High Court Mubashir Alam."
      />

      {/* Header Banner */}
      <section className="bg-navy py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy-light opacity-50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {language === 'ur' ? 'قانونی مضامین' : 'Legal Blog'}
          </h1>
          <p className="text-gold tracking-widest text-xs sm:text-sm uppercase font-semibold">
            {language === 'ur' ? 'قوانین اور حقوق کے بارے میں آگاہی' : 'Latest regulatory notifications, court rules, and citizen guides'}
          </p>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="py-12 bg-gray-50 dark:bg-navy-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gold/10 md:border-none w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gold border-gold text-navy'
                      : 'bg-white dark:bg-navy border-black/5 text-slate-600 dark:text-gray-200 hover:border-gold/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="flex max-w-sm w-full relative">
              <input
                type="text"
                placeholder={language === 'ur' ? 'مضامین تلاش کریں...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg bg-white dark:bg-navy border border-black/5 dark:border-gold/10 focus:outline-none focus:border-gold text-sm text-slate-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-slate-400 hover:text-gold transition-colors"
                aria-label="Submit Search"
              >
                <FaSearch size={14} />
              </button>
            </form>
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="bg-white dark:bg-navy rounded-xl shadow-md border border-black/5 overflow-hidden flex flex-col justify-between hover:shadow-luxury transition-all duration-300"
                    >
                      {/* Image Banner */}
                      <Link to={`/blog/${blog.slug}`}>
                        <img
                          src={blog.image || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'}
                          alt={blog.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>

                      {/* Content panel */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-gold uppercase tracking-wider mb-3">
                            <span>{blog.category}</span>
                            <span className="text-slate-400">
                              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          
                          <Link to={`/blog/${blog.slug}`}>
                            <h3 className="font-serif text-lg font-bold text-navy dark:text-white hover:text-gold transition-colors mb-3 leading-snug line-clamp-2">
                              {blog.title}
                            </h3>
                          </Link>
                          
                          {/* Rich Text content teaser snippet */}
                          <div
                            className="text-slate-600 dark:text-gray-300 text-xs line-clamp-3 mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </div>

                        <Link
                          to={`/blog/${blog.slug}`}
                          className="text-xs font-bold text-gold inline-flex items-center gap-1.5 hover:text-gold-light"
                        >
                          {language === 'ur' ? 'تفصیل سے پڑھیں' : 'Read Full Article'} <FaChevronRight size={8} />
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-slate-500">
                    No articles found matching filters.
                  </div>
                )}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-black/5 rounded bg-white dark:bg-navy text-navy dark:text-white disabled:opacity-40 hover:border-gold transition-colors"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <span className="text-sm font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-black/5 rounded bg-white dark:bg-navy text-navy dark:text-white disabled:opacity-40 hover:border-gold transition-colors"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BlogList;
