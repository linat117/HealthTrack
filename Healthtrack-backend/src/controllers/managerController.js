import User from "../models/User.js";
import Expert from "../models/Expert.js";
import bcrypt from "bcryptjs";
import Post from "../models/Advisory.js";
import Category from "../models/Category.js";

export const createExpert = async (req, res) => {
  try {
    console.log("Request body:", req.body); // debug

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      return res
        .status(400)
      .json({ message: "All fields required", body: req.body });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

  const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword); // debug

    const expertUser = new User({
      name,
      email,
      role: "expert",
      password: hashedPassword,
      mustChangePassword: true,
      createdBy: req.user.id,
    });

    await expertUser.save();
    try {
      const expert = await Expert.create({
        user: expertUser._id,
        name,
        email,
        createdBy: req.user.id,
      });
      res.status(201).json({ expert, user: { _id: expertUser._id, email, name } });
    } catch (errCreate) {
      // rollback user if expert doc fails (e.g., unique email constraint)
      await User.deleteOne({ _id: expertUser._id });
      throw errCreate;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Manager views all experts they created
export const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find({ createdBy: req.user.id }).populate("user", "email role");
    res.json({ experts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manager can delete an expert they created
export const deleteExpert = async (req, res) => {
  try {
    const { expertId } = req.params;
    const expert = await Expert.findOne({ _id: expertId, createdBy: req.user.id });
    if (!expert) return res.status(404).json({ message: "Expert not found" });

    await User.deleteOne({ _id: expert.user, createdBy: req.user.id });
    await Expert.deleteOne({ _id: expertId, createdBy: req.user.id });
    res.json({ message: "Expert deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Posts CRUD for manager
export const managerCreatePost = async (req, res) => {
  try {
    const { title, content, categoryId, imageUrl } = req.body;
    const post = await Post.create({
      title,
      content,
      category: categoryId || null,
      imageUrl: imageUrl || null,
      createdBy: req.user.id,
    });
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id })
      .populate("category", "name")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerUpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId, imageUrl } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { title, content, category: categoryId || null, imageUrl: imageUrl || null },
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

// Categories for managers
export const managerCreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });
    const category = await Category.create({ name, createdBy: req.user.id });
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerGetCategories = async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const managerDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id, createdBy: req.user.id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
