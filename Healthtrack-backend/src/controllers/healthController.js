import HealthEntry from "../models/HealthEntry.js";

export const addHealthEntry = async (req, res) => {
  try {
    const { weight, bloodPressure, steps, notes } = req.body;
    const userId = req.user.id;

    const entry = await HealthEntry.create({
      user: userId,
      weight,
      bloodPressure,
      steps,
      notes,
    });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getHealthData = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await HealthEntry.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
