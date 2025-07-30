import Image from "next/image";
import React from "react";
import Link from "next/link";
import axios from "axios";

const Templates = async () => {
  const templates = (
    await axios.get("https://templatehearth-be.onrender.com/templates")
  ).data;

  // let templates;

  // const templates = [];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {templates.map((work, key) => (
          <Link href={"/templates/" + work.slug} key={key}>
            <Image
              width={600}
              height={100}
              src={work.image}
              alt={work.headline}
              className="w-full rounded-lg aspect-video object-cover object-center"
            />
            <h4 className="font-semibold mt-4 mb-2">{work.headline}</h4>
            <p>{work.shortDescription}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Templates;
