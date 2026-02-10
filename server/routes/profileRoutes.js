import express from "express";
import Profile from "../models/Profile.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/**
 * GET: Profile (always returns 1 document)
 */
router.get("/", async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({
        name: "Hardik Patil",
        title: "MERN Stack Developer",
        intro:
          "I build modern, responsive, and scalable web applications using React, Tailwind, Node.js, MongoDB and Sanity CMS.",
        skills: ["React", "Tailwind", "Node.js", "MongoDB", "Redux", "Sanity"],

        // Home extra controls
        showBadge: true,
        badgeText: "Available for Freelance Projects",

        links: {
          github: "https://github.com/",
          linkedin: "",
        },

        stats: {
          projects: "10+",
          internships: "2",
          openSource: "Active",
        },

        services: [
          {
            title: "Frontend Development",
            desc: "Modern UI with React + Tailwind, responsive and pixel-perfect.",
          },
          {
            title: "Backend + APIs",
            desc: "Secure REST APIs, authentication, MongoDB models, clean architecture.",
          },
          {
            title: "CMS + Client Updates",
            desc: "Sanity CMS integration so clients can update content easily.",
          },
        ],
      });
    }

    return res.json(profile);
  } catch (error) {
    console.log("PROFILE GET ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * PUT: Update profile (text + skills + home controls)
 */
router.put("/", async (req, res) => {
  try {
    const {
      name,
      title,
      intro,
      skills,

      showBadge,
      badgeText,

      stats,
      links,

      services,
    } = req.body;

    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});

    // Basic fields
    profile.name = name ?? profile.name;
    profile.title = title ?? profile.title;
    profile.intro = intro ?? profile.intro;
    profile.skills = skills ?? profile.skills;

    // Home controls
    profile.showBadge = showBadge ?? profile.showBadge;
    profile.badgeText = badgeText ?? profile.badgeText;

    // Stats object
    if (stats) {
      profile.stats = {
        projects: stats.projects ?? profile.stats?.projects ?? "10+",
        internships: stats.internships ?? profile.stats?.internships ?? "2",
        openSource: stats.openSource ?? profile.stats?.openSource ?? "Active",
      };
    }

    // Links object
    if (links) {
      profile.links = {
        github: links.github ?? profile.links?.github ?? "https://github.com/",
        linkedin: links.linkedin ?? profile.links?.linkedin ?? "",
      };
    }

    // Services array
    if (services) {
      profile.services = services;
    }

    await profile.save();

    return res.json({ message: "Profile updated ✅", profile });
  } catch (error) {
    console.log("PROFILE PUT ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * POST: Upload profile image
 */
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const filePath = `/uploads/images/${req.file.filename}`;

    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});

    profile.profileImage = filePath;
    await profile.save();

    return res.json({ message: "Image uploaded ✅", profile });
  } catch (error) {
    console.log("IMAGE UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

/**
 * POST: Upload resume pdf
 */
router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const filePath = `/uploads/resume/${req.file.filename}`;

    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});

    profile.resumePdf = filePath;
    await profile.save();

    return res.json({ message: "Resume uploaded ✅", profile });
  } catch (error) {
    console.log("RESUME UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
