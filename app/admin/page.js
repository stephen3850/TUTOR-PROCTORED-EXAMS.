'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Add config link tag if not present
    if (!document.querySelector('link[rel="cms-config-url"]')) {
      const link = document.createElement('link');
      link.rel = 'cms-config-url';
      link.type = 'text/yaml';
      link.href = '/admin/config.yml';
      document.head.appendChild(link);
    }

    // Load Netlify Identity Widget
    if (!document.querySelector('script[src*="netlify-identity-widget"]')) {
      const script1 = document.createElement('script');
      script1.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      script1.async = true;
      document.head.appendChild(script1);
    }

    // Load Decap CMS
    if (!document.querySelector('script[src*="decap-cms"]')) {
      const script2 = document.createElement('script');
      script2.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
      script2.async = true;
      document.body.appendChild(script2);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#fff' }}>
      <div id="nc-root" />
    </div>
  );
}
