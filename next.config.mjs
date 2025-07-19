/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.ibb.co/**"),
      new URL("http://localhost:5000/**"),
      new URL("https://templatehearth-be.onrender.com/**"),
    ],
  },
};

export default nextConfig;
