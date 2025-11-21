import { generateThreatProfiles, normalizeProfiles } from "./threat_profile.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const command = process.argv[2];

  if (command === "generate") {
    console.log("🚀 Generating threat profiles...\n");
    
    const urls = [
      "https://socradar.io/top-10-advanced-persistent-threat-apt-groups-2024/",
      "https://www.cisa.gov/news-events/cybersecurity-advisories",
      "https://www.socinvestigation.com/comprehensive-list-of-apt-threat-groups-motives-and-attack-methods/",
      "https://www.security.land/advanced-persistent-threats-apt-in-2025-tactics-targets-and-mitigation/",
      "https://thehackernews.com/2025/01/google-over-57-nation-state-threat.html",
      "https://cloud.google.com/security/resources/insights/apt-groups",
      "https://apt.etda.or.th/cgi-bin/aptgroups.cgi",
      "https://www.kelacyber.com/blog/espionage-exposed-inside-a-north-korean-remote-worker-network/",
      "https://www.huntress.com/blog/advanced-persistent-threat-targeting-vietnamese-human-rights-defenders",
      "https://unit42.paloaltonetworks.com/threat-assessment-north-korean-threat-groups-2024/"
    ];

    try {
      const result = await generateThreatProfiles(urls);
      console.log(`\n✅ Generated ${result.profileCount} profiles`);
      console.log("Saved to: src/data/apt_profiles.json");
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    }

  } else if (command === "normalize") {
    console.log("🚀 Normalizing profiles...\n");
    
    try {
      const filePath = "src/data/apt_profiles.json";
      if (!fs.existsSync(filePath)) {
        console.error("❌ apt_profiles.json not found. Run 'node run-scripts.js generate' first");
        process.exit(1);
      }

      const aptProfilesData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const normalized = normalizeProfiles(aptProfilesData);
      
      fs.writeFileSync("src/data/normalized_profiles.json", JSON.stringify(normalized, null, 2));
      
      console.log(`✅ Normalized ${Object.keys(normalized).length} profiles`);
      console.log("Saved to: src/data/normalized_profiles.json");
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    }

  } else {
    console.log("Usage:");
    console.log("  node run-scripts.js generate   - Generate threat profiles from URLs");
    console.log("  node run-scripts.js normalize  - Normalize existing apt_profiles.json");
  }
}

run();