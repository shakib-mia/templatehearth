"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TechSelectorClient = ({ items, counts }) => {
  const pathname = usePathname();

  return (
    <>
      <h4 className="border-b pb-4">Filters</h4>
      <ul className="mt-4 space-y-2">
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
