'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  Users,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  MessageCircle,
  Send,
  Loader2,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { CERTIFICATIONS_DATA } from '@/lib/data/certificationsData';
import { SITE_CONFIG } from '@/lib/utils';

export default function CertificationDetailPage({ params }) {
  const slug = params?.slug;
  const cert = CERTIFICATIONS_DATA[slug];

  if (!cert) {
    notFound();
  }

  // Related certifications excluding current
  const relatedCerts = Object.values(CERTIFICATIONS_DATA)
    .filter((c) => c.slug !== cert.slug)
    .slice(0, 3);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedCert: cert.fullName || cert.title,
    materialInterest: 'All Certification Revision Materials',
    message: `Hello, I am interested in obtaining study materials, revision notes, practice questions, and pricing details for the ${cert.fullName} (${cert.title}) exam.`,
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectMaterial = (materialTitle) => {
    setFormData((prev) => ({
      ...prev,
      materialInterest: materialTitle,
      message: `Hello, I am specifically inquiring about "${materialTitle}" for the ${cert.fullName} (${cert.title}) exam. Please share pricing and access information.`,
    }));

    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          service: formData.selectedCert,
          subject: formData.materialInterest,
          message: `${formData.message}\n\n[Phone/WhatsApp: ${formData.phone || 'Not provided'}]`,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          'Thank you! Your certification study materials inquiry has been submitted. Our sales team will email you or contact you on WhatsApp within 1 business day.'
        );
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          selectedCert: cert.fullName || cert.title,
          materialInterest: 'All Certification Revision Materials',
          message: '',
          honeypot: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMessage('A network error occurred. Please try again or chat with us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in ${cert.fullName} (${cert.title}) study materials. Please share the available revision materials, pricing, and access information.`
  );
  const whatsappUrl = `https://wa.me/254711882470?text=${whatsappMessage}`;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${cert.title} — ${cert.fullName}`,
    description: cert.overview,
    brand: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <div className="space-y-10 pt-2 pb-16">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb
          items={[
            { label: 'Certifications', href: '/certifications' },
            { label: cert.title },
          ]}
        />

        {/* 1. HERO SECTION WITH CATEGORY COLOR ACCENT GRADIENT */}
        <div className="relative text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6 bg-[#0F172A] shadow-xl">
          {/* Accent Color Subtle Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 opacity-30 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: cert.accentColor || '#2563EB' }}
          ></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: cert.accentColor || '#2563EB' }}
              >
                {cert.category}
              </span>
              <span className="text-xs text-slate-200 font-bold flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                <Building2 className="w-3.5 h-3.5 text-white" /> Body: {cert.governingBody}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {cert.title} — {cert.fullName}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow-sm">
              {cert.tagline}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#inquiry-form"
                className="px-6 py-3 rounded-xl font-black text-sm text-white shadow-xl inline-flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: cert.accentColor || '#2563EB' }}
              >
                <span>GET STUDY MATERIALS</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[3]" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl inline-flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
                <span>CONTACT SALES ON WHATSAPP</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs text-white font-semibold border-t border-white/20">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#356AE6]" /> Verified Exam Content</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#356AE6]" /> High-Yield Revision Notes</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#356AE6]" /> 24/7 Sales Inquiry Support</span>
            </div>
          </div>
        </div>

        {/* 2. CERTIFICATION OVERVIEW (LIGHT GREEN BACKGROUND) */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm my-8">
          <SectionHeading
            badge="Overview"
            title={`What is ${cert.fullName}?`}
            subtitle="Essential information, target audience, and exam format overview."
          />

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
            {cert.overview}
          </p>

          {/* Exam Specs Table/Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Question Count</span>
              <span className="text-sm font-extrabold text-[#0F172A]">{cert.examFormat.totalQuestions}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Time Allowed</span>
              <span className="text-sm font-extrabold text-[#0F172A]">{cert.examFormat.duration}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Passing Threshold</span>
              <span className="text-sm font-extrabold text-[#0F172A]">{cert.examFormat.passingScore}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-bold block">Proctoring Delivery</span>
              <span className="text-sm font-extrabold text-[#0F172A]">{cert.examFormat.proctoring}</span>
            </div>
          </div>
        </div>

        {/* 3. REVISION MATERIALS SECTION ("Explore Available Study Materials") */}
        <div className="space-y-6 my-10">
          <SectionHeading
            badge="Study Materials"
            title={`Available Revision Materials for ${cert.title}`}
            subtitle="Review the categories of study guides, practice question banks, and notes you can request from our team."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cert.materials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#2563EB] transition-all group"
              >
                <div className="space-y-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                    style={{ backgroundColor: cert.accentColor || '#2563EB' }}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {mat.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectMaterial(mat.title)}
                  className="pt-3 border-t border-slate-100 text-xs font-extrabold text-[#2563EB] flex items-center justify-between group-hover:translate-x-0.5 transition-transform text-left w-full"
                >
                  <span>Ask About This Material</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 stroke-[2.5]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TOPICS COVERED IN YOUR REVISION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 my-10 shadow-sm">
          <SectionHeading
            badge="Exam Outline"
            title={`Topics Covered in Your ${cert.title} Revision`}
            subtitle="Color-coded topic breakdown aligned with official examination content outlines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {cert.topicsCovered.map((topic, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 text-white"
                  style={{ backgroundColor: cert.accentColor || '#2563EB' }}
                >
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HOW TO GET STUDY MATERIALS (4 STEPS) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 my-10 shadow-sm">
          <SectionHeading
            badge="Simple Process"
            title="How To Get Your Study Materials"
            subtitle="A clear four-step process to explore, request, and receive access to revision resources."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">01</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Choose Your Certification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Select the certification or exam you are preparing to take.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">02</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Explore Revision Materials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Review the available study guides, notes, and question banks.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">03</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Contact Our Sales Team</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Request pricing, format availability, and access information.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">04</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Receive Information</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Our team guides you through access steps and answers your questions.</p>
            </div>
          </div>
        </div>

        {/* 6. CERTIFICATION INQUIRY & SALES FORM (VIBRANT CLEAR GREEN BACKGROUND) */}
        <div id="inquiry-form" className="bg-[#05B851] text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl my-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-block bg-white/20 text-white border border-white/30 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
              Certification Sales Inquiry
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Prepare for Your {cert.title} Certification?
            </h2>
            <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
              Tell us which study materials or revision guides you are interested in. Our team will assist you with pricing and access.
            </p>
          </div>

          {/* Success & Error Alert Banners */}
          {successMessage && (
            <div className="p-4 rounded-xl bg-white text-emerald-950 border-2 border-white text-xs sm:text-sm font-bold shadow-md text-center">
              ✓ {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-900 text-white border border-red-400 text-xs sm:text-sm font-bold shadow-md text-center">
              ⚠ {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-2xl mx-auto pt-2">
            {/* Honeypot field for anti-spam */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">Phone / WhatsApp Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">Material of Interest</label>
                <input
                  type="text"
                  value={formData.materialInterest}
                  onChange={(e) => setFormData({ ...formData, materialInterest: e.target.value })}
                  placeholder="e.g. Revision Notes / Question Bank"
                  className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">Message & Specific Requirements *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={`Tell us about your ${cert.title} exam target date or specific questions...`}
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-white text-emerald-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
                    <span>Submit Sales Inquiry</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-white/90 bg-emerald-800/80 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-white hover:text-emerald-950 transition-all"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>CHAT WITH SALES ON WHATSAPP</span>
              </a>
            </div>
          </form>
        </div>

        {/* 7. RELATED CERTIFICATIONS NAVIGATION */}
        <div className="space-y-6 my-12">
          <h3 className="text-xl font-bold text-[#0F172A]">Explore Other Professional Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCerts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/certifications/${rel.slug}`}
                className="group p-5 bg-white border border-slate-200 rounded-xl hover:border-[#2563EB] hover:shadow-card transition-all"
              >
                <span className="text-xs text-slate-500 block mb-1 font-semibold">{rel.category}</span>
                <h4 className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                  <span>{rel.title} — {rel.fullName}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                </h4>
              </Link>
            ))}
          </div>
        </div>

      </PageContainer>
    </div>
  );
}
