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
  ExternalLink,
  Building2,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/seo/JsonLd';
import { getStudyResourcesContent, getStudyResourceBySlug } from '@/lib/contentLoader';
import { SITE_CONFIG } from '@/lib/utils';

export default function StudyResourceDetailPage({ params }) {
  const slug = params?.slug;
  const resource = getStudyResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notes: '',
  });

  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          service: `Study Resource Request – ${resource.title}`,
          subject: `Resource Request – ${resource.title}`,
          message: formData.notes || `Requesting study guides for ${resource.title}.`,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ fullName: '', email: '', notes: '' });
      } else {
        setFormStatus({ loading: false, success: false, error: json.error || 'Failed to submit request.' });
      }
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="space-y-10 pt-2 pb-16">
      <PageContainer>
        <Breadcrumb
          items={[
            { label: 'Study Resources', href: '/study-resources' },
            { label: resource.title },
          ]}
        />

        {/* 1. HERO BANNER */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6 relative">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              {resource.category} Revision Resource
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {resource.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              {resource.description || resource.overview}
            </p>
          </div>
        </div>

        {/* 2. OVERVIEW & CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
          <div className="lg:col-span-2 bg-white border border-brand-border rounded-2xl p-8 space-y-4 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-navy">Resource Overview</h2>
            <p className="text-brand-muted leading-relaxed text-sm sm:text-base">
              {resource.overview || resource.description}
            </p>

            {(resource.availableMaterials || []).length > 0 && (
              <div className="pt-4 border-t border-brand-border/60 space-y-3">
                <h3 className="text-lg font-bold text-brand-navy">Available Study Materials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resource.availableMaterials.map((mat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-brand-bg border border-brand-border text-xs sm:text-sm font-semibold text-brand-navy flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* REQUEST FORM CARD */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-brand-blue" />
              Request Study Materials
            </h3>

            {formStatus.success ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-900 font-bold">
                Resource request submitted! Check your email inbox shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Notes / Target Exam</label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-brand-border bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="w-full py-2.5 bg-brand-blue hover:bg-brand-navy text-white font-bold rounded-xl shadow-sm transition-all"
                >
                  {formStatus.loading ? 'Requesting...' : 'Request Material Access'}
                </button>
              </form>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
