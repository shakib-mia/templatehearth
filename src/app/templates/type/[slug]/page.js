import PageHeader from "@/app/components/PageHeader/PageHeader";
import TechSelector from "@/app/components/TechSelector/TechSelector";
import Templates from "@/app/components/Templates/Templates";
import { templatesCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";
import React from "react";

// -------------------------
// 1) Dynamic Metadata (Mongo fetch)
// -------------------------
function formatType(type) {
  return type
    .split("-") // ["html", "landing", "page"]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "); // "Html Landing Page"
}

export async function generateMetadata({ params }) {
  const { slug: type } = await params;
  const templates = await templatesCollection.find({ type }).toArray();

  const formattedType = formatType(type); // <-- cleaned + capitalized text

  if (!templates.length) {
    return {
      title: "No templates found | TemplateHearth",
      description: `No templates available for ${formattedType}`,
    };
  }

  return {
    title: `${formattedType} Templates | TemplateHearth`,
    description: `Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`,
    openGraph: {
      title: `${formattedType} Templates | TemplateHearth`,
      description: `Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`,
      robots: { index: true, follow: true },
      images: [
        {
          url: "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${formattedType} Templates`,
        },
      ],
    },
  };
}

// -------------------------
// 2) Pre-generate Static Routes
// -------------------------
export async function generateStaticParams() {
  const templates = await templatesCollection.distinct("type");
  return templates.map((type) => ({ slug: type }));
}

export const revalidate = 3600; // seconds, ei page 1 hour por update hote pare

// -------------------------
// 3) Main Listing Page
// -------------------------
const Page = async ({ params }) => {
  const { slug: type } = await params;

  const templates = await templatesCollection.find({ type }).toArray();

  if (!templates.length) return notFound();

  return (
    <>
      <PageHeader
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} Templates`}
        description={`Explore all ${type.replace(
          "-",
          " "
        )} templates, fully responsive, ready to use, and easy to customize.`}
      />

      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />
        <Templates params={type} />
      </section>
    </>
  );
};

export default Page;
