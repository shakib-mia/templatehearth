import Image from "next/image";
import Link from "next/link";
import React from "react";

const TemplateDetails = ({ data }) => {
  const features = [
    {
      heading: "Lightweight & Fast",
      text: "Built with Vite.js for blazing fast development and optimized builds.",
    },
    {
      heading: "Smooth UX",
      text: "Includes buttery-smooth scrolling and elegant animation effects.",
    },
    {
      heading: "Responsive Design",
      text: "Looks perfect on all devices — desktop, tablet, and mobile.",
    },
    {
      heading: "Easy to Customize",
      text: "Uses Tailwind CSS with semantic utility classes and custom config for colors, fonts, and layout.",
    },
    {
      heading: "SEO Friendly",
      text: "Semantic HTML, proper heading structure, meta tags, and fast load times for better search rankings.",
    },
    {
      heading: "Minimal JavaScript",
      text: "Only essential scripts to keep your site fast and smooth.",
    },
  ];

  const usefulLinks = [
    {
      label: "Vite Documentation",
      url: "https://vitejs.dev/guide/",
    },
    {
      label: "Node.js Download",
      url: "https://nodejs.org/",
    },
    {
      label: "GitHub: How to clone a repo",
      url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-6 space-y-6 text-gray-800 text-justify">
      {/* Hero */}
      <>
        <Image
          src={data.image}
          alt={data.headline}
          width={600}
          height={100}
          className=" w-full rounded-xl shadow-md"
        />
        {/* <h3 className="font-bold mt-6">{data.headline}</h3> */}
        {/* <p className="text-gray-600 mt-2">{data.shortDescription}</p> */}
      </>

      {/* Overview */}
      <p className="text-gray-700">{data.overview}</p>

      {/* Why Choose */}
      <div>
        <h4 className="font-semibold mb-2">Why Choose This Template?</h4>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {features.map(({ heading, text }, index) => (
            <li key={index}>
              <b>{heading}:</b> {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="flex gap-4 flex-wrap">
        <a
          href={data.liveDemo}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Live Demo
        </a>
        <a
          href={data.gumroadLink}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-700 transition"
        >
          Make it Your
        </a>
      </div>

      {/* Customization */}
      <div>
        <h4 className="font-semibold mb-2">Customization</h4>
        <p>{data.customization.intro}</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
          {data.customization.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-gray-500">
          Config File: <code>{data.customization.configFile}</code>
        </p>
      </div>

      {/* Useful Links */}
      <div>
        <h4 className="font-semibold mb-2">Useful Links</h4>
        <ul className="list-disc pl-6 space-y-1">
          {usefulLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Help */}
      <p>
        Wanna make your business live?{" "}
        <Link
          className="text-primary underline hover:no-underline"
          href={"/contact"}
        >
          Contact Us
        </Link>{" "}
        to get started
      </p>
      {/* <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-md">
        <p className="text-purple-800 font-medium">{data.needHelp}</p>
      </div> */}
    </div>
  );
};

export default TemplateDetails;
