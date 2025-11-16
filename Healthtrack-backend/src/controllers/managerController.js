import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Post from "../models/Advisory.js";

export const createExpert = async (req, res) => {
  try {
    console.log("Request body:", req.body); // debug

    const { name, email, tempPassword } = req.body;
    if (!name || !email || !tempPassword) {
      return res
        .status(400)
        .json({ message: "All fields required", body: req.body });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    console.log("Hashed password:", hashedPassword); // debug

    const expert = new User({
      name,
      email,
      role: "expert",
      password: hashedPassword,
      mustChangePassword: true,
      createdBy: req.user.id,
    });

    await expert.save();
    res.status(201).json({ expert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
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

// Posts CRUD for manager
export const managerCreatePost = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const post = await Post.create({
      title,
      content,
      category: categoryId || null,
      createdBy: req.user.id,
    });
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerUpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { title, content, category: categoryId || null },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerDeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findOneAndDelete({ _id: id, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
