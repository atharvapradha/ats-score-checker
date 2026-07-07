require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===================== HOME ROUTE ===================== */
app.get("/", (req, res) => {
  res.send("ATS Checker Backend Running 🚀");
});

/* ===================== ROUTES ===================== */
const resumeRoutes = require("./routes/resumeRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const aiRoutes = require("./routes/aiRoutes"); // ⭐ NEW

app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/ai", aiRoutes); // ⭐ NEW

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* ===================== TEMPORARY DEBUG ===================== */
// Remove this after confirming your API key loads correctly.
console.log("Gemini API Key:", process.env.GEMINI_API_KEY);