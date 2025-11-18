import xml2js from "xml2js";

async function indexFromSitemap() {
  try {
    // 1️⃣ Fetch sitemap
    const res = await fetch("https://templatehearth.vercel.app/sitemap.xml");
    const xmlText = await res.text();

    // 2️⃣ Parse XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlText);

    // 3️⃣ Extract URLs
    const urls = result.urlset.url.map((u) => u.loc[0]);
    console.log(`Total URLs found: ${urls.length}`);

    // 4️⃣ Loop through URLs & send indexing request
    for (const url of urls) {
      try {
        const res = await fetch(
          "https://templatehearth.vercel.app/api/indexPage",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          }
        );

        let data;
        try {
          data = await res.json(); // Safely parse JSON
          console.log({ data });
        } catch {
          data = { error: "No JSON returned from API" };
        }

        console.log(url, data);

        // Optional: short delay to avoid hitting rate limits
        await new Promise((r) => setTimeout(r, 500)); // 0.5 sec
      } catch (err) {
        console.error(`Error indexing URL: ${url}`, err);
      }
    }
  } catch (err) {
    console.error("Error fetching/parsing sitemap:", err);
  }
}

// Run the function
indexFromSitemap();
