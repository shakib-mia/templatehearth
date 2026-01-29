import { templateContentsCollection } from "@/app/lib/mongodb";

export async function GET(request) {
  const templates = await templateContentsCollection.find({}).toArray();

  return new Response(JSON.stringify(templates), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // <- CORS header
    },
  });
}
