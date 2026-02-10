import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import sendMail from "../utils/sendMail.js";

const router = express.Router();

/**
 * ✅ POST: Save message + send email
 * URL: POST /api/contact
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Save in MongoDB
    const newMessage = await ContactMessage.create({
      name,
      email,
      message,
      isRead: false,
    });

    // ✅ Send email notification
    await sendMail({
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p style="white-space:pre-line;">${message}</p>
      `,
    });

    return res.status(201).json({
      message: "Message sent successfully ✅",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ❌",
      error: error.message,
    });
  }
});

/**
 * ✅ GET: Fetch all messages (Admin)
 * URL: GET /api/contact
 */
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
});

/**
 * ✅ PATCH: Mark as read/unread
 * URL: PATCH /api/contact/:id/read
 */
router.patch("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: Boolean(isRead) },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.json({ message: "Message updated ✅", data: updated });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update message",
      error: error.message,
    });
  }
});

/**
 * ✅ DELETE: Delete message
 * URL: DELETE /api/contact/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.json({ message: "Message deleted ✅" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete message",
      error: error.message,
    });
  }
});

export default router;
