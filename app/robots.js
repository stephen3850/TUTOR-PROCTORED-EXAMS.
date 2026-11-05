import { SITE_CONFIG } from '@/lib/utils';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
