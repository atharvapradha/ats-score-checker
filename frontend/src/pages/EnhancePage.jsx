import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

import { templates } from "../data/templates";
import { defaultResumeData } from "../data/defaultResumeData";

import TemplateGrid from "../components/ui/resume/TemplateGrid";
import SuggestionsPanel from "../components/ui/resume/SuggestionsPanel";
import ImprovementsPanel from "../components/ui/resume/ImprovementsPanel";
import TemplatePagination from "../components/ui/resume/TemplatePagination";
import ResumePreview from "../components/ui/resume/ResumePreview";

const EnhancePage = () => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state;

  if (!analysisData) {
    navigate("/result");
    return null;
  }

  const { recommendedTemplates = [], suggestions = [], improvements = [] } = analysisData;

  const templatesPerPage = 6;
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const displayedTemplates = templates.slice(
    currentPage * templatesPerPage,
    (currentPage + 1) * templatesPerPage
  );

  if (selectedTemplate) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-28 max-w-4xl mx-auto px-6">
          <ResumePreview
            selectedTemplate={selectedTemplate}
            resumeData={resumeData}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

          <Link to="/" className="flex items-center gap-2 font-bold">
            <FileText size={18} /> ResumeAI
          </Link>

          <Link to="/results" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Results
          </Link>

        </div>
      </nav>

      <main className="pt-28 max-w-6xl mx-auto px-6 space-y-10">

        <SuggestionsPanel suggestions={suggestions} />
        <ImprovementsPanel improvements={improvements} />

        <TemplateGrid
          templates={displayedTemplates}
          recommendedTemplates={recommendedTemplates}
          setSelectedTemplate={setSelectedTemplate}
        />

        <TemplatePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      </main>

    </div>
  );
};

export default EnhancePage;