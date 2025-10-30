import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Admin from "../models/Admin.js";
import ContactSubmission from "../models/ContactSubmission.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/admin/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({
      id: uuidv4(),
      email,
      name,
      password: hashed,
      created_at: new Date().toISOString()
    });

    await admin.save();

    const token = jwt.sign({ sub: admin.email }, process.env.SECRET_KEY, {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES}m`
    });

    res.json({
      access_token: token,
      token_type: "bearer",
      admin
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create admin" });
  }
});

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign({ sub: admin.email }, process.env.SECRET_KEY, {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES}m`
  });

  res.json({
    access_token: token,
    token_type: "bearer",
    admin
  });
});

// GET /api/admin/me
router.get("/me", auth, (req, res) => {
  res.json(req.admin);
});

// GET /api/admin/contacts
router.get("/contacts", auth, async (req, res) => {
  const submissions = await ContactSubmission.find().sort({ timestamp: -1 });
  res.json(submissions);
});

// DELETE /api/admin/contacts/:id
router.delete("/contacts/:id", auth, async (req, res) => {
  const result = await ContactSubmission.deleteOne({ id: req.params.id });
  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Contact not found" });

  res.json({ message: "Contact deleted successfully" });
});

export default router;
