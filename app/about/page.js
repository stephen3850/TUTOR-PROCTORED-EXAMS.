import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Eye,
  HeartHandshake,
  Award,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Lock,
  Compass,
  GraduationCap,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/utils';

export const metadata = {
  title: 'About Us & Academic Integrity Commitment | TUTOR PROCTORED EXAMS',
  description:
    'TUTOR PROCTORED EXAMS is an educational support brand focused on helping learners prepare effectively through ethical 1-on-1 tutoring, exam preparation, and software technical guidance.',
  keywords: [
    'about TUTOR PROCTORED EXAMS',
    'ethical academic tutoring',
    'academic integrity policy',
    'exam preparation coaching',
    'US education support',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/about`,
  },
  openGraph: {
    title: 'About Us & Academic Integrity Commitment | TUTOR PROCTORED EXAMS',
    description:
      'TUTOR PROCTORED EXAMS is an educational support brand focused on helping learners prepare effectively through ethical 1-on-1 tutoring.',
    url: `${SITE_CONFIG.domain}/about`,
    type: 'article',
  },
};

export default function AboutPage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.description,
    knowsAbout: [
      'Academic Tutoring',
      'Exam Preparation',
      'Professional Certifications',
      'Proctoring Software Technical Compatibility',
    ],
  };

  const coreValues = [
    {
      title: 'Integrity',
      description: 'We strictly uphold ethical educational standards, encouraging genuine subject mastery and independent student test performance.',
      icon: ShieldCheck,
    },
    {
      title: 'Student-Focused Support',
      description: 'Every lesson plan and study schedule is tailored around the individual learner’s unique pace, background, and academic goals.',
      icon: HeartHandshake,
    },
    {
      title: 'Quality Education',
      description: 'We deliver clear, well-structured instruction, high-yield practice materials, and verified domain insights.',
      icon: Award,
    },
    {
      title: 'Professionalism',
      description: 'Our specialists communicate with clarity, respect, and punctuality, maintaining a supportive academic environment.',
      icon: GraduationCap,
    },
    {
      title: 'Accessibility',
      description: 'We strive to make high-quality tutoring and technical readiness resources straightforward and easy to access.',
      icon: Users,
    },
    {
      title: 'Continuous Improvement',
      description: 'We foster habits of active recall, self-evaluation, and structured revision to support lifelong learning success.',
      icon: Sparkles,
    },
  ];

  const approachSteps = [
    {
      step: '01',
      title: 'Understand the Learner’s Goals',
      description: 'We review your specific course syllabus, target examination platform, or professional certification roadmap.',
    },
    {
      step: '02',
      title: 'Identify Learning Needs',
      description: 'We evaluate current knowledge gaps, time constraints, and software compatibility requirements.',
    },
    {
      step: '03',
      title: 'Recommend Suitable Educational Support',
      description: 'We match you with personalized 1-on-1 subject tutoring, practice banks, or technical system checks.',
    },
    {
      step: '04',
      title: 'Encourage Structured Preparation',
      description: 'We build daily study schedules, conduct practice question walkthroughs, and refine test pacing.',
    },
    {
      step: '05',
      title: 'Support Continuous Improvement',
      description: 'We monitor progress and build long-term confidence so learners can take their exams independently.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 pb-20">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* 1. HERO SECTION */}
        <div className="relative bg-brand-navy text-white rounded-2xl p-8 sm:p-14 overflow-hidden my-6">
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')" }}
          ></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              Who We Are
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              SUPPORTING YOUR JOURNEY TOWARD ACADEMIC AND PROFESSIONAL SUCCESS
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              TUTOR PROCTORED EXAMS is an educational support brand focused on helping learners prepare effectively, strengthen their knowledge, and pursue their academic and professional goals.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/services" variant="primary" size="lg" icon={ArrowRight}>
                Explore Our Services
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>

        {/* 2. OUR STORY */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-12 space-y-6 shadow-sm my-10">
          <SectionHeading
            badge="Brand Purpose"
            title="Our Story & Dedicated Mission"
            subtitle="Creating a reliable academic support destination for college students and working professionals worldwide."
          />

          <div className="prose prose-slate max-w-none text-brand-muted text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Navigating university examinations and professional certification tests requires more than just reading textbooks. Students frequently encounter challenging course topics, rigid exam formats, unfamiliar proctoring software requirements, and tight study schedules.
            </p>
            <p>
              <strong>TUTOR PROCTORED EXAMS</strong> was created to meet this challenge with clarity and integrity. We position our brand around accessible educational support, personalized 1-on-1 tutoring, structured exam preparation, professional certification guidance, practical study resources, and responsible, ethical learning.
            </p>
            <p>
              We believe that when students receive tailored explanations, clear revision schedules, and proactive technical guidance regarding examination software compatibility, they can perform at their highest potential independently.
            </p>
          </div>
        </div>

        {/* 3. OUR MISSION & OUR VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">OUR MISSION</h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                Our mission is to make high-quality educational guidance, structured learning support, and examination preparation resources accessible and genuinely useful to every student and professional we serve.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-brand-blue flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Accessible • Structured • Ethical
            </div>
          </div>

          <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">OUR VISION</h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                Our vision is to build a widely trusted, premier educational support brand worldwide, recognized for helping learners overcome academic challenges, master certification domains, and achieve their career aspirations through genuine learning.
              </p>
            </div>
            <div className="pt-2 text-xs font-semibold text-brand-blue flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Student-Centered Growth
            </div>
          </div>
        </div>

        {/* 4. OUR CORE VALUES */}
        <div className="space-y-8 my-12">
          <SectionHeading
            badge="Guided Principles"
            title="OUR CORE VALUES"
            subtitle="The foundational principles that guide every tutoring session, study guide, and student interaction."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <div key={idx} className="bg-white border border-brand-border rounded-xl p-6 space-y-3 hover:border-brand-blue/40 transition-colors shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. OUR APPROACH */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-12 space-y-8 my-12 shadow-sm">
          <SectionHeading
            badge="Methodology"
            title="OUR EDUCATIONAL APPROACH"
            subtitle="A structured 5-step process designed to foster genuine subject mastery."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {approachSteps.map((app, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-3">
                <div className="text-2xl font-extrabold text-brand-blue/40 font-mono">{app.step}</div>
                <h3 className="text-base font-bold text-brand-navy">{app.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. ACADEMIC INTEGRITY SECTION */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 space-y-6 shadow-xl my-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/20 text-brand-lightBlue flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Academic Integrity Commitment</h2>
          </div>

          <p className="text-brand-muted text-sm sm:text-base leading-relaxed text-balance">
            TUTOR PROCTORED EXAMS strictly supports genuine learning and independent examination completion. We explicitly do NOT offer impersonation, proxy examination-taking, cheating, unauthorized examination assistance, or proctoring bypass services.
          </p>

          <p className="text-brand-muted text-sm leading-relaxed">
            Our role is strictly educational: providing concept explanations, study schedules, practice problem walkthroughs, and legitimate technical system requirement checks so students can take their own examinations with full preparation and confidence.
          </p>

          <div className="pt-2">
            <Link href="/disclaimer" className="text-xs font-semibold text-brand-lightBlue hover:underline inline-flex items-center gap-1">
              Read our full legal disclaimer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 7. CALL TO ACTION */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-secondaryNavy text-white rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LET’S WORK TOWARD YOUR LEARNING GOALS
          </h2>

          <p className="text-base sm:text-lg text-brand-muted/90 max-w-xl mx-auto leading-relaxed">
            Find the personalized tutoring, structured study plan, or technical guidance that matches your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/services" variant="primary" size="lg" icon={ArrowRight}>
              Explore Our Services
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Contact Our Team
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
