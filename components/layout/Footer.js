import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PageContainer from './PageContainer';
import { SITE_CONFIG } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-secondaryNavy">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-secondaryNavy">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-brand-blue flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                TUTOR PROCTORED EXAMS
              </span>
            </Link>

            <p className="text-brand-muted text-sm leading-relaxed max-w-sm">
              The premier US educational support platform delivering ethical 1-on-1 tutoring, examination prep, practice resources, and legitimate proctoring software technical guidance.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-brand-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>100% Ethical Academic Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Serving US Students & Professionals</span>
              </div>
            </div>
          </div>

          {/* Column 1: Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Educational Services
                </Link>
              </li>
              <li>
                <Link href="/services/one-to-one-tutoring" className="hover:text-white transition-colors">
                  1-on-1 Online Tutoring
                </Link>
              </li>
              <li>
                <Link href="/services/academic-exam-preparation" className="hover:text-white transition-colors">
                  Exam Prep & Coaching
                </Link>
              </li>
              <li>
                <Link href="/services/examination-software-technical-guidance" className="hover:text-white transition-colors">
                  Software System Guidance
                </Link>
              </li>
              <li>
                <Link href="/services/practice-questions-mock-tests" className="hover:text-white transition-colors">
                  Practice Questions & Mocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Exam Directories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Exam Platforms
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/exam-platforms" className="hover:text-white transition-colors">
                  Platform Directory Hub
                </Link>
              </li>
              <li>
                <Link href="/exam-platforms/respondus-lockdown-browser" className="hover:text-white transition-colors">
                  Respondus LockDown
                </Link>
              </li>
              <li>
                <Link href="/exam-platforms/examplify" className="hover:text-white transition-colors">
                  Examplify (ExamSoft)
                </Link>
              </li>
              <li>
                <Link href="/exam-platforms/honorlock" className="hover:text-white transition-colors">
                  Honorlock & ProctorU
                </Link>
              </li>
              <li>
                <Link href="/exam-platforms/proctorio" className="hover:text-white transition-colors">
                  Proctorio & Proctortrack
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Certifications & Help */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Certifications & Help
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/certifications" className="hover:text-white transition-colors">
                  PMP Prep & CompTIA
                </Link>
              </li>
              <li>
                <Link href="/certifications/cpc" className="hover:text-white transition-colors">
                  AAPC, CPC & CCMA
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Academic Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Disclaimer Notice */}
        <div className="py-6 text-xs text-brand-muted/80 leading-relaxed border-b border-brand-secondaryNavy/60">
          <p>
            <strong>Educational Disclaimer:</strong> TUTOR PROCTORED EXAMS provides legitimate 1-on-1 tutoring, study resources, test preparation strategies, and general technical compatibility guidance for examination software. We are an independent educational service and are not affiliated with, endorsed by, or sponsored by Respondus, ExamSoft/Examplify, Honorlock, ProctorU/Meazure Learning, Proctorio, Proctortrack, Examity, PSI, ATI, PMI, CompTIA, AAPC, NHA, or any third-party examination or software provider. All product and company names are trademarks™ or registered® trademarks of their respective holders.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>© {currentYear} TUTOR PROCTORED EXAMS. All rights reserved. United States.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Support
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Master FAQ
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Integrity Commitment
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
