import Image from "next/image";
import React from "react";
import Link from "next/link";
import { db } from "@/app/lib/mongodb";

const Templates = async ({ route }) => {
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find({}).toArray();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {templates
          .slice(0, route === "/" ? 4 : templates.length)
          .map((work, key) => (
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
