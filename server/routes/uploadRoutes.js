// routes/uploadRoutes.js

import express from "express";
import { upload } from "../middleware/upload.js";
import imagekit from "../config/imagekit.js";

const router = express.Router();

router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const response = await imagekit.upload({
      file: file.buffer, // ✅ IMPORTANT
      fileName: file.originalname,
      folder: "resumes",
    });

    res.json({
      url: response.url, // ✅ Save this in DB
    });
  } catch (error) {
    console.log("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;