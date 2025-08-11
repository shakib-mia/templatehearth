"use client";
import React, { useRef, useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { FaPaperPlane } from "react-icons/fa6";
import emailjs from "emailjs-com";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Auto generate date & time string
    const now = new Date();
    const dateTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} - ${String(
      now.getDate()
    ).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}/${now.getFullYear()}`;

    // Prepare template params object
    // const templateParams = {
    //   from_name: formData.name,
    //   reply_to: formData.email,
    //   subject: formData.subject,
    //   message: formData.content,
    //   date: dateTime,
    // };

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          axios
            .post("https://templatehearth-be.onrender.com/contact", {
              name: e.target.from_name.value,
              email: e.target.reply_to.value,
              subject: e.target.subject.value,
              message: e.target.message.value,
            })
            .then((res) => {
              if (res.status === 200) {
                setFormData({
                  from_name: "",
                  reply_to: "",
                  subject: "",
                  message: "",
                });
              }
            });
        },
        (error) => {
          setStatus("❌ Failed to send message.");
          console.log(error);
        }
      );
  };

  return (
    <>
      <PageHeader
        title={"Get in Touch"}
        description={
          "We'd love to hear from you. Whether you have a question, a project idea, or just want to say hello — our inbox is always open."
        }
      />

      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
        <aside>
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem
        </aside>

        <form
          className="space-y-4 col-span-2"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Input
            name="from_name"
            type="text"
            placeholder="Enter Your Name Here"
            value={formData.from_name}
            onChange={handleChange}
            required
          />
          <Input
            name="reply_to"
            type="email"
            placeholder="Enter Your Email Address Here"
            value={formData.reply_to}
            onChange={handleChange}
            required
          />
          <Input
            name="subject"
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <Input
            textarea={true}
            name="message"
            placeholder="Enter Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button type="submit">
            Send Message <FaPaperPlane />
          </Button>

          {status && (
            <p className="mt-4 text-center text-sm font-semibold">{status}</p>
          )}
        </form>
      </section>
    </>
  );
};

export default Page;
