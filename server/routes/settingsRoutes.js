import express from "express";
import Settings from "../models/SiteSettings.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET settings (always 1 document)
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    return res.json(settings);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT update settings text + links
router.put("/", async (req, res) => {
  try {
    const {
      portfolioName,
      email,
      phone,
      location,
      github,
      linkedin,
      instagram,
      blog,
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});

    settings.portfolioName = portfolioName ?? settings.portfolioName;
    settings.email = email ?? settings.email;
    settings.phone = phone ?? settings.phone;
    settings.location = location ?? settings.location;

    settings.github = github ?? settings.github;
    settings.linkedin = linkedin ?? settings.linkedin;
    settings.instagram = instagram ?? settings.instagram;
    settings.blog = blog ?? settings.blog;

    await settings.save();

    return res.json({ message: "Settings updated ✅", settings });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST upload logo
router.post("/upload-logo", upload.single("logo"), async (req, res) => {
  try {
    const filePath = `/uploads/images/${req.file.filename}`;

    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});

    settings.logo = filePath;
    await settings.save();

    return res.json({ message: "Logo uploaded ✅", settings });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
