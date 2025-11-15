import { blogsCollection } from "@/app/lib/mongodb";
import React from "react";
import Blog from "../Blog/Blog";

// -------------------------
// 1) PRE-GENERATE BLOGS (Optional: for dynamic slug pages)
// -------------------------
export async function generateStaticParams() {
  const blogs = await blogsCollection.find({}).toArray();
  return blogs.map((blog) => ({
    slug: blog.slug, // jodi slug-based blog page thake
  }));
}

// -------------------------
// 2) MAIN COMPONENT (SSG STYLE)
// -------------------------
const Blogs = async ({ route = "/" }) => {
  // Route '/' hole 4 ta blog, onno khetre sob
  const limit = route === "/" ? 4 : 0;
  const blogs = await blogsCollection.find({}).limit(limit).toArray();

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${
        route === "/" ? "mt-10" : ""
      }`}
    >
      {blogs.map((item) => (
        <Blog key={item._id} {...item} />
      ))}
    </div>
  );
};

export default Blogs;
