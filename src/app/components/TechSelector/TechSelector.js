import { templatesCollection } from "@/app/lib/mongodb";
import TechSelectorClient from "../TechSelectorClient/TechSelectorClient";

const TechSelector = async ({ searchParams }) => {
  const items = [
    { label: "All", href: "/templates", type: null },
    {
      label: "Landing Page",
      href: "/templates?type=landing-page",
      type: "landing-page",
    },
    {
      label: "Full Site",
      href: "/templates?type=full-site",
      type: "full-site",
    },
  ];

  // Count fetch
  const counts = {};
  for (const item of items) {
    if (!item.type)
      counts[item.label] = await templatesCollection.countDocuments({});
    else
      counts[item.label] = await templatesCollection.countDocuments({
        type: item.type,
      });
  }

  return (
    <aside className="col-span-5 lg:col-span-1 sticky top-0 left-0 h-fit bg-white">
      <TechSelectorClient
        items={items}
        counts={counts}
        searchParams={searchParams}
      />
    </aside>
  );
};

export default TechSelector;
