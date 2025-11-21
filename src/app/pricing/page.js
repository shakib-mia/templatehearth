// app/pricing/page.js
import PageHeader from "../components/PageHeader/PageHeader";
import PlansSelectorWrapper from "../components/PlansSelectorWrapper/PlansSelectorWrapper";
import { db } from "../lib/mongodb";

// -------------------------
// SEO Metadata
// -------------------------
const title = "Pricing - Template Hearth";
const description =
  "Explore custom web development pricing for Next.js + MERN stack projects. Get premium, scalable, and SEO-friendly landing pages, multipage websites, ecommerce stores, and SaaS solutions tailored to your business";
export async function generateMetadata() {
  return { title, description };
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
      <PageHeader title="Pricing" description={description} />

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
