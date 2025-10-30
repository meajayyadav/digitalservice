import express from "express";
import Content from "../models/Content.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/content
router.get("/", async (req, res) => {
  const content = await Content.findOne({ type: "website" });
  if (!content) {
    return res.json({
      type: "website",
      hero: {
        title: "Transform Your Business with",
        titleHighlight: "Digital Excellence",
        description:
          "We deliver cutting-edge digital solutions including web development, mobile apps, graphic design, social media management, and SEO services."
      },
      services: [
        { title: "Web Development", description: "Custom websites built with modern technologies" },
        { title: "Mobile Apps", description: "Native and cross-platform mobile applications" },
        { title: "Graphic Design", description: "Creative designs that capture your brand essence" },
        { title: "Social Media", description: "Complete social media setup and management" },
        { title: "Google SEO", description: "Optimize your online presence and rankings" }
      ]
    });
  }
  res.json(content);
});

// PUT /api/admin/content
router.put("/admin/content", auth, async (req, res) => {
  const { section, data } = req.body;
  try {
    let content = await Content.findOne({ type: "website" });
    if (content) {
      content[section] = data;
      await content.save();
    } else {
      content = new Content({ type: "website", [section]: data });
      await content.save();
    }
    res.json({ message: "Content updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update content" });
  }
});

export default router;
