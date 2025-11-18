import {
  blogsCollection,
  servicesCollection,
  templatesCollection,
} from "@/app/lib/mongodb";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET() {
  await connectToDB();

  const blogs = await blogsCollection
    .find({}, { projection: { slug: 1, updatedAt: 1 } })
    .toArray();

  const services = await servicesCollection
    .find({}, { projection: { slug: 1, updatedAt: 1 } })
    .toArray();

  const templates = await templatesCollection
    .find({}, { projection: { slug: 1, updatedAt: 1 } })
    .toArray();

  const baseUrl = "https://templatehearth.vercel.app";

  const staticPages = [
    "",
    "/blogs",
    "/services",
    "/templates",
    "/contact",
    "/pricing",
  ];

  const urls = [];

  // Static Pages
  staticPages.forEach((page) => {
    urls.push(`
      <url>
        <loc>${baseUrl}${page}</loc>
        <priority>0.8</priority>
      </url>
    `);
  });

  // Dynamic Blog Pages
  blogs.forEach((item) => {
    urls.push(`
      <url>
        <loc>${baseUrl}/blogs/${item.slug}</loc>
        <lastmod>${item.updatedAt || new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
      </url>
    `);
  });

  // Dynamic Service Pages
  services.forEach((item) => {
    urls.push(`
      <url>
        <loc>${baseUrl}/services/${item.slug}</loc>
        <lastmod>${item.updatedAt || new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
      </url>
    `);
  });

  // Dynamic Template Pages
  templates.forEach((item) => {
    urls.push(`
      <url>
        <loc>${baseUrl}/templates/${item.slug}</loc>
        <lastmod>${item.updatedAt || new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
      </url>
    `);
  });

  // Final XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
