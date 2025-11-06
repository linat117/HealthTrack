import express from "express";
import {
  getAllAdvisories,
  createAdvisory,
} from "../controllers/advisoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", getAllAdvisories);
router.post("/", authMiddleware, adminMiddleware, createAdvisory);

export default router;
