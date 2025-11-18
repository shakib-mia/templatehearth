"use client";

import { useEffect, useState } from "react";

export default function PageHeader({ description, title }) {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(document.title); // এটা automatically page এর title নেবে
  }, []);

  return (
    <header className="bg-muted-100 pt-20 lg:pt-40 pb-10 text-center">
      <div className="container">
        <h1 className="text-2xl lg:text-6xl font-bold mb-2 text-gray-900 leading-[1.5] capitalize">
          {title.includes("-")
            ? title.replace("-", " ")
            : title ||
              (pageTitle.includes("-") ? pageTitle.split("-")[0] : pageTitle)}
        </h1>
        <p className="text-center text-base lg:w-7/12 mx-auto">{description}</p>
      </div>
    </header>
  );
}
