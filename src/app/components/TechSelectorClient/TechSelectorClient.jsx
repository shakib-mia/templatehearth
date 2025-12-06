"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TechSelectorClient = ({ items, counts, headline }) => {
  const [show, setShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  // console.log(pathname);
  // console.log(items);
  const lastScrollY = useRef(0);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // setIsAtTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY.current && currentScrollY > 288) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // console.log();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <h4
        className={`border-b pb-4 transition-all duration-300 font-medium pt-4`}
      >
        {headline}
      </h4>
      <ul className="mt-4 flex lg:flex-col justify-between space-y-2">
        {items
          .sort((a, b) => a.label.localeCompare(b.label))
          .slice(0, seeMore ? items.length : 10)
          .map((item) => {
            // console.log(pathname, item.href, type);
            // const isActive =
            //   pathname === item.href ||
            //   categories === item.label ||
            //   type === item.label.replace(" ", "-").toLowerCase() ||
            //   (type === null && item.label === "All");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex gap-2 items-center justify-start w-full cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="!w-fit"
                    // checked={isActive}
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

      {items.length > 10 && (
        <div className="flex gap-2">
          <span
            onClick={() => setSeeMore((data) => !data)}
            className="text-primary underline underline-offset-4 hover:no-underline cursor-pointer"
          >
            See {seeMore ? "less" : "more"}
          </span>
          <Link
            href={"/templates"}
            className="text-primary underline underline-offset-4 hover:no-underline cursor-pointer"
          >
            Reset Search
          </Link>
        </div>
      )}
    </>
  );
};

export default TechSelectorClient;
