import fs from "fs";
import Writer from "writer-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

// Helper function to split comma-separated strings into lists
function splitToList(value) {
  if (!value || typeof value !== "string") {
    return [];
  }
  return value.split(",").map(item => item.trim()).filter(item => item);
}

// List of countries to filter out from industries
const COUNTRIES = new Set([
  "afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda",
  "argentina", "armenia", "australia", "austria", "azerbaijan", "bahamas", "bahrain",
  "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan",
  "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria",
  "burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada",
  "central african republic", "chad", "chile", "china", "colombia", "comoros",
  "congo", "costa rica", "croatia", "cuba", "cyprus", "czech republic", "czechia",
  "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt",
  "el salvador", "equatorial guinea", "eritrea", "estonia", "eswatini", "ethiopia",
  "fiji", "finland", "france", "gabon", "gambia", "georgia", "germany", "ghana",
  "greece", "grenada", "guatemala", "guinea", "guinea-bissau", "guyana", "haiti",
  "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland",
  "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati",
  "korea", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho",
  "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar",
  "malawi", "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania",
  "mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro",
  "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands",
  "new zealand", "nicaragua", "niger", "nigeria", "north korea", "north macedonia",
  "norway", "oman", "pakistan", "palau", "palestine", "panama", "papua new guinea",
  "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania",
  "russia", "russian federation", "rwanda", "saint kitts and nevis", "saint lucia",
  "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe",
  "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore",
  "slovakia", "slovenia", "solomon islands", "somalia", "south africa", "south korea",
  "south sudan", "spain", "sri lanka", "sudan", "suriname", "sweden", "switzerland",
  "syria", "taiwan", "tajikistan", "tanzania", "thailand", "timor-leste", "togo",
  "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "tuvalu",
  "uganda", "ukraine", "united arab emirates", "uae", "united kingdom", "uk",
  "united states", "usa", "us", "uruguay", "uzbekistan", "vanuatu", "vatican city",
  "venezuela", "vietnam", "yemen", "zambia", "zimbabwe",
  // Common multi-word variations
  "south east asia", "southeast asia", "middle east", "central asia", "eastern europe",
  "western europe", "north america", "south america", "latin america", "central america"
]);

// Helper function to check if a string is a country name
function isCountry(text) {
  if (!text || typeof text !== "string") return false;
  const normalized = text.toLowerCase().trim();
  return COUNTRIES.has(normalized);
}

// Helper function to filter out countries from industries
function filterIndustries(industries) {
  if (!Array.isArray(industries)) return [];
  return industries.filter(industry => !isCountry(industry));
}

// Helper function to combine URLs
function combineURLs(url1, url2) {
  if (!url1 && !url2) return null;
  if (!url1) return url2;
  if (!url2) return url1;
  if (url1 === url2) return url1;
  
  // Return array of unique URLs
  const urls = [url1, url2].filter(Boolean);
  return [...new Set(urls)];
}

// ============================================
// THREAT PROFILE GENERATION
// ============================================

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

    let profileData;
    try {
      const cleanedSummary = summary
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      
      profileData = JSON.parse(cleanedSummary);
      
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

export async function generateThreatProfiles(urls) {
  try {
    const dir = "src/data";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = "src/data/apt_profiles.json";
    
    let allProfiles = {};
    let profileCounter = 1;
    
    if (fs.existsSync(filePath)) {
      try {
        const existingData = fs.readFileSync(filePath, "utf8");
        allProfiles = JSON.parse(existingData);
        
        const existingKeys = Object.keys(allProfiles);
        if (existingKeys.length > 0) {
          const numbers = existingKeys.map(key => {
            const match = key.match(/Profile (\d+)/);
            return match ? parseInt(match[1]) : 0;
          });
          profileCounter = Math.max(...numbers) + 1;
        }
      } catch (parseError) {
        console.warn("Could not parse existing file, starting fresh");
      }
    }

    for (const url of urls) {
      console.log(`Processing: ${url}`);
      const profiles = await generateAPTProfile(url);
      
      for (const profile of profiles) {
        const profileKey = `Profile ${profileCounter}`;
        allProfiles[profileKey] = [profile];
        profileCounter++;
      }
      
      console.log(`Generated ${profiles.length} profile(s)`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    fs.writeFileSync(filePath, JSON.stringify(allProfiles, null, 2));
    console.log("✓ APT profiles saved");
    
    return { success: true, profileCount: Object.keys(allProfiles).length };
  } catch (error) {
    console.error("Error generating threat profiles:", error);
    throw error;
  }
}

// ============================================
// PROFILE NORMALIZATION
// ============================================

export function normalizeProfiles(aptProfilesData) {
  try {
    // Step 1: Normalize profiles and prepare for merging
    const normalizedProfiles = [];
    for (const profileGroup of Object.values(aptProfilesData)) {
      for (const profile of profileGroup) {
        const aliases = splitToList(profile.alias || "");
        const primaryName = aliases[0] || null;
        const otherAliases = aliases.length > 1 ? aliases.slice(1) : [];

        // Filter out countries from industries
        const industries = splitToList(profile.Industries || "");
        const filteredIndustries = filterIndustries(industries);

        const normalizedProfile = {
          primary_name: primaryName,
          aliases: otherAliases,
          "Country of Origin": profile["Country of Origin"] || null,
          TTPs: splitToList(profile.TTPs || ""),
          "Last dated attack": profile["Last dated attack"] || null,
          Industries: filteredIndustries,
          "Mitre Framework ID/GID": profile["Mitre Framework ID/GID"] || null,
          CVE: splitToList(profile.CVE || ""),
          Campaign: profile.Campaign || null,
          Description: profile.Description || null,
          Motive: splitToList(profile.Motive || ""),
          "Targeted country": splitToList(profile["Targeted country"] || ""),
          "First seen": profile["First seen"] || null,
          URL: profile.URL || null,
        };

        normalizedProfiles.push(normalizedProfile);
      }
    }

    // Step 2: Merge profiles that share at least one alias or primary name
    const mergedProfiles = {};

    for (const profile of normalizedProfiles) {
      const allNames = [profile.primary_name, ...profile.aliases].filter(
        name => name
      );

      let mergeKey = null;
      for (const name of allNames) {
        if (mergedProfiles[name]) {
          mergeKey = name;
          break;
        }
      }

      if (mergeKey) {
        const existing = mergedProfiles[mergeKey];
        for (const [key, value] of Object.entries(profile)) {
          if (key === "URL") {
            // Combine URLs
            existing[key] = combineURLs(existing[key], value);
          } else if (Array.isArray(value)) {
            // Merge and deduplicate arrays
            existing[key] = [...new Set([...(existing[key] || []), ...value])];
          } else if (value && value !== existing[key]) {
            // Use non-null value
            existing[key] = value;
          }
        }
        // Map all names to the same merged profile
        for (const name of allNames) {
          mergedProfiles[name] = existing;
        }
      } else {
        mergedProfiles[profile.primary_name] = profile;
      }
    }

    // Step 3: Deduplicate final profiles
    const finalProfiles = [];
    const seen = new Set();
    for (const profile of Object.values(mergedProfiles)) {
      const pid = profile.primary_name;
      if (!seen.has(pid)) {
        finalProfiles.push(profile);
        seen.add(pid);
      }
    }

    // Step 4: Reformat output to match apt_profiles structure
    const formattedOutput = {};
    finalProfiles.forEach((profile, index) => {
      const profileName = profile.primary_name || `Profile ${index + 1}`;
      formattedOutput[profileName] = [profile];
    });

    return formattedOutput;
  } catch (error) {
    console.error("Error normalizing profiles:", error);
    throw error;
  }
}