/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.ibb.co/**"),
      new URL("https://templatehearth-be.onrender.com/**"),
      new URL("https://templatehearth-be.onrender.com/**"),
    ],
  },
};

export default nextConfig;
