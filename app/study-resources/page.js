import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileCheck,
  CheckSquare,
  Award,
  Cpu,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContentCard from '@/components/ui/ContentCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { BLOG_ARTICLES } from '@/lib/data/blogData';
import { BLOGS_ENABLED } from '@/lib/utils';

export const metadata = {
  title: 'Study Resources & Learning Guides | TUTOR PROCTORED EXAMS',
  description:
    'Explore practical learning resources, examination preparation guides, study strategies, and educational information designed to help you prepare with confidence.',
  keywords: [
    'study resources',
    'learning guides',
    'examination preparation guides',
    'study strategies',
    'professional certification resources',
    'examination software guidance',
  ],
};

export default function StudyResourcesPage() {
  const categories = [
    {
      title: 'Examination Preparation',
      slug: 'examination-preparation',
      description: 'Comprehensive guides covering room setup, proctoring check-ins, pre-test checklists, and exam pacing.',
      icon: FileCheck,
      count: '3 Guides',
    },
    {
      title: 'Study Strategies',
      slug: 'study-strategies',
      description: 'Active recall techniques, time-blocking methods, spaced repetition schedules, and burnout prevention.',
      icon: BookOpen,
      count: '2 Guides',
    },
    {
      title: 'Professional Certifications',
      slug: 'professional-certifications',
      description: 'Preparation roadmaps for PMP, CompTIA (Security+, A+), AAPC, CPC, and CCMA credentials.',
      icon: Award,
      count: '3 Guides',
    },
    {
      title: 'Examination Software Guidance',
      slug: 'examination-software-guidance',
      description: 'Technical setup guides for Respondus LockDown Browser, Examplify, Honorlock, ProctorU, and Proctorio.',
      icon: Cpu,
      count: '3 Guides',
    },
    {
      title: 'Academic Success',
      slug: 'academic-success',
      description: 'Medical coding study tips, codebook tabbing strategies, and university level exam readiness.',
      icon: GraduationCap,
      count: '2 Guides',
    },
    {
      title: 'Practice and Revision',
      slug: 'practice-and-revision',
      description: 'How to structure weekly revision schedules, mock exam simulations, and answer rationale reviews.',
      icon: CheckSquare,
      count: '2 Guides',
    },
  ];

  const recentArticles = Object.values(BLOG_ARTICLES).slice(0, 6);

  return (
    <div className="space-y-16 py-10 pb-20">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Study Resources' }]} />

        {/* Hero Section */}
        <div className="relative bg-brand-navy text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6">
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80')" }}
          ></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              Educational Library
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              STUDY RESOURCES & LEARNING GUIDES
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Explore practical learning resources, examination preparation guides, study strategies, and educational information designed to help you prepare with confidence.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted border-t border-white/10">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> Verified Technical Specs</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> 10 Free Guides</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-blue" /> Academic & Certification Focus</span>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="space-y-8 mt-12">
          <SectionHeading
            badge="Resource Topics"
            title="Browse Resources by Category"
            subtitle="Explore specialized guides categorized by examination preparation, technical software readiness, and professional certifications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const CatIcon = cat.icon;
              const targetHref = BLOGS_ENABLED ? `/blog?category=${cat.slug}` : '/services';
              return (
                <Link
                  key={idx}
                  href={targetHref}
                  className="group bg-white border border-brand-border rounded-xl p-6 space-y-3 hover:border-brand-blue hover:shadow-cardHover transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        <CatIcon className="w-5 h-5" />
                      </div>
                      <Badge variant="slate">{cat.count}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60 flex items-center text-xs font-semibold text-brand-blue group-hover:translate-x-0.5 transition-transform">
                    <span>Explore resources</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Guides Grid - CONDITIONALLY RENDERED */}
        {BLOGS_ENABLED && (
          <div className="space-y-8 mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <SectionHeading
                badge="Latest Guides"
                title="Featured Preparation Articles"
                subtitle="Practical articles designed to help you prepare effectively for your next examination."
              />
              <Button href="/blog" variant="outline" size="md" icon={ArrowRight}>
                View All Articles
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((art) => (
                <ContentCard
                  key={art.slug}
                  title={art.title}
                  description={art.excerpt}
                  badge={art.category}
                  icon={BookOpen}
                  href={`/blog/${art.slug}`}
                  actionText="Read full guide"
                />
              ))}
            </div>
          </div>
        )}

        {/* Conversion CTA */}
        <div className="mt-14 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Need 1-on-1 Help Beyond Learning Guides?</h3>
          <p className="text-brand-muted text-sm max-w-xl mx-auto">
            Connect with a specialist tutor to review complex course topics, build a custom study schedule, or check your exam software compatibility.
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
