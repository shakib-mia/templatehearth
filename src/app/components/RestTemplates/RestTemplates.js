import { db } from "@/app/lib/mongodb";
import shuffleItems from "@/app/utils/shuffleItems";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestTemplates = async ({ slug }) => {
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection
    .find({ slug: { $ne: slug } })
    .toArray();

  if (templates.length > 0) {
    return (
      <div className="space-y-4">
        {shuffleItems(templates).map((item) => (
          <Link
            href={`/templates/${item.slug}`}
            className="flex gap-2 flex-col lg:flex-row items-center"
            key={item._id}
          >
            <Image
              src={item.image}
              className="w-full lg:w-1/3 lg;aspect-square rounded-lg object-cover"
              width={156}
              height={156}
              alt={item.slug}
            />

            <aside className="lg:w-2/3">
              <h5 className="font-semibold">{item.headline}</h5>
            </aside>
          </Link>
        ))}
      </div>
    );
  } else {
    <span>loading...</span>;
  }
};

export default RestTemplates;
