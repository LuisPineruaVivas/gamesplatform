/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    experimental: {
        serverActions: {
          // 👇 change file size limit
          bodySizeLimit: "20MB", 
        },
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "d2omht7x1ns4ja.cloudfront.net"
            }
        ]
    }, 
};

export default nextConfig;
