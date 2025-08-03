import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import React from "react";
import axios from "axios";
import Button from "../Button/Button";
import Image from "next/image";

const Services = async ({ route }) => {
  const res = await axios.get("http://localhost:5000/services", {
    headers: {
      route,
    },
  });

  const services = res.data;

  return (
    <section className="container">
      <h5 className="text-primary">What we do</h5>
      <h3 className="font-semibold lg:w-5/12 mt-4">
        We provide the Perfect Solution to your business growth
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4 md:gap-6 lg:gap-">
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
              className="w-full aspect-video"
              alt={service.title}
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
