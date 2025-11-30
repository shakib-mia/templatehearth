// app/pricing/page.js
import PageHeader from "../components/PageHeader/PageHeader";
import PlansSelectorWrapper from "../components/PlansSelectorWrapper/PlansSelectorWrapper";
import { db } from "../lib/mongodb";
// -------------------------
// SEO Metadata (Refined + Dynamic + OG/Twitter)
// -------------------------
import { headers } from "next/headers";

const title = "Pricing";
const description =
  "Explore custom web development pricing for Next.js + MERN stack projects. Get premium, scalable, SEO-friendly landing pages, multipage websites, ecommerce stores, and SaaS solutions tailored to your business.";

export async function generateMetadata() {
  const header = await headers();
  const host = header.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const domain = `${protocol}://${host}`;
  const canonical = `${domain}/pricing`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Template Hearth",
      type: "website",
      images: [
        {
          url: `${domain}/favicon.ico`,
          width: 1200,
          height: 630,
          alt: "Template Hearth Pricing Overview",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${domain}/favicon.ico`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

// -------------------------
// SSG Component
// -------------------------
export const revalidate = 3600; // 1 hour SSG cache (optional)

const PricingPage = async () => {
  // Fetch plans from MongoDB
  const pricingCollection = db.collection("plans");
  const rawData = await pricingCollection.find({}).toArray();

  const pricing = rawData.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  // Get visitor IP & country (Server-side fetch)
  // const ipRes = await fetch("https://api.ipify.org?format=json", {
  //   cache: "no-store",
  // });
  // const { ip } = await ipRes.json();

  // const countryRes = await fetch(
  //   `https://ipinfo.io/${ip}?token=1ea4859427fd67`,
  //   { cache: "no-store" }
  // );
  // const countryData = await countryRes.json();
  // const country = countryData?.country || "unknown";

  // const currency = country === "BD" ? "BDT" : country === "IN" ? "INR" : "USD";

  return (
    <>
      <PageHeader title={title} description={description} />

      {/* Client component for Expand/Collapse */}
      <PlansSelectorWrapper
        pricing={pricing}
        // currency={currency}
        // country={country}
      />
    </>
  );
};

export default PricingPage;
