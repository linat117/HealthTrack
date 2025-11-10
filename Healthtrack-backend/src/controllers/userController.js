import User from "../models/User.js";

// Add daily health entry
export const addHealthEntry = async (req, res) => {
  try {
    const { water, sleep, exercise, walked } = req.body;

    const user = await User.findById(req.user.id)
      .populate("activity")
      .select("+health");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Initialize health array if it doesn't exist
    if (!user.health) user.health = [];

    user.health.push({ water, sleep, exercise, walked });
    await user.save();

    res
      .status(201)
      .json({ message: "Health entry added", health: user.health });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user dashboard
export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("activity") // populate posts reacted or commented
      .select("+health");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      activity: user.activity, // list of posts reacted/commented
      health: user.health, // list of health records
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
