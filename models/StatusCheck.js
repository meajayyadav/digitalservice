import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  id: String,
  client_name: String,
  timestamp: String
});

export default mongoose.model("StatusCheck", statusSchema);
