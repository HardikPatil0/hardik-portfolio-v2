import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST create project (ALLOW ANY TYPE)
router.post("/", async (req, res) => {
  try {
    const { title, desc, tech, github, live, featured, type } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and Description required" });
    }

    const newProject = await Project.create({
      title,
      desc,
      tech: tech || [],
      github: github || "",
      live: live || "",
      featured: featured || false,
      type: type?.trim() || "General", // ✅ any category allowed
    });

    return res.status(201).json({
      message: "Project created ✅",
      project: newProject,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT update project (ALLOW ANY TYPE)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.type) {
      req.body.type = req.body.type.trim();
    }

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Project not found" });

    return res.json({ message: "Project updated ✅", project: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Project not found" });

    return res.json({ message: "Project deleted ✅" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
