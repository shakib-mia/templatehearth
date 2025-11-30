import PageHeader from "@/app/components/PageHeader/PageHeader";
import RestServices from "@/app/components/RestServices/RestServices";
import { servicesCollection } from "@/app/lib/mongodb";
import Image from "next/image";
import { notFound } from "next/navigation";

// -------------------------
// 1) PRE-GENERATE ALL SLUGS
// -------------------------
export async function generateStaticParams() {
  try {
    const services = await servicesCollection.find().toArray();

    return services.map((t) => ({
      slug: t.slug,
    }));
  } catch (e) {
    return [];
  }
}

// -------------------------
// 2) SEO METADATA
// -------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params; // dynamic slug, jodi specific service page hoy
  const domain = process.env.DOMAIN_NAME;

  try {
    // Jodi slug thake, single service fetch
    let service;
    if (slug) {
      service = await servicesCollection.findOne({ slug });
      if (!service) {
        return {
          title: "service Not Found - Template Hearth",
          description: "This service does not exist in our collection.",
          robots: "noindex, nofollow",
        };
      }
    }

    const title = service ? service.title : "Services | Template Hearth";
    const description = service
      ? service.shortDescription
      : "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth.";
    const image = service?.image ? `${service.image}` : `${domain}favicon.ico`;
    const canonical = slug ? `${domain}services/${slug}` : `${domain}services`;

    return {
      title,
      description,
      keywords: service?.keywords || [
        "services",
        "web development",
        "templates",
        "Next.js",
        "MERN",
      ],
      robots: "index, follow",
      alternates: { canonical },
      openGraph: {
        title: title + " | Template Hearth",
        description,
        url: canonical,
        type: slug ? "article" : "website",
        siteName: "Template Hearth",
        locale: "en_US",
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch (e) {
    return {
      title: "services - Template Hearth",
      description:
        "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth.",
      robots: "noindex, nofollow",
    };
  }
}

// -------------------------
// Main page component
// -------------------------
export default async function ServicePage({ params }) {
  const { slug } = await params;
  try {
    const service = await servicesCollection.findOne({ slug });

    if (!service) return notFound();

    return (
      <>
        <PageHeader
          title={service.title}
          description={service.shortDescription}
        />

        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10 mt-10 pb-8">
          <main className="lg:w-8/12 w-full">
            <Image
              src={service.image || "/favicon.ico"}
              width={600}
              height={600}
              alt={service.slug}
              priority
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
              <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
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
              <h3 className="font-semibold mb-4 text-gray-800">
                More Services
              </h3>
              <RestServices slug={slug} />
            </div>
          </aside>
        </div>
      </>
    );
  } catch (error) {
    console.log("Service fetch failed:", error);
    throw error;
  }
}
