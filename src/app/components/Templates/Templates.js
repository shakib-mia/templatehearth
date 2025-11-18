import React from "react";
import { db } from "@/app/lib/mongodb";
import Template from "../Template/Template";

// -------------------------
// 1) IF THERE ARE DYNAMIC TEMPLATE PAGES THIS WILL PRE-GENERATE THEM
// -------------------------
export async function generateStaticParams() {
  const { slug: type } = await params;
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find({ type }).toArray();

  return templates.map((t) => ({
    slug: t.slug, // jodi tui dynamic template pages generate korte chas
  }));
}

// -------------------------
// 2) MAIN COMPONENT (SSG STYLE)
// -------------------------
const Templates = async ({ route, params }) => {
  // console.log({ params });
  // const { slug: type } = await params;
  const type = params ? { type: params } : {};

  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find(type).toArray();

  const displayedTemplates = route === "/" ? templates.slice(0, 4) : templates;

  return (
    <div className="col-span-5 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {displayedTemplates.map((template, key) => (
        <Template key={key} {...template} />
      ))}
    </div>
  );
};

export default Templates;
