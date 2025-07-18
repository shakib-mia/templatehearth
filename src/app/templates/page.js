import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Image from "next/image";
import Link from "next/link";
import Templates from "../components/Templates/Templates";
import Head from "next/head";

export const metadata = {
  title: "Templates - Template Hearth",
};

const page = () => {
  return (
    <>
      <PageHeader title={`Templates`} />

      <section className="container">
        <Templates />
      </section>
    </>
  );
};

export default page;
