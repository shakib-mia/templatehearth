import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import ContactForm from "../components/ContactForm/ContactForm";
import Script from "next/script";

const pageTitle = "Contact - Template Hearth";
const pageDescription =
  "We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello — our inbox is always open.";

// -------------------------
// SEO METADATA
// -------------------------
export async function generateMetadata() {
  const domain = process.env.DOMAIN_NAME;
  const canonical = `${domain}/contact`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: "Template Hearth",
      type: "website",
      images: [
        {
          url: `${domain}/favicon.ico`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${domain}/favicon.ico`],
    },
  };
}

const Page = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact - Template Hearth",
    description: pageDescription,
    url: "https://templatehearth.com/contact",
    publisher: {
      "@type": "Organization",
      name: "Template Hearth",
      url: "https://templatehearth.com",
    },
  };

  return (
    <>
      <PageHeader title="Get in Touch" description={pageDescription} />

      {/* JSON-LD structured data */}
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="container flex justify-center gap-12 py-10">
        <ContactForm />
      </section>
    </>
  );
};

export default Page;
