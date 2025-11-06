import PageHeader from "@/app/components/PageHeader/PageHeader";
import RestTemplates from "@/app/components/RestTemplates/RestTemplates";
import TemplateDetails from "@/app/components/TemplateDetails/TemplateDetails";
import { db } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const templatesCollection = db.collection("templates");
    const template = await templatesCollection.findOne({ slug });

    if (template) {
      console.log(template);
      return {
        title: template.headline,
        description: template.shortDescription,
      };
    } else {
      return {
        title: "Not Found",
      };
    }
  } catch (error) {
    return {
      title: "Not Found",
    };
  }
}

const page = async ({ params }) => {
  //   console.log(params.slug);
  const { slug } = await params;

  try {
    const templatesCollection = db.collection("templates");
    const template = await templatesCollection.findOne({ slug });

    if (!template) {
      return notFound();
    }

    return (
      <>
        <PageHeader
          title={template?.headline}
          description={template?.shortDescription}
        />

        <section className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-8/12">
              <TemplateDetails data={template} />
            </aside>
            <aside className="w-full xl:w-4/12 sticky top-10 h-fit">
              <h2 className="font-semibold mb-4">More templates</h2>
              <RestTemplates slug={template.slug} />
            </aside>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.log(error);
    // handle 404 error from backend
    if (error.response && error.response.status === 404) {
      return notFound();
    }

    // Optional: throw other errors to show Next.js error boundary
    throw error;
  }
};

export default page;
