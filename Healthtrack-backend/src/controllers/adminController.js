import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, role, tempPassword } = req.body;

    if (!name || !email || !role || !tempPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      mustChangePassword: true, // optional flag
      createdBy: req.user.id,
    });

    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
