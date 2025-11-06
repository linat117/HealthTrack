import Advisory from "../models/Advisory.js";
export const getAllAdvisories = async (req, res) => {
  try {
    const advisories = await Advisory.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(advisories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createAdvisory = async (req, res) => {
  try {
    const newAdvisory = new Advisory({ ...req.body, author: req.user.id });
    await newAdvisory.save();
    res.status(201).json(newAdvisory);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
