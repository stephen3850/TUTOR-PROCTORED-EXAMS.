import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  Users,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Clock,
  Layers,
  FileCheck,
  Building2,
  Target,
  ArrowLeft,
  Calendar,
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

export async function generateStaticParams() {
  return Object.keys(CERTIFICATIONS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const cert = CERTIFICATIONS_DATA[resolvedParams?.slug];
  if (!cert) {
    return {
      title: 'Certification Not Found',
    };
  }

  const title = `${cert.title} Exam Prep & Study Guide | ${cert.fullName} | TUTOR PROCTORED EXAMS`;
  const description = `Prepare for the ${cert.title} (${cert.fullName}) exam with structured domain coaching, practice questions, study roadmaps, and 1-on-1 tutoring.`;
  const canonicalUrl = `${SITE_CONFIG.domain}/certifications/${cert.slug}`;

  return {
    title,
    description,
    keywords: [
      `${cert.title} exam prep`,
      `${cert.fullName}`,
      `${cert.governingBody}`,
      `${cert.title} study guide`,
      `${cert.title} domains`,
      `${cert.title} practice questions`,
      'certification tutoring',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CertificationDetailPage({ params }) {
  const resolvedParams = await params;
  const cert = CERTIFICATIONS_DATA[resolvedParams?.slug];

  if (!cert) {
    notFound();
  }

  // Related certifications excluding current
  const relatedCerts = Object.values(CERTIFICATIONS_DATA)
    .filter((c) => c.slug !== cert.slug)
    .slice(0, 3);

  // Structured Data JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: `${cert.title} Preparation & Coaching`,
        description: cert.overview,
        provider: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.domain,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: cert.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_CONFIG.domain,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Certifications',
            item: `${SITE_CONFIG.domain}/certifications`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: cert.title,
            item: `${SITE_CONFIG.domain}/certifications/${cert.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-12 py-10 pb-20">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb
          items={[
            { label: 'Certifications', href: '/certifications' },
            { label: cert.title },
          ]}
        />

        {/* 1. HERO & OVERVIEW */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm my-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="blue">{cert.category}</Badge>
                <span className="text-xs text-brand-muted font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-brand-blue" /> Body: {cert.governingBody}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
                {cert.title} — {cert.fullName}
              </h1>
            </div>
            <Button href="/contact" variant="primary" size="md">
              Book Certification Tutoring
            </Button>
          </div>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-4xl text-balance">
            {cert.overview}
          </p>

          {/* Exam Specs Table/Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-brand-border/60">
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-muted font-medium block">Question Count</span>
              <span className="text-sm font-bold text-brand-navy">{cert.examFormat.totalQuestions}</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-muted font-medium block">Time Allowed</span>
              <span className="text-sm font-bold text-brand-navy">{cert.examFormat.duration}</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-muted font-medium block">Passing Threshold</span>
              <span className="text-sm font-bold text-brand-navy">{cert.examFormat.passingScore}</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-muted font-medium block">Proctoring Delivery</span>
              <span className="text-sm font-bold text-brand-navy">{cert.examFormat.proctoring}</span>
            </div>
          </div>
        </div>

        {/* 2. TARGET AUDIENCE */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
          <SectionHeading
            badge="Target Audience"
            title={`Who Should Pursue ${cert.title}?`}
            subtitle="Designed for professionals, healthcare workers, IT specialists, and career advancers seeking national validation."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {cert.targetAudience.map((audience, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-brand-bg border border-brand-border flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span className="text-sm text-brand-text leading-relaxed font-medium">{audience}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. KNOWLEDGE DOMAIN BREAKDOWN */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
          <SectionHeading
            badge="Syllabus Breakdown"
            title={`${cert.title} Examination Knowledge Domains`}
            subtitle="Comprehensive breakdown of the core subject areas tested on the official examination."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {cert.domains.map((domain, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-brand-border bg-brand-bg space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-lightBlue text-brand-blue font-bold text-xs flex items-center justify-center font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">{domain.name}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{domain.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RECOMMENDED PREPARATION ROADMAP */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
          <SectionHeading
            badge="Prep Strategy"
            title={`Recommended Preparation Approach for ${cert.title}`}
            subtitle="Proven study planning steps to ensure maximum retention and test-day pacing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {cert.prepApproach.map((step, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-3">
                <div className="text-2xl font-extrabold text-brand-blue/40 font-mono">STEP {idx + 1}</div>
                <p className="text-xs text-brand-text leading-relaxed font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6">
          <SectionHeading
            badge="Common Questions"
            title={`Frequently Asked Questions About ${cert.title}`}
            subtitle="Answers regarding eligibility, exam format, codebooks, and tutoring options."
          />
          <FaqAccordion items={cert.faqs} />
        </div>

        {/* 6. RELATED CERTIFICATIONS & NAVIGATION */}
        <div className="space-y-6 my-12">
          <h3 className="text-xl font-bold text-brand-navy">Explore Other Professional Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCerts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/certifications/${rel.slug}`}
                className="group p-5 bg-white border border-brand-border rounded-xl hover:border-brand-blue hover:shadow-card transition-all"
              >
                <span className="text-xs text-brand-muted block mb-1">{rel.category}</span>
                <h4 className="font-bold text-brand-navy group-hover:text-brand-blue transition-colors flex items-center justify-between">
                  <span>{rel.title} — {rel.fullName}</span>
                  <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* 7. CONVERSION CTA & DISCLAIMER */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-10 space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need Dedicated 1-on-1 Coaching for Your {cert.title} Exam?
          </h2>
          <p className="text-brand-muted text-sm max-w-xl mx-auto leading-relaxed">
            Connect with a specialist tutor to review complex domain scenarios, build custom study schedules, and walk through full practice questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Schedule Certification Session
            </Button>
            <Button href="/services" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Explore All Services
            </Button>
          </div>

          <div className="pt-6 text-[11px] text-brand-muted/70 max-w-3xl mx-auto border-t border-white/10">
            <strong>Disclaimer:</strong> TUTOR PROCTORED EXAMS is an independent educational prep platform. We are not affiliated with, sponsored by, or endorsed by {cert.governingBody}. All certification titles and registered trademarks are the property of their respective holders.
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
