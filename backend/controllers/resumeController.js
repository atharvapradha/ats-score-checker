const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.extractResumeText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }

    const filePath = req.file.path;
    const extension = filePath.split(".").pop().toLowerCase();
    let text = "";

    // ===== PDF =====
    if (extension === "pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      text = data.text;
    }

    // ===== DOCX =====
    else if (extension === "docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    }

    else {
      return res.status(400).json({
        success: false,
        error: "Unsupported file format"
      });
    }

    res.status(200).json({
      success: true,
      resumeText: text
    });

  } catch (error) {
    console.error("Resume parse error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
