import { SITE_CONFIG } from '@/lib/utils';
import { PLATFORMS_DATA } from '@/lib/data/platformsData';
import { CERTIFICATIONS_DATA } from '@/lib/data/certificationsData';
import { SERVICES_DATA } from '@/lib/data/servicesData';
import { BLOG_ARTICLES } from '@/lib/data/blogData';

export default function sitemap() {
  const rawBaseUrl = SITE_CONFIG.domain || 'https://tutorproctoredexams.com';
  // Strip any trailing slash to prevent double slashes in URLs
  const baseUrl = rawBaseUrl.replace(/\/+$/, '');
  const now = new Date().toISOString();

  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/exam-platforms', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/certifications', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/study-resources', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { url: '/faq', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/disclaimer', priority: 0.4, changeFrequency: 'yearly' },
    { url: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const blogRoutes = Object.keys(BLOG_ARTICLES).map((slug) => ({
    url: `/blog/${slug}`,
    priority: 0.8,
    changeFrequency: 'weekly',
  }));

  const serviceRoutes = Object.keys(SERVICES_DATA).map((slug) => ({
    url: `/services/${slug}`,
    priority: 0.9,
    changeFrequency: 'weekly',
  }));

  const platformRoutes = Object.keys(PLATFORMS_DATA).map((slug) => ({
    url: `/exam-platforms/${slug}`,
    priority: 0.9,
    changeFrequency: 'weekly',
  }));

  const certificationRoutes = Object.keys(CERTIFICATIONS_DATA).map((slug) => ({
    url: `/certifications/${slug}`,
    priority: 0.9,
    changeFrequency: 'weekly',
  }));

  const allRoutes = [
    ...staticRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...platformRoutes,
    ...certificationRoutes,
  ];

  return allRoutes.map((route) => ({
    url: route.url ? `${baseUrl}${route.url}` : baseUrl,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
