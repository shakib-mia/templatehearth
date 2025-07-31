import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import React from "react";

const Services = async () => {
  // Absolute path to /public/services.json
  const filePath = path.join(process.cwd(), "public", "services.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const services = JSON.parse(jsonData);

  return (
    <section className="container">
      <h5 className="text-primary">What we do</h5>
      <h3 className="font-semibold lg:w-5/12 mt-4">
        We provide the Perfect Solution to your business growth
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4 md:gap-7 lg:gap-10">
        {services.map((service, index) => (
          <Link
            href={"/services/" + service.slug}
            key={index}
            className="p-6 bg-white rounded shadow-lg"
          >
            <div
              className="w-14 h-14 text-primary mb-4"
              dangerouslySetInnerHTML={{ __html: service.icon }}
            >
              {/* {service.icon} */}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>

            {/* <Link
              href={"/services/" + service.slug}
              className="text-primary relative group inline-block"
            >
              Learn More
              <div className="absolute -bottom-1 bg-primary h-px w-0 group-hover:w-full transition-[width] right-0 group-hover:left-0"></div>
            </Link> */}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
