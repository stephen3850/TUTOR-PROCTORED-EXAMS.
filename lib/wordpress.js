/**
 * Legacy WordPress Helper Module (Deprecation Bridge)
 * Provides fallback SEO metadata extraction and safe null responses
 * to prevent build time network errors (ENOTFOUND cms.tutorproctoredexams.com).
 */

import { SITE_CONFIG } from '@/lib/utils';

export function extractWpSeo(item, defaultFallback = {}) {
  if (!item) return defaultFallback;

  return {
    title: defaultFallback.title || SITE_CONFIG.name,
    description: defaultFallback.description || SITE_CONFIG.description,
    canonicalUrl: defaultFallback.canonicalUrl || SITE_CONFIG.domain,
    ogTitle: defaultFallback.title,
    ogDescription: defaultFallback.description,
    ogImage: defaultFallback.ogImage,
    twitterTitle: defaultFallback.title,
    twitterDescription: defaultFallback.description,
    robots: defaultFallback.robots || { index: true, follow: true },
  };
}

export async function getWpPosts() {
  return [];
}

export async function getWpPostBySlug(slug) {
  return null;
}

export async function getWpPageBySlug(slug) {
  return null;
}

export async function getWpPages() {
  return [];
}

export async function getWpCategories() {
  return [];
}
