import Image from "next/image";
import Link from "next/link";
import React from "react";
import Command from "../Command/Command";

const TemplateDetails = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto pb-6 space-y-10 text-gray-800 text-justify">
      {/* Hero */}
      <div className="space-y-4">
        <Image
          src={data.image}
          alt={data.headline}
          width={800}
          height={400}
          className="w-full rounded-xl shadow-md"
        />
      </div>

      {/* Overview */}
      <div>
        {data.overview?.map((para, idx) => (
          <p key={idx} className="text-gray-700 mb-3">
            {para}
          </p>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 flex-wrap mt-4">
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
          Make it Yours
        </a>
      </div>

      {/* Why Choose */}
      <div>
        <h3 className="font-semibold mb-2">Why Choose This Template?</h3>
        <ul className="list-none space-y-2">
          {data.whyChoose?.map((item, idx) => (
            <li
              className={
                idx === 0
                  ? "mb-4"
                  : idx === data.whyChoose.length - 1
                  ? "mt-4"
                  : "mt-0 mb-2"
              }
              key={idx}
            >
              {item.heading && (
                <span className="font-semibold">{item.heading}:</span>
              )}{" "}
              {item.text.split(/\*\*(.*?)\*\*/).map((part, i) =>
                i % 2 === 1 ? (
                  <span className="font-semibold" key={i}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Getting Started Steps */}
      <div>
        <h3 className="font-semibold mb-2">Getting Started</h3>
        <ul className="list-disc pl-6 space-y-2">
          {data.gettingStartedSteps?.map((stepObj, idx) => (
            <li key={idx}>
              <span className="font-semibold">{stepObj.step}:</span>{" "}
              {stepObj.description}
              {stepObj.commands && <Command stepObj={stepObj} />}
              {stepObj.note && (
                <p className="text-gray-500 text-sm mt-1">{stepObj.note}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Customization */}
      <div>
        <h3 className="font-semibold mb-2">Customization</h3>
        <p>{data.customization.intro}</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {data.customization.highlights?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-gray-500">
          Config File: <code>{data.customization.configFile}</code>
        </p>
      </div>

      {/* Useful Links */}
      <div>
        <h3 className="font-semibold mb-2">Useful Links</h3>
        <ul className="list-disc pl-6 space-y-1">
          {data.usefulLink?.map((link, idx) => (
            <li key={idx}>
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

      {/* Help / Contact */}
      <div>
        <p>
          Need help customizing this template?{" "}
          <Link
            href="/contact"
            className="text-primary underline hover:no-underline"
          >
            Contact Us
          </Link>{" "}
          anytime.
        </p>
      </div>
    </div>
  );
};

export default TemplateDetails;
