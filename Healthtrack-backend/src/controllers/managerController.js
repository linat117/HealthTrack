import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Manager creates an expert
export const createExpert = async (req, res) => {
  try {
    const { name, email, tempPassword } = req.body;

    if (!name || !email || !tempPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const expert = new User({
      name,
      email,
      role: "expert",
      password: hashedPassword,
      mustChangePassword: true,
      createdBy: req.user.id, // manager ID
    });

    await expert.save();

    res.status(201).json({ expert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Manager views all experts they created
export const getExperts = async (req, res) => {
  try {
    const experts = await User.find({
      role: "expert",
      createdBy: req.user.id,
    }).select("-password");
    res.json({ experts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manager can delete an expert they created
export const deleteExpert = async (req, res) => {
  try {
    const { expertId } = req.params;
    const expert = await User.findOne({
      _id: expertId,
      createdBy: req.user.id,
    });
    if (!expert) return res.status(404).json({ message: "Expert not found" });

    await User.deleteOne({ _id: expertId, createdBy: req.user.id });
    res.json({ message: "Expert deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
