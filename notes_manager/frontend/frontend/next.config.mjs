/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // <--- ADD THIS LINE
  images: {
    unoptimized: true,   // <--- ADD THIS LINE (Required for static export)
  },
};

export default nextConfig;
