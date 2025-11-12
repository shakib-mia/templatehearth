import React from "react";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import BlogDetails from "@/app/components/BlogDetails/BlogDetails";
import RestBlogs from "@/app/components/RestBlogs/RestBlogs";
import { blogsCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// Optional: dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // params আসবে route থেকে, await লাগবে না
  const blog = await getBlogBySlug(slug);

  return {
    title: `${blog.title} - Template Hearth`,
    description: blog.shortDescription,
    keywords: blog.tags?.map((tag) => tag.replace(/^#/, "")).join(", "), // # সরিয়ে comma separated string
    openGraph: {
      title: blog.title,
      description: blog.shortDescription,
      type: "article",
      url: `https://templatehearth.vercel.app/blogs/${slug}`,
      images: [
        {
          url:
            blog.image ||
            "https://templatehearth.vercel.app/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${blog.title} - Template Hearth`,
        },
      ],
      siteName: "Template Hearth",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.shortDescription,
      images: [
        blog.image || "https://templatehearth.vercel.app/default-og-image.jpg",
      ],
      creator: "@TemplateHearth", // Twitter হ্যান্ডেল
    },
    alternates: {
      canonical: `https://templatehearth.vercel.app/blogs/${slug}`,
    },
  };
}

const BlogDetailsPage = async ({ params }) => {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <>
      <PageHeader title={blog.title} description={blog.shortDescription} />

      <div className="flex flex-col xl:flex-row container gap-8 py-10">
        <aside className="w-full xl:w-2/3 text-justify">
          <BlogDetails blog={blog} />
        </aside>

        <aside className="w-full xl:w-1/3 sticky top-10 h-fit">
          <h2 className="font-semibold mb-4">More Blogs</h2>
          <RestBlogs slug={blog.slug} />
        </aside>
      </div>
    </>
  );
};

export default BlogDetailsPage;

// Helper function to fetch single blog by slug
const getBlogBySlug = async (slug) => {
  const blog = await blogsCollection.findOne({ slug });
  return blog;
};
