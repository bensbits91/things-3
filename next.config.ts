import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      //   dangerouslyAllowSVG: true,
      //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '/**'
         },
         {
            protocol: 'http',
            hostname: 'books.google.com',
            pathname: '/**'
         },
         {
            protocol: 'https',
            hostname: 'www.giantbomb.com',
            pathname: '/a/**'
         },
         {
            protocol: 'https',
            hostname: 's.gravatar.com',
            pathname: '/**'
         }
      ]
   }
};

export default nextConfig;
