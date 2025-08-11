import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestServices = async ({ slug }) => {
  const response = await fetch(
    "https://templatehearth-be.onrender.com/rest-services/" + slug
  );
  const services = await response.json();

  if (services.length > 0) {
    return (
      <div className="space-y-4">
        {services.map((item) => (
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
