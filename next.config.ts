import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // No marcar three como external - debe ser bundle en el cliente
    config.externals = config.externals.filter((external: any) => {
      if (typeof external === 'object' && external.three) {
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