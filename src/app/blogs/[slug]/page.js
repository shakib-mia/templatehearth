import React from "react";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import BlogDetails from "@/app/components/BlogDetails/BlogDetails";
import RestBlogs from "@/app/components/RestBlogs/RestBlogs";
import { blogsCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";
import JSONLDScript from "@/app/components/JSONLDScript/JSONLDScript";

// -------------------------
// 1) PRE-GENERATE ALL BLOG SLUGS
// -------------------------
export async function generateStaticParams() {
  try {
    const blogs = await blogsCollection.find().toArray();
    return blogs.map((b) => ({
      slug: b.slug,
    }));
  } catch (e) {
    return [];
  }
}

// -------------------------
// 2) SEO METADATA
// -------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const domain = process.env.DOMAIN_NAME;
  const canonical = `${domain}blogs/${slug}`;

  try {
    const blog = await blogsCollection.findOne({ slug });

    if (!blog) {
      return {
        title: "Blog Not Found | Template Hearth",
        description: "This blog does not exist in our collection.",
        robots: "noindex, nofollow",
      };
    }

    const title = blog.title;
    const description = blog.shortDescription;
    const image = blog.image || `${domain}favicon.ico`;

    return {
      title,
      description,
      keywords: blog.keywords || [],
      alternates: {
        canonical,
      },
      openGraph: {
        title: `${title} | Template Hearth`,
        description,
        url: canonical,
        type: "article",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (e) {
    return {
      title: "Blog Not Found | Template Hearth",
    };
  }
}

// -------------------------
// 3) MAIN BLOG PAGE
// -------------------------
export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const blog = await blogsCollection.findOne({ slug });

    if (!blog) {
      return notFound();
    }

    const domain = process.env.DOMAIN_NAME;

    // JSON-LD Structured Data
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.shortDescription,
      image: blog.image,
      datePublished: blog.createdAt || "",
      dateModified: blog.updatedAt || "",
      author: {
        "@type": "Person",
        name: blog.author || "Template Hearth",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${domain}blogs/${slug}`,
      },
    };

    return (
      <>
        <JSONLDScript data={jsonLdData} />

        <PageHeader title={blog.title} description={blog.shortDescription} />

        <section className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-8/12">
              <BlogDetails blog={blog} />
            </aside>

            <aside className="w-full xl:w-4/12 sticky top-10 h-fit">
              <h2 className="font-semibold mb-4">More Blogs</h2>
              <RestBlogs slug={blog.slug} />
            </aside>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.log("Blog fetch failed:", error);
    throw error;
  }
}
