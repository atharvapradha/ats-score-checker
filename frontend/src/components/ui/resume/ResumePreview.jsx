import { ArrowLeft, Edit3, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BusinessAnalystTemplate from "@/assets/templates/JSXTemplates/BusinessAnalystTemplate";
import CloudArchitectTemplate from "@/assets/templates/JSXTemplates/CloudArchitectTemplate";
import CyberSecurityTemplate from "@/assets/templates/JSXTemplates/CyberSecurityTemplate";
import DataScientistTemplate from "@/assets/templates/JSXTemplates/DataScientistTemplate";
import DevOpsEngineerTemplate from "@/assets/templates/JSXTemplates/DevOpsEngineerTemplate";
import DigitalMarketingTemplate from "@/assets/templates/JSXTemplates/DigitalMarketingTemplate";
import FinancialAnalystTemplate from "@/assets/templates/JSXTemplates/FinancialAnalystTemplate";
import FullStackDeveloperTemplate from "@/assets/templates/JSXTemplates/FullStackDeveloperTemplate";
import ProductManagerTemplate from "@/assets/templates/JSXTemplates/ProductManagerTemplate";
import SupplyChainManagerTemplate from "@/assets/templates/JSXTemplates/SupplyChainManagerTemplate";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
const templateMap = {
  "business-analyst": BusinessAnalystTemplate,
  "cloud-architect": CloudArchitectTemplate,
  "cyber-security": CyberSecurityTemplate,
  "data-scientist": DataScientistTemplate,
  "devops-engineer": DevOpsEngineerTemplate,
  "digital-marketing": DigitalMarketingTemplate,
  "financial-analyst": FinancialAnalystTemplate,
  "full-stack-developer": FullStackDeveloperTemplate,
  "product-manager": ProductManagerTemplate,
  "supply-chain-manager": SupplyChainManagerTemplate,
};

const ResumePreview = () => {

  const navigate = useNavigate();
const location = useLocation();

const {
  selectedTemplate,
  resumeData
} = location.state || {};
const SelectedTemplate = templateMap[selectedTemplate?.id];
if (!location.state) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Resume data not found.
      </h2>

      <button
        onClick={() => navigate("/enhance")}
        className="mt-6 px-5 py-2 rounded bg-blue-600 text-white"
      >
        Go Back
      </button>
    </div>
  );
}
  /* BACK BUTTON */
  const handleBack = () => {
  navigate("/enhance", {
  replace: true
});
  };
  /* EDIT BUTTON REDIRECT */
  const handleEdit = () => {
    navigate("/editor", {
      state: {
        selectedTemplate,
        resumeData
      }
    });
  };

  /* DOWNLOAD FUNCTION */
  const handleDownload = async () => {
  try {
    const resume = document.getElementById("resume-template");

    if (!resume) {
      alert("Resume template not found.");
      return;
    }

    const dataUrl = await htmlToImage.toPng(resume, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff"
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(dataUrl);

    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(`${resumeData.name || "Resume"}.pdf`);
  } catch (error) {
    console.error(error);
    alert("Unable to generate PDF.");
  }
};

  if (!selectedTemplate) return null;

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">

          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">

            {/* EDIT BUTTON */}
            <button
              onClick={handleEdit}
              className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-secondary transition"
            >
              <Edit3 size={16} /> Edit
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={handleDownload}
              className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:opacity-90 transition"
            >
              <Download size={16} /> Download
            </button>

          </div>

        </div>
      </nav>

      {/* RESUME CONTENT */}
      <main className="pt-28 max-w-4xl mx-auto px-6">

       {SelectedTemplate && (
  <SelectedTemplate
    data={{
      ...resumeData,

      education: resumeData.education || {
        university: "",
        location: "",
        degree: "",
        major: "",
        year: ""
      },

      skillsColumns: [
        resumeData.skills || [],
        [],
        [],
        []
      ]
    }}
  />
)}

      </main>

    </div>
  );
};

export default ResumePreview;