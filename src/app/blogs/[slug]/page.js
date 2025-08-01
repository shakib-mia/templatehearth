import React from "react";
import axios from "axios";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import BlogDetails from "@/app/components/BlogDetails/BlogDetails";
import RestBlogs from "@/app/components/RestBlogs/RestBlogs";

// Optional: dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  const res = await fetch(
    `https://templatehearth-be.onrender.com/blogs/${slug}`
  );
  const blog = await res.json();

  return {
    title: `${blog.title} - Template Hearth`,
    description: blog.shortDescription,
    keywords: blog.tags?.map((tag) => tag.replace(/^#/, "")), // removes # if present
    openGraph: {
      title: blog.title,
      description: blog.shortDescription,
      type: "article",
      url: `https://templatehearth.vercel.app/blogs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.shortDescription,
    },
  };
}

const BlogDetailsPage = async ({ params }) => {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) return <div>Not found</div>;

  return (
    <>
      <PageHeader title={blog.title} description={blog.shortDescription} />

      <div className="flex flex-col xl:flex-row container gap-8 py-10">
        <aside className="w-full xl:w-2/3 text-justify">
          <BlogDetails blog={blog} />
        </aside>

        <aside className="w-full xl:w-1/3 sticky top-10 h-fit">
          <h2 className="font-semibold mb-4">Rest Blogs</h2>
          <RestBlogs slug={blog.slug} />
        </aside>
      </div>
    </>
  );
};

export default BlogDetailsPage;

// Helper function to fetch single blog by slug
const getBlogBySlug = async (slug) => {
  try {
    const res = await axios.get(
      `https://templatehearth-be.onrender.com/blogs/${slug}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
};
