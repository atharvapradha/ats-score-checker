const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ATS Checker Backend Running 🚀");
});

const resumeRoutes = require("./routes/resumeRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
