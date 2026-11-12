'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  Search,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { BLOG_ARTICLES } from '@/lib/data/blogData';

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const articlesList = Object.values(BLOG_ARTICLES);

  // Dynamically extract unique categories from articles
  const categories = [
    'All',
    ...Array.from(new Set(articlesList.map((a) => a.category).filter(Boolean))),
  ];

  // Filter logic
  const filteredArticles = articlesList.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articlesList[0];

  return (
    <div className="space-y-16 py-10 pb-20">
      <PageContainer>
        <Breadcrumb items={[{ label: 'Blog & Resources' }]} />

        {/* Hero Header */}
        <div className="relative bg-brand-navy text-white rounded-2xl p-8 sm:p-12 overflow-hidden my-6">
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80')" }}
          ></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="blue" className="bg-brand-blue/20 text-brand-lightBlue border-brand-blue/30 px-3 py-1 text-xs">
              Editorial Insights
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              EDUCATIONAL INSIGHTS & STUDY GUIDES
            </h1>

            <p className="text-base sm:text-lg text-brand-muted/90 leading-relaxed text-balance">
              Discover helpful articles, practical preparation advice, and educational insights to support your academic and professional development.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-brand-muted border-t border-white/10">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-blue" /> Verified Academic Methods</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> {articlesList.length} In-Depth Articles</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-blue" /> Exam & Certification Focus</span>
            </div>
          </div>
        </div>

        {/* Featured Article Banner */}
        {featuredArticle && selectedCategory === 'All' && searchQuery === '' && (
          <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 my-8 shadow-sm hover:border-brand-blue/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-xl overflow-hidden bg-brand-bg">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="blue">{featuredArticle.category}</Badge>
                  <span className="text-xs text-brand-muted font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" /> {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-tight">
                  <Link href={`/blog/${featuredArticle.slug}`} className="hover:text-brand-blue transition-colors">
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-brand-muted font-medium">
                    <User className="w-3.5 h-3.5 text-brand-blue" /> TUTOR PROCTORED EXAMS Editorial
                  </div>
                  <Button href={`/blog/${featuredArticle.slug}`} variant="primary" size="md" icon={ArrowRight}>
                    Read Featured Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter & Search Bar */}
        <div className="space-y-4 my-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue ${
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

            {/* Search Input */}
            <div className="relative shrink-0 w-full sm:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border bg-white text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          <SectionHeading
            badge="Articles"
            title={selectedCategory === 'All' ? 'All Educational Articles' : `${selectedCategory} Guides`}
            subtitle={`Showing ${filteredArticles.length} published study guides and educational articles.`}
          />

          {filteredArticles.length === 0 ? (
            <div className="bg-white border border-brand-border rounded-xl p-8 text-center space-y-3">
              <p className="text-brand-muted text-sm">No articles found matching your selected filters or search query.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-brand-blue underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.slug}
                  className="group bg-white border border-brand-border rounded-xl overflow-hidden hover:border-brand-blue hover:shadow-cardHover transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 bg-brand-bg overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="navy">{article.category}</Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-brand-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-brand-blue" /> {article.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-blue" /> {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                      </h3>

                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-brand-blue group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read full article</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conversion CTA */}
        <div className="mt-16 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Have Questions About an Article Topic?</h3>
          <p className="text-brand-muted text-sm max-w-xl mx-auto">
            Connect with an educational specialist for 1-on-1 subject coaching, study planning, or proctoring software technical guidance.
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
