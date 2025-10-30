import fs from "fs";
import Writer from "writer-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

async function generateNewsAlerts(url) {
  const prompt = `
Analyze the APT threat intelligence information from this URL: ${url}

Create a JSON array with objects that have EXACTLY these fields. Return ONLY valid JSON, no markdown, no explanations:

[
  {
    "Article Name": "string",
    "Published Date": "string",
    "News Channel": "string",
    "Summary": "string",
    "URL": "source URL"
  }
]

IMPORTANT:
- Summary should be the key points of the article in concise form. It would be helpful to include any relevant statistics, findings, or notable quotes from the article.
- The URL field should always be: ${url}

Return ONLY the JSON array, nothing else.`;

  try {
    const response = await client.applications.generateContent(
      "9564a100-dabd-4f8e-b3bc-94ac2c696ca4",
      {
        inputs: [{ id: "query", value: [prompt] }],
        stream: false,
      }
    );

    console.log("Writer raw response:", JSON.stringify(response, null, 2));

    let summary = "";
    if (response.suggestion) {
      summary = response.suggestion;
    } else if (response.output) {
      summary = response.output;
    } else if (response.content) {
      summary = response.content;
    } else if (typeof response === "string") {
      summary = response;
    } else {
      summary = JSON.stringify(response);
    }

    // Try to extract JSON from the response
    let articleData;
    try {
      // Remove markdown code blocks if present
      const cleanedSummary = summary
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      
      articleData = JSON.parse(cleanedSummary);
      
      // Ensure it's an array
      if (!Array.isArray(articleData)) {
        articleData = [articleData];
      }
    } catch (parseError) {
      console.warn(`Could not parse JSON for ${url}, using fallback structure`);
      articleData = [{
        "Article Name": "Parse Error",
        "Published Date": " ",
        "News Channel": " ",
        "Summary": " ",
        "URL": " "
      }];
    }

    return articleData;
  } catch (error) {
    console.error(`Error generating article for ${url}:`, error);
    return [{
      "Article Name": "Error",
      "Published Date": " ",
      "News Channel": " ",
      "Summary": " ",
      "URL": " "
    }];
  }
}

async function run() {
  try {
    const urls = [
      "https://www.reuters.com/business/media-telecom/us-company-with-access-biggest-telecom-firms-uncovers-breach-by-nation-state-2025-10-29/",
      "https://www.cbsnews.com/news/f5-source-code-cybersecurity-infrastructure-security-agency-emergency-order/",
      "https://thehackernews.com/2025/01/google-over-57-nation-state-threat.html",
      "https://abcnews.go.com/Technology/wireStory/microsoft-russia-china-increasingly-ai-escalate-cyberattacks-us-126581796",
      "https://thehackernews.com/2025/10/apt36-targets-indian-government-with.html",
      "https://www.nbcnews.com/tech/security/microsoft-sharepoint-vulnerability-targeted-chinese-hackers-rcna220270",
      "https://www.npr.org/2025/10/20/nx-s1-5580312/aws-outage"
    ];

    const allArticles = {};
    let articleCounter = 1;

    for (const url of urls) {
      console.log(`\nProcessing: ${url}`);
      const articles = await generateNewsAlerts(url);
      
      // Add each article from this URL
      for (const article of articles) {
        const articleKey = `article ${articleCounter}`;
        allArticles[articleKey] = [article];
        articleCounter++;
      }
      
      console.log(`Generated ${articles.length} article(s) from this URL`);

      // Add delay between requests
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Ensure the directory exists
    const dir = "src/data";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      "src/data/news.json",
      JSON.stringify(allArticles, null, 2)
    );
    console.log("\n✓ News articles saved to src/data/news.json");
    console.log(`Total articles generated: ${articleCounter - 1}`);
  } catch (err) {
    console.error("Error during run:", err);
    process.exit(1);
  }
}

run();