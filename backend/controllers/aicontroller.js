const { rewriteResume } = require("../services/aiService");

const rewriteResumeController = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    // Validation
    if (!resume || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume and Job Description are required."
      });
    }

    // Call Gemini AI
    const rewrittenResume = await rewriteResume(resume, jobDescription);

    res.status(200).json({
      success: true,
      rewrittenResume
    });

  } catch (error) {
    console.error("AI Rewrite Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to rewrite resume.",
      error: error.message
    });
  }
};

module.exports = {
  rewriteResumeController
};