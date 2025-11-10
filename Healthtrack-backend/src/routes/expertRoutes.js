import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createPost,
  getPosts,
  reactToPost,
  commentOnPost,
} from "../controllers/expertController.js";

const router = express.Router();

// Expert routes
router.post("/posts", authMiddleware, roleMiddleware("expert"), createPost);
router.get("/posts", authMiddleware, getPosts);

// User interactions
router.post("/posts/:postId/react", authMiddleware, reactToPost);
router.post("/posts/:postId/comment", authMiddleware, commentOnPost);

export default router;
