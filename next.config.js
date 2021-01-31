module.exports = {
  poweredByHeader: false,
  headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=900, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};
