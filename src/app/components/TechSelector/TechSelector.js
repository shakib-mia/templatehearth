import { templatesCollection } from "@/app/lib/mongodb";
import TechSelectorClient from "../TechSelectorClient/TechSelectorClient";
import { getFieldCount } from "@/app/lib/getFieldCount";
import Input from "../Input/Input";
import SearchTemplate from "../SearchTemplate/SearchTemplate";

// simple slugify function
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

const TechSelector = async ({ searchParams }) => {
  const search = (await searchParams) || {};
  const currentType = search.type || null;

  console.log({ search });

  // 1️⃣ Type filter
  const typeArray = [
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

  // Type filter dynamic generate
  const typeItems = typeArray.map((n) => {
    const typeSlug = n.type ? slugify(n.type) : null;
    let href = n.type ? `/templates?type=${typeSlug}` : "/templates";

    // current category preserve
    if (search.categories) {
      href += n.type
        ? `&categories=${search?.categories}`
        : `?categories=${search?.categories}`;
    }

    return {
      label: n.label,
      href,
      type: typeSlug,
    };
  });

  // Count for type filter
  const typeCounts = {};
  typeCounts.all = await templatesCollection.countDocuments({}); // total templates
  for (const item of typeItems) {
    if (item.type) {
      typeCounts[item.label] = await templatesCollection.countDocuments({
        type: { $regex: `^${item.type}$`, $options: "i" }, // case-insensitive
      });
    }
  }

  // 2️⃣ Niche filter
  const nicheArray = await getFieldCount(templatesCollection, "niches");

  // Convert niches to same structure as typeItems and include current type
  const nicheItems = nicheArray.map((n) => {
    const slug = slugify(n.label);
    let href = `/templates?categories=${slug}`;
    if (currentType) {
      href += `&type=${currentType}`;
    }
    return {
      label: n.label,
      href,
      type: slug,
    };
  });

  // Count for niche filter
  const nicheCounts = {};
  nicheArray.forEach((n) => {
    nicheCounts[n.label] = n.count;
  });

  return (
    <aside className="col-span-5 lg:col-span-1 sticky top-0 left-0 h-fit bg-white space-y-6">
      <SearchTemplate />

      {/* Type filter */}
      <TechSelectorClient
        headline={"Kit Type"}
        items={typeItems}
        counts={typeCounts}
      />

      {/* Niche filter */}
      <TechSelectorClient
        headline={"Category"}
        items={nicheItems}
        counts={nicheCounts}
      />
    </aside>
  );
};

export default TechSelector;
