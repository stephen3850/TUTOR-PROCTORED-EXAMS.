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
import { getWpPageBySlug, extractWpSeo } from '@/lib/wordpress';

export async function generateStaticParams() {
  return Object.keys(PLATFORMS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const platform = PLATFORMS_DATA[slug];

  const defaultTitle = platform ? `${platform.name} Prep Guide & System Requirements | TUTOR PROCTORED EXAMS` : 'Platform | TUTOR PROCTORED EXAMS';
  const defaultDescription = platform ? `Legitimate preparation guide, system requirements, OS compatibility, and technical assistance for ${platform.name}.` : 'Exam platform guide.';
  const defaultCanonical = `${SITE_CONFIG.domain}/exam-platforms/${slug}`;

  const wpPage = await getWpPageBySlug(slug);
  const seo = extractWpSeo(wpPage, {
    title: defaultTitle,
    description: defaultDescription,
    canonicalUrl: defaultCanonical,
  });

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      platform?.name || 'exam platform',
      'system requirements',
      'online exam prep',
      'ethical tutoring',
    ],
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.description,
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

  // 3D Bluish Glassmorphism Theme Configuration per Platform
  const platformThemes = {
    'respondus-lockdown-browser': { bg: 'bg-[#0F172A]', bgImg: '/lockdown.png', logo: '/logos/respondus.svg' },
    examplify: { bg: 'bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0F172A]', bgImg: '/examplify.jpg', logo: '/logos/examplify.svg' },
    honorlock: { bg: 'bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0F172A]', bgImg: '/honorlock.jpg', logo: '/logos/honorlock.svg' },
    'proctoru-meazure-learning': { bg: 'bg-gradient-to-br from-[#047857] via-[#05B851] to-[#064E3B]', logo: '/logos/proctoru.svg' },
    proctorio: { bg: 'bg-gradient-to-br from-[#3730A3] via-[#4F46E5] to-[#1E1B4B]', logo: '/logos/proctorio.svg' },
    examity: { bg: 'bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0F172A]', logo: '/logos/examity.svg' },
    proctortrack: { bg: 'bg-gradient-to-br from-[#991B1B] via-[#DC2626] to-[#450A0A]', logo: '/logos/proctortrack.svg' },
    psi: { bg: 'bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0F172A]', logo: '/logos/psi.svg' },
    ati: { bg: 'bg-gradient-to-br from-[#C2410C] via-[#EA580C] to-[#7C2D12]', logo: '/logos/ati.svg' },
  };

  const theme = platformThemes[platform.slug] || { bg: 'bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0F172A]', logo: `/logos/${platform.slug}.svg` };

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

        {/* 1. 3D BREATHING & SCALING LOGO HERO PANEL (CLEAN MAP-FREE BACKGROUND) */}
        <div className={`relative text-white rounded-2xl p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] my-6 ${theme.bg} overflow-hidden`}>
          {/* Background Image when applicable */}
          {theme.bgImg && (
            <>
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url('${theme.bgImg}')` }}
              ></div>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/40"></div>
            </>
          )}

          {/* Official Platform Logo 3D Watermark with Continuous Breathing & Scaling Animation */}
          {theme.logo && (
            <div className="absolute top-1/2 right-2 sm:right-6 w-64 h-64 sm:w-80 sm:h-80 opacity-35 pointer-events-none z-0 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-3d-pulse-slow">
              <img
                src={theme.logo}
                alt={`${platform.name} Official Logo`}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    {platform.category}
                  </span>
                  <span className="text-xs text-slate-200 font-bold">Vendor: {platform.vendor}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                  {platform.name}
                </h1>
              </div>
              <a
                href="https://wa.me/254711882470"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-950 px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:bg-slate-100"
              >
                <span>Request Technical Assistance</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </a>
            </div>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl font-medium drop-shadow-sm">
              {platform.overview}
            </p>

            {/* 3D FROSTED GLASS KEY FEATURES CARDS */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-sm">KEY FEATURES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {keyFeatures.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-start gap-2.5 shadow-lg transform hover:-translate-y-0.5 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span className="text-xs text-white font-semibold leading-relaxed drop-shadow-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. SYSTEM REQUIREMENTS SUMMARY */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-4 shadow-sm">
          <SectionHeading
            badge="System Requirements"
            title={`${platform.shortName || platform.name} System Requirements Summary`}
            subtitle="Brief summary of supported operating systems and basic hardware requirements."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-[#0F172A] font-bold block flex items-center gap-1">
                <Monitor className="w-4 h-4 text-[#2563EB]" /> Windows OS
              </span>
              <span className="text-xs text-slate-600">{platform.systemRequirements.windows}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-[#0F172A] font-bold block flex items-center gap-1">
                <Laptop className="w-4 h-4 text-[#2563EB]" /> macOS
              </span>
              <span className="text-xs text-slate-600">{platform.systemRequirements.macOS}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-[#0F172A] font-bold block flex items-center gap-1">
                <HardDrive className="w-4 h-4 text-[#2563EB]" /> Chromebook / iOS
              </span>
              <span className="text-xs text-slate-600">
                {platform.systemRequirements.chromebook || 'Supported depending on institutional guidelines'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-[#0F172A] font-bold block flex items-center gap-1">
                <Cpu className="w-4 h-4 text-[#2563EB]" /> Hardware
              </span>
              <span className="text-xs text-slate-600">{platform.systemRequirements.hardware}</span>
            </div>
          </div>
        </div>

        {/* 3. CONSISTENT CONTACT SUPPORT SECTION FOR ALL PLATFORMS (CLEAR VIBRANT GREEN BACKGROUND) */}
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

        {/* 4. RELATED PLATFORMS NAVIGATION */}
        <div className="space-y-6 my-10">
          <h3 className="text-xl font-bold text-[#0F172A]">Explore Other Supported Platforms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPlatforms.map((rel) => (
              <Link
                key={rel.slug}
                href={`/exam-platforms/${rel.slug}`}
                className="group p-5 bg-white border border-slate-200 rounded-xl hover:border-[#2563EB] hover:shadow-card transition-all"
              >
                <span className="text-xs text-slate-500 block mb-1 font-semibold">{rel.category}</span>
                <h4 className="font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                  <span>{rel.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
