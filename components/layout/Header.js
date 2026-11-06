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
} from 'lucide-react';
import PageContainer from './PageContainer';
import { SITE_CONFIG } from '@/lib/utils';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about',
    hasSubmenu: true,
    subItems: [
      { label: 'Our Story & Purpose', href: '/about' },
      { label: 'Academic Integrity Pledge', href: '/about' },
      { label: 'Core Values & Mission', href: '/about' },
    ],
  },
  {
    label: 'Our Services',
    href: '/services',
    hasSubmenu: true,
    subItems: [
      { label: '1-on-1 Online Tutoring', href: '/services/one-to-one-tutoring' },
      { label: 'Academic Exam Preparation', href: '/services/academic-exam-preparation' },
      { label: 'Practice Questions & Mock Tests', href: '/services/practice-questions-mock-tests' },
      { label: 'Professional Certification Prep', href: '/services/professional-certification-preparation' },
      { label: 'Study Planning & Revision Support', href: '/services/study-planning' },
      { label: 'Software Technical Guidance', href: '/services/examination-software-technical-guidance' },
    ],
  },
  {
    label: 'Exam Platforms',
    href: '/exam-platforms',
    hasSubmenu: true,
    subItems: [
      { label: 'Respondus LockDown Browser', href: '/exam-platforms/respondus-lockdown-browser' },
      { label: 'Examplify (ExamSoft)', href: '/exam-platforms/examplify' },
      { label: 'Honorlock', href: '/exam-platforms/honorlock' },
      { label: 'ProctorU / Meazure Learning', href: '/exam-platforms/proctoru-meazure-learning' },
      { label: 'Proctorio', href: '/exam-platforms/proctorio' },
      { label: 'Proctortrack', href: '/exam-platforms/proctortrack' },
      { label: 'Examity', href: '/exam-platforms/examity' },
      { label: 'PSI Bridge', href: '/exam-platforms/psi' },
      { label: 'ATI Testing (TEAS)', href: '/exam-platforms/ati' },
    ],
  },
  {
    label: 'Certifications',
    href: '/certifications',
    hasSubmenu: true,
    subItems: [
      { label: 'PMP Certification Prep', href: '/certifications/pmp' },
      { label: 'CAPM Associate in PM', href: '/certifications/capm' },
      { label: 'CompTIA (Security+, A+, Net+)', href: '/certifications/comptia' },
      { label: 'SHRM-CP / SHRM-SCP HR', href: '/certifications/shrm' },
      { label: 'Real Estate License Prep', href: '/certifications/real-estate' },
      { label: 'AAPC Medical Coding', href: '/certifications/aapc' },
      { label: 'CPC Certified Coder', href: '/certifications/cpc' },
      { label: 'CCMA Clinical Assistant', href: '/certifications/ccma' },
      { label: 'CNA Nursing Assistant', href: '/certifications/cna' },
      { label: 'CPhT Pharmacy Technician', href: '/certifications/cpht' },
    ],
  },
  {
    label: 'Study Resources',
    href: '/study-resources',
    hasSubmenu: true,
    subItems: [
      { label: 'Learning Guides & Library', href: '/study-resources' },
      { label: 'Exam Preparation Tips', href: '/blog' },
      { label: 'System Setup Checklists', href: '/blog' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Main Straight Navbar */}
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
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`font-bold text-xs xl:text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap relative ${
                      isActive
                        ? 'text-[#2563EB] bg-blue-50/80 font-extrabold'
                        : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                    )}
                  </Link>

                  {/* Submenu Dropdown Card */}
                  {item.hasSubmenu && (
                    <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                      <div className="w-60 bg-white border border-slate-200 rounded-xl p-2 shadow-xl space-y-0.5">
                        {item.subItems.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl p-6 space-y-4 max-h-[80vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <div key={item.label} className="space-y-1">
                  <Link
                    href={item.href}
                    className={`text-sm font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'text-[#0F172A] hover:bg-slate-50 hover:text-[#2563EB]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && <ChevronDown className="w-4 h-4 text-current" />}
                  </Link>
                </div>
              );
            })}
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
