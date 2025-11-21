export const revalidate = 1; // ISR enabled

import React from "react";
import { db } from "@/app/lib/mongodb";
import Template from "../Template/Template";

// ------------------------------------------------------
// 1) generateStaticParams (params receive kore na)
// ------------------------------------------------------
export async function generateStaticParams() {
  const templatesCollection = db.collection("templates");

  // Dynamic page type gula dhore niyo (distinct)
  const types = await templatesCollection.distinct("type");

  return types.map((type) => ({
    type,
  }));
}

// ------------------------------------------------------
// 2) MAIN COMPONENT (ISR + SSG)
// ------------------------------------------------------
export default async function Templates({ params, route, searchParams }) {
  // const { type } = params || {};
  // console.log({  });

  const query = searchParams ? { type: searchParams } : {};

  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find(query).toArray();

  const displayedTemplates = route === "/" ? templates.slice(0, 4) : templates;

  return (
    <div className="col-span-5 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {displayedTemplates.map((template) => (
        <Template key={template.slug} {...template} />
      ))}
    </div>
  );
}
