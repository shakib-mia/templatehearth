import {
  templatesCollection,
  blogsCollection,
  servicesCollection,
} from "@/app/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://templatehearth.vercel.app";

  try {
    const [templates, blogs, services] = await Promise.all([
      templatesCollection.find().toArray(),
      blogsCollection.find().toArray(),
      servicesCollection.find().toArray(),
    ]);

    // STEP 1: Get unique types: ["html", "nextjs"]
    const templateTypes = [...new Set(templates.map((t) => t.type))];

    // STEP 2: Add type-based listing pages
    const templateTypeUrls = templateTypes.map((type) => ({
      url: `${process.env.DOMAIN_NAME}templates/type/${type}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    // STEP 3: Single Template URLs
    const templateUrls = templates.map((item) => ({
      url: `${process.env.DOMAIN_NAME}templates/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    // Blogs
    const blogUrls = blogs.map((item) => ({
      url: `${process.env.DOMAIN_NAME}blogs/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Services
    const serviceUrls = services.map((item) => ({
      url: `${process.env.DOMAIN_NAME}services/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    }));

    // Static pages
    const staticUrls = [
      "",
      "/services",
      "/blogs",
      "/contact",
      "/templates",
      "/pricing",
    ].map((path) => ({
      url: `${process.env.DOMAIN_NAME}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [
      ...staticUrls,
      ...templateTypeUrls,
      ...templateUrls,
      ...blogUrls,
      ...serviceUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [];
  }
}
