import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Only Super Admin can promote a user to Admin
router.put(
  "/promote/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      user.isAdmin = true;
      await user.save();

      res.json({
        msg: `${user.name} has been promoted to Health Officer/Admin`,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

export default router;
