import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Image from "next/image";
import Link from "next/link";
import Templates from "../components/Templates/Templates";
import Head from "next/head";

export const metadata = {
  title: "Templates - Template Hearth",
  description:
    "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project.",
};

const page = () => {
  return (
    <>
      <PageHeader
        title={`Templates`}
        description={
          "Discover ready-to-use, high-quality templates built for speed, style, and easy customization—ideal for any project."
        }
      />

      <section className="container">
        <Templates />
      </section>
    </>
  );
};

export default page;
