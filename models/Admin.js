import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: String, required: true }
});

export default mongoose.model("Admin", adminSchema);
