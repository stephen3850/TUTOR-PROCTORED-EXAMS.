import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Briefcase, Stethoscope, Laptop, Building2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CERTIFICATIONS_DATA } from '@/lib/data/certificationsData';

export const metadata = {
  title: 'Professional Certification Preparation Directory | PMP, CompTIA, AAPC, CPC, CCMA, CNA, CPhT',
  description:
    'Build your knowledge and prepare for recognized industry certifications (PMP, CAPM, CompTIA, SHRM, Real Estate, AAPC, CPC, CCMA, CNA, CPhT) with structured study guidance and 1-on-1 tutoring.',
  keywords: [
    'professional certification preparation',
    'PMP exam prep',
    'CompTIA Security+ tutoring',
    'SHRM certification prep',
    'Real estate license prep',
    'AAPC medical coding prep',
    'CPC exam study guide',
    'CCMA certification prep',
    'CNA exam prep',
    'CPhT pharmacy tech prep',
  ],
};

export default function CertificationsDirectoryPage() {
  const certList = Object.values(CERTIFICATIONS_DATA);

  // Group certifications by category
  const categories = [
    {
      name: 'Project Management & Leadership',
      icon: Briefcase,
      description: 'Global credentials validating project leadership, agile frameworks, and business value delivery.',
      items: certList.filter((c) => c.category === 'Project Management'),
    },
    {
      name: 'Information Technology & Security',
      icon: Laptop,
      description: 'Vendor-neutral IT credentials establishing core cybersecurity, networking, and system administration skills.',
      items: certList.filter((c) => c.category === 'Information Technology'),
    },
    {
      name: 'Human Resources & Business',
      icon: Building2,
      description: 'Credentials validating strategic HR leadership, talent acquisition, labor law compliance, and real estate practice.',
      items: certList.filter((c) => c.category.includes('Human') || c.category.includes('Real Estate')),
    },
    {
      name: 'Healthcare, Medical Coding & Pharmacy',
      icon: Stethoscope,
      description: 'Nationally recognized credentials for medical coding, outpatient clinical assisting, nursing assistance, and pharmacy technicians.',
      items: certList.filter((c) => c.category.includes('Healthcare')),
    },
  ];

  return (
    <div className="space-y-10 pt-2 pb-16">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Certifications' }]} />

        {/* Directory Intro Header */}
        <div className="bg-[#0F172A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden my-6 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-[#2563EB] text-white border-blue-400 font-bold px-3 py-1 text-xs">
              Career & Skill Credentials
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              PROFESSIONAL CERTIFICATION PREPARATION
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed text-balance font-medium">
              Build your knowledge, strengthen your professional skills, and prepare for 10 recognized industry certifications with structured study guidance, practice modules, and 1-on-1 tutoring.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-white font-semibold border-t border-white/20">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#356AE6]" /> 10 Industry Certifications</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#356AE6]" /> Timed Practice Strategy</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#356AE6]" /> 1-on-1 Specialist Coaching</span>
            </div>
          </div>
        </div>

        {/* Categorized Certifications Listing */}
        <div className="space-y-10 mt-10">
          {categories.map((cat, idx) => {
            const CatIcon = cat.icon;
            return (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">{cat.name}</h2>
                    <p className="text-xs text-slate-500 font-medium">{cat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((cert) => (
                    <ContentCard
                      key={cert.slug}
                      title={`${cert.title} — ${cert.fullName}`}
                      description={cert.tagline || cert.overview}
                      badge={cert.governingBody}
                      icon={Award}
                      href={`/certifications/${cert.slug}`}
                      actionText="Explore Certification & Inquire"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Notice */}
        <div className="mt-10 bg-white p-6 rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <h4 className="font-bold text-[#0F172A] text-sm">Educational Support Disclaimer</h4>
          <p className="text-slate-600 text-xs leading-relaxed">
            TUTOR PROCTORED EXAMS is an independent educational prep platform. We are not affiliated with or endorsed by PMI, CompTIA, SHRM, AAPC, NHA, or PTCB. Certification trademarks (PMP®, Security+®, SHRM-CP®, CPC®, CCMA®, CPhT®) belong to their respective registered holders and are referenced strictly for identification and educational prep purposes.
          </p>
        </div>

        {/* Conversion CTA (CLEAR GREEN BACKGROUND) */}
        <div className="mt-10 bg-[#05B851] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white">Preparing for an Upcoming Certification Exam?</h3>
          <p className="text-white/95 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Work 1-on-1 with a certified tutor to review knowledge domains, breakdown practice questions, and receive dedicated revision study materials.
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
