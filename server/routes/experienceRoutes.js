import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

// GET all experiences
router.get("/", async (req, res) => {
  try {
    const data = await Experience.find().sort({ createdAt: -1 });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST create experience
router.post("/", async (req, res) => {
  try {
    const {
      role,
      company,
      type,
      startDate,
      endDate,
      description,
      skills,
      certificateUrl,
    } = req.body;

    if (!role || !company) {
      return res.status(400).json({ message: "Role and Company are required." });
    }

    const newExp = await Experience.create({
      role,
      company,
      type: type?.trim() || "Internship",
      startDate: startDate || "",
      endDate: endDate || "",
      description: description || "",
      skills: skills || [],
      certificateUrl: certificateUrl || "",
    });

    return res.status(201).json({ message: "Experience added ✅", experience: newExp });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT update experience
router.put("/:id", async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Experience not found" });

    return res.json({ message: "Experience updated ✅", experience: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE experience
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Experience not found" });

    return res.json({ message: "Experience deleted ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
