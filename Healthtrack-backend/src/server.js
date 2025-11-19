import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import advisoryRoutes from "./routes/advisory.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { upload, uploadMemory, uploadToCloudinary } from "./utils/upload.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// routes

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/expert", expertRoutes);
app.use("/api/users", userRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/categories", categoryRoutes);

// static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// upload endpoint (auth handled at route-level if needed)
// If CLOUDINARY_URL is set, upload to cloudinary; else use local disk
if (process.env.CLOUDINARY_URL) {
  app.post("/api/manager/upload", uploadMemory.single("image"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });
      const result = await uploadToCloudinary(req.file.buffer);
      return res.json({ url: result.secure_url });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Upload failed" });
    }
  });
} else {
  app.post("/api/manager/upload", upload.single("image"), (req, res) => {
    const filename = req.file?.filename;
    if (!filename) return res.status(400).json({ message: "No file uploaded" });
    const url = `/uploads/${filename}`;
    res.json({ url });
  });
}
// connect db
connectDB();

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
