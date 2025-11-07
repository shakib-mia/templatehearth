import PageHeader from "../components/PageHeader/PageHeader";
import Button from "../components/Button/Button";
import { PricingGrid } from "../components/PricingGrid/PricingGrid";
import PlanCategorySelector from "../components/PlanCategorySelector/PlanCategorySelector";
import PlansSelectorWrapper from "../components/PlansSelectorWrapper/PlansSelectorWrapper";
import { db } from "../lib/mongodb";

const title = `Pricing - Template Hearth`;

const description =
  "Explore custom web development pricing for Next.js + MERN stack projects. Get premium, scalable, and SEO-friendly landing pages, multipage websites, ecommerce stores, and SaaS solutions tailored to your business";

export async function generateMetadata() {
  return {
    title,
    description,
  };
}

const PricingPage = async () => {
  const pricingCollection = db.collection("plans");
  const rawData = await pricingCollection.find({}).toArray();

  const pricing = rawData.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  // Get IP & Country
  const ipRes = await fetch("https://api.ipify.org?format=json", {
    cache: "no-store",
  });
  const { ip } = await ipRes.json();

  const countryRes = await fetch(
    `https://ipinfo.io/${ip}?token=1ea4859427fd67`,
    {
      cache: "no-store",
    }
  );

  const countryData = await countryRes.json();
  const country = countryData?.country || "unknown";
  // console.log(countryData);

  const currency = country === "BD" ? "BDT" : country === "IN" ? "INR" : "USD";

  return (
    <>
      <PageHeader
        title="Pricing"
        description="Explore custom web development pricing for Next.js + MERN stack projects. Get premium, scalable, and SEO-friendly landing pages, multipage websites, ecommerce stores, and SaaS solutions tailored to your business"
      />

      <PlansSelectorWrapper
        pricing={pricing}
        currency={currency}
        country={country}
      />
    </>
  );
};

export default PricingPage;

// এটা ছোট client component শুধু Expand/Collapse এর জন্য
