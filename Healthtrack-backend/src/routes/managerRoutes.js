import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import {
  createExpert,
  getExperts,
  deleteExpert,
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

export default router;
