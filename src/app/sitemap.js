import {
  templatesCollection,
  blogsCollection,
  servicesCollection,
} from "@/app/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://templatehearth.vercel.app";

  try {
    // Fetch all dynamic items in parallel (faster)
    const [templates, blogs, services] = await Promise.all([
      templatesCollection.find().toArray(),
      blogsCollection.find().toArray(),
      servicesCollection.find().toArray(),
    ]);

    // Template URLs
    const templateUrls = templates.map((item) => ({
      url: `${baseUrl}/templates/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    // Blog URLs
    const blogUrls = blogs.map((item) => ({
      url: `${baseUrl}/blogs/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Service URLs
    const serviceUrls = services.map((item) => ({
      url: `${baseUrl}/services/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    }));

    // Static URLs
    const staticUrls = [
      "",
      "/services",
      "/blogs",
      "/contact",
      "/templates",
      "/pricing",
    ].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // Return everything combined
    return [...staticUrls, ...templateUrls, ...blogUrls, ...serviceUrls];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [];
  }
}
