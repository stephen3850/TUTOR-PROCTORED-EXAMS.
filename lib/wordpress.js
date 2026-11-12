/**
 * Headless WordPress REST API Client
 * Target Backend: https://cms.tutorproctoredexams.com/wp-json/wp/v2/
 * Provides secure read-only access to WordPress Pages, Posts, Categories, Media, and Yoast/Rank Math SEO Metadata.
 */

import { SITE_CONFIG } from '@/lib/utils';

const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://cms.tutorproctoredexams.com/wp-json/wp/v2';

/**
 * Helper to execute fetch requests to WordPress REST API with short timeout and fallback handling.
 */
async function fetchWp(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second safety timeout

    const res = await fetch(`${WP_API_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
      ...options,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    // Return null on network error, timeout, or missing backend
    return null;
  }
}

/**
 * Extracts normalized SEO metadata from WordPress post/page response
 * Supports Yoast SEO (yoast_head_json) and Rank Math REST API attributes.
 */
export function extractWpSeo(item, defaultFallback = {}) {
  if (!item) return defaultFallback;

  // Yoast SEO Metadata
  if (item.yoast_head_json) {
    const yoast = item.yoast_head_json;
    return {
      title: yoast.title || defaultFallback.title,
      description: yoast.description || yoast.og_description || defaultFallback.description,
      canonicalUrl: yoast.canonical || defaultFallback.canonicalUrl,
      ogTitle: yoast.og_title || yoast.title || defaultFallback.title,
      ogDescription: yoast.og_description || yoast.description || defaultFallback.description,
      ogImage: yoast.og_image?.[0]?.url || defaultFallback.ogImage,
      twitterTitle: yoast.twitter_title || yoast.title,
      twitterDescription: yoast.twitter_description || yoast.description,
      schema: yoast.schema || null,
      robots: yoast.robots ? {
        index: yoast.robots.index !== 'noindex',
        follow: yoast.robots.follow !== 'nofollow',
      } : defaultFallback.robots,
    };
  }

  // Rank Math SEO Metadata
  if (item.rank_math_title || item.rank_math_description) {
    return {
      title: item.rank_math_title || defaultFallback.title,
      description: item.rank_math_description || defaultFallback.description,
      canonicalUrl: item.rank_math_canonical || defaultFallback.canonicalUrl,
      ogTitle: item.rank_math_facebook_title || item.rank_math_title || defaultFallback.title,
      ogDescription: item.rank_math_facebook_description || item.rank_math_description || defaultFallback.description,
      ogImage: item.rank_math_facebook_image || defaultFallback.ogImage,
      robots: defaultFallback.robots,
    };
  }

  // Fallback to standard WordPress Post/Page attributes
  return {
    title: item.title?.rendered ? `${item.title.rendered} | ${SITE_CONFIG.name}` : defaultFallback.title,
    description: item.excerpt?.rendered ? item.excerpt.rendered.replace(/<[^>]+>/g, '').trim() : defaultFallback.description,
    canonicalUrl: defaultFallback.canonicalUrl,
    ogTitle: item.title?.rendered || defaultFallback.title,
    ogDescription: defaultFallback.description,
    ogImage: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || defaultFallback.ogImage,
    robots: defaultFallback.robots,
  };
}

/**
 * Fetch all published WordPress posts (articles)
 */
export async function getWpPosts(params = {}) {
  const query = new URLSearchParams({ _embed: '1', status: 'publish', per_page: '100', ...params }).toString();
  const data = await fetchWp(`/posts?${query}`);
  return data || [];
}

/**
 * Fetch a single WordPress post by slug
 */
export async function getWpPostBySlug(slug) {
  const data = await fetchWp(`/posts?slug=${slug}&_embed=1`);
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

/**
 * Fetch a single WordPress page by slug
 */
export async function getWpPageBySlug(slug) {
  const data = await fetchWp(`/pages?slug=${slug}&_embed=1`);
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  return null;
}

/**
 * Fetch all published WordPress pages
 */
export async function getWpPages() {
  const data = await fetchWp('/pages?per_page=100&status=publish');
  return data || [];
}

/**
 * Fetch WordPress categories
 */
export async function getWpCategories() {
  const data = await fetchWp('/categories?per_page=100');
  return data || [];
}
