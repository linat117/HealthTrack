import express from "express";
import { addHealthEntry, getDashboard } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/register", registerUser);
// Add daily health entry
router.post("/health", protect, addHealthEntry);

// Get user dashboard
router.get("/dashboard", protect, getDashboard);

export default router;
