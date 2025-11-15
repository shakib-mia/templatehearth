import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import Image from "next/image";
import { db } from "@/app/lib/mongodb";

// -------------------------
// 1) IF THERE ARE DYNAMIC SERVICE PAGES THIS WILL PRE-GENERATE THEM
// -------------------------
export async function generateStaticParams() {
  const servicesCollection = db.collection("services");
  const services = await servicesCollection.find({}).toArray();

  return services.map((service) => ({
    slug: service.slug, // jodi slug-based service page thake
  }));
}

// -------------------------
// 2) MAIN COMPONENT (SSG STYLE)
// -------------------------
const Services = async ({ route }) => {
  const servicesCollection = db.collection("services");
  const limit = route === "/" ? 6 : 0;
  const services = await servicesCollection.find({}).limit(limit).toArray();

  return (
    <section className={`container`}>
      {route === "/" && (
        <>
          <h5 className="text-primary">What we do</h5>
          <h3 className="font-semibold lg:w-5/12 mt-4">
            We provide the Perfect Solution to your business growth
          </h3>
        </>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
          route === "/" ? "mt-10" : "!mt-0"
        } gap-4 md:gap-6`}
      >
        {services.map((service, index) => (
          <Link
            href={"/services/" + service.slug}
            key={index}
            className="bg-white rounded-md shadow-lg overflow-hidden"
          >
            <Image
              src={service.image}
              width={600}
              height={600}
              className="w-full aspect-video object-cover"
              alt={service.slug}
            />
            <div className="p-6">
              <h5 className="font-semibold mb-2">{service.title}</h5>
              <p>{service.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      {route === "/" && (
        <div className="flex justify-center mt-8">
          <Link href={"/services"}>
            <Button>Explore all Services</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Services;
