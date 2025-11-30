import React from "react";
import Services from "../components/Services/Services";
import PageHeader from "../components/PageHeader/PageHeader";

const title = `Services`;
const description =
  "Discover our professional web services designed to accelerate your brand’s online presence. From custom website development to full-scale digital solutions — explore how Template Hearth empowers your success.";

// ধরুন Services page-এ mainImage আছে, না থাকলে fallback হবে

export async function generateMetadata() {
  const domain = process.env.DOMAIN_NAME;
  const canonical = `${domain}/services`;

  const ogImage = `${domain}/favicon.ico`;

  return {
    title: `${title}`,
    description,
    keywords: ["services", "web development", "templates", "Next.js", "MERN"],
    robots: "index, follow",
    alternates: {
      canonical,
    },
    openGraph: {
      title: title + " | Template Hearth",
      description,
      url: canonical,
      type: "website",
      siteName: "Template Hearth",
      locale: "en_US",
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
      title,
      description,
      images: [ogImage],
    },
  };
}

const Page = () => {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Services route="services" />
    </>
  );
};

export default Page;
