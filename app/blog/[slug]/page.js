import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  List,
  Sparkles,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { BLOG_ARTICLES } from '@/lib/data/blogData';
import { SITE_CONFIG } from '@/lib/utils';

export async function generateStaticParams() {
  return Object.keys(BLOG_ARTICLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = BLOG_ARTICLES[resolvedParams?.slug];
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const title = `${article.title} | TUTOR PROCTORED EXAMS`;
  const description = article.excerpt;
  const canonicalUrl = `${SITE_CONFIG.domain}/blog/${article.slug}`;

  return {
    title,
    description,
    keywords: [
      article.title,
      article.category,
      'examination preparation',
      'study guides',
      'proctoring software guide',
      'educational support',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const article = BLOG_ARTICLES[resolvedParams?.slug];

  if (!article) {
    notFound();
  }

  // Related articles excluding current
  const relatedArticles = Object.values(BLOG_ARTICLES)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  // Structured Data JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image: article.image,
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
        mainEntity: (article.faqs || []).map((faq) => ({
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
            name: 'Blog',
            item: `${SITE_CONFIG.domain}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `${SITE_CONFIG.domain}/blog/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-12 py-10 pb-20">
      <JsonLd data={jsonLdData} />

      <PageContainer size="small">
        <Breadcrumb
          items={[
            { label: 'Blog & Resources', href: '/blog' },
            { label: article.title },
          ]}
        />

        {/* 1. ARTICLE HEADER */}
        <div className="space-y-4 my-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="blue">{article.category}</Badge>
            <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-blue" /> {article.readTime}
            </span>
            <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-blue" /> {article.publishDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-brand-muted font-medium pt-2 border-b border-brand-border pb-4">
            <User className="w-4 h-4 text-brand-blue shrink-0" />
            <span>Authored by TUTOR PROCTORED EXAMS Editorial Specialists</span>
          </div>
        </div>

        {/* 2. FEATURED IMAGE */}
        <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-brand-bg my-6 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3. TABLE OF CONTENTS */}
        {article.toc && article.toc.length > 0 && (
          <div className="bg-brand-bg border border-brand-border rounded-xl p-6 space-y-3 my-6">
            <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2 uppercase tracking-wider">
              <List className="w-4 h-4 text-brand-blue" />
              Table of Contents
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-brand-blue font-semibold">
              {article.toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:underline flex items-center gap-1.5">
                    <span className="text-brand-muted">•</span> {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. INTRO / KEY TAKEAWAYS BOX */}
        <div className="p-6 rounded-xl bg-brand-lightBlue/50 border border-brand-blue/20 space-y-2 my-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Key Overview
          </h4>
          <p className="text-sm sm:text-base text-brand-navy font-medium leading-relaxed">
            {article.intro}
          </p>
        </div>

        {/* 5. ARTICLE CONTENT SECTIONS */}
        <div className="prose prose-slate max-w-none text-brand-text leading-relaxed space-y-8 my-8">
          {article.contentSections.map((sec) => (
            <div key={sec.id} id={sec.id} className="space-y-3 pt-4 border-t border-brand-border/40 scroll-mt-24">
              <h2 className="text-2xl font-bold text-brand-navy tracking-tight">
                {sec.title}
              </h2>
              <div
                className="text-sm sm:text-base text-brand-muted leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: sec.content }}
              />
            </div>
          ))}
        </div>

        {/* 6. RELATED PLATFORMS & SERVICES BADGES */}
        <div className="bg-white border border-brand-border rounded-xl p-6 space-y-4 my-8 shadow-sm">
          <h3 className="text-base font-bold text-brand-navy">Related Exam Platforms & Services</h3>
          <div className="flex flex-wrap gap-2">
            {article.relatedPlatforms?.map((plat, idx) => (
              <Link
                key={idx}
                href="/exam-platforms"
                className="px-3 py-1 rounded-full bg-brand-lightBlue text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white transition-colors"
              >
                {plat}
              </Link>
            ))}
            {article.relatedServices?.map((serv, idx) => (
              <Link
                key={idx}
                href="/services"
                className="px-3 py-1 rounded-full bg-brand-bg text-brand-navy text-xs font-semibold border border-brand-border hover:bg-brand-navy hover:text-white transition-colors"
              >
                {serv}
              </Link>
            ))}
          </div>
        </div>

        {/* 7. ARTICLE FAQS */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 space-y-6 my-8 shadow-sm">
            <SectionHeading
              badge="Article Q&A"
              title="Article Frequently Asked Questions"
              subtitle="Quick answers related to this article topic."
            />
            <FaqAccordion items={article.faqs} />
          </div>
        )}

        {/* 8. RELATED ARTICLES GRID */}
        <div className="space-y-6 my-12 pt-8 border-t border-brand-border">
          <h3 className="text-xl font-bold text-brand-navy">Read Next</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 bg-white border border-brand-border rounded-xl hover:border-brand-blue hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] text-brand-muted block font-medium">{rel.category}</span>
                  <h4 className="font-bold text-brand-navy text-sm leading-snug group-hover:text-brand-blue transition-colors">
                    {rel.title}
                  </h4>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-brand-blue">
                  <span>Read guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 9. CONVERSION CTA BANNER */}
        <div className="bg-brand-navy text-white rounded-2xl p-8 text-center space-y-4 my-8">
          <h2 className="text-2xl font-bold text-white">Need Personalized Guidance for Your Upcoming Exam?</h2>
          <p className="text-brand-muted text-xs sm:text-sm max-w-lg mx-auto">
            Connect with a specialist tutor for 1-on-1 subject coaching, study planning, or proctoring software technical guidance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/contact" variant="primary" size="md" icon={ArrowRight}>
              Contact Our Team
            </Button>
            <Button href="/blog" variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
              Back to Article Index
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
