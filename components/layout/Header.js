'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Users,
  BookOpen,
  FileCheck,
  Award,
  Calendar,
  Cpu,
  HelpCircle,
  Layers,
  Clock,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import PageContainer from './PageContainer';
import { SITE_CONFIG, BLOGS_ENABLED } from '@/lib/utils';

// COMPACT DROPDOWN - 12 SERVICES
const ALL_12_SERVICES = [
  {
    title: '1-on-1 Online Tutoring',
    href: '/services/one-on-one-tutoring',
    icon: Users,
  },
  {
    title: 'Academic Exam Preparation',
    href: '/services/academic-exam-preparation',
    icon: BookOpen,
  },
  {
    title: 'Practice Questions & Mock Tests',
    href: '/services/practice-questions-mock-tests',
    icon: FileCheck,
  },
  {
    title: 'Professional Certification Prep',
    href: '/services/professional-certification-prep',
    icon: Award,
  },
  {
    title: 'Study Planning & Revision Support',
    href: '/services/study-planning-revision-support',
    icon: Calendar,
  },
  {
    title: 'Software Technical Guidance',
    href: '/services/software-technical-guidance',
    icon: Cpu,
  },
  {
    title: 'Online Course/Class Help',
    href: '/services/online-course-help',
    icon: GraduationCap,
  },
  {
    title: 'Online Exam Help',
    href: '/services/online-exam-help',
    icon: HelpCircle,
  },
  {
    title: 'Proctored/Certifications Exam',
    href: '/services/proctored-certification-exams',
    icon: ShieldCheck,
  },
  {
    title: 'GED Exam Preparation',
    href: '/services/ged',
    icon: Layers,
  },
  {
    title: 'HESI A2 Exam Preparation',
    href: '/services/hesi',
    icon: Clock,
  },
  {
    title: 'ATI TEAS Exam Preparation',
    href: '/services/teas',
    icon: Sparkles,
  },
];

// ALL 13 EXAM PLATFORMS & OPTIONS WITH OFFICIAL LOGOS
const ALL_13_PLATFORMS = [
  { name: 'Respondus LockDown Browser', href: '/exam-platforms/respondus-lockdown-browser', logo: '/logos/respondus.svg' },
  { name: 'Examplify (ExamSoft)', href: '/exam-platforms/examplify', logo: '/logos/examplify.svg' },
  { name: 'Honorlock', href: '/exam-platforms/honorlock', logo: '/logos/honorlock.svg' },
  { name: 'ProctorU / Meazure Learning', href: '/exam-platforms/proctoru-meazure-learning', logo: '/logos/proctoru.svg' },
  { name: 'Proctorio', href: '/exam-platforms/proctorio', logo: '/logos/proctorio.svg' },
  { name: 'Proctortrack', href: '/exam-platforms/proctortrack', logo: '/logos/proctortrack.svg' },
  { name: 'Examity', href: '/exam-platforms/examity', logo: '/logos/examity.svg' },
  { name: 'PSI Bridge', href: '/exam-platforms/psi', logo: '/logos/psi.svg' },
  { name: 'ATI Testing (TEAS)', href: '/exam-platforms/ati', logo: '/logos/ati.svg' },
  { name: 'GED Exam Preparation', href: '/services/ged', logo: '/logos/ged.svg' },
  { name: 'HESI A2 Exam Preparation', href: '/services/hesi', logo: '/logos/hesi.svg' },
  { name: 'ATI TEAS Exam Preparation', href: '/services/teas', logo: '/logos/teas.svg' },
  { name: 'Mock Tests & Practice Exams', href: '/services/practice-questions-mock-tests', logo: '/logos/mock.svg' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/90 transition-shadow duration-300 shadow-sm">
      {/* Top Announcement Bar (Vibrant Crimson Red) */}
      <div className="bg-[#DC2626] text-white text-xs py-2 px-4 border-b border-red-800 font-semibold shadow-sm">
        <PageContainer className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
            <span className="truncate font-bold text-white text-[11px] sm:text-xs">
              Ethical Educational Support & Proctoring Software Technical Guidance for Students Worldwide
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3.5 text-white text-[11px] font-bold">
            <span>{SITE_CONFIG.hours}</span>
            <span className="text-red-300">|</span>
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-200 hover:text-white font-extrabold transition-colors inline-flex items-center gap-1.5 underline underline-offset-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200/20" />
              <span>Contact Our Team</span>
            </a>
            <span className="text-red-300">|</span>
            <Link
              href="/disclaimer"
              className="text-white hover:text-red-100 transition-colors font-bold"
            >
              Academic Disclaimer
            </Link>
          </div>
        </PageContainer>
      </div>

      {/* Main Navbar Bar */}
      <div className="bg-white">
        <PageContainer className="flex items-center justify-between h-16 sm:h-20">

          {/* BRAND LOGO AREA */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1"
            aria-label="TUTOR PROCTORED EXAMS Home Page"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-sm group-hover:bg-[#2563EB] transition-colors duration-200 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </div>

            <div className="hidden sm:block h-6 w-[1px] bg-slate-200 mx-0.5 shrink-0" />

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-sm sm:text-base lg:text-lg text-[#0F172A] tracking-tight whitespace-nowrap">
                  TUTOR PROCTORED
                </span>
                <span className="font-black text-sm sm:text-base lg:text-lg text-[#2563EB] tracking-tight whitespace-nowrap">
                  EXAMS
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block leading-none mt-1">
                ACADEMIC & CERTIFICATION SUPPORT
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION ITEMS */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* HOME */}
            <Link
              href="/"
              className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                pathname === '/'
                  ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                  : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* ABOUT US DROPDOWN */}
            <div className="relative group">
              <Link
                href="/about"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  pathname.startsWith('/about')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
              </Link>

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-60 bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-0.5">
                  <Link href="/about" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Our Story & Purpose
                  </Link>
                  <Link href="/about" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Academic Integrity Pledge
                  </Link>
                  <Link href="/about" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Core Values & Mission
                  </Link>
                </div>
              </div>
            </div>

            {/* OUR SERVICES - ULTRA-COMPACT SLEEK VERTICAL DROPDOWN */}
            <div className="relative group">
              <Link
                href="/services"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  pathname.startsWith('/services')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                <span>Our Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
              </Link>

              <div className="absolute top-full left-0 pt-1.5 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-[260px] max-h-[360px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1 shadow-2xl divide-y divide-slate-100/60 scrollbar-none">
                  {ALL_12_SERVICES.map((serv, idx) => {
                    const ServIcon = serv.icon;
                    return (
                      <Link
                        key={idx}
                        href={serv.href}
                        className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-blue-50/90 hover:text-[#2563EB] transition-colors group/item"
                      >
                        <div className="w-4.5 h-4.5 rounded bg-[#2563EB] flex items-center justify-center text-white shrink-0 group-hover/item:scale-105 transition-transform p-1">
                          <ServIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[11px] font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors whitespace-nowrap leading-none">
                          {serv.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* EXAM PLATFORMS DROPDOWN - ALL 13 ITEMS WITH OFFICIAL LOGOS */}
            <div className="relative group">
              <Link
                href="/exam-platforms"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  pathname.startsWith('/exam-platforms')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                <span>Exam Platforms</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
              </Link>

              <div className="absolute top-full left-0 pt-1.5 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-[280px] max-h-[420px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1 shadow-2xl divide-y divide-slate-100/60 scrollbar-none">
                  {ALL_13_PLATFORMS.map((plat, idx) => (
                    <Link
                      key={idx}
                      href={plat.href}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-blue-50/90 hover:text-[#2563EB] transition-colors group/item"
                    >
                      <div className="w-6 h-6 rounded overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/80">
                        <img
                          src={plat.logo}
                          alt={`${plat.name} logo`}
                          className="w-full h-full object-contain p-0.5"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors whitespace-nowrap leading-none">
                        {plat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* CERTIFICATIONS DROPDOWN */}
            <div className="relative group">
              <Link
                href="/certifications"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  pathname.startsWith('/certifications')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                <span>Certifications</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
              </Link>

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-64 bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-0.5">
                  <Link href="/certifications/pmp" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    PMP Certification Prep
                  </Link>
                  <Link href="/certifications/capm" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CAPM Associate in PM
                  </Link>
                  <Link href="/certifications/comptia" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CompTIA (Security+, A+, Net+)
                  </Link>
                  <Link href="/certifications/shrm" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    SHRM-CP / SHRM-SCP HR
                  </Link>
                  <Link href="/certifications/real-estate" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Real Estate License Prep
                  </Link>
                  <Link href="/certifications/aapc" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    AAPC Medical Coding
                  </Link>
                  <Link href="/certifications/cpc" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CPC Certified Coder
                  </Link>
                  <Link href="/certifications/ccma" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CCMA Clinical Assistant
                  </Link>
                  <Link href="/certifications/cna" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CNA Nursing Assistant
                  </Link>
                  <Link href="/certifications/cpht" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    CPhT Pharmacy Technician
                  </Link>
                </div>
              </div>
            </div>

            {/* STUDY RESOURCES */}
            <div className="relative group">
              <Link
                href="/study-resources"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  pathname.startsWith('/study-resources')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                <span>Study Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
              </Link>

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-60 bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-0.5">
                  <Link href="/study-resources" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Learning Guides & Library
                  </Link>
                  <Link href="/faq" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Exam Preparation FAQ
                  </Link>
                  <Link href="/services/software-technical-guidance" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    System Setup Guidance
                  </Link>
                </div>
              </div>
            </div>

            {/* BLOG - CONDITIONALLY RENDERED */}
            {BLOGS_ENABLED && (
              <Link
                href="/blog"
                className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  pathname.startsWith('/blog')
                    ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                    : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                }`}
              >
                Blog
              </Link>
            )}

            {/* FAQ */}
            <Link
              href="/faq"
              className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                pathname === '/faq'
                  ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                  : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* RIGHT ACTION BUTTON: GET STARTED (LINKS TO WHATSAPP) */}
          <div className="hidden sm:flex items-center shrink-0">
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
            </a>
          </div>

          {/* MOBILE MENU HAMBURGER TOGGLE */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F172A]" /> : <Menu className="w-6 h-6 text-[#0F172A]" />}
          </button>
        </PageContainer>
      </div>

      {/* MOBILE NAVIGATION DRAWER & COMPACT EXPANDABLE LIST */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            <Link href="/" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Home
            </Link>

            <Link href="/about" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              About Us
            </Link>

            {/* MOBILE OUR SERVICES COMPACT EXPANDABLE LIST */}
            <div className="space-y-1 border-y border-slate-100 py-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#2563EB] px-3 py-1">
                Our Services (12 Offerings)
              </div>

              <div className="pl-2 space-y-0.5">
                {ALL_12_SERVICES.map((serv, idx) => (
                  <Link
                    key={idx}
                    href={serv.href}
                    className="block text-xs font-semibold py-2 px-3 rounded-lg text-[#0F172A] hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    {serv.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* MOBILE EXAM PLATFORMS COMPACT LIST (ALL 13 ITEMS) */}
            <div className="space-y-1 border-b border-slate-100 py-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#2563EB] px-3 py-1">
                Exam Platforms (13 Options)
              </div>

              <div className="pl-2 space-y-0.5">
                {ALL_13_PLATFORMS.map((plat, idx) => (
                  <Link
                    key={idx}
                    href={plat.href}
                    className="block text-xs font-semibold py-2 px-3 rounded-lg text-[#0F172A] hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    {plat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/certifications" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Certifications
            </Link>

            <Link href="/study-resources" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Study Resources
            </Link>

            {BLOGS_ENABLED && (
              <Link href="/blog" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
                Blog
              </Link>
            )}

            <Link href="/faq" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              FAQ
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <a
              href="https://wa.me/254711882470"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 px-6 rounded-lg font-bold text-sm shadow-sm text-center flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
