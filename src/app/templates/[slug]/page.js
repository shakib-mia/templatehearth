import PageHeader from "@/app/components/PageHeader/PageHeader";
import TemplateDetails from "@/app/components/TemplateDetails/TemplateDetails";
import axios from "axios";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await (
    await axios.get("http://localhost:5000/templates/" + slug)
  ).data;

  if (!blog) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: blog.headline,
    description: blog.shortDescription,
  };
}

const page = async ({ params }) => {
  //   console.log(params.slug);
  const { slug } = await params;

  const blog = await (
    await axios.get("http://localhost:5000/templates/" + slug)
  ).data;

  return (
    <>
      <PageHeader title={blog.headline} description={blog.shortDescription} />

      <section className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-8/12">
            <TemplateDetails data={blog} />
          </aside>
          <aside className="w-4/12"></aside>
        </div>
      </section>
    </>
  );
};

export default page;
