import Manager from "../models/Manager.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Category from "../models/Category.js";

export const createManager = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await Manager.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User with email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "manager",
      createdBy: req.user.id
    });

    const manager = await Manager.create({
      name,
      email,
      phone,
      role: "manager",
      user: user._id,
      createdBy: req.user.id
    });

    res.status(201).json(manager);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find().sort({ createdAt: -1 });
    res.json(managers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getManager = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateManager = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const manager = await Manager.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json(manager);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteManager = async (req, res) => {
  try {
    await Manager.findByIdAndDelete(req.params.id);
    res.json({ message: "Manager deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const adminUser = await User.create({
      name,
      email,
      password: hashed,
      role: "admin",
      createdBy: req.user.id
    });

    res.status(201).json({ _id: adminUser._id, name: adminUser.name, email: adminUser.email, role: adminUser.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin categories
export const adminCreateCategory = async (req, res) => {
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

export const adminGetCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
