import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Monitor,
  Laptop,
  HardDrive,
  Cpu,
  ArrowRight,
  Mail,
  MessageCircle,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
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
  const description = `Legitimate preparation guide, system requirements, OS compatibility, and technical assistance for ${platform.name}.`;
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

  // Maximum 3 key features
  const keyFeatures = (platform.features || []).slice(0, 3);

  // Structured Data JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: `${platform.name} System Requirements & Technical Assistance`,
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

        {/* 1. PAGE TITLE, VENDOR & SHORT DESCRIPTION */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm my-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="blue">{platform.category}</Badge>
                <span className="text-xs text-brand-muted font-bold">Vendor: {platform.vendor}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
                {platform.name}
              </h1>
            </div>
            <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="primary" size="md" icon={ArrowRight}>
              Request Technical Assistance
            </Button>
          </div>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-4xl">
            {platform.overview}
          </p>

          {/* 2. KEY FEATURES (MAXIMUM 3 SHORT BULLETS) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-brand-bg border border-brand-border flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-xs text-brand-text font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SYSTEM REQUIREMENTS SUMMARY */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-10 space-y-4 shadow-sm">
          <SectionHeading
            badge="System Requirements"
            title={`${platform.shortName || platform.name} System Requirements Summary`}
            subtitle="Brief summary of supported operating systems and basic hardware requirements."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-navy font-bold block flex items-center gap-1">
                <Monitor className="w-4 h-4 text-brand-blue" /> Windows OS
              </span>
              <span className="text-xs text-brand-muted">{platform.systemRequirements.windows}</span>
            </div>

            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-navy font-bold block flex items-center gap-1">
                <Laptop className="w-4 h-4 text-brand-blue" /> macOS
              </span>
              <span className="text-xs text-brand-muted">{platform.systemRequirements.macOS}</span>
            </div>

            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-navy font-bold block flex items-center gap-1">
                <HardDrive className="w-4 h-4 text-brand-blue" /> Chromebook / iOS
              </span>
              <span className="text-xs text-brand-muted">
                {platform.systemRequirements.chromebook || 'Supported depending on institutional guidelines'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-brand-bg border border-brand-border space-y-1">
              <span className="text-xs text-brand-navy font-bold block flex items-center gap-1">
                <Cpu className="w-4 h-4 text-brand-blue" /> Hardware
              </span>
              <span className="text-xs text-brand-muted">{platform.systemRequirements.hardware}</span>
            </div>
          </div>
        </div>

        {/* 4. CONSISTENT CONTACT SUPPORT SECTION FOR ALL 9 PLATFORMS */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 space-y-6 shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              Technical Guidance & Support
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Need Help With This Examination Platform?
            </h2>

            <p className="text-sm sm:text-base text-brand-muted/90 leading-relaxed">
              Need assistance with examination software, technical requirements, installation or exam preparation? Contact TUTOR PROCTORED EXAMS for professional guidance and support.
            </p>
          </div>

          {/* Functional Contact Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {/* BUTTON 1: CHAT WITH US ON WHATSAPP */}
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
              <span>Chat with Us on WhatsApp</span>
            </a>

            {/* BUTTON 2: EMAIL US */}
            <a
              href="mailto:info@tutorproctoredexams.com"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-secondaryNavy text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span>Email Us</span>
            </a>

            {/* BUTTON 3: REQUEST TECHNICAL ASSISTANCE FORM LINK */}
            <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="light" size="lg" icon={ArrowRight}>
              Request Technical Assistance
            </Button>
          </div>

          {/* Direct Contact Info Display */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-muted border-t border-white/10 max-w-xl mx-auto">
            <span><strong>WhatsApp:</strong> +254 711 882470</span>
            <span>•</span>
            <span><strong>Email:</strong> info@tutorproctoredexams.com</span>
          </div>

          {/* Vendor Disclaimer */}
          <div className="pt-4 text-[11px] text-brand-muted/70 max-w-3xl mx-auto border-t border-white/10">
            <strong>Disclaimer:</strong> TUTOR PROCTORED EXAMS is an independent educational service. We are not affiliated with, endorsed by, or sponsored by {platform.vendor} or {platform.name}. All product names and trademarks belong to their respective owners.
          </div>
        </div>

        {/* 5. RELATED PLATFORMS NAVIGATION */}
        <div className="space-y-6 my-10">
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
      </PageContainer>
    </div>
  );
}
