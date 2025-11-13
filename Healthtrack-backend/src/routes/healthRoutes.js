import express from "express";
import {
  addHealthEntry,
  getHealthData,
} from "../controllers/healthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addHealthEntry);
router.get("/user", protect, getHealthData);

export default router;
