import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import EnhancePage from "./pages/EnhancePage"; // ✅ ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Upload Resume Page */}
        <Route path="/upload" element={<UploadPage />} />

        {/* Results Page */}
        <Route path="/results" element={<ResultsPage />} />

        {/* Enhance / Edit Resume Page */}
        <Route path="/enhance" element={<EnhancePage />} /> {/* ✅ ENABLED */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
