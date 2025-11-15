import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = ({ slug, _id, image, title, shortDescription }) => {
  return (
    <Link className="inline-block w-full" href={`/blogs/${slug}`} key={_id}>
      <Image
        src={image}
        width={600}
        height={700}
        alt={slug}
        className="w-full aspect-video object-cover rounded-2xl"
      />

      <h4 className="mt-2">{title}</h4>
      <p>{shortDescription}</p>
    </Link>
  );
};

export default Blog;
