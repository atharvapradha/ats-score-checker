import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import EnhancePage from "./pages/EnhancePage";

/* FIXED IMPORT PATH */
import ResumeEditorPage from "./components/ui/resume/ResumeEditorPage";
import ResumePreview from "./components/ui/resume/ResumePreview";
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

        {/* Enhance / Template Selection */}
        <Route path="/enhance" element={<EnhancePage />} />

        {/* Resume Editor */}
        <Route path="/editor" element={<ResumeEditorPage />} />
        <Route path="/preview" element={<ResumePreview />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;