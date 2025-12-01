import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Templates from "../components/Templates/Templates";
import TechSelector from "../components/TechSelector/TechSelector";

// -------------------------
// SEO Metadata
// -------------------------
export async function generateMetadata() {
  const domain = process.env.DOMAIN_NAME;

  try {
    const ogImage = `${domain}favicon.ico`;

    return {
      title: "Templates - Template Hearth",
      description:
        "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
      alternates: { canonical: `${domain}templates` },
      openGraph: {
        title: "Templates - Template Hearth",
        description:
          "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
        url: `${domain}templates`,
        type: "website",
        siteName: "Template Hearth",
        images: [{ url: ogImage, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Templates - Template Hearth",
        description:
          "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
        images: [ogImage],
      },
    };
  } catch (e) {
    return {
      title: "Templates - Template Hearth",
      description:
        "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
    };
  }
}

// -------------------------
// Page Component
// -------------------------
const page = async () => {
  return (
    <>
      <PageHeader
        title="Templates"
        description="Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project."
      />

      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />
        <Templates route="/templates" />
      </section>
    </>
  );
};

export default page;
