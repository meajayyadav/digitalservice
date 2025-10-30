import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: { type: String, default: "website" },
  hero: Object,
  services: Array
});

export default mongoose.model("Content", contentSchema);
