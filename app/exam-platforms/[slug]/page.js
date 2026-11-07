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

  // Map background images per platform
  const bgImages = {
    'respondus-lockdown-browser': '/lockdown.png',
    examplify: '/examplify.jpg',
    honorlock: '/honorlock.jpg',
  };
  const platformBg = bgImages[platform.slug];

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
    <div className="space-y-10 pt-2 pb-16">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb
          items={[
            { label: 'Exam Platforms', href: '/exam-platforms' },
            { label: platform.name },
          ]}
        />

        {/* 1. PAGE TITLE, VENDOR & SHORT DESCRIPTION (WITH BACKGROUND IMAGE WHEN AVAILABLE) */}
        {platformBg ? (
          <div className="relative text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl my-6 bg-[#0F172A] overflow-hidden">
            {/* Background Image: lockdown.png / examplify.jpg / honorlock.jpg */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url('${platformBg}')` }}
            ></div>

            {/* Dark Gradient Overlay for Crisp Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/40"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="blue" className="bg-[#2563EB] text-white border-blue-400 font-bold">{platform.category}</Badge>
                    <span className="text-xs text-slate-200 font-bold">Vendor: {platform.vendor}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                    {platform.name}
                  </h1>
                </div>
                <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="primary" size="md" icon={ArrowRight} className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                  Request Technical Assistance
                </Button>
              </div>

              <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-4xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {platform.overview}
              </p>

              {/* 2. KEY FEATURES (MAXIMUM 3 SHORT BULLETS) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {keyFeatures.map((feature, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-start gap-2.5 shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-[#356AE6] shrink-0 mt-0.5" />
                      <span className="text-xs text-white font-semibold leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : platform.slug === 'proctoru-meazure-learning' ? (
          /* PROCTORU / MEAZURE LEARNING LIGHT GREEN GLASSMORPHISM PANEL WITH LOGO */
          <div className="relative text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl my-6 bg-[#05B851] overflow-hidden">
            {/* World Map Background Texture */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay"
              style={{ backgroundImage: "url('/www.jpg')" }}
            ></div>

            {/* Official ProctorU Logo Watermark on Right Side */}
            <div className="absolute top-1/2 right-2 sm:right-6 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 opacity-30 pointer-events-none z-0 filter drop-shadow-xl">
              <img
                src="/logos/proctoru.svg"
                alt="Official ProctorU Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-block bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      {platform.category}
                    </span>
                    <span className="text-xs text-emerald-100 font-bold">Vendor: {platform.vendor}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {platform.name}
                  </h1>
                </div>
                <a
                  href="https://wa.me/254711882470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-emerald-950 px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:bg-emerald-50"
                >
                  <span>Request Technical Assistance</span>
                  <ArrowRight className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
                </a>
              </div>

              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed max-w-3xl font-medium drop-shadow-sm">
                {platform.overview}
              </p>

              {/* KEY FEATURES (FROSTED GLASSMORPHISM CARDS) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm">KEY FEATURES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {keyFeatures.map((feature, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-start gap-2.5 shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      <span className="text-xs text-white font-semibold leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : platform.slug === 'proctorio' ? (
          /* PROCTORIO VIBRANT INDIGO HERO PANEL */
          <div className="relative text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl my-6 bg-gradient-to-br from-[#3730A3] via-[#4F46E5] to-[#1E1B4B] overflow-hidden">
            {/* Official Proctorio Logo Watermark on Right Side */}
            <div className="absolute top-1/2 right-2 sm:right-6 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 opacity-30 pointer-events-none z-0 filter drop-shadow-xl">
              <img
                src="/logos/proctorio.svg"
                alt="Official Proctorio Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="blue" className="bg-white/20 text-white border-white/30 font-bold">{platform.category}</Badge>
                    <span className="text-xs text-indigo-100 font-bold">Vendor: {platform.vendor}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {platform.name}
                  </h1>
                </div>
                <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="primary" size="md" icon={ArrowRight} className="bg-white text-indigo-950 font-black hover:bg-indigo-50">
                  Request Technical Assistance
                </Button>
              </div>

              <p className="text-base sm:text-lg text-indigo-100 leading-relaxed max-w-3xl font-medium drop-shadow-sm">
                {platform.overview}
              </p>

              {/* KEY FEATURES */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {keyFeatures.map((feature, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-start gap-2.5 shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      <span className="text-xs text-white font-semibold leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 shadow-sm my-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="blue" className="bg-blue-50 text-[#2563EB] border border-blue-100 font-bold px-3 py-1 text-xs">
                    {platform.category}
                  </Badge>
                  <span className="text-xs text-slate-500 font-bold">Vendor: {platform.vendor}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                  {platform.name}
                </h1>
              </div>
              <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="primary" size="md" icon={ArrowRight} className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                Request Technical Assistance
              </Button>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl font-normal">
              {platform.overview}
            </p>

            {/* KEY FEATURES */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">KEY FEATURES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {keyFeatures.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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

        {/* 4. CONSISTENT CONTACT SUPPORT SECTION FOR ALL 9 PLATFORMS (CLEAR VIBRANT GREEN BACKGROUND) */}
        <div className="bg-[#05B851] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl text-center max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="inline-block bg-white/20 text-white border border-white/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              Technical Guidance & Support
            </span>

            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Need Help With This Examination Platform?
            </h2>

            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
              Need assistance with examination software, technical requirements, installation or exam preparation? Contact TUTOR PROCTORED EXAMS for professional guidance and support.
            </p>
          </div>

          {/* Functional Contact Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            {/* BUTTON 1: CHAT WITH US ON WHATSAPP */}
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-emerald-50 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950 text-white shrink-0" />
              <span>Chat with Us on WhatsApp</span>
            </a>

            {/* BUTTON 2: EMAIL US */}
            <a
              href="mailto:info@tutorproctoredexams.com"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-white/90 bg-emerald-800/80 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-white hover:text-emerald-950 transition-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Email Us</span>
            </a>

            {/* BUTTON 3: REQUEST TECHNICAL ASSISTANCE FORM LINK */}
            <Button href="/contact?service=Examination%20Software%20Technical%20Guidance" variant="outline" size="md" icon={ArrowRight} className="border-white/40 text-white hover:bg-white/10">
              Request Assistance
            </Button>
          </div>

          {/* Direct Contact Info Display */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/90 border-t border-white/20 max-w-xl mx-auto font-medium">
            <span><strong>WhatsApp:</strong> +254 711 882470</span>
            <span>•</span>
            <span><strong>Email:</strong> info@tutorproctoredexams.com</span>
          </div>

          {/* Vendor Disclaimer */}
          <div className="pt-2 text-[11px] text-white/80 max-w-3xl mx-auto border-t border-white/20 font-medium">
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
