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

    // Load Decap CMS script
    if (!document.querySelector('script[src*="decap-cms"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#fff' }}>
      <div id="nc-root" />
    </div>
  );
}
