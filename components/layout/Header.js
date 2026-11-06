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
  ArrowRight,
} from 'lucide-react';
import PageContainer from './PageContainer';
import { SITE_CONFIG } from '@/lib/utils';

// MEGA DROPDOWN - COLUMN 1: Academic Support (6 Services)
const ACADEMIC_SUPPORT_SERVICES = [
  {
    title: '1-on-1 Online Tutoring',
    desc: 'Personalized subject instruction & concept coaching',
    href: '/services/one-on-one-tutoring',
    icon: Users,
  },
  {
    title: 'Academic Exam Preparation',
    desc: 'Syllabus audit, topic review & midterm/final prep',
    href: '/services/academic-exam-preparation',
    icon: BookOpen,
  },
  {
    title: 'Practice Questions & Mock Tests',
    desc: 'Curated question banks & rationale breakdowns',
    href: '/services/practice-questions-mock-tests',
    icon: FileCheck,
  },
  {
    title: 'Professional Certification Prep',
    desc: 'Domain coaching for PMP, CompTIA, AAPC & CCMA',
    href: '/services/professional-certification-prep',
    icon: Award,
  },
  {
    title: 'Study Planning & Revision Support',
    desc: 'Time-blocked study plans & spaced repetition',
    href: '/services/study-planning-revision-support',
    icon: Calendar,
  },
  {
    title: 'Software Technical Guidance',
    desc: 'System requirements & proctoring pre-checks',
    href: '/services/software-technical-guidance',
    icon: Cpu,
  },
];

// MEGA DROPDOWN - COLUMN 2: Online Learning & Exam Services (6 Services)
const ONLINE_LEARNING_SERVICES = [
  {
    title: 'Online Course/Class Help',
    desc: 'Weekly module guidance & assignment preparation',
    href: '/services/online-course-help',
    icon: GraduationCap,
  },
  {
    title: 'Online Exam Help',
    desc: 'High-yield problem walkthroughs & test strategies',
    href: '/services/online-exam-help',
    icon: HelpCircle,
  },
  {
    title: 'Proctored/Certifications Exam',
    desc: 'Domain coaching & proctoring technical pre-checks',
    href: '/services/proctored-certification-exams',
    icon: ShieldCheck,
  },
  {
    title: 'GED Exam Preparation',
    desc: 'Coaching in Math, Science, RLA & Social Studies',
    href: '/services/ged',
    icon: Layers,
  },
  {
    title: 'HESI A2 Exam Preparation',
    desc: 'Anatomy, nursing math & HESI subtest tutoring',
    href: '/services/hesi',
    icon: Clock,
  },
  {
    title: 'ATI TEAS Exam Preparation',
    desc: 'Comprehensive TEAS 7 subtest review & mock tests',
    href: '/services/teas',
    icon: Sparkles,
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname();

  // Close mobile drawer & active dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveMenu(null);
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
      {/* Top Announcement Bar */}
      <div className="bg-[#0F172A] text-white text-xs py-2 px-4 border-b border-slate-800">
        <PageContainer className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#356AE6] shrink-0" aria-hidden="true" />
            <span className="truncate font-medium text-slate-200 text-[11px] sm:text-xs">
              Ethical Educational Support & Proctoring Software Technical Guidance for Students Worldwide
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <span>{SITE_CONFIG.hours}</span>
            <span>|</span>
            <Link
              href="/disclaimer"
              className="text-white hover:text-blue-400 transition-colors font-medium"
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
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu('about')}
              onMouseLeave={() => setActiveMenu(null)}
            >
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

            {/* OUR SERVICES - MEGA DROPDOWN */}
            <div
              className="relative group static"
              onMouseEnter={() => setActiveMenu('services')}
              onMouseLeave={() => setActiveMenu(null)}
            >
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

              {/* OUR SERVICES MEGA DROPDOWN CONTAINER */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50 w-[95vw] max-w-6xl animate-in fade-in slide-in-from-top-2">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">

                  {/* COLUMN 1: Academic Support */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#2563EB] font-extrabold block">
                        Academic Support
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ACADEMIC_SUPPORT_SERVICES.map((serv, idx) => {
                        const ServIcon = serv.icon;
                        return (
                          <Link
                            key={idx}
                            href={serv.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 mt-0.5 group-hover/item:scale-105 transition-transform">
                              <ServIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors leading-snug">
                                {serv.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-tight line-clamp-1">
                                {serv.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* COLUMN 2: Online Learning & Exam Services */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="border-b border-slate-100 pb-2">
                      <span className="text-[11px] uppercase tracking-wider text-[#2563EB] font-extrabold block">
                        Online Learning & Exam Services
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ONLINE_LEARNING_SERVICES.map((serv, idx) => {
                        const ServIcon = serv.icon;
                        return (
                          <Link
                            key={idx}
                            href={serv.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shrink-0 mt-0.5 group-hover/item:scale-105 transition-transform">
                              <ServIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors leading-snug">
                                {serv.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-tight line-clamp-1">
                                {serv.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* COLUMN 3: Right Promotional Section */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#2563EB] to-[#14213D] text-white rounded-xl p-6 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-md">
                    <div className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80')" }}></div>
                    <div className="relative z-10 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full font-bold text-white inline-block">
                        Student Success
                      </span>
                      <h3 className="text-2xl font-black text-white leading-tight">
                        Learn. Prepare. Excel.
                      </h3>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed">
                        Your success is our priority! Explore our 12 specialized educational support services designed to build independent mastery.
                      </p>
                    </div>

                    <div className="relative z-10 pt-2">
                      <Link
                        href="/services"
                        className="bg-[#FACC15] hover:bg-yellow-400 text-[#0F172A] font-black text-xs px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                      >
                        <span>Explore Our Services</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* EXAM PLATFORMS DROPDOWN */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu('platforms')}
              onMouseLeave={() => setActiveMenu(null)}
            >
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

              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="w-64 bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-0.5">
                  <Link href="/exam-platforms/respondus-lockdown-browser" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Respondus LockDown Browser
                  </Link>
                  <Link href="/exam-platforms/examplify" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Examplify (ExamSoft)
                  </Link>
                  <Link href="/exam-platforms/honorlock" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Honorlock
                  </Link>
                  <Link href="/exam-platforms/proctoru-meazure-learning" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    ProctorU / Meazure Learning
                  </Link>
                  <Link href="/exam-platforms/proctorio" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Proctorio
                  </Link>
                  <Link href="/exam-platforms/proctortrack" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Proctortrack
                  </Link>
                  <Link href="/exam-platforms/examity" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Examity
                  </Link>
                  <Link href="/exam-platforms/psi" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    PSI Bridge
                  </Link>
                  <Link href="/exam-platforms/ati" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    ATI Testing (TEAS)
                  </Link>
                </div>
              </div>
            </div>

            {/* CERTIFICATIONS DROPDOWN */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu('certs')}
              onMouseLeave={() => setActiveMenu(null)}
            >
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
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu('resources')}
              onMouseLeave={() => setActiveMenu(null)}
            >
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
                  <Link href="/blog" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    Exam Preparation Tips
                  </Link>
                  <Link href="/blog" className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                    System Setup Checklists
                  </Link>
                </div>
              </div>
            </div>

            {/* BLOG */}
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

            {/* CONTACT US */}
            <Link
              href="/contact"
              className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                pathname === '/contact'
                  ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                  : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* RIGHT ACTION BUTTON: GET STARTED */}
          <div className="hidden sm:flex items-center shrink-0">
            <Link
              href="/contact"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
            </Link>
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

      {/* MOBILE NAVIGATION DRAWER & EXPANDABLE ACCORDION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl p-6 space-y-4 max-h-[85vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            <Link href="/" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Home
            </Link>

            <Link href="/about" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              About Us
            </Link>

            {/* MOBILE OUR SERVICES ACCORDION */}
            <div className="space-y-1 border-y border-slate-100 py-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#2563EB] px-3 py-1">
                Our Services (12 Offerings)
              </div>

              {/* Academic Support Subgroup */}
              <div className="pl-2 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block px-2 pt-1">Academic Support</span>
                {ACADEMIC_SUPPORT_SERVICES.map((serv, idx) => (
                  <Link
                    key={idx}
                    href={serv.href}
                    className="block text-xs font-semibold py-2 px-3 rounded-lg text-[#0F172A] hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    {serv.title}
                  </Link>
                ))}
              </div>

              {/* Online Learning & Exam Services Subgroup */}
              <div className="pl-2 space-y-0.5 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block px-2 pt-1">Online Learning & Exam Services</span>
                {ONLINE_LEARNING_SERVICES.map((serv, idx) => (
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

            <Link href="/exam-platforms" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Exam Platforms
            </Link>

            <Link href="/certifications" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Certifications
            </Link>

            <Link href="/study-resources" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Study Resources
            </Link>

            <Link href="/blog" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Blog
            </Link>

            <Link href="/faq" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              FAQ
            </Link>

            <Link href="/contact" className="text-sm font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-[#0F172A]">
              Contact Us
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <Link
              href="/contact"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 px-6 rounded-lg font-bold text-sm shadow-sm text-center flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
