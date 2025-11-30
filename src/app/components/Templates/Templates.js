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

export default async function TemplatesPage({ route, data }) {
  return (
    <div className="col-span-5 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.slice(0, route === "/" ? 4 : data.length).map((template) => (
        <Template key={template.slug} {...template} />
      ))}
    </div>
  );
}
