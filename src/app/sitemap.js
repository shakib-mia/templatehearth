import {
  templatesCollection,
  blogsCollection,
  servicesCollection,
} from "@/app/lib/mongodb";

export default async function sitemap() {
  try {
    const [templates, blogs, services] = await Promise.all([
      templatesCollection.find().toArray(),
      blogsCollection.find().toArray(),
      servicesCollection.find().toArray(),
    ]);

    const templateTypes = [...new Set(templates.map((t) => t.type))];

    const templateTypeUrls = templateTypes.map((type) => ({
      url: `${process.env.DOMAIN_NAME}/templates/type/${type}`,
      lastModified: new Date().toISOString(),
    }));

    const templateUrls = templates.map((item) => ({
      url: `${process.env.DOMAIN_NAME}/templates/${item.slug}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    const blogUrls = blogs.map((item) => ({
      url: `${process.env.DOMAIN_NAME}/blogs/${item.slug}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    const serviceUrls = services.map((item) => ({
      url: `${process.env.DOMAIN_NAME}/services/${item.slug}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    // Static pages with fixed lastModified
    const staticLastMod = "2025-11-30T15:17:00.000Z";

    const staticUrls = [
      "/",
      "/services",
      "/blogs",
      "/contact",
      "/templates",
      "/pricing",
    ].map((path) => ({
      url: `${process.env.DOMAIN_NAME}${path}`,
      lastModified: staticLastMod,
    }));

    return [
      ...staticUrls,
      ...templateTypeUrls,
      ...templateUrls,
      ...blogUrls,
      ...serviceUrls,
    ];
  } catch (err) {
    console.error("Sitemap error:", err);
    return [];
  }
}
