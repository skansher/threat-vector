import fs from "fs";
import Writer from "writer-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

async function generateAPTProfile(url) {
  const prompt = `
Analyze the APT threat intelligence information from this URL: ${url}

Additionally, search the following sources for complementary information:
- MITRE ATT&CK website (attack.mitre.org) for group IDs, TTPs, and techniques
- CVE databases (cve.mitre.org, nvd.nist.gov) for associated vulnerabilities

Create a JSON array with objects that have EXACTLY these fields. Return ONLY valid JSON, no markdown, no explanations:

[
  {
    "alias": "string",
    "Country of Origin": "string",
    "TTPs": "comma-separated MITRE ATT&CK IDs (e.g., T1071.001, T1087, T1059.003)",
    "Last dated attack": "MM/DD/YYYY format",
    "Industries": "comma-separated list of target industries",
    "Mitre Framework ID/GID": "MITRE group ID (e.g., G1045)",
    "CVE": "comma-separated list of CVEs exploited",
    "Campaign": "brief campaign description",
    "Description": "detailed description of the threat actor and their operations",
    "Motive": "comma-separated list of motives",
    "Targeted country": "comma-separated list of countries",
    "First seen": "year first observed",
    "URL": "source URL"
  }
]

IMPORTANT:
- Cross-reference the APT group names with MITRE ATT&CK to find their official Group ID (G####)
- Search for associated CVEs that the group has exploited
- Include all TTPs from MITRE ATT&CK framework
- If the URL contains information about MULTIPLE APT groups, include multiple objects in the array
- If information for a field is not available, use an empty string ""
- The URL field should always be: ${url}

Return ONLY the JSON array, nothing else.`;

  try {
    const response = await client.applications.generateContent(
      "643819ed-6fd4-44be-af44-2417d4d94096",
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
    let profileData;
    try {
      // Remove markdown code blocks if present
      const cleanedSummary = summary
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      
      profileData = JSON.parse(cleanedSummary);
      
      // Ensure it's an array
      if (!Array.isArray(profileData)) {
        profileData = [profileData];
      }
    } catch (parseError) {
      console.warn(`Could not parse JSON for ${url}, using fallback structure`);
      profileData = [{
        "alias": "Parse Error",
        "Country of Origin": "",
        "TTPs": "",
        "Last dated attack": "",
        "Industries": "",
        "Mitre Framework ID/GID": "",
        "CVE": "",
        "Campaign": "",
        "Description": summary,
        "Motive": "",
        "Targeted country": "",
        "First seen": "",
        "URL": url
      }];
    }

    return profileData;
  } catch (error) {
    console.error(`Error generating profile for ${url}:`, error);
    return [{
      "alias": "Error",
      "Country of Origin": "",
      "TTPs": "",
      "Last dated attack": "",
      "Industries": "",
      "Mitre Framework ID/GID": "",
      "CVE": "",
      "Campaign": "",
      "Description": `Error: ${error.message}`,
      "Motive": "",
      "Targeted country": "",
      "First seen": "",
      "URL": url
    }];
  }
}

async function run() {
  try {
    const urls = [
      "https://socradar.io/top-10-advanced-persistent-threat-apt-groups-2024/",
      "https://www.cisa.gov/news-events/cybersecurity-advisories",
      "https://www.socinvestigation.com/comprehensive-list-of-apt-threat-groups-motives-and-attack-methods/",
      "https://www.security.land/advanced-persistent-threats-apt-in-2025-tactics-targets-and-mitigation/",
      "https://thehackernews.com/2025/01/google-over-57-nation-state-threat.html",
      "https://cloud.google.com/security/resources/insights/apt-groups",
      "https://apt.etda.or.th/cgi-bin/aptgroups.cgi"
    ];

    const allProfiles = {};
    let profileCounter = 1;

    for (const url of urls) {
      console.log(`\nProcessing: ${url}`);
      const profiles = await generateAPTProfile(url);
      
      // Add each profile from this URL
      for (const profile of profiles) {
        const profileKey = `Profile ${profileCounter}`;
        allProfiles[profileKey] = [profile];
        profileCounter++;
      }
      
      console.log(`Generated ${profiles.length} profile(s) from this URL`);

      // Add delay between requests
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Ensure the directory exists
    const dir = "src/data";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      "src/data/apt_profiles.json",
      JSON.stringify(allProfiles, null, 2)
    );
    console.log("\n✓ APT profiles saved to src/data/apt_profiles.json");
    console.log(`Total profiles generated: ${profileCounter - 1}`);
  } catch (err) {
    console.error("Error during run:", err);
    process.exit(1);
  }
}

run();