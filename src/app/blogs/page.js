import React from "react";
import Blogs from "../components/Blogs/Blogs";
import PageHeader from "../components/PageHeader/PageHeader";

export async function generateMetadata({ params }) {
  return {
    title: "Blogs",
    // description: blog.shortDescription,
  };
}

const page = () => {
  return (
    <>
      <PageHeader
        title={"Blogs"}
        description={
          "Explore web design insights, template tips, updates, and inspiration to help you build better websites faster with Template Hearth. Stay ahead with the latest trends and creative strategies."
        }
      />
      <section className="container">
        <Blogs route="/blogs" />
      </section>
    </>
  );
};

export default page;
