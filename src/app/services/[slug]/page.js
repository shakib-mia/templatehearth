import PageHeader from "@/app/components/PageHeader/PageHeader";
import RestServices from "@/app/components/RestServices/RestServices";
import { servicesCollection } from "@/app/lib/mongodb";
import Image from "next/image";
import { notFound } from "next/navigation";

// -------------------------
// Helper: fetch service by slug
// -------------------------
const getServiceBySlug = async (slug) => {
  return await servicesCollection.findOne({ slug });
};

// -------------------------
// Helper: fetch all other services (excluding current)
// -------------------------
const getOtherServices = async (slug) => {
  return await servicesCollection
    .find({ slug: { $ne: slug } })
    .limit(5)
    .toArray();
};

// -------------------------
// Dynamic metadata for SEO
// -------------------------
export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found - TemplateHearth",
      description: "The requested service was not found.",
    };
  }

  return {
    title: `${service.title} - TemplateHearth`,
    description: service.shortDescription || "",
    keywords: service.tags?.map((tag) => tag.replace(/^#/, "")).join(", "),
    openGraph: {
      title: service.title,
      description: service.shortDescription || "",
      type: "website",
      url: `https://templatehearth.vercel.app/services/${slug}`,
      images: [
        {
          url:
            service.image ||
            "https://templatehearth.vercel.app/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} - TemplateHearth`,
        },
      ],
      siteName: "TemplateHearth",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.shortDescription || "",
      images: [
        service.image ||
          "https://templatehearth.vercel.app/default-og-image.jpg",
      ],
      creator: "@TemplateHearth",
    },
    alternates: {
      canonical: `https://templatehearth.vercel.app/services/${slug}`,
    },
  };
}

// -------------------------
// Main page component
// -------------------------
export default async function ServicePage({ params }) {
  const { slug } = params;
  const service = await getServiceBySlug(slug);

  if (!service) return notFound();

  const moreServices = await getOtherServices(slug); // Server-side fetch

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
      />

      <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10 mt-10 pb-8">
        <main className="lg:w-8/12 w-full">
          <Image
            src={service.image || "/default-og-image.jpg"}
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

          {service.conclusion && (
            <>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Conclusion
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.conclusion}
              </p>
            </>
          )}
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

          <div className="bg-gray-50 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              More Services
            </h3>
            <RestServices data={moreServices} />
            {/* <ul className="space-y-3">
              {moreServices.map((s) => (
                <li key={s._id}>
                  <a
                    href={`/services/${s.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
        </aside>
      </div>
    </>
  );
}
