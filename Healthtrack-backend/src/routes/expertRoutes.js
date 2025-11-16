import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createPost,
  getPosts,
  reactToPost,
  commentOnPost,
  replyToComment,
  myPosts,
  updatePost,
  deletePost,
} from "../controllers/expertController.js";

const router = express.Router();

// Expert routes
router.post("/posts", authMiddleware, roleMiddleware("expert"), createPost);
router.get("/posts", authMiddleware, getPosts);
router.get("/posts/mine", authMiddleware, roleMiddleware("expert"), myPosts);
router.put("/posts/:id", authMiddleware, roleMiddleware("expert"), updatePost);
router.delete("/posts/:id", authMiddleware, roleMiddleware("expert"), deletePost);

// User interactions
router.post("/posts/:postId/react", authMiddleware, reactToPost);
router.post("/posts/:postId/comment", authMiddleware, commentOnPost);
router.post("/posts/:postId/comments/:commentId/reply", authMiddleware, replyToComment);

export default router;
