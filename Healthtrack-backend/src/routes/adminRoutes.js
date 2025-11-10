import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { createUser } from "../controllers/adminController.js";

const router = express.Router();

router.post("/users", authMiddleware, roleMiddleware("admin"), createUser);

export default router;
