"use client";

import { useEffect, useState } from "react";

export default function PageHeader({ description, title }) {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(document.title); // এটা automatically page এর title নেবে
  }, []);

  return (
    <div className="bg-muted pt-40 pb-10 text-center">
      <div className="container">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          {title ||
            (pageTitle.includes("-") ? pageTitle.split("-")[0] : pageTitle)}
        </h1>
        <p className="text-center lg:w-1/2 mx-auto">{description}</p>
      </div>
    </div>
  );
}
