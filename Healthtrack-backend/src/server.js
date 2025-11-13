import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/expert", expertRoutes);
app.use("/api/users", userRoutes);
// connect db
connectDB();

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
