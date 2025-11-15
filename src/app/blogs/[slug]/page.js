import React from "react";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import BlogDetails from "@/app/components/BlogDetails/BlogDetails";
import RestBlogs from "@/app/components/RestBlogs/RestBlogs";
import { blogsCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// -------------------------
// 1) PRE-GENERATE ALL SLUGS
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
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const blog = await blogsCollection.findOne({ slug });

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "This blog does not exist in our collection.",
      };
    }

    return {
      title: blog.title,
      description: blog.shortDescription,
      openGraph: {
        title: blog.title,
        description: blog.shortDescription,
        url: `https://templatehearth.vercel.app/blogs/${slug}`,
        type: "article",
        images: [
          {
            url: blog.image, // thumbnail URL
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.shortDescription,
        images: [blog.image],
      },
      alternates: {
        canonical: `/blogs/${slug}`,
      },
    };
  } catch (e) {
    return {
      title: "Template Not Found",
    };
  }
}

const BlogDetailsPage = async ({ params }) => {
  const { slug } = await params;

  try {
    const blog = await blogsCollection.findOne({ slug });

    if (!blog) {
      return notFound();
    }

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
  } catch (e) {
    return notFound();
  }
};

export default BlogDetailsPage;
