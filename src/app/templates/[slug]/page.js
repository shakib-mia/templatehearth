import PageHeader from "@/app/components/PageHeader/PageHeader";
import TemplateDetails from "@/app/components/TemplateDetails/TemplateDetails";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await axios.get(
      "https://templatehearth-be.onrender.com/templates/" + slug
    );
    const blog = res.data;

    if (blog) {
      return {
        title: blog.headline,
        description: blog.shortDescription,
      };
    } else {
      return {
        title: "Not Found",
      };
    }
  } catch (error) {
    console.log("Metadata fetch error:", error.message);
    return {
      title: "Not Found",
    };
  }
}

const page = async ({ params }) => {
  //   console.log(params.slug);
  const { slug } = await params;

  try {
    const data = await axios.get(
      "https://templatehearth-be.onrender.com/templates/" + slug
    );

    const blog = await data.data;
    console.log({ blog });

    if (!blog) {
      return notFound();
    }

    return (
      <>
        {blog ? (
          <>
            <PageHeader
              title={blog?.headline}
              description={blog?.shortDescription}
            />

            <section className="container">
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-8/12">
                  <TemplateDetails data={blog} />
                </aside>
                <aside className="w-4/12"></aside>
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
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
