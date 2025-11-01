import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
//import User from "./models/User.js";

import connectDB from "./config/db.js";
//const testRoutes = require("./routes/testRoutes");
//const Advisory = require("./models/Advisory");
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
//app.use("/api/test/", testRoutes);

app.get("/", (req, res) => {
  res.send("Healthlink API is running...");
});
app.use("/api/auth", authRoutes);
/*app.get("/api/test-models", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@user.com",
    password: "12345678",
  });
  const advisory = await Advisory.create({
    title: "Covid 19 alert",
    description: "There has been a rise in local covid 19 cases.",
    category: "Outbreak Alert",
    localtion: "Addis Ababa",
    postedBy: user._id,
  });

  res.json({ user, advisory });
});
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
