import { db } from "@/app/lib/mongodb";
import shuffleItems from "@/app/utils/shuffleItems";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestServices = async ({ slug }) => {
  const servicesCollection = db.collection("services");
  const services = await servicesCollection
    .find({ slug: { $ne: slug } })
    .toArray();

  if (services.length > 0) {
    return (
      <div className="space-y-4">
        {shuffleItems(services).map((item) => (
          <Link
            href={`/services/${item.slug}`}
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
              <h5 className="font-semibold">{item.title}</h5>
              <p>{item.shortDescription}</p>
            </aside>
          </Link>
        ))}
      </div>
    );
  } else {
    <span>loading...</span>;
  }
};

export default RestServices;
