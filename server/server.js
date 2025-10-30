const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Healthlink API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
