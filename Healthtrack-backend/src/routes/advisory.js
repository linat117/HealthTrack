import express from "express";
import { getAdvisories } from "../controllers/advisory.js";

const router = express.Router();

router.get("/", getAdvisories);

export default router;
