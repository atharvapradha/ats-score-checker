const axios = require("axios");

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    console.log("Resume Text:");
console.log(resumeText);

console.log("Job Description:");
console.log(jobDescription);

    // Call Python NLP service (use 127.0.0.1 instead of localhost)
    const response =await axios.post("https://ats-score-checker-nlp.onrender.com/analyze", {
      resume: resumeText,
      jobDescription: jobDescription
    });

    // Send NLP response back to frontend
    res.json(response.data);

 } catch (error) {
  console.error("========== NLP ERROR ==========");

  console.error("Message:", error.message);

  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Response Data:", error.response.data);
  }

  if (error.request) {
    console.error("Request was sent but no response received.");
  }

  console.error("==============================");

  res.status(500).json({
    error: "NLP Service Error",
    details: error.message,
  });
}
};
