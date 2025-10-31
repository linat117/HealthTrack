const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/test/", testRoutes);

app.get("/", (req, res) => {
  res.send("Healthlink API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
