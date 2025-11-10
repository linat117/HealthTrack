import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createUser } from "../controllers/adminController.js";

const router = express.Router();

router.post("/users", authMiddleware, roleMiddleware("admin"), createUser);

export default router;
