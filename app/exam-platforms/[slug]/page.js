import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Laptop,
  HardDrive,
  Cpu,
  HelpCircle,
  ArrowRight,
  BookOpen,
  UserCheck,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { PLATFORMS_DATA } from '@/lib/data/platformsData';
import { SITE_CONFIG } from '@/lib/utils';

export async function generateStaticParams() {
  return Object.keys(PLATFORMS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const platform = PLATFORMS_DATA[resolvedParams?.slug];
  if (!platform) {
    return {
      title: 'Platform Not Found',
    };
  }

  const title = `${platform.name} Prep Guide & System Requirements | TUTOR PROCTORED EXAMS`;
  const description = `Legitimate preparation guide, system requirements, OS compatibility, troubleshooting tips, and study resources for ${platform.name}.`;
  const canonicalUrl = `${SITE_CONFIG.domain}/exam-platforms/${platform.slug}`;

  return {
    title,
    description,
    keywords: [
      `${platform.name} guide`,
      `${platform.name} system requirements`,
      `${platform.name} preparation`,
      `${platform.name} troubleshooting`,
      `${platform.name} compatibility`,
      'online exam prep',
      'ethical tutoring',
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

export default async function PlatformDetailPage({ params }) {
  const resolvedParams = await params;
  const platform = PLATFORMS_DATA[resolvedParams?.slug];

  if (!platform) {
    notFound();
  }

  // Related platforms list excluding current
  const relatedPlatforms = Object.values(PLATFORMS_DATA)
    .filter((p) => p.slug !== platform.slug)
    .slice(0, 3);

  // Structured Data JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: `${platform.name} System Requirements & Preparation Guide`,
        description: platform.overview,
        author: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.domain,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: platform.faqs.map((faq) => ({
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
            name: 'Exam Platforms',
            item: `${SITE_CONFIG.domain}/exam-platforms`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: platform.name,
            item: `${SITE_CONFIG.domain}/exam-platforms/${platform.slug}`,
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
            { label: 'Exam Platforms', href: '/exam-platforms' },
            { label: platform.name },
          ]}
        />

        {/* 1. HERO & INTRODUCTION */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm my-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="blue">{platform.category}</Badge>
                <span className="text-xs text-brand-muted font-medium">Vendor: {platform.vendor}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
                {platform.name}
              </h1>
            </div>
            <Button href="/contact" variant="primary" size="md">
              Get Exam Preparation Help
            </Button>
          </div>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-4xl text-balance">
            {platform.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {platform.features.map((feature, idx) => (
              <div key={idx} className="bg-brand-bg p-4 rounded-xl border border-brand-border/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <span className="text-xs text-brand-text font-medium leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SYSTEM REQUIREMENTS & HARDWARE COMPATIBILITY */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm">
          <SectionHeading
            badge="Hardware & OS Specs"
            title={`${platform.name} System Requirements`}
            subtitle="Verified operating system and hardware specifications for taking exams on this platform."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-2">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <Monitor className="w-4 h-4 text-brand-blue" />
                  <span>Windows OS Requirements</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">{platform.systemRequirements.windows}</p>
              </div>

              <div className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-2">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <Laptop className="w-4 h-4 text-brand-blue" />
                  <span>macOS Requirements</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">{platform.systemRequirements.macOS}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-2">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <HardDrive className="w-4 h-4 text-brand-blue" />
                  <span>Chromebook & iOS Support</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  <strong>Chromebook:</strong> {platform.systemRequirements.chromebook}<br />
                  <strong>iOS/iPadOS:</strong> {platform.systemRequirements.iOS}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-brand-border bg-brand-bg space-y-2">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <Cpu className="w-4 h-4 text-brand-blue" />
                  <span>Hardware & Peripherals</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">{platform.systemRequirements.hardware}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PREPARATION CONSIDERATIONS & TROUBLESHOOTING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {/* Preparation Checklist */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-5">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-brand-blue" />
              Examination Preparation Checklist
            </h3>
            <ul className="space-y-3">
              {platform.prepConsiderations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue text-brand-blue font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Troubleshooting */}
          <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-5">
            <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-blue" />
              Legitimate Technical Troubleshooting
            </h3>
            <div className="space-y-4">
              {platform.troubleshooting.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-brand-border bg-brand-bg space-y-1.5">
                  <h4 className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {item.issue}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed pl-5">
                    <strong>Solution:</strong> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 my-10">
          <SectionHeading
            badge="Common Questions"
            title={`Frequently Asked Questions About ${platform.shortName}`}
            subtitle="Clear answers on system setup, compatibility, and study support."
          />
          <FaqAccordion items={platform.faqs} />
        </div>

        {/* 5. RELATED PLATFORMS & NAVIGATION */}
        <div className="space-y-6 my-12">
          <h3 className="text-xl font-bold text-brand-navy">Explore Other Supported Platforms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPlatforms.map((rel) => (
              <Link
                key={rel.slug}
                href={`/exam-platforms/${rel.slug}`}
                className="group p-5 bg-white border border-brand-border rounded-xl hover:border-brand-blue hover:shadow-card transition-all"
              >
                <span className="text-xs text-brand-muted block mb-1">{rel.category}</span>
                <h4 className="font-bold text-brand-navy group-hover:text-brand-blue transition-colors flex items-center justify-between">
                  <span>{rel.name}</span>
                  <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* 6. CONVERSION CTA & VENDOR DISCLAIMER */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-10 space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need 1-on-1 Tutoring for Your {platform.shortName} Exam?
          </h2>
          <p className="text-brand-muted text-sm max-w-xl mx-auto leading-relaxed">
            Our US-based educational specialists provide personalized subject coaching, mock test reviews, and system readiness assistance so you can take your exam with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Schedule Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Explore All Services
            </Button>
          </div>

          <div className="pt-6 text-[11px] text-brand-muted/70 max-w-3xl mx-auto border-t border-white/10">
            <strong>Disclaimer:</strong> TUTOR PROCTORED EXAMS is an independent educational service. We are not affiliated with, endorsed by, or sponsored by {platform.vendor} or {platform.name}. All product names and registered trademarks are the property of their respective owners.
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
