import React from "react";
import { db } from "@/app/lib/mongodb";
import Template from "../Template/Template";

const Templates = async ({ route }) => {
  const templatesCollection = db.collection("templates");
  const templates = await templatesCollection.find({}).toArray();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {templates
          .slice(0, route === "/" ? 4 : templates.length)
          .map((work, key) => (
            <Template key={key} {...work} />
          ))}
      </div>
    </>
  );
};

export default Templates;
