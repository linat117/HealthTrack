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
  adminCreateCategory,
  adminGetCategories,
  adminDeleteCategory,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/managers", authMiddleware, adminOnly, createManager);
router.get("/managers", authMiddleware, adminOnly, getManagers);
router.get("/managers/:id", authMiddleware, adminOnly, getManager);
router.put("/managers/:id", authMiddleware, adminOnly, updateManager);
router.delete("/managers/:id", authMiddleware, adminOnly, deleteManager);

// create another admin
router.post("/admins", authMiddleware, adminOnly, createAdminUser);

// categories (admin only create/delete; list for admin dashboard usage)
router.post("/categories", authMiddleware, adminOnly, adminCreateCategory);
router.get("/categories", authMiddleware, adminOnly, adminGetCategories);
router.delete("/categories/:id", authMiddleware, adminOnly, adminDeleteCategory);

export default router;
