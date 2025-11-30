import React from "react";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import BlogDetails from "@/app/components/BlogDetails/BlogDetails";
import RestBlogs from "@/app/components/RestBlogs/RestBlogs";
import { blogsCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// -------------------------
// 1) IF THERE ARE DYNAMIC BLOG PAGES THIS WILL PRE-GENERATE THEM
// -------------------------
export async function generateStaticParams() {
  try {
    const blogs = await blogsCollection.find().toArray();

    return blogs.map((t) => ({
      slug: t.slug,
    }));
  } catch (e) {
    return [];
  }
}

// -------------------------
// 2) SEO METADATA
// -------------------------
import { headers } from "next/headers";
import JSONLDScript from "@/app/components/JSONLDScript/JSONLDScript";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Domain dynamically
  const header = await headers();
  const host = await header.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const domain = `${protocol}://${host}`;
  const canonical = `${domain}/blogs/${slug}`;

  try {
    const blog = await blogsCollection.findOne({ slug });

    if (!blog) {
      return {
        title: "Blog Not Found - Template Hearth",
        description: "This blog does not exist in our collection.",
        robots: "noindex, nofollow",
      };
    }

    const title = blog.title;
    const description = blog.shortDescription;
    const image = blog.image || `${domain}/favicon.ico`; // fallback image

    // Structured Data JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      image: image,
      author: { "@type": "Person", name: "Template Hearth" },
      publisher: { "@type": "Organization", name: "Template Hearth" },
      datePublished: blog.publishedAt,
      url: canonical,
    };

    return {
      title,
      description,
      keywords: blog.keywords || [
        "blogs",
        "web design",
        "templates",
        "frontend",
      ],
      robots: "index, follow",
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        siteName: "Template Hearth",
        locale: "en_US",
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
      other: {
        "structured-data": structuredData, // JSON-LD inject korar jonno Page component e use korte paro
      },
    };
  } catch (e) {
    return {
      title: "Blog Not Found - Template Hearth",
      description: "This blog does not exist in our collection.",
      robots: "noindex, nofollow",
    };
  }
}

const BlogDetailsPage = async ({ params }) => {
  const { slug } = await params;
  // Domain dynamically
  const header = await headers();
  const host = await header.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const domain = `${protocol}://${host}`;
  const canonical = `${domain}/blogs/${slug}`;

  try {
    const blog = await blogsCollection.findOne({ slug });
    const { _id, ...rest } = blog;

    if (!rest.id.length) {
      return notFound();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: rest.title,
      description: rest.shortDescription,
      image: rest.image || `${domain}/favicon.ico`,
      author: { "@type": "Person", name: "Template Hearth" },
      publisher: { "@type": "Organization", name: "Template Hearth" },
      datePublished: rest.publishedAt,
      url: canonical,
    };

    return (
      <>
        <PageHeader title={rest.title} description={rest.shortDescription} />

        <Script
          id={`structured-data-${rest.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* <JSONLDScript data={rest} /> */}

        <div className="flex flex-col xl:flex-row container gap-8 py-10">
          <aside className="w-full xl:w-2/3 text-justify">
            <BlogDetails blog={rest} />
          </aside>

          <aside className="w-full xl:w-1/3 sticky top-10 h-fit">
            <h2 className="font-semibold mb-4">More Blogs</h2>
            <RestBlogs slug={rest.slug} />
          </aside>
        </div>
      </>
    );
  } catch (e) {
    console.log(e);
    return notFound();
  }
};

export default BlogDetailsPage;
