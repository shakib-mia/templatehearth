import PageHeader from "@/app/components/PageHeader/PageHeader";
import axios from "axios";
import fs from "fs/promises";
import Image from "next/image";
import path from "path";
import React from "react";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "services.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const services = JSON.parse(jsonData);

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = (await axios.get("http://localhost:5000/services/" + slug))
    .data;

  if (!service) {
    return {
      title: "Not Found",
      description: "",
    };
  }

  return {
    title: service.title + " - Template Hearth",
    description: service.description || "",
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;
  // console.log({ slug });

  const service = (await axios.get("http://localhost:5000/services/" + slug))
    .data;

  if (!service) {
    return <div>Service Not Found</div>;
  }

  // বাকি সার্ভিসগুলো filter করে নিচ্ছি

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
      />

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10 mt-8 pb-8">
        <main className="lg:w-8/12 w-full text-justify">
          <Image
            src={service.image}
            width={600}
            height={600}
            alt={service.slug}
            className="w-full aspect-video rounded-lg mb-8"
          />
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {service.fullDescription}
          </p>

          {service.features?.map((section, idx) => (
            <section id={`section-${idx}`} key={idx} className="mb-6 !py-0">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </section>
          ))}

          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            Conclusion
          </h3>
          <p className="text-gray-600 leading-relaxed">{service.conclusion}</p>
        </main>

        <aside className="lg:w-4/12 w-full sticky top-20 self-start h-fit space-y-8">
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-3 mb-6">
              {service.sections?.map((section, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* এখানে বাকি সার্ভিস গুলো দেখানো */}
          {/* <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              More Services
            </h3>
            <ul className="space-y-3">
              {restServices.map((restService) => (
                <li key={restService.slug}>
                  <a
                    href={`/services/${restService.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {restService.title}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </aside>
      </div>
    </>
  );
};

export default Page;
