import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "build")));

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
// APT PROFILE ENDPOINTS
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
});