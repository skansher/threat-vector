import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import Writer from "writer-sdk";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "build")));

// Initialize Writer SDK client
const writerClient = new Writer({
  apiKey: process.env.WRITER_API_KEY,
});

// Replace with your actual Writer Research Agent ID
const RESEARCH_AGENT_ID = process.env.WRITER_RESEARCH_AGENT_ID || "YOUR_AGENT_ID";

// Helper function to read JSON file
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

// Helper function to write JSON file
async function writeJSONFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Helper function to get next profile number
function getNextProfileNumber(existingProfiles, prefix = "Profile") {
  const keys = Object.keys(existingProfiles);
  if (keys.length === 0) return 1;

  const numbers = keys
    .filter(key => key.startsWith(prefix))
    .map(key => {
      const match = key.match(new RegExp(`${prefix} (\\d+)`));
      return match ? parseInt(match[1]) : 0;
    });

  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

// ============================================
// COUNTRY FILTERING HELPERS
// ============================================

const COUNTRIES = new Set([
  "afghanistan", "albania", "algeria", "andorra", "angola", "argentina", "armenia",
  "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados",
  "belarus", "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia and herzegovina",
  "botswana", "brazil", "brunei", "bulgaria", "burkina faso", "burundi", "cambodia",
  "cameroon", "canada", "central african republic", "chad", "chile", "china", "colombia",
  "congo", "costa rica", "croatia", "cuba", "cyprus", "czech republic", "czechia",
  "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt",
  "el salvador", "equatorial guinea", "eritrea", "estonia", "eswatini", "ethiopia",
  "fiji", "finland", "france", "gabon", "gambia", "georgia", "germany", "ghana",
  "greece", "grenada", "guatemala", "guinea", "guyana", "haiti", "honduras", "hungary",
  "iceland", "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy",
  "jamaica", "japan", "jordan", "kazakhstan", "kenya", "korea", "kosovo", "kuwait",
  "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya",
  "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", "malaysia",
  "maldives", "mali", "malta", "mauritania", "mauritius", "mexico", "micronesia",
  "moldova", "monaco", "mongolia", "montenegro", "morocco", "mozambique", "myanmar",
  "namibia", "nauru", "nepal", "netherlands", "new zealand", "nicaragua", "niger",
  "nigeria", "north korea", "north macedonia", "norway", "oman", "pakistan", "palau",
  "palestine", "panama", "papua new guinea", "paraguay", "peru", "philippines",
  "poland", "portugal", "qatar", "romania", "russia", "russian federation", "rwanda",
  "samoa", "san marino", "saudi arabia", "senegal", "serbia", "seychelles",
  "sierra leone", "singapore", "slovakia", "slovenia", "somalia", "south africa",
  "south korea", "south sudan", "spain", "sri lanka", "sudan", "suriname", "sweden",
  "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "togo",
  "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "uganda", "ukraine",
  "united arab emirates", "uae", "united kingdom", "uk", "united states", "usa", "us",
  "uruguay", "uzbekistan", "vanuatu", "vatican city", "venezuela", "vietnam", "yemen",
  "zambia", "zimbabwe"
]);

function isCountry(text) {
  if (!text || typeof text !== "string") return false;
  return COUNTRIES.has(text.toLowerCase().trim());
}

function filterIndustries(industries) {
  if (!Array.isArray(industries)) return [];
  return industries.filter(industry => !isCountry(industry));
}

// Helper: Convert value to array
function toArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(v => v);
  if (typeof value === 'string') {
    return value.split(',').map(v => v.trim()).filter(v => v);
  }
  return [String(value)];
}

// Normalize profile data
function normalizeProfile(profileData) {
  const profiles = Array.isArray(profileData) ? profileData : [profileData];
  
  return profiles.map(profile => {
    const primaryName = profile.primary_name || profile.alias || 'Unknown';
    
    // Filter industries to remove countries
    const industries = filterIndustries(toArray(profile.Industries || profile.industries));

    return {
      primary_name: primaryName,
      aliases: toArray(profile.aliases),
      "Country of Origin": profile["Country of Origin"] || profile.country_of_origin || null,
      TTPs: toArray(profile.TTPs || profile.ttps),
      "Last dated attack": profile["Last dated attack"] || profile.last_dated_attack || null,
      Industries: industries,
      "Mitre Framework ID/GID": profile["Mitre Framework ID/GID"] || profile.mitre_framework_id || null,
      CVE: toArray(profile.CVE || profile.cve),
      Campaign: profile.Campaign || profile.campaign || null,
      Description: profile.Description || profile.description || null,
      Motive: toArray(profile.Motive || profile.motive),
      "Targeted country": toArray(profile["Targeted country"] || profile.targeted_country),
      "First seen": profile["First seen"] || profile.first_seen || null,
      URL: profile.URL || profile.url || null,
    };
  });
}

// ============================================
// EXISTING APT PROFILE ENDPOINTS
// ============================================

import { generateThreatProfiles, normalizeProfiles } from "./threat_profile.js";

// POST: Generate threat profiles from URLs
app.post("/api/scripts/generate-threat-profiles", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "URLs array required" });
    }

    const result = await generateThreatProfiles(urls);

    res.json({
      success: true,
      message: "Threat profiles generated successfully",
      result,
    });
  } catch (error) {
    console.error("Error in threat profile generation:", error);
    res.status(500).json({ error: "Failed to generate threat profiles" });
  }
});

// POST: Normalize APT profiles
app.post("/api/scripts/normalize-profiles", async (req, res) => {
  try {
    const aptProfilesData = req.body;

    if (!aptProfilesData || Object.keys(aptProfilesData).length === 0) {
      return res.status(400).json({ error: "APT profiles data required" });
    }

    const formattedOutput = normalizeProfiles(aptProfilesData);

    // Save to file
    const filePath = path.join(__dirname, "src", "data", "normalized_profiles.json");
    await writeJSONFile(filePath, formattedOutput);

    console.log("✓ Profiles normalized and saved");

    res.json({
      success: true,
      message: "Profiles normalized successfully",
      data: formattedOutput,
    });
  } catch (error) {
    console.error("Error normalizing profiles:", error);
    res.status(500).json({ error: "Failed to normalize profiles" });
  }
});

// GET: Retrieve normalized profiles
app.get("/api/scripts/normalized-profiles", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "src", "data", "normalized_profiles.json");
    const profiles = await readJSONFile(filePath);
    res.json(profiles);
  } catch (error) {
    console.error("Error reading normalized profiles:", error);
    res.status(500).json({ error: "Failed to read normalized profiles" });
  }
});

// ============================================
// NEW AI CHAT ENDPOINTS
// ============================================

// POST: Chat with Writer Research Agent
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('📤 Sending to Writer AI:', message);

    const response = await writerClient.applications.generateContent(
      RESEARCH_AGENT_ID,
      {
        inputs: [{ id: "query", value: [message] }],
        stream: false,
      }
    );

    let aiResponse = '';
    if (response.suggestion) {
      aiResponse = response.suggestion;
    } else if (response.output) {
      aiResponse = response.output;
    } else if (response.content) {
      aiResponse = response.content;
    } else if (typeof response === 'string') {
      aiResponse = response;
    } else {
      aiResponse = JSON.stringify(response);
    }

    console.log('📥 Writer AI response received');

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('❌ Error calling Writer AI:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response', 
      details: error.message 
    });
  }
});

// POST: Save profile from AI chat to dashboard
app.post('/api/save-profile', async (req, res) => {
  try {
    const profileData = req.body;
    
    if (!profileData) {
      return res.status(400).json({ error: 'No profile data provided' });
    }

    console.log('💾 Saving profile from AI chat:', profileData.primary_name || 'Unknown');

    // Path to normalized_profiles.json
    const filePath = path.join(__dirname, 'src', 'data', 'normalized_profiles.json');
    
    // Read existing profiles
    let existingProfiles = await readJSONFile(filePath);

    // Normalize the incoming profile
    const normalizedProfiles = normalizeProfile(profileData);
    
    // Add each normalized profile to the existing profiles
    for (const profile of normalizedProfiles) {
      const profileName = profile.primary_name;
      
      // Check if profile already exists
      if (existingProfiles[profileName]) {
        console.log(`ℹ️  Profile ${profileName} exists, merging...`);
        // Merge with existing profile
        const existing = existingProfiles[profileName][0];
        
        // Merge arrays and deduplicate
        Object.keys(profile).forEach(key => {
          if (Array.isArray(profile[key]) && Array.isArray(existing[key])) {
            existing[key] = [...new Set([...existing[key], ...profile[key]])];
          } else if (profile[key] && !existing[key]) {
            existing[key] = profile[key];
          }
        });
        
        existingProfiles[profileName] = [existing];
      } else {
        console.log(`✨ Adding new profile: ${profileName}`);
        // Add as new profile
        existingProfiles[profileName] = [profile];
      }
    }

    // Write back to file
    await writeJSONFile(filePath, existingProfiles);
    
    console.log('✅ Profile saved successfully');
    
    res.json({ 
      success: true, 
      message: 'Profile saved successfully',
      profileCount: normalizedProfiles.length 
    });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    res.status(500).json({ 
      error: 'Failed to save profile', 
      details: error.message 
    });
  }
});

// ============================================
// SERVE REACT APP
// ============================================

// All other routes serve the React app (must be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API endpoints available at http://localhost:${PORT}/api`);
  console.log(`✓ AI Chat enabled with Writer Research Agent`);
});