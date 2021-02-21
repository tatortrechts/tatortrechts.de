module.exports = {
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/neuerfall",
        destination: "https://api.tatortrechts.de/neuerfall",
        permanent: false,
      },
      {
        source: "/fehler",
        destination: "https://api.tatortrechts.de/fehler",
        permanent: false,
      },
    ];
  },
  headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=900, stale-while-revalidate=3600",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // {
          //   key: "Content-Security-Policy",
          //   value: "default-src https: 'unsafe-inline'",
          // },
          {
            key: "X-Frame-Options",
            value: "deny",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};
