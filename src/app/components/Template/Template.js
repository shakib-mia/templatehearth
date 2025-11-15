import Image from "next/image";
import Link from "next/link";
import React from "react";

const Template = ({ slug, image, headline, shortDescription }) => {
  return (
    <Link href={"/templates/" + slug}>
      <Image
        width={600}
        height={100}
        src={image}
        alt={headline}
        className="w-full rounded-lg aspect-video object-cover object-center"
      />
      <h4 className="font-semibold mt-4 mb-2">{headline}</h4>
      <p>{shortDescription}</p>
    </Link>
  );
};

export default Template;
