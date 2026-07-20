const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qwa1skb1dtiy5dzb.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/journal',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/journal/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    // CSP scoped to the third parties this site actually loads.
    // 'unsafe-inline' is retained for scripts because GTM/GA4/GHL rely on inline
    // injection; tightening to per-request nonces is a follow-up that needs
    // in-browser verification. The strict directives below (frame-ancestors,
    // object-src, base-uri, form-action) still provide real clickjacking and
    // base-tag-injection protection regardless.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.leadconnectorhq.com https://*.upscalerhq.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://*.leadconnectorhq.com https://*.upscalerhq.com https://*.vercel-insights.com https://maps.googleapis.com",
      "frame-src 'self' https://www.googletagmanager.com https://*.leadconnectorhq.com https://*.upscalerhq.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
