"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const TechSelectorClient = ({ items, counts, headline, allCount }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // console.log(searchParams.values());
  const categories = searchParams.get("categories");
  const type = searchParams.get("type");
  console.log(items.sort((a, b) => a.label - b.label));
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <h4
        className={`border-b pb-2 transition-all duration-300 font-semibold pt-4`}
      >
        {headline}
      </h4>
      <ul className="mt-4 flex lg:flex-col justify-between space-y-2">
        {items
          .sort((a, b) => a.label.localeCompare(b.label))
          .slice(0, seeMore ? items.length : 10)
          .map((item) => {
            const isActive =
              pathname === item.href ||
              categories === item.label ||
              type === item.label.replace(" ", "-").toLowerCase() ||
              (type === null && item.label === "All");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex gap-2 items-center justify-start w-full cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="!w-fit"
                    checked={isActive}
                    readOnly
                  />
                  <span className="capitalize">
                    {item.label.replace("-", " ")} (
                    {counts[item.label] || counts.all})
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default TechSelectorClient;
