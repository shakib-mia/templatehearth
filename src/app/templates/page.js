import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Image from "next/image";
import Link from "next/link";
import Templates from "../components/Templates/Templates";
import Head from "next/head";
import TechSelector from "../components/TechSelector/TechSelector";

export const metadata = {
  title: "Templates - Template Hearth",
  description:
    "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
};

const page = async ({ searchParams }) => {
  // console.log(searchParams);
  const data = await searchParams;

  return (
    <>
      <PageHeader
        title={`Templates`}
        description={
          "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project."
        }
      />
      <section className="grid grid-cols-5 gap-8 container">
        <TechSelector />

        <Templates keyword={data.query} />
      </section>
    </>
  );
};

export default page;
