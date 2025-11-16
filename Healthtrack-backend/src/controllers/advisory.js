import Advisory from "../models/Advisory.js"; // your model

// Get all advisories/posts
export const getAdvisories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.createdBy) {
      filter.createdBy = req.query.createdBy;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const advisories = await Advisory.find(filter)
      .populate("createdBy", "name")
      .populate("category", "name")
      .populate("comments.user", "name")
      .populate("comments.replies.user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(advisories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
