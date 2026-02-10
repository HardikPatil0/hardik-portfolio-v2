import express from "express";
import Achievement from "../models/Achievement.js";

const router = express.Router();

const allowedCategories = [
  "Certification",
  "Internship",
  "Award",
  "Hackathon",
  "Open Source",
];

// GET all achievements
router.get("/", async (req, res) => {
  try {
    const data = await Achievement.find().sort({ featured: -1, createdAt: -1 });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST create achievement
router.post("/", async (req, res) => {
  try {
    const { title, issuer, category, date, imageUrl, proofUrl, featured } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid achievement category" });
    }

    const newItem = await Achievement.create({
      title,
      issuer: issuer || "",
      category: category || "Certification",
      date: date || "",
      imageUrl: imageUrl || "",
      proofUrl: proofUrl || "",
      featured: featured || false,
    });

    return res.status(201).json({ message: "Achievement added ✅", achievement: newItem });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT update achievement
router.put("/:id", async (req, res) => {
  try {
    const { category } = req.body;

    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid achievement category" });
    }

    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Achievement not found" });

    return res.json({ message: "Achievement updated ✅", achievement: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE achievement
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Achievement not found" });

    return res.json({ message: "Achievement deleted ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
