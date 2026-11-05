'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Home,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  BookOpen,
  Cpu,
  Award,
  Users,
} from 'lucide-react';
import PageContainer from './PageContainer';
import { SITE_CONFIG } from '@/lib/utils';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
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
      { label: 'CompTIA (Security+, A+, Net+)', href: '/certifications/comptia' },
      { label: 'AAPC Medical Coding', href: '/certifications/aapc' },
      { label: 'CPC Certified Coder', href: '/certifications/cpc' },
      { label: 'CCMA Clinical Assistant', href: '/certifications/ccma' },
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
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
    <header className="sticky top-2 z-50 w-full px-2 sm:px-4 lg:px-6 transition-all duration-300">
      {/* Outer Floating Capsule Navbar Container */}
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-full border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.08)] px-3 py-2 sm:px-5 flex items-center justify-between transition-all duration-300">
        {/* BRAND LOGO AREA */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-xl p-1"
          aria-label="TUTOR PROCTORED EXAMS Home Page"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-md group-hover:bg-[#2563EB] transition-colors duration-200 shrink-0">
            <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
          </div>

          <div className="hidden sm:block h-8 w-[1.5px] bg-slate-200 mx-0.5 shrink-0" />

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-sm sm:text-base lg:text-lg text-[#0F172A] tracking-tight">
                TUTOR PROCTORED
              </span>
              <span className="font-black text-sm sm:text-base lg:text-lg text-[#2563EB] tracking-tight">
                EXAMS
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mt-1">
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
            const IconComp = item.icon;

            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.hasSubmenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {isActive ? (
                  // Active Page Blue Capsule (Matching Image)
                  <div className="relative py-1">
                    <Link
                      href={item.href}
                      className="bg-[#1D4ED8] text-white px-4 py-2 rounded-full font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:bg-[#1E40AF] transition-colors"
                      aria-current="page"
                    >
                      {IconComp && <IconComp className="w-4 h-4 text-white shrink-0" />}
                      <span>{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronDown className="w-3.5 h-3.5 text-white/90 font-bold" />
                      )}
                    </Link>
                    {/* Active Underline Indicator Bar */}
                    <div className="w-5 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-1" />
                  </div>
                ) : (
                  // Standard Nav Item
                  <Link
                    href={item.href}
                    className="text-[#0F172A] hover:text-[#2563EB] font-bold text-xs xl:text-sm px-3 py-2 rounded-full transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] font-bold transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                    )}
                  </Link>
                )}

                {/* Submenu Dropdown Card */}
                {item.hasSubmenu && (
                  <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="w-64 bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xl space-y-1">
                      {item.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="block text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 px-3 py-2.5 rounded-xl transition-colors"
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

        {/* RIGHT ACTION BUTTON: GET STARTED (Matching Image) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white pl-5 pr-2 py-2 rounded-full font-black text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2.5"
          >
            <span>Get Started</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <ChevronRight className="w-4 h-4 font-bold stroke-[3]" />
            </div>
          </Link>
        </div>

        {/* MOBILE MENU HAMBURGER TOGGLE */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-xl text-[#0F172A] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F172A]" /> : <Menu className="w-6 h-6 text-[#0F172A]" />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-20 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <div key={item.label} className="space-y-1">
                  <Link
                    href={item.href}
                    className={`text-sm font-bold py-3 px-4 rounded-2xl transition-colors flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? 'bg-[#1D4ED8] text-white'
                        : 'text-[#0F172A] hover:bg-slate-100 hover:text-[#2563EB]'
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
              className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-3.5 px-6 rounded-full font-black text-sm shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <p className="text-[11px] text-center text-slate-500 font-medium">
              Ethical Academic & Certification Support
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
