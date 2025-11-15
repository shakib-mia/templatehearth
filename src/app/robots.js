export default function robots() {
  const baseUrl = "https://templatehearth.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api", "/private"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
