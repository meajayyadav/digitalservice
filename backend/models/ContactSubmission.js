import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  service_interest: String,
  budget: String,
  message: String,
  timestamp: String
});

export default mongoose.model("ContactSubmission", contactSchema);
