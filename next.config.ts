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
}

export default nextConfig