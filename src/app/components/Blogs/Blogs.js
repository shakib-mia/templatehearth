import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blogs = async ({ route = "/" }) => {
  const blogs = (
    await axios.get("https://templatehearth-be.onrender.com/blogs", {
      headers: {
        route,
      },
    })
  ).data;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        {blogs.map((item) => (
          <Link
            className="inline-block w-full"
            href={`/blogs/${item.slug}`}
            key={item._id}
          >
            <Image
              src={item.image}
              width={600}
              height={700}
              alt={item.slug}
              className="w-full aspect-video object-cover rounded-2xl"
            />

            <h4 className="mt-4">{item.title}</h4>
            <p>{item.shortDescription}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Blogs;
