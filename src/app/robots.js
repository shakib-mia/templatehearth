export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api", "/private"],
      },
    ],
    sitemap: `${process.env.DOMAIN_NAME}sitemap.xml`,
  };
}
