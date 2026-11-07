import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowRight, ShieldCheck, CheckCircle2, HardDrive, HelpCircle, Layers, Clock, Sparkles, FileCheck } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PLATFORMS_DATA } from '@/lib/data/platformsData';

export const metadata = {
  title: 'Examination Platforms & Exam Prep Directory | System Requirements & Guides',
  description:
    'Explore preparation resources, software requirements, and technical guidance for Respondus, Examplify, Honorlock, ProctorU, Proctorio, Proctortrack, Examity, PSI, ATI TEAS, GED, HESI A2, and Mock Tests.',
  keywords: [
    'examination platforms',
    'proctoring software compatibility',
    'Respondus LockDown Browser guide',
    'Examplify system requirements',
    'Honorlock preparation',
    'GED exam prep',
    'HESI A2 tutoring',
    'ATI TEAS prep',
    'Mock tests and practice exams',
  ],
};

export default function ExamPlatformsDirectoryPage() {
  const platformList = Object.values(PLATFORMS_DATA);

  // Additional 4 Exam Options
  const additionalExamOptions = [
    {
      name: 'GED Exam Preparation',
      description: 'Comprehensive 1-on-1 coaching for Mathematical Reasoning, Science, RLA, and Social Studies high school equivalency tests.',
      category: 'Exam Readiness',
      href: '/services/ged',
      icon: Layers,
    },
    {
      name: 'HESI A2 Exam Preparation',
      description: 'Specialized nursing entrance exam tutoring for Anatomy & Physiology, Mathematics, Vocabulary, and Science subtests.',
      category: 'Nursing Entrance',
      href: '/services/hesi',
      icon: Clock,
    },
    {
      name: 'ATI TEAS Exam Preparation',
      description: 'In-depth TEAS 7 subtest review and mock test simulations covering Reading, Math, Science, and English Usage.',
      category: 'Nursing Entrance',
      href: '/services/teas',
      icon: Sparkles,
    },
    {
      name: 'Mock Tests & Practice Exams',
      description: 'Curated question banks, timed mock test simulations, and comprehensive rationale breakdowns for all subjects.',
      category: 'Assessment & Practice',
      href: '/services/practice-questions-mock-tests',
      icon: FileCheck,
    },
  ];

  return (
    <div className="space-y-10 pt-2 pb-16">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Exam Platforms' }]} />

        {/* Directory Intro Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-secondaryNavy text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden my-6">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30">
              Technical & Preparation Hub
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              EXAMINATION PLATFORMS & EXAM OPTIONS
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Explore 13 examination platforms and exam preparation categories designed to help students understand system requirements and prepare effectively for test day.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> 13 Exam Options</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> OS & Hardware Requirements</span>
              <span className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-brand-blue" /> Independent Technical Advice</span>
            </div>
          </div>
        </div>

        {/* 13 Items Directory Grid */}
        <div className="space-y-8 mt-12">
          <SectionHeading
            badge="Directory Listing"
            title="Supported Assessment Platforms & Exam Prep Options"
            subtitle="Select an option below to view system requirements, OS compatibility, study prep resources, and technical guidance."
          />

          {/* Original 9 Exam Platforms */}
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

            {/* Additional 4 Exam Options */}
            {additionalExamOptions.map((opt, idx) => {
              const OptIcon = opt.icon;
              return (
                <ContentCard
                  key={idx}
                  title={opt.name}
                  description={opt.description}
                  badge={opt.category}
                  icon={OptIcon}
                  href={opt.href}
                  actionText="Explore Option"
                />
              );
            })}
          </div>
        </div>

        {/* Informational Disclaimer Box (WARM ORANGE BACKGROUND) */}
        <div className="mt-14 bg-orange-100/90 border border-orange-300 text-amber-950 p-6 rounded-xl space-y-2 shadow-sm font-medium">
          <h4 className="font-extrabold text-amber-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            Independent Educational Guidance Notice
          </h4>
          <p className="text-amber-950 text-xs sm:text-sm leading-relaxed font-medium">
            TUTOR PROCTORED EXAMS is an independent academic tutoring and technical preparation service. We are not affiliated with, sponsored by, or endorsed by Respondus, ExamSoft, Honorlock, Meazure Learning, Proctorio, Verificient, Examity, PSI Services, or ATI. All platform names and trademarks belong to their respective holders and are referenced purely for informational educational purposes.
          </p>
        </div>

        {/* Conversion CTA Banner (CLEAR GREEN BACKGROUND) */}
        <div className="mt-12 bg-[#05B851] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xl max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-black text-white">Unsure About Your Exam Software Requirements?</h3>
          <p className="text-white/95 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Our educational specialists can review your course syllabus, verify system compatibility, and pair you with expert 1-on-1 subject tutors.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:bg-emerald-50 transition-all inline-flex items-center gap-2"
            >
              <span>Speak with an Advisor</span>
              <ArrowRight className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
