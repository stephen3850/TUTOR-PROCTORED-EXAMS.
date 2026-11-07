'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  FileCheck,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  Layers,
  Sparkles,
  HelpCircle,
  Send,
  Loader2,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/seo/JsonLd';
import { STUDY_RESOURCES_DATA } from '@/lib/data/studyResourcesData';
import { SITE_CONFIG } from '@/lib/utils';

export default function StudyResourceDetailPage({ params }) {
  const slug = params?.slug;
  const resource = STUDY_RESOURCES_DATA[slug];

  if (!resource) {
    notFound();
  }

  // Related resources excluding current
  const relatedResources = Object.values(STUDY_RESOURCES_DATA)
    .filter((r) => r.slug !== resource.slug)
    .slice(0, 3);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedCert: resource.shortTitle || resource.title,
    materialInterest: 'All Available Study Materials',
    message: `Hello, I would like to inquire about the study materials, revision notes, practice sets, and pricing options available for ${resource.shortTitle || resource.title}.`,
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectMaterial = (materialTitle) => {
    setFormData((prev) => ({
      ...prev,
      materialInterest: materialTitle,
      message: `Hello, I am specifically interested in obtaining "${materialTitle}" for ${resource.shortTitle || resource.title}. Please provide pricing, format, and access details.`,
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
          message: `${formData.message}\n\n[Contact Phone/WhatsApp: ${formData.phone || 'Not provided'}]`,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          'Thank you! Your study materials inquiry has been submitted. Our sales team will email you or respond on WhatsApp within 1 business day.'
        );
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          selectedCert: resource.shortTitle || resource.title,
          materialInterest: 'All Available Study Materials',
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
    `Hello, I am interested in ${resource.shortTitle || resource.title} study materials. Please share the available revision materials, pricing, and access information.`
  );
  const whatsappUrl = `https://wa.me/254711882470?text=${whatsappMessage}`;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: resource.title,
    description: resource.overview,
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
            { label: 'Study Resources', href: '/study-resources' },
            { label: resource.shortTitle || resource.title },
          ]}
        />

        {/* SECTION 1: PROFESSIONAL HERO SECTION */}
        <div className="relative text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6 bg-[#0F172A] shadow-xl">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url('${resource.heroImage}')` }}
          ></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-[#0F172A]/40"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-[#2563EB] text-white border-blue-400 font-bold px-3 py-1 text-xs">
              {resource.category} • {resource.governingBody}
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              {resource.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-2xl">
              {resource.tagline}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#inquiry-form"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl inline-flex items-center justify-center gap-2 transition-all"
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
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#356AE6]" /> Verified Exam Outlines</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#356AE6]" /> High-Yield Revision Notes</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#356AE6]" /> 24/7 Sales Inquiry Support</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: RESOURCE OVERVIEW ("What Are These Study Materials?") (LIGHT GREEN BACKGROUND) */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-8 sm:p-10 space-y-4 shadow-sm my-8">
          <SectionHeading
            badge="Overview"
            title="What Are These Study Materials?"
            subtitle={`Essential revision information and exam prep resources for ${resource.shortTitle || resource.title}.`}
          />
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
            {resource.overview}
          </p>
        </div>

        {/* SECTION 3: WHAT THE STUDENT CAN REQUEST ("Explore Available Study Materials") */}
        <div className="space-y-6 my-10">
          <SectionHeading
            badge="Available Resources"
            title="Explore Available Study Materials"
            subtitle="Review the categories of revision notes, practice question banks, and exam guides you can request from our sales team."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resource.availableMaterials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#2563EB] transition-all group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {mat.description}
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

        {/* SECTION 4: TOPICS COVERED ("Topics Covered in Your Revision") */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 my-10 shadow-sm">
          <SectionHeading
            badge="Exam Scope"
            title="Topics Covered in Your Revision"
            subtitle="Customized topic breakdown aligned with official examination content outlines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {resource.topicsCovered.map((topic, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: HOW THE STUDY MATERIALS WORK (4 STEPS) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 my-10 shadow-sm">
          <SectionHeading
            badge="Simple Process"
            title="How The Study Materials Work"
            subtitle="A clear four-step process to request, explore, and access your study resources."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">01</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Select Your Certification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Choose the certification or examination you are preparing for.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">02</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Explore Revision Materials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Review the study materials and topic coverage available for your exam.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">03</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Contact Our Sales Team</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Request information about pricing, availability, and format access.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-2xl font-black text-[#2563EB]/40 font-mono">04</div>
              <h4 className="font-extrabold text-[#0F172A] text-sm">Receive Assistance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Our team guides you through the next steps and answers your questions.</p>
            </div>
          </div>
        </div>

        {/* SECTION 6: MATERIALS INQUIRY & SALES CONTACT FORM */}
        <div id="inquiry-form" className="bg-[#05B851] text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl my-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-block bg-white/20 text-white border border-white/30 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
              Sales & Material Inquiry
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Get Your Study Materials?
            </h2>
            <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
              Tell us which certification or study materials you are interested in. Our team will help you understand availability, pricing, and access options.
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
                  placeholder="e.g. Jane Doe"
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
                  placeholder="e.g. jane@example.com"
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
                placeholder="Tell us about your exam target date, specific topics needed, or pricing questions..."
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

        {/* SECTION 7: RELATED STUDY RESOURCES */}
        <div className="space-y-6 my-12">
          <h3 className="text-xl font-bold text-[#0F172A]">Explore Other Study Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedResources.map((rel) => (
              <Link
                key={rel.slug}
                href={`/study-resources/${rel.slug}`}
                className="group p-5 bg-white border border-slate-200 rounded-xl hover:border-[#2563EB] hover:shadow-card transition-all"
              >
                <span className="text-xs text-slate-500 block mb-1 font-semibold">{rel.category}</span>
                <h4 className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                  <span>{rel.shortTitle || rel.title}</span>
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
