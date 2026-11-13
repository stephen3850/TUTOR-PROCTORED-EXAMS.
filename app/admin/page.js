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
  Inbox,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  ExternalLink,
  Navigation,
  Sparkles,
  MapPin,
  Award,
  Cpu,
  FolderOpen,
  Image as ImageIcon,
  UploadCloud,
  Check,
  ToggleLeft,
  ToggleRight,
  ArrowUp,
  ArrowDown,
  Layers,
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
  const [inquiriesList, setInquiriesList] = useState([]);
  const [pagesData, setPagesData] = useState({});
  const [navData, setNavData] = useState({ topBanner: {}, navLinks: [] });
  const [certificationsList, setCertificationsList] = useState([]);
  const [platformsList, setPlatformsList] = useState([]);
  const [studyResourcesList, setStudyResourcesList] = useState([]);
  const [partnershipsList, setPartnershipsList] = useState([]);

  // Media Library State
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTargetField, setMediaPickerTargetField] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Loading & Notification States
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('All');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('All');
  const [faqLocationFilter, setFaqLocationFilter] = useState('All');

  // Editor & View Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemType, setEditingItemType] = useState(''); // 'blog', 'service', 'faq', 'settings', 'inquiry', 'page', 'navigation', 'certification', 'platform', 'resource', 'partnership'
  const [editFormData, setEditFormData] = useState({});

  // Check stored auth session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('cms_admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchContentData();
      fetchMediaLibrary();
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
      fetchMediaLibrary();
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

      // Fetch Inquiries
      const inqRes = await fetch('/api/admin/content?file=inquiries.json');
      const inqJson = await inqRes.json();
      if (inqJson.success && inqJson.data?.inquiries) {
        setInquiriesList(inqJson.data.inquiries);
      }

      // Fetch Pages Data
      const pageRes = await fetch('/api/admin/content?file=pages.json');
      const pageJson = await pageRes.json();
      if (pageJson.success && pageJson.data?.pages) {
        setPagesData(pageJson.data.pages);
      }

      // Fetch Navigation Data
      const navRes = await fetch('/api/admin/content?file=navigation.json');
      const navJson = await navRes.json();
      if (navJson.success && navJson.data) {
        setNavData(navJson.data);
      }

      // Fetch Certifications
      const certRes = await fetch('/api/admin/content?file=certifications.json');
      const certJson = await certRes.json();
      if (certJson.success && certJson.data?.certifications) {
        setCertificationsList(certJson.data.certifications);
      }

      // Fetch Exam Platforms
      const platRes = await fetch('/api/admin/content?file=platforms.json');
      const platJson = await platRes.json();
      if (platJson.success && platJson.data?.platforms) {
        setPlatformsList(platJson.data.platforms);
      }

      // Fetch Study Resources
      const resRes = await fetch('/api/admin/content?file=study-resources.json');
      const resJson = await resRes.json();
      if (resJson.success && resJson.data?.resources) {
        setStudyResourcesList(resJson.data.resources);
      }

      // Fetch Partnerships & Logos
      const partRes = await fetch('/api/admin/content?file=partnerships.json');
      const partJson = await partRes.json();
      if (partJson.success && partJson.data?.partners) {
        setPartnershipsList(partJson.data.partners);
      }
    } catch (err) {
      console.error('Failed to load content', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Media Library Images
  const fetchMediaLibrary = async () => {
    try {
      const res = await fetch('/api/admin/upload');
      const json = await res.json();
      if (json.success && json.media) {
        setMediaLibrary(json.media);
      }
    } catch (err) {
      console.error('Failed to load media library', err);
    }
  };

  // Upload New Image
  const handleUploadImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const currentPass = localStorage.getItem('cms_admin_pass') || 'admin12345';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', currentPass);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        setSaveStatus(`Image uploaded: ${json.filename}`);
        fetchMediaLibrary();
        if (mediaPickerTargetField) {
          setEditFormData((prev) => ({ ...prev, [mediaPickerTargetField]: json.url }));
          setIsMediaPickerOpen(false);
        }
      } else {
        alert(`Upload error: ${json.error}`);
      }
    } catch (err) {
      alert('Failed to upload image file.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete Media Image
  const handleDeleteMediaImage = async (filename) => {
    if (!confirm(`Are you sure you want to delete image "${filename}" from server storage?`)) return;

    try {
      const currentPass = localStorage.getItem('cms_admin_pass') || 'admin12345';
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(filename)}&password=${encodeURIComponent(currentPass)}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setSaveStatus(`Image deleted: ${filename}`);
        fetchMediaLibrary();
      } else {
        alert(`Delete error: ${json.error}`);
      }
    } catch (err) {
      alert('Failed to delete media file.');
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

  // Open Media Picker Modal for a specific field
  const openMediaPickerFor = (fieldName) => {
    setMediaPickerTargetField(fieldName);
    fetchMediaLibrary();
    setIsMediaPickerOpen(true);
  };

  // Select Image from Media Picker
  const selectMediaImage = (url) => {
    if (mediaPickerTargetField) {
      setEditFormData((prev) => ({ ...prev, [mediaPickerTargetField]: url }));
    }
    setIsMediaPickerOpen(false);
  };

  // --- BLOG HANDLERS ---
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
        published: true,
        order: blogArticles.length + 1,
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

  // --- SERVICE HANDLERS ---
  const openServiceEditor = (service = null) => {
    setEditingItemType('service');
    setEditFormData(
      service || {
        slug: `new-service-${Date.now()}`,
        title: '',
        category: 'Academic Support',
        tagline: '',
        overview: '',
        heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        published: true,
        order: servicesList.length + 1,
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveService = () => {
    let updated;
    const existingIndex = servicesList.findIndex((s) => s.slug === editFormData.slug);
    if (existingIndex >= 0) {
      updated = [...servicesList];
      updated[existingIndex] = editFormData;
    } else {
      updated = [...servicesList, editFormData];
    }
    saveContentFile('services.json', { services: updated });
  };

  const handleDeleteService = (slug) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updated = servicesList.filter((s) => s.slug !== slug);
      saveContentFile('services.json', { services: updated });
    }
  };

  // --- CERTIFICATION HANDLERS ---
  const openCertEditor = (cert = null) => {
    setEditingItemType('certification');
    setEditFormData(
      cert || {
        slug: `new-cert-${Date.now()}`,
        title: '',
        category: 'Project Management',
        description: '',
        logo: '/logos/pmp.svg',
        published: true,
        order: certificationsList.length + 1,
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveCertification = () => {
    let updated;
    const existingIndex = certificationsList.findIndex((c) => c.slug === editFormData.slug);
    if (existingIndex >= 0) {
      updated = [...certificationsList];
      updated[existingIndex] = editFormData;
    } else {
      updated = [...certificationsList, editFormData];
    }
    saveContentFile('certifications.json', { certifications: updated });
  };

  const handleDeleteCertification = (slug) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      const updated = certificationsList.filter((c) => c.slug !== slug);
      saveContentFile('certifications.json', { certifications: updated });
    }
  };

  // --- EXAM PLATFORM HANDLERS ---
  const openPlatformEditor = (platform = null) => {
    setEditingItemType('platform');
    setEditFormData(
      platform || {
        slug: `new-platform-${Date.now()}`,
        title: '',
        description: '',
        logo: '/logos/respondus.svg',
        published: true,
        order: platformsList.length + 1,
      }
    );
    setIsModalOpen(true);
  };

  const handleSavePlatform = () => {
    let updated;
    const existingIndex = platformsList.findIndex((p) => p.slug === editFormData.slug);
    if (existingIndex >= 0) {
      updated = [...platformsList];
      updated[existingIndex] = editFormData;
    } else {
      updated = [...platformsList, editFormData];
    }
    saveContentFile('platforms.json', { platforms: updated });
  };

  const handleDeletePlatform = (slug) => {
    if (confirm('Are you sure you want to delete this exam platform?')) {
      const updated = platformsList.filter((p) => p.slug !== slug);
      saveContentFile('platforms.json', { platforms: updated });
    }
  };

  // --- STUDY RESOURCE HANDLERS ---
  const openResourceEditor = (resource = null) => {
    setEditingItemType('resource');
    setEditFormData(
      resource || {
        slug: `new-resource-${Date.now()}`,
        title: '',
        category: 'Project Management',
        description: '',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
        published: true,
        order: studyResourcesList.length + 1,
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveResource = () => {
    let updated;
    const existingIndex = studyResourcesList.findIndex((r) => r.slug === editFormData.slug);
    if (existingIndex >= 0) {
      updated = [...studyResourcesList];
      updated[existingIndex] = editFormData;
    } else {
      updated = [...studyResourcesList, editFormData];
    }
    saveContentFile('study-resources.json', { resources: updated });
  };

  const handleDeleteResource = (slug) => {
    if (confirm('Are you sure you want to delete this study resource?')) {
      const updated = studyResourcesList.filter((r) => r.slug !== slug);
      saveContentFile('study-resources.json', { resources: updated });
    }
  };

  // --- PARTNERSHIP / LOGO HANDLERS ---
  const openPartnershipEditor = (partner = null) => {
    setEditingItemType('partnership');
    setEditFormData(
      partner || {
        id: `partner-${Date.now()}`,
        name: '',
        logo: '/logos/pmp.svg',
        url: '/',
        published: true,
        order: partnershipsList.length + 1,
      }
    );
    setIsModalOpen(true);
  };

  const handleSavePartnership = () => {
    let updated;
    const existingIndex = partnershipsList.findIndex((p) => (p.id && p.id === editFormData.id) || p.name === editFormData.name);
    if (existingIndex >= 0) {
      updated = [...partnershipsList];
      updated[existingIndex] = editFormData;
    } else {
      updated = [...partnershipsList, editFormData];
    }
    saveContentFile('partnerships.json', { partners: updated });
  };

  const handleDeletePartnership = (identifier) => {
    if (confirm('Are you sure you want to delete this partner logo?')) {
      const updated = partnershipsList.filter((p) => p.id !== identifier && p.name !== identifier);
      saveContentFile('partnerships.json', { partners: updated });
    }
  };

  // --- SETTINGS & INQUIRY HANDLERS ---
  const openSettingsEditor = () => {
    setEditingItemType('settings');
    setEditFormData({ ...siteSettings });
    setIsModalOpen(true);
  };

  const handleSaveSettings = () => {
    saveContentFile('settings.json', editFormData);
  };

  const openInquiryViewer = (inquiry) => {
    setEditingItemType('inquiry');
    setEditFormData(inquiry);
    setIsModalOpen(true);
  };

  const handleToggleInquiryStatus = (inquiryId) => {
    const updated = inquiriesList.map((inq) => {
      if (inq.id === inquiryId) {
        return { ...inq, status: inq.status === 'New' ? 'Responded' : 'New' };
      }
      return inq;
    });
    saveContentFile('inquiries.json', { inquiries: updated });
  };

  const handleDeleteInquiry = (inquiryId) => {
    if (confirm('Are you sure you want to delete this inquiry submission?')) {
      const updated = inquiriesList.filter((inq) => inq.id !== inquiryId);
      saveContentFile('inquiries.json', { inquiries: updated });
    }
  };

  // FAQ Editor Handlers
  const openFaqEditor = (catName = 'General Questions', item = null) => {
    setEditingItemType('faq');
    setEditFormData(
      item
        ? { ...item, originalQuestion: item.question, category: catName }
        : {
            category: catName,
            originalQuestion: '',
            question: '',
            answer: '',
            pageLocation: '/faq',
          }
    );
    setIsModalOpen(true);
  };

  const handleSaveFaq = () => {
    const targetCat = editFormData.category || 'General Questions';
    const targetLoc = editFormData.pageLocation || '/faq';

    let catFound = false;
    const updatedCategories = faqsList.map((catObj) => {
      if (catObj.category.toLowerCase() === targetCat.toLowerCase()) {
        catFound = true;
        let items = catObj.items || [];
        const matchIndex = items.findIndex(
          (i) => i.question === editFormData.originalQuestion || i.question === editFormData.question
        );
        if (matchIndex >= 0) {
          items[matchIndex] = {
            question: editFormData.question,
            answer: editFormData.answer,
            pageLocation: targetLoc,
          };
        } else {
          items = [
            ...items,
            {
              question: editFormData.question,
              answer: editFormData.answer,
              pageLocation: targetLoc,
            },
          ];
        }
        return { ...catObj, pageLocation: targetLoc, items };
      }
      return catObj;
    });

    if (!catFound) {
      updatedCategories.push({
        category: targetCat,
        pageLocation: targetLoc,
        items: [
          {
            question: editFormData.question,
            answer: editFormData.answer,
            pageLocation: targetLoc,
          },
        ],
      });
    }

    saveContentFile('faqs.json', { categories: updatedCategories });
  };

  const handleDeleteFaq = (categoryName, questionText) => {
    if (confirm('Are you sure you want to delete this FAQ question?')) {
      const updatedCategories = faqsList.map((catObj) => {
        if (catObj.category === categoryName) {
          return {
            ...catObj,
            items: (catObj.items || []).filter((i) => i.question !== questionText),
          };
        }
        return catObj;
      });
      saveContentFile('faqs.json', { categories: updatedCategories });
    }
  };

  // Page Content & Navbar Handlers
  const openPageEditor = (pageKey, defaultObj) => {
    setEditingItemType('page');
    setEditFormData({
      pageKey,
      ...(pagesData[pageKey] || defaultObj),
    });
    setIsModalOpen(true);
  };

  const handleSavePage = () => {
    const pageKey = editFormData.pageKey;
    const updatedPages = {
      ...pagesData,
      [pageKey]: editFormData,
    };
    setPagesData(updatedPages);
    saveContentFile('pages.json', { pages: updatedPages });
  };

  const openNavEditor = () => {
    setEditingItemType('navigation');
    setEditFormData(JSON.parse(JSON.stringify(navData)));
    setIsModalOpen(true);
  };

  const handleSaveNavigation = () => {
    setNavData(editFormData);
    saveContentFile('navigation.json', editFormData);
  };

  // Flattened FAQ items list with page location
  const allFlattenedFaqs = faqsList.flatMap((catObj) =>
    (catObj.items || []).map((item) => ({
      ...item,
      category: catObj.category,
      pageLocation: item.pageLocation || catObj.pageLocation || '/faq',
    }))
  );

  // Extract unique page locations for filter pills
  const uniquePageLocations = ['All', ...Array.from(new Set(allFlattenedFaqs.map((f) => f.pageLocation)))];

  const newInquiriesCount = inquiriesList.filter((i) => i.status === 'New').length;

  // Pages Directory Definition
  const ALL_SITE_PAGES = [
    { key: 'home', slug: '/', name: 'Homepage', path: '/' },
    { key: 'about', slug: '/about', name: 'About Us', path: '/about' },
    { key: 'services', slug: '/services', name: 'Services Directory', path: '/services' },
    { key: 'exam-platforms', slug: '/exam-platforms', name: 'Exam Platforms', path: '/exam-platforms' },
    { key: 'certifications', slug: '/certifications', name: 'Certifications', path: '/certifications' },
    { key: 'study-resources', slug: '/study-resources', name: 'Study Resources', path: '/study-resources' },
    { key: 'faq', slug: '/faq', name: 'FAQ Page', path: '/faq' },
    { key: 'contact', slug: '/contact', name: 'Contact Page', path: '/contact' },
  ];

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

  // 2. LOGGED IN CMS DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">
      {/* DARK PURPLE SIDEBAR */}
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
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* INQUIRIES TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inquiries</span>
              </div>
              {newInquiriesCount > 0 ? (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {newInquiriesCount}
                </span>
              ) : (
                <span className="text-[10px] text-purple-400 font-bold">{inquiriesList.length}</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'pages'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pages & Navbar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'services'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services ({servicesList.length})</span>
            </button>

            {/* CERTIFICATIONS MANAGER TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'certifications'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications ({certificationsList.length})</span>
            </button>

            {/* EXAM PLATFORMS MANAGER TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('platforms')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'platforms'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Exam Platforms ({platformsList.length})</span>
            </button>

            {/* STUDY RESOURCES MANAGER TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'resources'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Study Resources ({studyResourcesList.length})</span>
            </button>

            {/* PARTNERSHIPS & LOGOS TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('partnerships')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'partnerships'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Partners & Logos ({partnershipsList.length})</span>
            </button>

            {/* DOCUMENTS & FAQS TAB */}
            <button
              type="button"
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'faqs'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'hover:bg-purple-900/40 text-purple-300 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Documents & FAQs ({allFlattenedFaqs.length})</span>
            </button>

            {/* MEDIA LIBRARY BUTTON */}
            <button
              type="button"
              onClick={() => openMediaPickerFor('')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-purple-300 hover:bg-purple-900/40 hover:text-white transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library ({mediaLibrary.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
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
                <p className="text-xs text-slate-500">Manage all website content, FAQs, customer inquiries, pages, and SEO metadata</p>
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
                <span className="text-xs font-bold text-slate-400 uppercase">Customer Inquiries</span>
                <div className="text-3xl font-black text-purple-900">{inquiriesList.length}</div>
                <span className="text-[11px] text-rose-600 font-bold">{newInquiriesCount} Unread / New</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Certifications</span>
                <div className="text-3xl font-black text-purple-900">{certificationsList.length}</div>
                <span className="text-[11px] text-emerald-600 font-bold">10 Active Programs</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Exam Platforms</span>
                <div className="text-3xl font-black text-purple-900">{platformsList.length}</div>
                <span className="text-[11px] text-emerald-600 font-bold">9 Supported Softwares</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Media Library</span>
                <div className="text-3xl font-black text-purple-900">{mediaLibrary.length}</div>
                <span className="text-[11px] text-emerald-600 font-bold">Uploaded Images</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CERTIFICATIONS MANAGER */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Certifications Manager</h1>
                <p className="text-xs text-slate-500">Manage professional certification preparation programs, logos, and descriptions</p>
              </div>
              <button
                onClick={() => openCertEditor()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Slug</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {certificationsList.map((cert) => (
                    <tr key={cert.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{cert.title}</td>
                      <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-bold text-[10px]">{cert.category}</span></td>
                      <td className="py-4 px-6 font-mono text-slate-500 text-[11px]">{cert.slug}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cert.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {cert.published !== false ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => openCertEditor(cert)} className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteCertification(cert.slug)} className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1">
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

        {/* TAB: EXAM PLATFORMS MANAGER */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Exam Platforms Manager</h1>
                <p className="text-xs text-slate-500">Manage supported assessment platforms, technical guides, and requirements</p>
              </div>
              <button
                onClick={() => openPlatformEditor()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Exam Platform</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Slug</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {platformsList.map((plat) => (
                    <tr key={plat.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{plat.title}</td>
                      <td className="py-4 px-6 font-mono text-slate-500 text-[11px]">{plat.slug}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${plat.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {plat.published !== false ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => openPlatformEditor(plat)} className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeletePlatform(plat.slug)} className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1">
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

        {/* TAB: STUDY RESOURCES MANAGER */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Study Resources Manager</h1>
                <p className="text-xs text-slate-500">Manage revision guides, formula sheets, and study material catalogues</p>
              </div>
              <button
                onClick={() => openResourceEditor()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Study Resource</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Slug</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {studyResourcesList.map((res) => (
                    <tr key={res.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{res.title}</td>
                      <td className="py-4 px-6"><span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-bold text-[10px]">{res.category}</span></td>
                      <td className="py-4 px-6 font-mono text-slate-500 text-[11px]">{res.slug}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${res.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {res.published !== false ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => openResourceEditor(res)} className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteResource(res.slug)} className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1">
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

        {/* TAB: PARTNERSHIPS & LOGOS MANAGER */}
        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Partnerships & Logos Manager</h1>
                <p className="text-xs text-slate-500">Manage partner logos, order, target links, and homepage slider visibility</p>
              </div>
              <button
                onClick={() => openPartnershipEditor()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner Logo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {partnershipsList.map((partner, idx) => (
                <div key={partner.id || idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-16 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center mx-auto">
                      <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-extrabold text-sm text-slate-900">{partner.name}</h4>
                      <span className="font-mono text-[10px] text-slate-400 block truncate">{partner.url}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${partner.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {partner.published !== false ? 'Published' : 'Unpublished'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button onClick={() => openPartnershipEditor(partner)} className="text-purple-700 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDeletePartnership(partner.id || partner.name)} className="text-rose-600 hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PAGES & NAVBAR MANAGEMENT */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Website Pages & Navigation Manager</h1>
                <p className="text-xs text-slate-500">Edit titles, subtitles, hero text, SEO metadata, and top navigation bar links</p>
              </div>

              <button
                onClick={openNavEditor}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Edit Navigation Bar</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#1E1035] to-purple-900 text-white p-6 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Top Navigation & Announcement Bar
                </div>
                <button
                  onClick={openNavEditor}
                  className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all"
                >
                  Edit Header Navbar
                </button>
              </div>
              <p className="text-xs text-purple-100 font-medium leading-relaxed">
                <strong>Announcement Banner:</strong> &ldquo;{navData.topBanner?.mainAnnouncement || 'Ethical Educational Support & Proctoring Software Technical Guidance for Students Worldwide'}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ALL_SITE_PAGES.map((pg) => {
                const pageInfo = pagesData[pg.key] || {};
                const pageFaqCount = allFlattenedFaqs.filter((f) => f.pageLocation === pg.path || f.pageLocation.startsWith(pg.path)).length;

                return (
                  <div
                    key={pg.key}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-purple-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">{pg.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {pageFaqCount} FAQs
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                            {pg.slug}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium line-clamp-2">
                        {pageInfo.subtitle || pageInfo.metaDescription || `Content manager for ${pg.name}`}
                      </p>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono truncate">
                        https://tutorproctoredexams.com{pg.path}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setFaqLocationFilter(pg.path);
                          setActiveTab('faqs');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" /> Filter FAQs ({pageFaqCount})
                      </button>

                      <a
                        href={pg.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" /> View Page
                      </a>

                      <button
                        onClick={() => openPageEditor(pg.key, pg)}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Page
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: FAQS & DOCUMENTS CATALOGUE */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Documents & FAQs Catalogue</h1>
                <p className="text-xs text-slate-500">
                  Manage and edit all {allFlattenedFaqs.length} frequently asked questions grouped separately by website page location
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search question, page URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <button
                  onClick={() => openFaqEditor()}
                  className="px-5 py-2.5 rounded-xl bg-[#581C87] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-md flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> Filter FAQs by Website Page Location:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {uniquePageLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setFaqLocationFilter(loc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      faqLocationFilter === loc
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {loc === 'All' ? 'All Locations' : loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">#</th>
                    <th className="py-3.5 px-6">Question</th>
                    <th className="py-3.5 px-6">Answer Text</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Page Location</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {allFlattenedFaqs
                    .filter((item) => {
                      const matchesLocation =
                        faqLocationFilter === 'All' ||
                        item.pageLocation === faqLocationFilter ||
                        item.pageLocation.startsWith(faqLocationFilter);
                      const matchesCategory =
                        faqCategoryFilter === 'All' || item.category === faqCategoryFilter;
                      const matchesSearch =
                        searchQuery.trim() === '' ||
                        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.pageLocation.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchesLocation && matchesCategory && matchesSearch;
                    })
                    .map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-mono text-slate-400">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td
                          onClick={() => openFaqEditor(item.category, item)}
                          className="py-4 px-6 font-bold text-slate-900 max-w-xs leading-snug cursor-pointer hover:text-purple-700 transition-colors"
                        >
                          {item.question}
                        </td>
                        <td className="py-4 px-6 text-slate-500 max-w-sm truncate">
                          {item.answer}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-bold text-[10px] whitespace-nowrap">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <a
                            href={item.pageLocation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-purple-700 bg-purple-50/80 px-2.5 py-1 rounded-lg border border-purple-200 hover:underline"
                          >
                            <span>{item.pageLocation}</span>
                            <ExternalLink className="w-3 h-3 text-purple-500" />
                          </a>
                        </td>
                        <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                          <button
                            onClick={() => openFaqEditor(item.category, item)}
                            className="text-purple-700 hover:text-purple-900 font-bold transition-colors inline-flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit FAQ
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(item.category, item.question)}
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

        {/* TAB: INQUIRIES CATALOGUE */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Website Form Inquiries</h1>
                <p className="text-xs text-slate-500">View and respond to all student and customer inquiries submitted from website forms</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
                  {['All', 'New', 'Responded'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setInquiryFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        inquiryFilter === st ? 'bg-white text-purple-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Customer Name</th>
                    <th className="py-3.5 px-6">Email / Phone</th>
                    <th className="py-3.5 px-6">Service Requested</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {inquiriesList
                    .filter((inq) => {
                      const matchesStatus = inquiryFilter === 'All' || inq.status === inquiryFilter;
                      const matchesSearch =
                        searchQuery.trim() === '' ||
                        inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inq.service.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchesStatus && matchesSearch;
                    })
                    .map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {inq.date}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-900">{inq.fullName}</td>
                        <td className="py-4 px-6 text-slate-600">
                          <div>{inq.email}</div>
                          <div className="text-[11px] text-slate-400">{inq.phone}</div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-700">{inq.service}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              inq.status === 'New'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                          <button
                            onClick={() => openInquiryViewer(inq)}
                            className="text-purple-700 hover:text-purple-900 font-bold transition-colors inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Message
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
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

        {/* TAB 2: BLOGS CATALOGUE */}
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

                <button
                  onClick={() => openBlogEditor()}
                  className="px-5 py-2.5 rounded-xl bg-[#581C87] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add new</span>
                </button>
              </div>
            </div>

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

        {/* TAB 4: SERVICES CATALOGUE */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Services Directory</h1>
                <p className="text-xs text-slate-500">Manage learning support programs, descriptions, and hero images</p>
              </div>
              <button
                onClick={() => openServiceEditor()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-500">
                    <th className="py-3.5 px-6">Title</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Tagline</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {servicesList.map((service) => (
                    <tr key={service.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{service.title}</td>
                      <td className="py-4 px-6"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">{service.category}</span></td>
                      <td className="py-4 px-6 text-slate-500 max-w-sm truncate">{service.tagline || service.overview}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${service.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {service.published !== false ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button onClick={() => openServiceEditor(service)} className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1">
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDeleteService(service.slug)} className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1">
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

      {/* MEDIA LIBRARY & IMAGE PICKER MODAL */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <span>Media Library & Image Upload</span>
              </h2>
              <button onClick={() => setIsMediaPickerOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* UPLOAD NEW IMAGE DROPZONE */}
            <div className="p-6 border-2 border-dashed border-purple-300 bg-purple-50/50 rounded-2xl text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-purple-600 mx-auto" />
              <div>
                <span className="font-extrabold text-sm text-slate-900 block">Upload New Image File</span>
                <span className="text-xs text-slate-500">Supports PNG, JPG, WEBP, SVG, GIF (Max file size: 5MB)</span>
              </div>

              <label className="inline-block px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md transition-colors">
                {uploadingImage ? 'Uploading Image...' : 'Choose File to Upload'}
                <input
                  type="file"
                  accept="image/*,.svg"
                  onChange={handleUploadImageFile}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {/* MEDIA GALLERY GRID */}
            <div className="space-y-2">
              <span className="font-extrabold text-xs text-slate-700 block">Server Storage Gallery ({mediaLibrary.length} files)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-64 overflow-y-auto p-1">
                {mediaLibrary.map((item) => (
                  <div key={item.filename} className="group border border-slate-200 rounded-xl p-2 bg-slate-50 hover:border-purple-500 flex flex-col justify-between space-y-2">
                    <div className="h-20 bg-white rounded-lg border flex items-center justify-center p-1 overflow-hidden">
                      <img src={item.url} alt={item.filename} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-600 truncate block">{item.filename}</span>
                    <div className="flex items-center justify-between pt-1 border-t">
                      <button
                        onClick={() => selectMediaImage(item.url)}
                        className="text-[10px] font-bold text-purple-700 hover:underline inline-flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Select
                      </button>
                      <button
                        onClick={() => handleDeleteMediaImage(item.filename)}
                        className="text-[10px] font-bold text-rose-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button onClick={() => setIsMediaPickerOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600">
                Close Media Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITING / VIEWING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-black text-slate-900">
                {editingItemType === 'blog' && (editFormData.slug ? 'Edit Article' : 'Create New Article')}
                {editingItemType === 'service' && 'Edit Service Details'}
                {editingItemType === 'certification' && 'Edit Certification Program'}
                {editingItemType === 'platform' && 'Edit Exam Platform'}
                {editingItemType === 'resource' && 'Edit Study Resource'}
                {editingItemType === 'partnership' && 'Edit Partner Logo'}
                {editingItemType === 'settings' && 'Edit Site Settings & SEO'}
                {editingItemType === 'inquiry' && 'Customer Form Inquiry Details'}
                {editingItemType === 'faq' && 'Edit / Add FAQ Item'}
                {editingItemType === 'page' && `Edit Page Content & SEO (${editFormData.name || editFormData.pageKey})`}
                {editingItemType === 'navigation' && 'Edit Navigation Bar & Announcement Header'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CERTIFICATION FORM FIELDS */}
            {editingItemType === 'certification' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Certification Title</label>
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Slug ID</label>
                  <input
                    type="text"
                    value={editFormData.slug || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Logo / Badge Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.logo || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, logo: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('logo')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Program Description</label>
                  <textarea
                    rows={3}
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-4 border-t pt-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={editFormData.published !== false}
                      onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600"
                    />
                    <span>Published on Public Website</span>
                  </label>
                </div>
              </div>
            )}

            {/* EXAM PLATFORM FORM FIELDS */}
            {editingItemType === 'platform' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Platform Title</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Slug ID</label>
                  <input
                    type="text"
                    value={editFormData.slug || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Platform Logo Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.logo || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, logo: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('logo')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Overview Description</label>
                  <textarea
                    rows={3}
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-4 border-t pt-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={editFormData.published !== false}
                      onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600"
                    />
                    <span>Published on Public Website</span>
                  </label>
                </div>
              </div>
            )}

            {/* STUDY RESOURCE FORM FIELDS */}
            {editingItemType === 'resource' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Resource Title</label>
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.image || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('image')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="flex items-center gap-4 border-t pt-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={editFormData.published !== false}
                      onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600"
                    />
                    <span>Published on Public Website</span>
                  </label>
                </div>
              </div>
            )}

            {/* PARTNERSHIP FORM FIELDS */}
            {editingItemType === 'partnership' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Partner Name</label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Partner Logo URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.logo || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, logo: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('logo')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Web Link / URL</label>
                  <input
                    type="text"
                    value={editFormData.url || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-4 border-t pt-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={editFormData.published !== false}
                      onChange={(e) => setEditFormData({ ...editFormData, published: e.target.checked })}
                      className="w-4 h-4 rounded text-purple-600"
                    />
                    <span>Published in Homepage Slider</span>
                  </label>
                </div>
              </div>
            )}

            {/* PAGE CONTENT & SEO EDITOR MODAL */}
            {editingItemType === 'page' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Page Name / Identifier</label>
                  <input
                    type="text"
                    value={editFormData.name || editFormData.pageKey || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Page Headline / H1 Title</label>
                  <input
                    type="text"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Page Subtitle / Hero Tagline</label>
                  <textarea
                    rows={3}
                    value={editFormData.subtitle || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl leading-relaxed"
                  />
                </div>

                <div className="border-t pt-3 space-y-3">
                  <span className="font-extrabold text-[#2563EB] block text-xs">SEO Metadata Overrides</span>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SEO Meta Title Tag</label>
                    <input
                      type="text"
                      value={editFormData.metaTitle || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, metaTitle: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={editFormData.metaDescription || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, metaDescription: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl leading-relaxed text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SEO Keywords</label>
                    <input
                      type="text"
                      value={editFormData.keywords || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, keywords: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-slate-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* NAVIGATION BAR & ANNOUNCEMENT HEADER MODAL */}
            {editingItemType === 'navigation' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-3 border-b pb-4">
                  <span className="font-extrabold text-[#2563EB] block text-xs">Top Announcement Bar Text</span>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Main Announcement Banner Text</label>
                    <input
                      type="text"
                      value={editFormData.topBanner?.mainAnnouncement || ''}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          topBanner: { ...editFormData.topBanner, mainAnnouncement: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-extrabold text-slate-900 block text-xs">Main Navigation Links</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {(editFormData.navLinks || []).map((linkItem, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border rounded-xl">
                        <input
                          type="text"
                          value={linkItem.label}
                          onChange={(e) => {
                            const updatedLinks = [...editFormData.navLinks];
                            updatedLinks[idx].label = e.target.value;
                            setEditFormData({ ...editFormData, navLinks: updatedLinks });
                          }}
                          className="flex-grow px-2 py-1 border rounded text-xs font-bold text-slate-800"
                        />
                        <span className="font-mono text-[10px] text-slate-400">{linkItem.href}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ EDITOR MODAL */}
            {editingItemType === 'faq' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">FAQ Category</label>
                    <input
                      type="text"
                      placeholder="e.g. General Questions, Tutoring, Professional Certifications"
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Page Location</label>
                    <select
                      value={editFormData.pageLocation || '/faq'}
                      onChange={(e) => setEditFormData({ ...editFormData, pageLocation: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl font-mono text-[11px] bg-white text-slate-800"
                    >
                      <option value="/">Homepage (/)</option>
                      <option value="/about">About Us (/about)</option>
                      <option value="/services">Services Directory (/services)</option>
                      <option value="/services/one-on-one-tutoring">1-on-1 Tutoring Service (/services/one-on-one-tutoring)</option>
                      <option value="/services/academic-exam-preparation">Academic Exam Prep (/services/academic-exam-preparation)</option>
                      <option value="/services/practice-questions-mock-tests">Practice Questions (/services/practice-questions-mock-tests)</option>
                      <option value="/services/software-technical-guidance">Software Technical Guidance (/services/software-technical-guidance)</option>
                      <option value="/exam-platforms">Exam Platforms (/exam-platforms)</option>
                      <option value="/exam-platforms/respondus-lockdown-browser">Respondus LockDown Browser (/exam-platforms/respondus-lockdown-browser)</option>
                      <option value="/certifications">Certifications (/certifications)</option>
                      <option value="/certifications/pmp">PMP Certification (/certifications/pmp)</option>
                      <option value="/certifications/comptia">CompTIA Certifications (/certifications/comptia)</option>
                      <option value="/study-resources">Study Resources (/study-resources)</option>
                      <option value="/faq">Master FAQ Page (/faq)</option>
                      <option value="/contact">Contact Page (/contact)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question Text</label>
                  <input
                    type="text"
                    placeholder="Enter the question..."
                    value={editFormData.question || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Answer / Response Text</label>
                  <textarea
                    rows={4}
                    placeholder="Enter the complete answer text..."
                    value={editFormData.answer || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, answer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl leading-relaxed text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* INQUIRY VIEWER MODAL */}
            {editingItemType === 'inquiry' && (
              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-bold uppercase block">Customer Name</span>
                    <span className="font-bold text-slate-900 text-sm">{editFormData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase block">Submission Date</span>
                    <span className="font-mono text-slate-700">{editFormData.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase block">Email Address</span>
                    <a href={`mailto:${editFormData.email}`} className="font-bold text-purple-700 hover:underline">{editFormData.email}</a>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase block">Phone / WhatsApp</span>
                    <span className="font-semibold text-slate-800">{editFormData.phone || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold uppercase block mb-1">Service Requested</span>
                  <span className="inline-block bg-purple-100 text-purple-900 font-extrabold px-3 py-1 rounded-lg text-xs">
                    {editFormData.service}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase block">Message & Learning Goals</span>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                    {editFormData.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => handleToggleInquiryStatus(editFormData.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      editFormData.status === 'New'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {editFormData.status === 'New' ? 'Mark as Responded' : 'Mark as New'}
                  </button>

                  <a
                    href={`mailto:${editFormData.email}?subject=RE: ${encodeURIComponent(editFormData.service)} Inquiry`}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            )}

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
                  <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.heroImage || editFormData.image || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, heroImage: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('heroImage')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
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
                  <label className="font-bold text-slate-700 block mb-1">Hero Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editFormData.heroImage || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, heroImage: e.target.value })}
                      className="flex-grow px-3 py-2 border rounded-xl font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPickerFor('heroImage')}
                      className="px-3 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Choose Media
                    </button>
                  </div>
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
                Close
              </button>

              {editingItemType !== 'inquiry' && (
                <button
                  onClick={() => {
                    if (editingItemType === 'blog') handleSaveBlog();
                    if (editingItemType === 'service') handleSaveService();
                    if (editingItemType === 'certification') handleSaveCertification();
                    if (editingItemType === 'platform') handleSavePlatform();
                    if (editingItemType === 'resource') handleSaveResource();
                    if (editingItemType === 'partnership') handleSavePartnership();
                    if (editingItemType === 'settings') handleSaveSettings();
                    if (editingItemType === 'faq') handleSaveFaq();
                    if (editingItemType === 'page') handleSavePage();
                    if (editingItemType === 'navigation') handleSaveNavigation();
                  }}
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
