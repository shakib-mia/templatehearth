import React from "react";
import { db } from "@/app/lib/mongodb";
import Template from "../Template/Template";

// -------------------------
// 1) IF THERE ARE DYNAMIC TEMPLATE PAGES THIS WILL PRE-GENERATE THEM
// -------------------------
export async function generateStaticParams() {
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find({}).toArray();

  return templates.map((t) => ({
    slug: t.slug, // jodi tui dynamic template pages generate korte chas
  }));
}

// -------------------------
// 2) MAIN COMPONENT (SSG STYLE)
// -------------------------
const Templates = async ({ route }) => {
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find({}).toArray();

  const displayedTemplates = route === "/" ? templates.slice(0, 4) : templates;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
      {displayedTemplates.map((template, key) => (
        <Template key={key} {...template} />
      ))}
    </div>
  );
};

export default Templates;
