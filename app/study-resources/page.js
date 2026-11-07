import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileCheck,
  Award,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Badge from '@/components/ui/Badge';
import { STUDY_RESOURCES_DATA } from '@/lib/data/studyResourcesData';

export const metadata = {
  title: 'Study Materials & Revision Resources Sales Platform | TUTOR PROCTORED EXAMS',
  description:
    'Explore premium study materials, revision notes, practice question banks, and exam preparation guides for PMP, CompTIA, AAPC, CPC, CCMA, CNA, CPhT, GED, HESI, and TEAS.',
  keywords: [
    'study materials sales platform',
    'revision resources',
    'PMP revision notes',
    'CompTIA practice questions',
    'AAPC coding guides',
    'CNA clinical skill checklists',
    'CPhT pharmacy math formulas',
    'GED study guides',
    'HESI A2 tutoring',
    'ATI TEAS prep',
  ],
};

export default function StudyResourcesPage() {
  const resourceList = Object.values(STUDY_RESOURCES_DATA);

  return (
    <div className="space-y-10 pt-2 pb-16">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Study Resources' }]} />

        {/* Hero Section */}
        <div className="relative bg-[#0F172A] text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6 shadow-xl">
          <div
            className="absolute inset-0 z-0 opacity-25 bg-cover bg-center mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80')",
            }}
          ></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-[#2563EB] text-white border-blue-400 font-bold px-3 py-1 text-xs">
              Study Materials & Revision Platform
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              STUDY MATERIALS & REVISION RESOURCES
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed text-balance font-medium">
              Explore 13 specialized study material categories, revision notes, topic summaries, practice problem sets, and exam preparation guides tailored to your target certification.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-white font-semibold border-t border-white/20">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#356AE6]" /> 13 Resource Categories
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#356AE6]" /> Verified Exam Outlines
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#356AE6]" /> 24/7 Sales Inquiry Support
              </span>
            </div>
          </div>
        </div>

        {/* 13 Resource Cards Grid */}
        <div className="space-y-8 mt-10">
          <SectionHeading
            badge="Resource Directory"
            title="Certification Study Guides & Learning Resources"
            subtitle="Select a resource below to explore available study materials, topic coverage, and inquire about access options."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceList.map((res) => (
              <ContentCard
                key={res.slug}
                title={res.shortTitle || res.title}
                description={res.tagline || res.overview}
                badge={res.category}
                icon={BookOpen}
                href={`/study-resources/${res.slug}`}
                actionText="Explore Materials & Inquire"
              />
            ))}
          </div>
        </div>

        {/* Conversion CTA Banner (CLEAR VIBRANT GREEN BACKGROUND) */}
        <div className="mt-12 bg-[#05B851] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white">Need Custom Study Materials or Tutoring Help?</h3>
          <p className="text-white/95 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Contact our sales and educational team directly on WhatsApp for pricing, material availability, and custom revision schedules.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:bg-emerald-50 transition-all inline-flex items-center gap-2"
            >
              <span>Chat with Sales on WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
