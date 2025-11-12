import PageHeader from "@/app/components/PageHeader/PageHeader";
import RestServices from "@/app/components/RestServices/RestServices";
import { servicesCollection } from "@/app/lib/mongodb";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await servicesCollection.findOne({ slug });

  if (!service) {
    return {
      title: "Not Found",
      description: "",
    };
  }

  return {
    title: service.title + " - Template Hearth",
    description: service.shortDescription || "",
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;

  const service = await servicesCollection.findOne({ slug });

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

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10 mt-10 pb-8">
        <main className="lg:w-8/12 w-full">
          <Image
            src={service.image}
            width={600}
            height={600}
            alt={service.slug}
            className="w-full aspect-video rounded-lg mb-8 object-cover"
          />
          <p className="mb-8 text-lg leading-relaxed text-gray-700 text-justify">
            {service.fullDescription}
          </p>

          {service.features?.map((section, idx) => (
            <section
              id={section.title.split(" ").join("-").toLowerCase()}
              key={idx}
              className="mb-6 !py-0"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
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
              {service.features?.map((section, idx) => (
                <li key={idx}>
                  <a
                    href={`#${section.title
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {section.title}
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
            <RestServices slug={slug} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Page;
