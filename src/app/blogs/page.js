import React from "react";
import Blogs from "../components/Blogs/Blogs";
import PageHeader from "../components/PageHeader/PageHeader";
import { headers } from "next/headers";

export async function generateMetadata() {
  const header = await headers();
  const host = await header.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const domain = `${protocol}://${host}`;
  const canonical = `${domain}/blogs`;

  const description =
    "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth.";

  return {
    title: "Blogs - Template Hearth",
    description,
    alternates: {
      canonical,
    },
    keywords: [
      "web design",
      "templates",
      "frontend development",
      "templatehearth",
      "blogs",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Blogs - Template Hearth",
      description,
      url: canonical,
      siteName: "Template Hearth",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Blogs - Template Hearth",
      description,
    },
  };
}

const page = () => {
  return (
    <>
      <PageHeader
        title={"Blogs"}
        description={
          "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth. Stay ahead with the latest trends and creative strategies."
        }
      />
      <section className="container">
        <Blogs route="/blogs" />
      </section>
    </>
  );
};

export default page;
