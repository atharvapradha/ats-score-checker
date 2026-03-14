import { ArrowLeft, Edit3, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BusinessAnalystTemplate from "@/assets/templates/JSXTemplates/BusinessAnalystTemplate";

const ResumePreview = ({
  selectedTemplate,
  resumeData,
  setSelectedTemplate,
  setIsEditing
}) => {

  const navigate = useNavigate();

  const handleBack = () => {
    setSelectedTemplate(null); // reset template state
    navigate("/enhance"); // go to previous page in history
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">

          {/* BACK BUTTON */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 hover:text-primary"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">

            <button
              onClick={() => setIsEditing(true)}
              className="border px-4 py-2 rounded flex gap-2 hover:bg-secondary"
            >
              <Edit3 size={16} /> Edit
            </button>

            <button
              onClick={handleDownload}
              className="bg-primary text-white px-4 py-2 rounded flex gap-2"
            >
              <Download size={16} /> Download
            </button>

          </div>

        </div>
      </nav>

      {/* RESUME CONTENT */}
      <main className="pt-28 max-w-4xl mx-auto px-6">

        {selectedTemplate.id === "business-analyst" ? (
          <BusinessAnalystTemplate
            data={{
              ...resumeData,
              education: {
                university: "Resume Worded University",
                location: "San Francisco, CA",
                degree: "Master of Engineering",
                major: "Business Analytics",
                year: "2015"
              },
              skillsColumns: [
                resumeData.skills || [],
                [],
                [],
                []
              ]
            }}
          />
        ) : (
          <img
            src={selectedTemplate.image}
            className="rounded-xl shadow"
          />
        )}

      </main>
    </div>
  );
};

export default ResumePreview;