export const revalidate = 3600; // ISR enabled

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

export default async function TemplatesPage({
  params,
  providedTemplates,
  searchParams,
  route = "/",
}) {
  const data = route !== "/" && (await searchParams);
  const { type, categories, search } = data;
  const templatesCollection = db.collection("templates");

  const isHome = route === "/";
  const limit = isHome ? 4 : 0;

  const query = {};

  // type filter
  if (type) query.type = type;

  // categories/niches filter
  if (categories) {
    query.niches = {
      $in: [
        new RegExp("^" + categories.replace(/[-\s]/g, "[-\\s]") + "$", "i"),
      ],
    };
  }

  // search keyword filter
  if (search) {
    const regex = new RegExp(search, "i"); // case-insensitive
    query.$or = [
      { relatedKeyword: regex },
      { niches: regex },
      { headline: regex },
      { slug: regex },
      { shortDescription: regex },
      { whyChoose: regex },
    ];
  }

  const templates = await templatesCollection
    .find(query)
    .limit(limit)
    .toArray();

  return (
    <div className="col-span-5 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit">
      {(providedTemplates || templates).map((template) => (
        <Template key={template.slug} {...template} />
      ))}
    </div>
  );
}
