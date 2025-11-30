import React from "react";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import TechSelector from "@/app/components/TechSelector/TechSelector";
import Templates from "@/app/components/Templates/Templates";
import { templatesCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// -------------------------
// Helper: Format slug/type to readable title
// -------------------------
function formatType(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// -------------------------
// 1) Dynamic Metadata
// -------------------------
export async function generateMetadata({ params }) {
  const { slug: type } = await params;
  const templates = await templatesCollection.find({ type }).toArray();

  const formattedType = formatType(type);

  if (!templates.length) {
    return {
      title: "No Templates Found",
      description: `No templates available for ${formattedType}`,
    };
  }

  return {
    title: `${formattedType} Templates`,
    description: `Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`,
    openGraph: {
      title: `${formattedType} Templates `,
      description: `Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`,
      robots: { index: true, follow: true },
      images: [
        {
          url: "/favicon.ico",
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
  const types = await templatesCollection.distinct("type");
  return types.map((type) => ({ slug: type }));
}

export const revalidate = 3600; // 1 hour

// -------------------------
// 3) Main Listing Page
// -------------------------
const Page = async ({ params }) => {
  const { slug: type } = await params;

  const templates = await templatesCollection.find({ type }).toArray();

  if (!templates.length) return notFound();
  const formattedType = formatType(type);

  return (
    <>
      <PageHeader
        title={`${formattedType} Templates`}
        description={`Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`}
      />

      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />
        <Templates params={type} />
      </section>
    </>
  );
};

export default Page;
