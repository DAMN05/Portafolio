import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // No marcar three como external - debe ser bundle en el cliente
    const externals = Array.isArray(config.externals) ? config.externals : [];

    config.externals = externals.filter((external: unknown) => {
      if (typeof external === 'object' && external !== null && 'three' in (external as Record<string, unknown>)) {
        return false;
      }
      return true;
    });

    // Asegurar que three se resuelva correctamente
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        three: 'three',
      };
    }

    return config;
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        // Apply a relaxed CSP to allow serving fonts from Vercel blob storage
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "font-src 'self' https://k2mkucxia43oc7fa.public.blob.vercel-storage.com *.vercel.com *.gstatic.com vercel.live https://*.public.blob.vercel-storage.com; " +
              "img-src 'self' data: https:; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
              "style-src 'self' 'unsafe-inline' https:; " +
              "connect-src 'self' https: wss:;"
          }
        ]
      }
    ];
  }
}

export default nextConfig