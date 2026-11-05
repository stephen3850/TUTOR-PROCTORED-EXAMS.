import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Layers, Briefcase, Stethoscope, Laptop } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { CERTIFICATIONS_DATA } from '@/lib/data/certificationsData';

export const metadata = {
  title: 'Professional Certification Preparation Directory | PMP, CompTIA, AAPC, CPC, CCMA',
  description:
    'Build your knowledge and prepare for recognized industry certifications (PMP, CompTIA, AAPC, CPC, CCMA) with structured study guidance, practice modules, and 1-on-1 tutoring.',
  keywords: [
    'professional certification preparation',
    'PMP exam prep',
    'CompTIA Security+ tutoring',
    'AAPC medical coding prep',
    'CPC exam study guide',
    'CCMA certification prep',
    'industry credential tutoring',
  ],
};

export default function CertificationsDirectoryPage() {
  const certList = Object.values(CERTIFICATIONS_DATA);

  // Group certifications by category
  const categories = [
    {
      name: 'Project Management',
      icon: Briefcase,
      description: 'Global credentials validating project leadership, agile frameworks, and business value delivery.',
      items: certList.filter((c) => c.category === 'Project Management'),
    },
    {
      name: 'Information Technology',
      icon: Laptop,
      description: 'Vendor-neutral IT credentials establishing core cybersecurity, networking, and system administration skills.',
      items: certList.filter((c) => c.category === 'Information Technology'),
    },
    {
      name: 'Healthcare & Medical Coding',
      icon: Stethoscope,
      description: 'Nationally recognized credentials for medical coding, clinical outpatient assisting, and health information management.',
      items: certList.filter((c) => c.category.includes('Healthcare')),
    },
  ];

  return (
    <div className="space-y-16 py-10 pb-20">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Certifications' }]} />

        {/* Directory Intro Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-navy to-brand-secondaryNavy text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden my-6">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30">
              Career & Skill Credentials
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              PROFESSIONAL CERTIFICATION PREPARATION
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Build your knowledge, strengthen your professional skills, and prepare for recognized industry certifications with structured study guidance and educational support.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> Verified Domain Syllabus</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> Timed Practice Strategy</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-brand-blue" /> 1-on-1 Specialist Coaching</span>
            </div>
          </div>
        </div>

        {/* Categorized Certifications Listing */}
        <div className="space-y-14 mt-12">
          {categories.map((cat, idx) => {
            const CatIcon = cat.icon;
            return (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-brand-border pb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center">
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-navy">{cat.name}</h2>
                    <p className="text-xs text-brand-muted">{cat.description}</p>
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
                      actionText="Explore Certification"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Notice */}
        <div className="mt-14 bg-white p-6 rounded-xl border border-brand-border space-y-2">
          <h4 className="font-bold text-brand-navy text-sm">Educational Support Disclaimer</h4>
          <p className="text-brand-muted text-xs leading-relaxed">
            TUTOR PROCTORED EXAMS is an independent educational prep platform. We are not affiliated with or endorsed by PMI, CompTIA, AAPC, or NHA. Certification trademarks (PMP®, Security+®, CPC®, CCMA®) belong to their respective registered holders and are referenced strictly for identification and educational prep purposes.
          </p>
        </div>

        {/* Conversion CTA */}
        <div className="mt-12 bg-brand-navy text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Preparing for an Upcoming Certification Exam?</h3>
          <p className="text-brand-muted text-sm max-w-xl mx-auto">
            Work 1-on-1 with a certified tutor to review knowledge domains, breakdown practice questions, and design a custom study schedule.
          </p>
          <div>
            <Button href="/contact" variant="primary" size="md">
              Schedule Certification Consultation
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
