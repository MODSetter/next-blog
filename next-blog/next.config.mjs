/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "vercel-storage.com",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      // Tags Page Redirect
      {
        source: '/tags/:slug',
        destination: '/tags/:slug/1',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
