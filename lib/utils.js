import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const SITE_CONFIG = {
  name: 'TUTOR PROCTORED EXAMS',
  tagline: 'Ethical Academic Support & Certification Prep',
  description:
    'Premier online tutoring, practice exams, professional certification prep, and legitimate proctoring software technical guidance for US students and working professionals.',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://tutorproctoredexams.com',
  market: 'United States',
  contactEmail: 'support@tutorproctoredexams.com',
  hours: 'Mon - Fri: 8:00 AM - 9:00 PM EST',
};

// Google Analytics Event Tracking Helper
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}
