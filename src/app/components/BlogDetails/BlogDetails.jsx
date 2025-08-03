import Image from "next/image";
import React from "react";

// Helper function to convert **text** to <strong>text</strong>
const convertBoldText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span className="font-semibold" key={index}>
        {part.slice(2, -2)}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const BlogDetails = ({ blog }) => {
  return (
    <main>
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={450}
        className="w-full rounded-2xl mb-6 object-cover aspect-video"
      />

      {/* <h1 className="text-3xl md:text-4xl font-bold">{blog.title}</h1>
      <p className="text-lg text-gray-600 mt-4">{blog.shortDescription}</p> */}

      {/* Introduction Section */}
      <section className="!py-6 space-y-4">
        <p className="text-lg">{convertBoldText(blog.introduction.hook)}</p>
        <p>{convertBoldText(blog.introduction.context)}</p>
        <p className="font-semibold text-primary">
          {convertBoldText(blog.introduction.main_message)}
        </p>
      </section>

      {/* Content Sections */}
      {blog.content_sections.map((section, index) => (
        <section key={index} className="!py-6 space-y-3">
          <h2 className="text-2xl font-semibold">
            {convertBoldText(section.title)}
          </h2>
          <p>{convertBoldText(section.content + " " + section.highlight)}</p>

          {section.points?.length > 0 && (
            <ul className="list-disc ml-6 space-y-1">
              {section.points.map((point, idx) => (
                <li key={idx}>{convertBoldText(point)}</li>
              ))}
            </ul>
          )}

          {/* {section.highlight && (
            <p className="bg-gray-100 border-l-4 border-primary p-4 italic text-sm text-gray-800">
              {convertBoldText(section.highlight)}
            </p>
          )} */}
        </section>
      ))}

      {/* Conclusion */}
      <section className="mt-6 border-t border-blue-300 pt-6 space-y-4">
        <h2 className="text-xl font-semibold">Conclusion</h2>
        {blog.conclusion.summary && (
          <p>{convertBoldText(blog.conclusion.summary)}</p>
        )}
        <p className="font-semibold">
          {convertBoldText(blog.conclusion.call_to_action)}
        </p>
        <p className="text-sm text-gray-500">
          {convertBoldText(blog.conclusion.additional_info)}
        </p>
      </section>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </main>
  );
};

export default BlogDetails;
