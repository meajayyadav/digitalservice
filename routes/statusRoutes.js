import express from "express";
import StatusCheck from "../models/StatusCheck.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// POST /api/status
router.post("/", async (req, res) => {
  try {
    const status = new StatusCheck({
      id: uuidv4(),
      client_name: req.body.client_name,
      timestamp: new Date().toISOString()
    });
    await status.save();
    res.json(status);
  } catch (err) {
    res.status(500).json({ message: "Failed to create status check" });
  }
});

// GET /api/status
router.get("/", async (req, res) => {
  const statuses = await StatusCheck.find().sort({ timestamp: -1 });
  res.json(statuses);
});

export default router;
