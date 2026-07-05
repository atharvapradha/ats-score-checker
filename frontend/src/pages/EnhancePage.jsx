import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { templates } from "../data/templates";
import { defaultResumeData } from "../data/defaultResumeData";
import TemplateGrid from "../components/ui/resume/TemplateGrid";
import SuggestionsPanel from "../components/ui/resume/SuggestionsPanel";
import ImprovementsPanel from "../components/ui/resume/ImprovementsPanel";
import TemplatePagination from "../components/ui/resume/TemplatePagination";
import ResumePreview from "../components/ui/resume/ResumePreview";

const EnhancePage = () => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  /* ---------- LOAD RESUME DATA FROM LOCAL STORAGE ---------- */

  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      return saved ? JSON.parse(saved) : defaultResumeData;
    } catch {
      return defaultResumeData;
    }
  });

  const [currentPage, setCurrentPage] = useState(0);

  const templateRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state;

  /* ---------- SAFE REDIRECT IF PAGE REFRESHED ---------- */

  useEffect(() => {
    if (!analysisData) {
      navigate("/result");
    }
  }, [analysisData, navigate]);

  /* ---------- AUTO SAVE RESUME DATA ---------- */

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const { recommendedTemplates = [], suggestions = [], improvements = [] } =
    analysisData || {};

  const templatesPerPage = 6;
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const displayedTemplates = templates.slice(
    currentPage * templatesPerPage,
    (currentPage + 1) * templatesPerPage
  );

  /* ------------------ PDF EXPORT ------------------ */

  const generatePDF = async () => {

    if (!templateRef.current) return;

    try {

      const dataUrl = await htmlToImage.toPng(templateRef.current, {
        pixelRatio: 2
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 297;

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");

    } catch (error) {
      console.error("Error generating PDF:", error);
    }

  };

  /* ------------------ TEMPLATE PREVIEW ------------------ */

  

  /* ------------------ TEMPLATE SELECTION PAGE ------------------ */

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

          <Link to="/" className="flex items-center gap-2 font-bold">
            <FileText size={18} /> ResumeAI
          </Link>

          <Link to="/result" className="flex items-center gap-2">
            <ArrowLeft size={16} /> Results
          </Link>

        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-28 max-w-6xl mx-auto px-6 space-y-10">

        {/* AI Suggestions */}
        <SuggestionsPanel suggestions={suggestions} />

        {/* Resume Improvements */}
        <ImprovementsPanel improvements={improvements} />

        {/* Template Grid */}
        <TemplateGrid
  templates={displayedTemplates}
  recommendedTemplates={recommendedTemplates}
  onSelectTemplate={(template) =>
    navigate("/preview", {
      state: {
        selectedTemplate: template,
        resumeData
      }
    })
  }
/>

        {/* Pagination */}
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