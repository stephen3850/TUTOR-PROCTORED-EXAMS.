'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Briefcase,
  HelpCircle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Lock,
  LogOut,
  Search,
  CheckCircle,
  X,
  Save,
  Globe,
  Loader2,
  Eye,
  ShieldCheck,
} from 'lucide-react';

export default function CustomAdminCmsPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Content States
  const [blogArticles, setBlogArticles] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});

  // Loading & Notification States
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemType, setEditingItemType] = useState(''); // 'blog', 'service', 'faq', 'settings'
  const [editFormData, setEditFormData] = useState({});

  // Check stored auth session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('cms_admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchContentData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPass = 'admin12345'; // Default CMS Password
    if (adminPasswordInput === correctPass) {
      setIsAuthenticated(true);
      localStorage.setItem('cms_admin_authenticated', 'true');
      localStorage.setItem('cms_admin_pass', adminPasswordInput);
      setLoginError('');
      fetchContentData();
    } else {
      setLoginError('Invalid password. Default password is: admin12345');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cms_admin_authenticated');
    localStorage.removeItem('cms_admin_pass');
  };

  // Fetch all JSON content from API
  const fetchContentData = async () => {
    setLoading(true);
    try {
      // Fetch Blog Articles
      const blogRes = await fetch('/api/admin/content?file=blog.json');
      const blogJson = await blogRes.json();
      if (blogJson.success && blogJson.data?.articles) {
        setBlogArticles(blogJson.data.articles);
      }

      // Fetch Services
      const servRes = await fetch('/api/admin/content?file=services.json');
      const servJson = await servRes.json();
      if (servJson.success && servJson.data?.services) {
        setServicesList(servJson.data.services);
      }

      // Fetch FAQs
      const faqRes = await fetch('/api/admin/content?file=faqs.json');
      const faqJson = await faqRes.json();
      if (faqJson.success && faqJson.data?.categories) {
        setFaqsList(faqJson.data.categories);
      }

      // Fetch Settings
      const setRes = await fetch('/api/admin/content?file=settings.json');
      const setJson = await setRes.json();
      if (setJson.success && setJson.data) {
        setSiteSettings(setJson.data);
      }
    } catch (err) {
      console.error('Failed to load content', err);
    } finally {
      setLoading(false);
    }
  };

  // Save updated JSON to backend API
  const saveContentFile = async (fileName, dataPayload) => {
    setLoading(true);
    setSaveStatus('');
    try {
      const currentPass = localStorage.getItem('cms_admin_pass') || 'admin12345';
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: fileName,
          data: dataPayload,
          password: currentPass,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSaveStatus('Changes saved successfully!');
        setIsModalOpen(false);
        fetchContentData();
      } else {
        setSaveStatus(`Error: ${json.error}`);
      }
    } catch (err) {
      setSaveStatus('Failed to save changes.');
    } finally {
      setLoading(false);
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  // Modal Handlers
  const openBlogEditor = (article = null) => {
    setEditingItemType('blog');
    setEditFormData(
      article || {
        slug: `new-article-${Date.now()}`,
        title: '',
        category: 'Examination Preparation',
        publishDate: new Date().toISOString().split('T')[0],
        excerpt: '',
        intro: '',
        metaTitle: '',
        metaDescription: '',
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveBlog = () => {
    let updated;
    const existingIndex = blogArticles.findIndex((a) => a.slug === editFormData.slug);
    if (existingIndex >= 0) {
      updated = [...blogArticles];
      updated[existingIndex] = editFormData;
    } else {
      updated = [editFormData, ...blogArticles];
    }
    saveContentFile('blog.json', { articles: updated });
  };

  const handleDeleteBlog = (slug) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = blogArticles.filter((a) => a.slug !== slug);
      saveContentFile('blog.json', { articles: updated });
    }
  };

  const openServiceEditor = (service) => {
    setEditingItemType('service');
    setEditFormData(service);
    setIsModalOpen(true);
  };

  const handleSaveService = () => {
    const updated = servicesList.map((s) => (s.slug === editFormData.slug ? editFormData : s));
    saveContentFile('services.json', { services: updated });
  };

  const openSettingsEditor = () => {
    setEditingItemType('settings');
    setEditFormData({ ...siteSettings });
    setIsModalOpen(true);
  };

  const handleSaveSettings = () => {
    saveContentFile('settings.json', editFormData);
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#130924] flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="bg-[#1E1035] border border-purple-900/50 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">TUTOR PROCTORED EXAMS</h1>
            <p className="text-xs text-purple-300/80">Content Management System Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-purple-200 mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="Enter CMS Password (Default: admin12345)"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#130924] border border-purple-800/60 text-white placeholder-purple-400/50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm shadow-xl transition-all tracking-wide"
            >
              Sign In to CMS Dashboard
            </button>
          </form>

          <div className="text-center text-[11px] text-purple-400/60 border-t border-purple-900/40 pt-4">
            Default Password: <code className="bg-[#130924] px-2 py-0.5 rounded text-purple-300 font-mono">admin12345</code>
          </div>
        </div>
      </div>
    );
  }

  // 2. LOGGED IN CMS DASHBOARD UI (MATCHING SCREENSHOT)
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">
      {/* DARK PURPLE SIDEBAR (MATCHING SCREENSHOT) */}
      <aside className="w-64 bg-[#1E1035] text-purple-200 shrink-0 flex flex-col justify-between p-6 shadow-xl">
        <div className="space-y-8">
          {/* Logo / Header */}
          <div className="space-y-1">
            <h2 className="text-lg font-black text-white tracking-tight leading-none">
              TUTOR PROCTORED EXAMS
            </h2>
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider block">
              CMS Control Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'blogs'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Blogs ({blogArticles.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'pages'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pages</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'services'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services ({servicesList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'faqs'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Documents & FAQs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Settings & SEO</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6 border-t border-purple-900/40">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>View Live Website</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-8 space-y-6 overflow-y-auto">
        {saveStatus && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              {saveStatus}
            </span>
            <button onClick={() => setSaveStatus('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">CMS Overview Dashboard</h1>
                <p className="text-xs text-slate-500">Manage all website content, articles, pages, and SEO metadata</p>
              </div>
              <button
                onClick={() => openBlogEditor()}
                className="px-5 py-2.5 rounded-xl bg-[#581C87] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Article</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Blog Articles</span>
                <div className="text-3xl font-black text-purple-900">{blogArticles.length}</div>
                <span className="text-[11px] text-emerald-600 font-bold">Live & Indexable</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Services</span>
                <div className="text-3xl font-black text-purple-900">{servicesList.length}</div>
                <span className="text-[11px] text-emerald-600 font-bold">12 Active Programs</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">FAQ Categories</span>
                <div className="text-3xl font-black text-purple-900">{faqsList.length}</div>
                <span className="text-[11px] text-slate-500 font-bold">Grouped Questions</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">System Status</span>
                <div className="text-xl font-black text-emerald-600">Operational</div>
                <span className="text-[11px] text-slate-500 font-bold">Hostinger Live</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOGS CATALOGUE (MATCHING SCREENSHOT DATA TABLE) */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Blog Catalogue</h1>
                <p className="text-xs text-slate-500">Edit, add, or delete blog posts and SEO meta descriptions</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>

                {/* ADD NEW BUTTON (MATCHING SCREENSHOT) */}
                <button
                  onClick={() => openBlogEditor()}
                  className="px-5 py-2.5 rounded-xl bg-[#581C87] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add new</span>
                </button>
              </div>
            </div>

            {/* DATA TABLE (MATCHING SCREENSHOT DESIGN) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">#</th>
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Slug ID</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {blogArticles
                    .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((article, idx) => (
                      <tr key={article.slug} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-mono text-slate-400">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate">
                          {article.title}
                        </td>
                        <td className="py-4 px-6 font-mono text-slate-500 text-[11px]">
                          #{article.slug}
                        </td>
                        <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                          {article.publishDate}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-bold text-[10px]">
                            {article.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                          <button
                            onClick={() => openBlogEditor(article)}
                            className="text-purple-700 hover:text-purple-900 font-bold transition-colors inline-flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(article.slug)}
                            className="text-rose-600 hover:text-rose-800 font-bold transition-colors inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PAGES CATALOGUE */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-900">Website Pages</h1>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
              <p className="text-xs text-slate-600">All primary landing pages (Home, About, Services, Certifications, Platforms, Study Resources, FAQ, Contact) are active.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['/', '/about', '/services', '/exam-platforms', '/certifications', '/study-resources', '/faq', '/contact'].map((path) => (
                  <div key={path} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{path === '/' ? 'Homepage' : path.substring(1).toUpperCase()}</span>
                      <span className="text-[11px] text-slate-500 font-mono">https://tutorproctoredexams.com{path}</span>
                    </div>
                    <a href={path} target="_blank" className="p-2 bg-white border border-slate-200 rounded-lg text-purple-700 hover:bg-purple-50">
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES CATALOGUE */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-900">Services Directory</h1>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Tagline</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {servicesList.map((service) => (
                    <tr key={service.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{service.title}</td>
                      <td className="py-4 px-6"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">{service.category}</span></td>
                      <td className="py-4 px-6 text-slate-500 max-w-sm truncate">{service.tagline || service.overview}</td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => openServiceEditor(service)} className="text-purple-700 font-bold inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-slate-900">FAQs & Documents</h1>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <p className="text-xs text-slate-600">Frequently Asked Questions grouped by category ({faqsList.length} categories active).</p>
            </div>
          </div>
        )}

        {/* TAB 6: SITE SETTINGS & SEO */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Site Settings & SEO</h1>
                <p className="text-xs text-slate-500">Global Website Metadata, Contact Information, and Google Analytics</p>
              </div>
              <button
                onClick={openSettingsEditor}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Settings</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div><span className="text-slate-400 font-bold uppercase block">Site Name</span> <span className="font-bold text-slate-800">{siteSettings.siteName}</span></div>
                <div><span className="text-slate-400 font-bold uppercase block">Site URL</span> <span className="font-mono text-purple-700">{siteSettings.siteUrl}</span></div>
              </div>
              <div className="space-y-1 border-b pb-4">
                <span className="text-slate-400 font-bold uppercase block">Default SEO Title</span>
                <span className="font-bold text-slate-800">{siteSettings.defaultMetaTitle}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase block">Default Meta Description</span>
                <span className="text-slate-600 leading-relaxed">{siteSettings.defaultMetaDescription}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDITING MODAL (POPUP FORM) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-black text-slate-900">
                {editingItemType === 'blog' && (editFormData.slug ? 'Edit Article' : 'Create New Article')}
                {editingItemType === 'service' && 'Edit Service Details'}
                {editingItemType === 'settings' && 'Edit Site Settings & SEO'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BLOG FORM FIELDS */}
            {editingItemType === 'blog' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Title</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Publish Date</label>
                    <input
                      type="date"
                      value={editFormData.publishDate || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, publishDate: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Excerpt</label>
                  <textarea
                    rows={3}
                    value={editFormData.excerpt || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">SEO Meta Title (Optional Override)</label>
                  <input
                    type="text"
                    value={editFormData.metaTitle || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">SEO Meta Description (Optional Override)</label>
                  <textarea
                    rows={2}
                    value={editFormData.metaDescription || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* SERVICE FORM FIELDS */}
            {editingItemType === 'service' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Title</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editFormData.tagline || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Overview Description</label>
                  <textarea
                    rows={4}
                    value={editFormData.overview || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, overview: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* SETTINGS FORM FIELDS */}
            {editingItemType === 'settings' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Website Name</label>
                  <input
                    type="text"
                    value={editFormData.siteName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, siteName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default SEO Meta Title</label>
                  <input
                    type="text"
                    value={editFormData.defaultMetaTitle || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, defaultMetaTitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Default Meta Description</label>
                  <textarea
                    rows={3}
                    value={editFormData.defaultMetaDescription || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, defaultMetaDescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* MODAL ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (editingItemType === 'blog') handleSaveBlog();
                  if (editingItemType === 'service') handleSaveService();
                  if (editingItemType === 'settings') handleSaveSettings();
                }}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
