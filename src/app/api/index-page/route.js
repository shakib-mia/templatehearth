import { google } from "googleapis";

export async function POST(req) {
  try {
    const { url } = await req.json();

    const jwt = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_CLIENT_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/indexing"]
    );

    const indexing = google.indexing({
      version: "v3",
      auth: jwt,
    });

    const resp = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: "URL_UPDATED",
      },
    });

    return Response.json({ ok: true, result: resp.data });
  } catch (e) {
    return Response.json({ error: e.message });
  }
}
