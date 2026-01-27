import { useState } from "react";
import axios from "axios";
import ScoreChart from "./components/ScoreChart";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Analyze Resume Handler
  const analyzeResume = async () => {
    if (!resume || !jobDescription.trim()) {
      setError("Please upload a resume and paste the job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("resume", resume);

      // 1️⃣ Upload resume & extract text
      const uploadRes = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      // 2️⃣ Analyze ATS score
      const analyzeRes = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          resumeText: uploadRes.data.resumeText,
          jobDescription,
        }
      );

      setResult(analyzeRes.data);
    } catch (err) {
      setError("Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl p-6 space-y-5">
        <h1 className="text-3xl font-bold text-center">
          ATS Resume Score Checker
        </h1>

        {/* Resume Upload */}
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full text-sm"
        />

        {/* Job Description */}
        <textarea
          placeholder="Paste Job Description here..."
          className="w-full p-3 bg-gray-700 rounded resize-none"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        {/* Analyze Button */}
        <button
          onClick={analyzeResume}
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* 🔴 Error Message (BELOW button — as requested) */}
        {error && (
          <p className="text-red-400 text-center text-sm">
            {error}
          </p>
        )}

        {/* Loading Message */}
        {loading && (
          <p className="text-center text-blue-400 text-sm">
            Analyzing resume, please wait...
          </p>
        )}

        {/* Result Section */}
        {result && (
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <ScoreChart score={result.atsScore} />
              <p className="text-3xl font-bold">
                {result.atsScore}%
              </p>
            </div>

            <div>
              <p className="font-semibold text-green-400">
                ✅ Matched Keywords
              </p>
              <p className="text-sm text-gray-300">
                {result.matchedKeywords.length > 0
                  ? result.matchedKeywords.join(", ")
                  : "No matched keywords found"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-red-400">
                ❌ Missing Keywords
              </p>
              <p className="text-sm text-gray-300">
                {result.missingKeywords.length > 0
                  ? result.missingKeywords.join(", ")
                  : "No missing keywords 🎉"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
