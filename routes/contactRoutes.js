import express from "express";
import ContactSubmission from "../models/ContactSubmission.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const submission = new ContactSubmission({
      id: uuidv4(),
      ...req.body,
      timestamp: new Date().toISOString()
    });
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit contact form" });
  }
});

export default router;
