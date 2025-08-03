import React from "react";
import Services from "../components/Services/Services";
import PageHeader from "../components/PageHeader/PageHeader";
import Button from "../components/Button/Button";

const title = `Services - Template Hearth`;

const description =
  "Discover our professional web services designed to accelerate your brand’s online presence. From custom website development to full-scale digital solutions — explore how Template Hearth empowers your success.";

export async function generateMetadata() {
  return {
    title,
    description,
  };
}

const page = () => {
  return (
    <>
      <PageHeader description={description} />
      <Services route="services" />
    </>
  );
};

export default page;
