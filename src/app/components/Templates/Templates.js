export const revalidate = 1; // ISR enabled

import Template from "../Template/Template";
import { db } from "@/app/lib/mongodb";

export async function generateStaticParams() {
  const templatesCollection = db.collection("templates");
  const types = await templatesCollection.distinct("type");

  return types.map((type) => ({ type }));
}

export default async function TemplatesPage({ params }) {
  const templatesCollection = db.collection("templates");

  const query = params?.type ? { type: params.type } : {};
  const templates = await templatesCollection.find(query).toArray();

  return (
    <div className="col-span-5 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {templates.map((template) => (
        <Template key={template.slug} {...template} />
      ))}
    </div>
  );
}
