import { useLocation, useNavigate } from "react-router-dom";
import ScoreChart from "../components/ScoreChart";
import KeywordList from "../components/KeywordList";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety check
  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-400 hover:underline"
      >
        ← Analyze another resume
      </button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEFT: SCORE CHART */}
        <div className="flex flex-col items-center">
          <ScoreChart score={state.atsScore} />
          <h2 className="mt-4 text-3xl font-bold">
            ATS Score: {state.atsScore}%
          </h2>
        </div>

        {/* RIGHT: KEYWORDS */}
        <div className="flex flex-col gap-6 w-full">
          <KeywordList
            title="Matched Keywords"
            keywords={state.matchedKeywords}
            type="matched"
          />

          <KeywordList
            title="Missing Keywords"
            keywords={state.missingKeywords}
            type="missing"
          />
        </div>
      </div>
    </div>
  );
}
