import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import ContactForm from "../components/ContactForm/ContactForm";

const title = `Contact - Template Hearth`;

const description =
  "We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello — our inbox is always open.";

export async function generateMetadata() {
  return {
    title,
    description,
  };
}

// export const metadata = {
//   title,
//   description,
// };

const Page = () => {
  return (
    <>
      <PageHeader
        title={"Get in Touch"}
        description={
          "We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello — our inbox is always open."
        }
      />

      <section className="container flex justify-center gap-12">
        <ContactForm />
      </section>
    </>
  );
};

export default Page;
