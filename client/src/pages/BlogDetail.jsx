import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext.jsx';
import SEO from '../components/SEO.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { FaUser, FaCalendarAlt, FaTag, FaChevronLeft } from 'react-icons/fa';

const BlogDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Client Comments State
  const [comments, setComments] = useState([
    { name: 'Kashif Riaz', date: 'June 10, 2026', text: 'Very informative article! SECP guidelines can indeed be tricky for startups.' },
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/blogs/slug/${slug}`);
        if (res.data.success) {
          setBlog(res.data.blog);
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentText) {
      const newComment = {
        name: commentName,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        text: commentText,
      };
      setComments((prev) => [...prev, newComment]);
      setCommentName('');
      setCommentText('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-4">Article Not Found</h2>
        <Link to="/blog" className="btn-gold-grad px-5 py-2.5 rounded text-sm">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription}
        image={blog.image}
        slug={`blog/${blog.slug}`}
        type="article"
      />

      <section className="py-12 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-light mb-8">
            <FaChevronLeft size={10} /> {language === 'ur' ? 'بلاگ پر واپس جائیں' : 'Back to Blog List'}
          </Link>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-b border-gray-200 dark:border-gold/10 pb-6 mb-8">
            <div className="flex items-center gap-1.5">
              <FaUser className="text-gold" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-gold" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <span className="px-2.5 py-0.5 bg-gold/10 text-gold rounded uppercase text-[10px]">
              {blog.category}
            </span>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover rounded-2xl shadow-luxury mb-8 border border-gold/10"
              loading="lazy"
            />
          )}

          {/* Content parsing */}
          <div
            className="prose max-w-none dark:prose-invert text-slate-700 dark:text-gray-200 leading-relaxed text-base space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags list */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-t border-b border-gray-200 dark:border-gold/10 py-6 my-10">
              <span className="text-sm font-semibold flex items-center gap-1 text-navy dark:text-white mr-2">
                <FaTag className="text-gold" /> Tags:
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-navy-light text-slate-600 dark:text-gray-300 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments section */}
          <div className="mt-12 bg-gray-50 dark:bg-navy-light/10 rounded-xl p-6 sm:p-8 border border-black/5">
            <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-6">
              Comments ({comments.length})
            </h3>

            {/* List */}
            <div className="space-y-6 mb-8">
              {comments.map((comment, index) => (
                <div key={index} className="pb-4 border-b border-gray-200 dark:border-gold/10 last:border-none last:pb-0">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-navy dark:text-white">{comment.name}</span>
                    <span className="text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <h4 className="font-serif text-base font-bold text-navy dark:text-white mb-4">
              Leave a Reply
            </h4>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-4 py-2 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <textarea
                placeholder="Comment *"
                rows="4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white dark:bg-navy border border-black/5 dark:border-gold/10 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-gold"
                required
              ></textarea>
              <button type="submit" className="btn-gold-grad px-6 py-2.5 rounded text-xs font-semibold shadow-sm">
                Post Comment
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default BlogDetail;
