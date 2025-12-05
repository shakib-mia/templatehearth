import PageHeader from "@/app/components/PageHeader/PageHeader";
import RestTemplates from "@/app/components/RestTemplates/RestTemplates";
import TemplateDetails from "@/app/components/TemplateDetails/TemplateDetails";
import { templatesCollection } from "@/app/lib/mongodb";
import { notFound } from "next/navigation";

// -------------------------
// 1) PRE-GENERATE ALL SLUGS
// -------------------------
export async function generateStaticParams() {
  try {
    const templates = await templatesCollection.find().toArray();

    return templates.map((t) => ({
      slug: t.slug,
    }));
  } catch (e) {
    return [];
  }
}

export const revalidate = 3600; // seconds, ei page 1 hr por update hote pare

// -------------------------
// 2) SEO METADATA
// -------------------------
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const template = await templatesCollection.findOne({ slug });

    if (!template) {
      return {
        title: "Template Not Found",
        description: "This template does not exist in our collection.",
      };
    }

    return {
      title: `${template.headline}`,
      description: template.shortDescription,
      keywords: template.relatedKeywords || [], // <-- ekhane keywords add korlam
      openGraph: {
        title: template.headline + " | Template Hearth",
        description: template.shortDescription,
        url: `${process.env.DOMAIN_NAME}templates/${slug}`,
        type: "article",
        images: [
          {
            url: template.image,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: template.headline,
        description: template.shortDescription,
        images: [template.image],
      },
      alternates: {
        canonical: `${process.env.DOMAIN_NAME}templates/${slug}`,
      },
    };
  } catch (e) {
    return {
      title: "Template Not Found",
    };
  }
}

// -------------------------
// 3) MAIN PAGE COMPONENT
// -------------------------
export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const template = await templatesCollection.findOne({ slug });

    if (!template) {
      return notFound();
    }

    return (
      <>
        <PageHeader
          title={template.headline}
          description={template.shortDescription}
        />

        <section className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-8/12">
              <TemplateDetails data={template} />
            </aside>

            <aside className="w-full xl:w-4/12 sticky top-10 h-fit">
              <h2 className="font-semibold mb-4">More templates</h2>
              <RestTemplates slug={template.slug} />
            </aside>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.log("Template fetch failed:", error);
    throw error;
  }
}
