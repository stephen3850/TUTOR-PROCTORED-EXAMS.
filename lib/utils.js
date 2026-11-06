import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// FEATURE FLAGS
export const BLOGS_ENABLED = false;

export const SITE_CONFIG = {
  name: 'TUTOR PROCTORED EXAMS',
  tagline: 'Ethical Academic Support & Certification Prep',
  description:
    'Premier online tutoring, practice exams, professional certification prep, and legitimate proctoring software technical guidance for students and working professionals worldwide.',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://tutorproctoredexams.com',
  market: 'Global / Worldwide',
  contactEmail: 'info@tutorproctoredexams.com',
  hours: '24/7 Support Available',
};

// Google Analytics Event Tracking Helper
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}
