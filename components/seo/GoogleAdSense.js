'use client';

import Script from 'next/script';

export default function GoogleAdSense({ publisherId }) {
  const client = publisherId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5788242711864988';

  if (!client) {
    return null;
  }

  const formattedClient = client.startsWith('ca-pub-') ? client : `ca-pub-${client}`;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${formattedClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
