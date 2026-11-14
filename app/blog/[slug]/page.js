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
import { getBlogsContent, getBlogBySlug } from '@/lib/contentLoader';
import { SITE_CONFIG } from '@/lib/utils';
import { getWpPostBySlug, extractWpSeo } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const article = getBlogBySlug(slug);

  const defaultTitle = article ? `${article.title} | TUTOR PROCTORED EXAMS` : 'Article | TUTOR PROCTORED EXAMS';
  const defaultDescription = article?.excerpt || 'Educational study guide and proctored examination preparation article.';
  const defaultCanonical = `${SITE_CONFIG.domain}/blog/${slug}`;

  const wpPost = await getWpPostBySlug(slug);
  const seo = extractWpSeo(wpPost, {
    title: defaultTitle,
    description: defaultDescription,
    canonicalUrl: defaultCanonical,
  });

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      article?.category || 'exam preparation',
      'proctored exam guide',
      'study tips',
      'academic integrity',
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

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const article = getBlogBySlug(resolvedParams?.slug);

  if (!article) {
    notFound();
  }

  // Related articles excluding current
  const relatedArticles = getBlogsContent()
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
        datePublished: article.publishDate,
        author: {
          '@type': 'Organization',
          name: article.author || SITE_CONFIG.name,
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
    <div className="space-y-10 pt-2 pb-16">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />

        {/* 1. ARTICLE HEADER */}
        <div className="max-w-4xl mx-auto space-y-4 my-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="blue" className="bg-brand-blue/10 text-brand-blue font-bold px-3 py-1 text-xs">
              {article.category}
            </Badge>
            <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
            <span className="text-xs text-brand-muted flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime || '5 min read'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-medium">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-brand-navy font-bold border-b border-brand-border pb-6">
            <User className="w-4 h-4 text-brand-blue" />
            <span>By {article.author || 'TUTOR PROCTORED EXAMS Academic Team'}</span>
          </div>
        </div>

        {/* 2. ARTICLE BODY CONTENT */}
        <article className="max-w-4xl mx-auto bg-white border border-brand-border rounded-2xl p-6 sm:p-10 space-y-8 shadow-sm text-brand-navy leading-relaxed">
          {article.intro && (
            <div className="text-base sm:text-lg font-medium text-brand-navy/90 leading-relaxed border-l-4 border-brand-blue pl-4 py-1 bg-brand-bg/50 rounded-r-xl">
              {article.intro}
            </div>
          )}

          {/* Render Sections if available */}
          {(article.sections || []).map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-navy border-b border-brand-border/60 pb-2">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed whitespace-pre-wrap">
                {sec.content}
              </p>
            </div>
          ))}

          {/* Key Takeaways */}
          {(article.keyTakeaways || []).length > 0 && (
            <div className="p-6 rounded-2xl bg-brand-bg border border-brand-border space-y-3">
              <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-blue" />
                Key Summary Takeaways
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-muted">
                {article.keyTakeaways.map((take, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span>{take}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* 3. RELATED ARTICLES */}
        <div className="max-w-4xl mx-auto space-y-6 my-12">
          <h3 className="text-2xl font-black text-brand-navy">Related Articles & Revision Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 bg-white border border-brand-border rounded-xl hover:border-brand-blue hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="pt-3 border-t border-brand-border/60 text-xs font-bold text-brand-blue flex items-center justify-between">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
