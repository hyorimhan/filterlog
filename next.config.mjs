/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nbctttyrkpqxvryotrno.supabase.co',
      },
    ],
  },
};

export default nextConfig;
