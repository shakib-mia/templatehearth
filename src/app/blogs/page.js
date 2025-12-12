import React from "react";
import Blogs from "../components/Blogs/Blogs";
import PageHeader from "../components/PageHeader/PageHeader";

export async function generateMetadata() {
  const domain = process.env.DOMAIN_NAME;
  const url = `${domain}blogs`;
  const ogImage = `${domain}favicon.ico`; // fallback og image

  return {
    title: "Blogs | Template Hearth",
    description:
      "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth.",
    keywords: [
      "web design blogs",
      "template design tips",
      "web development insights",
      "UI/UX articles",
      "Template Hearth blogs",
    ],
    robots: "index, follow",

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: "Blogs | Template Hearth",
      description:
        "Explore web design insights, template tips, updates, and inspiration to help you build better websites.",
      url,
      siteName: "Template Hearth",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Blogs | Template Hearth",
      description:
        "Explore design insights, updates, and inspiration for building better websites.",
      images: [ogImage],
    },
  };
}

const page = () => {
  return (
    <>
      <PageHeader
        title="Blogs"
        description="Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth."
      />
      <section className="container">
        <Blogs route="/blogs" />
      </section>
    </>
  );
};

export default page;
