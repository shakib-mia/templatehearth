import Image from "next/image";
import Link from "next/link";
import React from "react";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

const TemplateDetails = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto pb-6 space-y-10 text-gray-800 text-justify">
      {/* Hero */}
      <Image
        src={data.image}
        alt={data.headline}
        width={600}
        height={100}
        className="w-full rounded-xl shadow-md"
      />

      {/* Overview */}
      {data.overview && <p className="text-gray-700">{data.overview}</p>}

      {/* Links */}
      <div className="flex gap-4 flex-wrap">
        {data.liveDemo && (
          <a
            href={data.liveDemo}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Live Demo
          </a>
        )}
        {data.gumroadLink && (
          <a
            href={data.gumroadLink}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-700 transition"
          >
            Make it Yours
          </a>
        )}
      </div>

      {/* Getting Started Steps */}
      {data.gettingStartedSteps && data.gettingStartedSteps.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Getting Started</h4>
          <div className="space-y-4">
            {data.gettingStartedSteps.map((step, index) => (
              <div key={index} className="border-l-4 border-purple-600 pl-4">
                <h5 className="font-medium text-gray-800">{step.step}</h5>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {step.commands && step.commands.length > 0 && (
                  <div className="mt-2">
                    {step.commands.map((command, cmdIndex) => (
                      <CopyToClipboard command={command} key={cmdIndex} />
                    ))}
                  </div>
                )}
                {step.note && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                    {step.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features / Why Choose */}
      {data.whyChoose && data.whyChoose.length > 0 && (
        <>
          <h4 className="font-semibold mb-4">
            {data.featuresTitle || "Why Choose This Template?"}
          </h4>
          <ul className="space-y-2 text-gray-700 list-none">
            {data.whyChoose.map((feature, index) => (
              <li key={index}>
                {/* <b>{feature.heading}:</b> {feature.text} */}
                <h5 className="font-medium">{feature.heading}</h5>
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Sections */}
      {data.sections && data.sections.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">
            {data.sectionsTitle || "Key Sections"}
          </h4>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {data.sections.map((section, index) => (
              <li key={index}>
                <b>{section.heading}:</b> {section.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Customization */}
      {data.customization && (
        <div>
          <h4 className="font-semibold mb-2">
            {data.customizationTitle || "Customization"}
          </h4>
          {data.customization.intro && <p>{data.customization.intro}</p>}
          {data.customization.steps && (
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              {data.customization.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          )}
          {data.customization.configFile && (
            <p className="mt-2 text-sm text-gray-500">
              Config File: <code>{data.customization.configFile}</code>
            </p>
          )}
        </div>
      )}

      {/* Useful Links */}
      {data.usefulLinks && data.usefulLinks.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">
            {data.usefulLinksTitle || "Useful Links"}
          </h4>
          <ul className="list-disc pl-6 space-y-2">
            {data.usefulLinks.map((link, index) => (
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
      )}

      {/* Help */}
      {data.needHelp && (
        <p>
          {data.needHelp}{" "}
          <Link
            className="text-primary underline hover:no-underline"
            href="/contact"
          >
            Contact Us
          </Link>{" "}
          to get started.
        </p>
      )}
    </div>
  );
};

export default TemplateDetails;
