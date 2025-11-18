"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TechSelectorClient = ({ items, counts }) => {
  const [show, setShow] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

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
        className={`border-b pb-4 transition-all duration-300 pt-4`}
        style={{
          marginTop: show && scrollY > 350 ? 100 : 0 + "px",
        }}
      >
        Filters
      </h4>
      <ul className="mt-4 flex lg:flex-col justify-between space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
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
                <span>
                  {item.label} ({counts[item.label]})
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
