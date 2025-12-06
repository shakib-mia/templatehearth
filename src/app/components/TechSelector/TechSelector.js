import { templatesCollection } from "@/app/lib/mongodb";
import TechSelectorClient from "../TechSelectorClient/TechSelectorClient";
import { getFieldCount } from "@/app/lib/getFieldCount";
import SearchTemplate from "../SearchTemplate/SearchTemplate";

function slugify(text) {
  return text
    ?.toString()
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    ?.replace(/[^\w-]+/g, "")
    ?.replace(/--+/g, "-")
    ?.replace(/^-+/, "")
    ?.replace(/-+$/, "");
}

// ---------------------------------------------------------
// FLEXIBLE URL BUILDER (DIVERSIFIED)
// ---------------------------------------------------------
function buildUrl({ type, category }) {
  let url = "/templates";

  if (type) url += `/type/${slugify(type)}`;
  if (category) url += `/category/${slugify(category)}`;

  return url;
}

const TechSelector = async ({ searchParams }) => {
  const search = (await searchParams) || {};

  const currentType = search.type || null;
  const currentCategory = search.category || null;

  // -----------------------------------------------------
  // TYPE FILTER
  // -----------------------------------------------------
  const typeArray = [
    { label: "All", type: "all" },
    { label: "Landing Page", type: "landing-page" },
    { label: "Full Site", type: "full-site" },
  ];

  const typeItems = typeArray.map((t) => {
    const slug = t.type === "all" ? null : slugify(t.type);

    const href = buildUrl({
      type: slug,
      category: currentCategory,
    });

    return {
      label: t.label,
      href,
      type: slug,
    };
  });

  const typeCounts = {};
  typeCounts.All = await templatesCollection.countDocuments({});
  for (const t of typeItems) {
    if (t.type) {
      typeCounts[t.label] = await templatesCollection.countDocuments({
        type: { $regex: `^${t.type}$`, $options: "i" },
      });
    }
  }

  // -----------------------------------------------------
  // CATEGORY FILTER
  // -----------------------------------------------------
  const nicheArray = await getFieldCount(templatesCollection, "niches");

  const nicheItems = nicheArray.map((n) => {
    const slug = slugify(n.label);

    const href = buildUrl({
      type: currentType,
      category: slug,
    });

    return {
      label: n.label,
      href,
      type: slug,
    };
  });

  const nicheCounts = {};
  nicheArray.forEach((n) => {
    nicheCounts[n.label] = n.count;
  });

  return (
    <aside className="hidden lg:block col-span-5 lg:col-span-1 sticky top-10 h-fit space-y-6 bg-white">
      <SearchTemplate />

      <TechSelectorClient
        headline="Kit Type"
        items={typeItems}
        counts={typeCounts}
      />

      <TechSelectorClient
        headline="Category"
        items={nicheItems}
        counts={nicheCounts}
      />
    </aside>
  );
};

export default TechSelector;
