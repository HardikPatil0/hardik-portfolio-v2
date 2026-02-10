import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST: unlock dashboard
router.post("/unlock", (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ message: "Admin key is required" });
    }

    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Invalid admin key" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Dashboard unlocked ✅",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
