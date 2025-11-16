import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createExpert,
  getExperts,
  deleteExpert,
  managerCreatePost,
  managerMyPosts,
  managerUpdatePost,
  managerDeletePost,
} from "../controllers/managerController.js";

const router = express.Router();

// All routes only for managers
router.post(
  "/experts",
  authMiddleware,
  roleMiddleware("manager"),
  createExpert
);
router.get("/experts", authMiddleware, roleMiddleware("manager"), getExperts);
router.delete(
  "/experts/:expertId",
  authMiddleware,
  roleMiddleware("manager"),
  deleteExpert
);

// Manager posts CRUD
router.post(
  "/posts",
  authMiddleware,
  roleMiddleware("manager"),
  managerCreatePost
);
router.get(
  "/posts/mine",
  authMiddleware,
  roleMiddleware("manager"),
  managerMyPosts
);
router.put(
  "/posts/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerUpdatePost
);
router.delete(
  "/posts/:id",
  authMiddleware,
  roleMiddleware("manager"),
  managerDeletePost
);

export default router;
