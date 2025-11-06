import { db } from "@/app/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestBlogs = async ({ slug }) => {
  // const response = await fetch(
  //   "https://templatehearth-be.onrender.com/rest-blogs/" + slug
  // );
  // const blogs = await response.json();
  const blogsCollection = db.collection("blogs");
  const blogs = await blogsCollection.find({ slug: { $ne: slug } }).toArray();

  if (blogs.length > 0) {
    return (
      <div className="space-y-4">
        {blogs.map((item) => (
          <Link
            href={`/blogs/${item.slug}`}
            className="flex gap-2 items-center"
            key={item._id}
          >
            <Image
              src={item.image}
              className="w-1/3 aspect-square rounded-lg object-cover"
              width={156}
              height={156}
              alt={item.slug}
            />

            <aside className="w-2/3">
              <h5 className="font-semibold">{item.title}</h5>
            </aside>
          </Link>
        ))}
      </div>
    );
  } else {
    <span>loading...</span>;
  }
};

export default RestBlogs;
