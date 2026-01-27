import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume || !jobDescription) {
      alert("Please upload resume and paste job description");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      const analyzeRes = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          resumeText: uploadRes.data.resumeText,
          jobDescription,
        }
      );

      setResult(analyzeRes.data);
    } catch (err) {
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">
          ATS Resume Score Checker
        </h1>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full"
        />

        <textarea
          placeholder="Paste Job Description here..."
          className="w-full p-3 bg-gray-700 rounded"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          onClick={analyzeResume}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div className="mt-4 space-y-3">
            <p className="text-xl">
              ATS Score: <b>{result.atsScore}%</b>
            </p>

            <div>
              <p className="font-semibold text-green-400">
                Matched Keywords
              </p>
              <p className="text-sm">
                {result.matchedKeywords.join(", ")}
              </p>
            </div>

            <div>
              <p className="font-semibold text-red-400">
                Missing Keywords
              </p>
              <p className="text-sm">
                {result.missingKeywords.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
