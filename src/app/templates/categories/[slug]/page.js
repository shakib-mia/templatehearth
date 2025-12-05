import PageHeader from "@/app/components/PageHeader/PageHeader";
import TechSelector from "@/app/components/TechSelector/TechSelector";
import Templates from "@/app/components/Templates/Templates";

import { getFieldCount } from "@/app/lib/getFieldCount";
import { templatesCollection } from "@/app/lib/mongodb";

function formatType(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

import React from "react";

const page = async ({ params }) => {
  // console.log(params.url);
  const { slug } = await params;
  // const niches = await getFieldCount(templatesCollection, "niches");

  // Regex for case-insensitive & dash-space handling
  const regex = new RegExp(slug.replace(/-/g, " "), "i");

  const templates = await templatesCollection
    .find({ niches: { $elemMatch: { $regex: regex } } }) // niches array e match
    .toArray();

  const formattedType = formatType(slug);

  return (
    <>
      <PageHeader
        title={`${formattedType} Templates`}
        description={`Explore all ${formattedType} templates, fully responsive, ready to use, and easy to customize.`}
      />

      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />
        <Templates
          providedTemplates={templates}
          route="/templates"
          params={slug}
        />
      </section>
    </>
  );
};

export default page;
