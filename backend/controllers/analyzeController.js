const axios = require("axios");

// NLP service URL
const NLP_URL =
    process.env.NLP_URL ||
    "https://ats-score-checker-nlp.onrender.com/analyze";

exports.analyzeResume = async (req, res) => {
    try {

        const { resumeText, jobDescription } = req.body;

        console.log("========== ANALYZE REQUEST ==========");
        console.log("Resume length:", resumeText?.length);
        console.log("Job description length:", jobDescription?.length);

        console.log("Calling NLP service...");
        console.log("NLP URL:", NLP_URL);

        const response = await axios.post(
            NLP_URL,
            {
                resume: resumeText,
                jobDescription: jobDescription
            },
            {
                timeout: 60000
            }
        );

        console.log("NLP service responded successfully");
        console.log("NLP status:", response.status);

        console.log("====================================");

        res.json(response.data);

    } catch (error) {

        console.error("========== NLP ERROR ==========");

        console.error("Message:", error.message);

        if (error.response) {

            console.error("STATUS:", error.response.status);

            console.error(
                "HEADERS:",
                JSON.stringify(error.response.headers, null, 2)
            );

            console.error(
                "DATA:",
                JSON.stringify(error.response.data, null, 2)
            );
        }

        if (error.request) {
            console.error("Request was sent but no response received.");
        }

        console.error("==============================");

        res.status(500).json({
            error: "NLP Service Error",
            details: error.message
        });
    }
};