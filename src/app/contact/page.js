"use client";
import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { FaPaperPlane } from "react-icons/fa6";

const page = () => {
  return (
    <>
      <PageHeader
        title={"Get in Touch"}
        description={
          "We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello — our inbox is always open."
        }
      />

      <section className="container">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input name="name" type="text" placeholder="Enter Your Name Here" />
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email Address Here"
          />
          <Input name="subject" type="text" placeholder="Subject" />

          <Input
            className="resize-none"
            textarea={true}
            name="content"
            placeholder="Enter Your Message"
            rows="3"
          />

          <Button type="submit">
            Send Message <FaPaperPlane />
          </Button>
        </form>
      </section>
    </>
  );
};

export default page;
