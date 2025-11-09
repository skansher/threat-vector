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

// POST: Create new APT profile
app.post("/api/apt-profiles", async (req, res) => {
  try {
    const newProfile = req.body;
    const filePath = path.join(__dirname, "src", "data", "apt_profiles.json");

    // Read existing profiles
    const profiles = await readJSONFile(filePath);

    // Generate new profile key
    const nextNumber = getNextProfileNumber(profiles);
    const profileKey = `Profile ${nextNumber}`;

    // Add new profile (wrapped in array to match existing format)
    profiles[profileKey] = [newProfile];

    // Write back to file
    await writeJSONFile(filePath, profiles);

    console.log(`✓ Created APT profile: ${profileKey}`);
    res.status(201).json({
      message: "APT Profile created successfully",
      profileKey: profileKey,
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error saving APT profile:", error);
    res.status(500).json({ error: "Failed to save APT profile" });
  }
});

// GET: Retrieve all APT profiles
app.get("/api/apt-profiles", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "src", "data", "apt_profiles.json");
    const profiles = await readJSONFile(filePath);
    res.json(profiles);
  } catch (error) {
    console.error("Error reading APT profiles:", error);
    res.status(500).json({ error: "Failed to read APT profiles" });
  }
});

// GET: Retrieve single APT profile by key
app.get("/api/apt-profiles/:profileKey", async (req, res) => {
  try {
    const { profileKey } = req.params;
    const filePath = path.join(__dirname, "src", "data", "apt_profiles.json");
    const profiles = await readJSONFile(filePath);

    if (!profiles[profileKey]) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ [profileKey]: profiles[profileKey] });
  } catch (error) {
    console.error("Error reading APT profile:", error);
    res.status(500).json({ error: "Failed to read APT profile" });
  }
});

// DELETE: Remove APT profile
app.delete("/api/apt-profiles/:profileKey", async (req, res) => {
  try {
    const { profileKey } = req.params;
    const filePath = path.join(__dirname, "src", "data", "apt_profiles.json");
    const profiles = await readJSONFile(filePath);

    if (!profiles[profileKey]) {
      return res.status(404).json({ error: "Profile not found" });
    }

    delete profiles[profileKey];
    await writeJSONFile(filePath, profiles);

    console.log(`✓ Deleted APT profile: ${profileKey}`);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting APT profile:", error);
    res.status(500).json({ error: "Failed to delete APT profile" });
  }
});

// ============================================
// INFILTRATOR PROFILE ENDPOINTS
// ============================================

// POST: Create new Infiltrator profile
app.post("/api/infiltrator-profiles", async (req, res) => {
  try {
    const newInfiltrator = req.body;
    const filePath = path.join(__dirname, "src", "data", "infiltrator_profiles.json");

    // Read existing profiles
    const profiles = await readJSONFile(filePath);

    // Generate new profile key
    const nextNumber = getNextProfileNumber(profiles, "Infiltrator");
    const profileKey = `Infiltrator ${nextNumber}`;

    // Add new profile (wrapped in array to match format)
    profiles[profileKey] = [newInfiltrator];

    // Write back to file
    await writeJSONFile(filePath, profiles);

    console.log(`✓ Created Infiltrator profile: ${profileKey}`);
    res.status(201).json({
      message: "Infiltrator Profile created successfully",
      profileKey: profileKey,
      profile: newInfiltrator,
    });
  } catch (error) {
    console.error("Error saving Infiltrator profile:", error);
    res.status(500).json({ error: "Failed to save Infiltrator profile" });
  }
});

// GET: Retrieve all Infiltrator profiles
app.get("/api/infiltrator-profiles", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "src", "data", "infiltrator_profiles.json");
    const profiles = await readJSONFile(filePath);
    res.json(profiles);
  } catch (error) {
    console.error("Error reading Infiltrator profiles:", error);
    res.status(500).json({ error: "Failed to read Infiltrator profiles" });
  }
});

// GET: Retrieve single Infiltrator profile by key
app.get("/api/infiltrator-profiles/:profileKey", async (req, res) => {
  try {
    const { profileKey } = req.params;
    const filePath = path.join(__dirname, "src", "data", "infiltrator_profiles.json");
    const profiles = await readJSONFile(filePath);

    if (!profiles[profileKey]) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ [profileKey]: profiles[profileKey] });
  } catch (error) {
    console.error("Error reading Infiltrator profile:", error);
    res.status(500).json({ error: "Failed to read Infiltrator profile" });
  }
});

// DELETE: Remove Infiltrator profile
app.delete("/api/infiltrator-profiles/:profileKey", async (req, res) => {
  try {
    const { profileKey } = req.params;
    const filePath = path.join(__dirname, "src", "data", "infiltrator_profiles.json");
    const profiles = await readJSONFile(filePath);

    if (!profiles[profileKey]) {
      return res.status(404).json({ error: "Profile not found" });
    }

    delete profiles[profileKey];
    await writeJSONFile(filePath, profiles);

    console.log(`✓ Deleted Infiltrator profile: ${profileKey}`);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting Infiltrator profile:", error);
    res.status(500).json({ error: "Failed to delete Infiltrator profile" });
  }
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API endpoints available at http://localhost:${PORT}/api`);
});