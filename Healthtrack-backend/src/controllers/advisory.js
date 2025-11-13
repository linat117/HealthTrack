import Advisory from "../models/Advisory.js"; // your model

// Get all advisories/posts
export const getAdvisories = async (req, res) => {
  try {
    const advisories = await Advisory.find(); // fetch all
    res.status(200).json(advisories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
