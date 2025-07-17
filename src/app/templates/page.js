import React from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const works = [
    {
      image: "https://i.ibb.co/pjpDSNhx/Nexcent-Thumb.png",
      headline: "Nexcent – The Minimal SaaS Landing Page",
      // slug:"/nexcent-minimal-saas-landing-page",
      shortDescription:
        "A clean, modern, and fully responsive template built with Vite.js and Tailwind CSS. Perfect for SaaS startups and agencies ready to launch fast.",
      overview:
        "Nexcent is a clean, modern, and fully responsive single-page landing page template built with vanilla Vite.js, Tailwind CSS, and minimal JavaScript. Designed for SaaS startups, marketing agencies, and small businesses that need a professional, lightweight, and fast-loading online presence without complex frameworks.",
      whyChoose: [
        "Lightweight & Fast – Built with Vite.js for blazing fast development and optimized builds.",
        "Responsive Design – Looks perfect on desktop, tablet, and mobile.",
        "Easy to Customize – Semantic Tailwind CSS utility classes and custom config for colors, fonts, and layouts.",
        "SEO Friendly – Semantic HTML, headings, meta tags, and fast load times.",
        "Minimal JavaScript – Only essential scripts to keep the experience smooth.",
      ],
      liveDemo: "https://nexcent-shakib.netlify.app/",
      repository: "https://github.com/shakib-mia/nexcent",
      gettingStartedSteps: [
        {
          step: "Clone the repository",
          description:
            "Use the commands below in your terminal to download the project:",
          commands: [
            "git clone https://github.com/shakib-mia/nexcent.git",
            "cd nexcent",
          ],
        },
        {
          step: "Install dependencies",
          description: "Make sure you have Node.js (v14 or higher). Then run:",
          commands: ["npm install"],
        },
        {
          step: "Start the development server",
          description: "Launch the dev server to see the template locally:",
          commands: ["npm run dev"],
          note: "It will open at http://localhost:5173",
        },
        {
          step: "Build for production (optional)",
          description: "To create an optimized production build:",
          commands: ["npm run build"],
          note: "The build output will be in the dist folder.",
        },
      ],
      customization: {
        intro:
          "Nexcent uses Tailwind CSS with a custom configuration for colors, fonts, and layout.",
        highlights: [
          "Container is centered with responsive max-widths: sm (100%), md (768px), lg (1000px), xl (1200px).",
          "Custom neutral and primary color palette.",
          "Semantic font sizes: headline-1, body-1, etc.",
        ],
        configFile: "tailwind.config.js",
      },
      usefulLinks: [
        {
          label: "Vite Documentation",
          url: "https://vitejs.dev/",
        },
        {
          label: "Node.js Download",
          url: "https://nodejs.org/",
        },
        {
          label: "GitHub – How to clone a repo",
          url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository",
        },
      ],
      needHelp:
        "If you have any questions or need support customizing this template, feel free to contact me. Thank you for your interest and happy coding! 🚀",
    },
  ];

  return (
    <>
      <PageHeader title={`Templates`} />

      <section className="container">
        <div className="grid grid-cols-2 gap-4">
          {works.map((work, key) => (
            <Link href={"/" + work.headline.split(" ")} key={key}>
              <Image
                width={600}
                height={100}
                src={work.image}
                alt={work.headline}
                className="w-full rounded-lg"
              />
              <h4 className="font-semibold mt-8 mb-2">{work.headline}</h4>
              <p>{work.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
