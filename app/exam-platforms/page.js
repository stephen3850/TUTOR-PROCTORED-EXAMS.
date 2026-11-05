import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight, ShieldCheck, CheckCircle2, HardDrive, HelpCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PLATFORMS_DATA } from '@/lib/data/platformsData';

export const metadata = {
  title: 'Examination Platforms Directory | System Requirements & Prep Guides',
  description:
    'Explore preparation resources, software requirements, and legitimate technical guidance for Respondus LockDown Browser, Examplify, Honorlock, ProctorU, Proctorio, Proctortrack, Examity, PSI, and ATI.',
  keywords: [
    'examination platforms',
    'proctoring software compatibility',
    'Respondus LockDown Browser guide',
    'Examplify system requirements',
    'Honorlock preparation',
    'ProctorU technical check',
    'Proctorio guide',
    'PSI Bridge testing',
    'ATI TEAS prep',
  ],
};

export default function ExamPlatformsDirectoryPage() {
  const platformList = Object.values(PLATFORMS_DATA);

  return (
    <div className="space-y-16 py-10 pb-20">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Exam Platforms' }]} />

        {/* Directory Intro Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-secondaryNavy text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden my-6">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30">
              Technical & Preparation Hub
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              EXAMINATION PLATFORMS
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Explore examination platforms, preparation resources, and helpful guidance designed to help students understand their examination requirements and prepare with confidence.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> Verified Software Specs</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> OS & Hardware Requirements</span>
              <span className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-brand-blue" /> Independent Technical Advice</span>
            </div>
          </div>
        </div>

        {/* 9 Platform Cards Grid */}
        <div className="space-y-8 mt-12">
          <SectionHeading
            badge="Directory Listing"
            title="Supported Assessment & Proctoring Platforms"
            subtitle="Select your platform below to view verified system requirements, OS compatibility, troubleshooting advice, and study prep resources."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformList.map((platform) => (
              <ContentCard
                key={platform.slug}
                title={platform.name}
                description={platform.description || platform.tagline}
                badge={platform.category}
                icon={Cpu}
                href={`/exam-platforms/${platform.slug}`}
                actionText="Learn More"
              />
            ))}
          </div>
        </div>

        {/* Informational Disclaimer Box */}
        <div className="mt-14 bg-white p-6 rounded-xl border border-brand-border space-y-3">
          <h4 className="font-bold text-brand-navy flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-blue" />
            Independent Educational Guidance Notice
          </h4>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
            TUTOR PROCTORED EXAMS is an independent academic tutoring and technical preparation service. We are not affiliated with, sponsored by, or endorsed by Respondus, ExamSoft, Honorlock, Meazure Learning, Proctorio, Verificient, Examity, PSI Services, or ATI. All platform names and trademarks belong to their respective holders and are referenced purely for informational and descriptive educational purposes.
          </p>
        </div>

        {/* Conversion CTA Banner */}
        <div className="mt-12 bg-brand-navy text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Unsure About Your Exam Software Requirements?</h3>
          <p className="text-brand-muted text-sm max-w-xl mx-auto">
            Our educational specialists can review your course syllabus, verify system compatibility, and pair you with expert 1-on-1 subject tutors.
          </p>
          <div>
            <Button href="/contact" variant="primary" size="md">
              Speak with an Advisor
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
