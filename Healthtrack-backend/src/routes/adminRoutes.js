import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  createManager,
  getManagers,
  getManager,
  updateManager,
  deleteManager,
  createAdminUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/managers", authMiddleware, adminOnly, createManager);
router.get("/managers", authMiddleware, adminOnly, getManagers);
router.get("/managers/:id", authMiddleware, adminOnly, getManager);
router.put("/managers/:id", authMiddleware, adminOnly, updateManager);
router.delete("/managers/:id", authMiddleware, adminOnly, deleteManager);

// create another admin
router.post("/admins", authMiddleware, adminOnly, createAdminUser);

export default router;
