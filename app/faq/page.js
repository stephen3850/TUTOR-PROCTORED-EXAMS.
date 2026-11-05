'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Cpu,
  Mail,
  ChevronDown,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { MASTER_FAQS } from '@/lib/data/faqsData';
import { SITE_CONFIG } from '@/lib/utils';

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...MASTER_FAQS.map((cat) => cat.category)];

  const filteredFaqs =
    activeCategory === 'All'
      ? MASTER_FAQS
      : MASTER_FAQS.filter((cat) => cat.category === activeCategory);

  // Flatten for FAQPage Schema
  const allFaqItems = MASTER_FAQS.flatMap((cat) => cat.items);

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: allFaqItems.map((faq) => ({
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
            name: 'FAQ',
            item: `${SITE_CONFIG.domain}/faq`,
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-10 pb-20">
      <JsonLd data={jsonLdData} />

      <PageContainer>
        <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

        {/* 1. HERO SECTION */}
        <div className="relative bg-brand-navy text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6">
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              Knowledge Base
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Find answers to common questions about our educational services, examination preparation resources, professional certification guidance, and how to get started.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted border-t border-white/10">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> 100% Academic Integrity Guarantee</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> Clear Service Answers</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-brand-blue" /> Independent Guidance</span>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTER NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 my-8 scrollbar-none">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-white text-brand-text border border-brand-border hover:bg-brand-bg hover:border-brand-blue/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. CATEGORIZED ACCORDION SECTIONS */}
        <div className="space-y-12">
          {filteredFaqs.map((catSection, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-lightBlue text-brand-blue flex items-center justify-center font-bold text-xs font-mono">
                  0{catIdx + 1}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy">
                  {catSection.category}
                </h2>
              </div>

              <FaqAccordion items={catSection.items} />
            </div>
          ))}
        </div>

        {/* 4. ACADEMIC INTEGRITY NOTICE BANNER */}
        <div className="mt-14 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/20 text-brand-lightBlue flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Summary Stance on Academic Integrity</h3>
          </div>

          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
            TUTOR PROCTORED EXAMS is committed to ethical educational support. We explicitly do NOT offer cheating, proxy examination-taking, impersonation, unauthorized examination assistance, or proctoring software bypass services. Our sole purpose is legitimate 1-on-1 tutoring, study planning, practice testing, and hardware/software technical guidance.
          </p>

          <div className="pt-2">
            <Link href="/disclaimer" className="text-xs font-semibold text-brand-lightBlue hover:underline inline-flex items-center gap-1">
              Read our complete legal and non-affiliation disclaimer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5. FINAL CALL TO ACTION BANNER */}
        <div className="mt-12 bg-white border border-brand-border rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <Badge variant="blue">Have More Questions?</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            STILL HAVE QUESTIONS?
          </h2>
          <p className="text-brand-muted text-sm max-w-xl mx-auto leading-relaxed">
            Our educational specialists are here to help you choose the right tutoring or preparation service for your goals.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Contact Our Team
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
