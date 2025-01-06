const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://onlive.is-a.dev"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type"
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig;