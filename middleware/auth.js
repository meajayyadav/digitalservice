import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing or invalid token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await Admin.findOne({ email: decoded.sub });
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
