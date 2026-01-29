import { templateContentsCollection } from "@/app/lib/mongodb";

export async function GET(request, { params }) {
  const { slug } = await params; // URL theke slug dhora holo

  // MongoDB theke filter kore data
  const template = await templateContentsCollection.findOne({ project: slug });

  if (!template) {
    return new Response(JSON.stringify({ error: "Template not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify(template), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
