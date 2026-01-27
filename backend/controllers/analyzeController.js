const axios = require("axios");

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    // Call Python NLP service (use 127.0.0.1 instead of localhost)
    const response = await axios.post("http://127.0.0.1:8000/analyze", {
      resume: resumeText,
      jobDescription: jobDescription
    });

    // Send NLP response back to frontend
    res.json(response.data);

  } catch (error) {
    // 🔍 Log real error in terminal (VERY IMPORTANT for debugging)
    console.error("❌ NLP SERVICE ERROR:", error.message);

    // Send meaningful error response
    res.status(500).json({
      error: "NLP Service Error",
      details: error.message
    });
  }
};
