import PageHeader from "@/app/components/PageHeader/PageHeader";
import fs from "fs/promises";
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

  const filePath = path.join(process.cwd(), "public", "services.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const services = JSON.parse(jsonData);

  const selectedService = services.find((service) => service.slug === slug);

  if (!selectedService) {
    return {
      title: "Not Found",
      description: "",
    };
  }

  return {
    title: selectedService.title,
    description: selectedService.description || "",
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "public", "services.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const services = JSON.parse(jsonData);

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <div>Service Not Found</div>;
  }

  // বাকি সার্ভিসগুলো filter করে নিচ্ছি
  const restServices = services.filter((item) => item.slug !== slug);

  return (
    <>
      <PageHeader title={service.title} description={service.description} />

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10 mt-8">
        <main className="lg:w-8/12 w-full text-justify">
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {service.introduction}
          </p>

          {service.sections?.map((section, idx) => (
            <section id={`section-${idx}`} key={idx} className="mb-4 !py-0">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
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
          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
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
          </div>
        </aside>
      </div>
    </>
  );
};

export default Page;
