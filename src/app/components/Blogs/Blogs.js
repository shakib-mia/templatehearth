import { blogsCollection } from "@/app/lib/mongodb";
import React from "react";
import Blog from "../Blog/Blog";

const Blogs = async ({ route = "/" }) => {
  const blogs = await blogsCollection
    .find({})
    .limit(route === "/" ? 4 : 0)
    .toArray();

  return (
    <>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${
          route === "/" && "mt-10"
        }`}
      >
        {blogs.map((item) => (
          <Blog key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
