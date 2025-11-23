import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Templates from "../components/Templates/Templates";
import TechSelector from "../components/TechSelector/TechSelector";
import { templatesCollection } from "../lib/mongodb";

export const metadata = {
  title: "Templates - Template Hearth",
  description:
    "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
};

const page = async () => {
  // সব templates একবারে fetch করা
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/templates`);
  // const templates = await res.json();
  const res = await templatesCollection.find().toArray();
  const templates = JSON.parse(JSON.stringify(res));

  return (
    <>
      <PageHeader
        title={`Templates`}
        description={
          "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project."
        }
      />

      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />

        {/* Client-side filtering এর জন্য data pass করছ */}
        <Templates data={templates} />
      </section>
    </>
  );
};

export default page;
