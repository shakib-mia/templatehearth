import fs from "fs";
import xml2js from "xml2js";
import { google } from "googleapis";

async function indexFromSitemap() {
  try {
    // Load service account credentials
    const key = JSON.parse(fs.readFileSync("./service-account.json", "utf8"));

    const SCOPES = ["https://www.googleapis.com/auth/indexing"];
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES
    );

    console.log("Google Auth Initialized!");

    // 1️⃣ Fetch sitemap
    const res = await fetch("https://templatehearth.vercel.app/sitemap.xml");
    const xmlText = await res.text();

    // 2️⃣ Parse XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlText);

    // 3️⃣ Extract URLs
    const urls = result.urlset.url.map((u) => u.loc[0]);
    console.log(`Total URLs found: ${urls.length}`);

    // 4️⃣ Google Indexing API client
    const indexing = google.indexing({ version: "v3", auth: jwtClient });

    // 5️⃣ Loop through URLs & index
    for (const url of urls) {
      try {
        const resp = await indexing.urlNotifications.publish({
          requestBody: {
            url,
            type: "URL_UPDATED",
          },
        });

        console.log("Indexed:", url);
        console.log(resp.data);

        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error("Error indexing:", url);
        console.error(err.response?.data || err.message);
      }
    }
  } catch (err) {
    console.error("MAIN ERROR:", err);
  }
}

indexFromSitemap();
