import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Save,
  Edit3,
  Download,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

/* ================= TEMPLATE IMAGES ================= */
import businessAnalystTemplate from "@/assets/templates/business-analyst.png";
import cloudArchitectTemplate from "@/assets/templates/cloud-architect.png";
import cyberSecurityTemplate from "@/assets/templates/cyber-security.png";
import dataScientistTemplate from "@/assets/templates/data-scientist.png";
import devopsEngineerTemplate from "@/assets/templates/devops-engineer.png";
import digitalMarketingTemplate from "@/assets/templates/digital-marketing.png";
import financialAnalystTemplate from "@/assets/templates/financial-analyst.png";
import fullStackDeveloperTemplate from "@/assets/templates/full-stack-developer.png";
import productManagerTemplate from "@/assets/templates/product-manager.png";
import supplyChainManagerTemplate from "@/assets/templates/supply-chain-manager.png";

/*================== JSX TEMPLATE CODE FILES========*/

import BusinessAnalystTemplate from "../assets/templates/JSXTemplates/BusinessAnalystTemplate";

/* ================= TEMPLATE LIST ================= */
const templates = [
  { id: "business-analyst", name: "Business Analyst", image: businessAnalystTemplate, category: "Business" },
  { id: "cloud-architect", name: "Cloud Architect", image: cloudArchitectTemplate, category: "Tech" },
  { id: "cyber-security", name: "Cybersecurity Analyst", image: cyberSecurityTemplate, category: "Tech" },
  { id: "data-scientist", name: "Data Scientist", image: dataScientistTemplate, category: "Tech" },
  { id: "devops-engineer", name: "DevOps Engineer", image: devopsEngineerTemplate, category: "Tech" },
  { id: "digital-marketing", name: "Digital Marketing", image: digitalMarketingTemplate, category: "Marketing" },
  { id: "financial-analyst", name: "Financial Analyst", image: financialAnalystTemplate, category: "Finance" },
  { id: "full-stack-developer", name: "Full Stack Developer", image: fullStackDeveloperTemplate, category: "Tech" },
  { id: "product-manager", name: "Product Manager", image: productManagerTemplate, category: "Business" },
  { id: "supply-chain-manager", name: "Supply Chain Manager", image: supplyChainManagerTemplate, category: "Operations" }
];

/* ================= DEFAULT DATA ================= */
const defaultResumeData = {
  name: "Your Name",
  title: "Your Job Title",
  email: "email@example.com",
  phone: "+1 234 567 890",
  location: "City, Country",
  summary: "A brief professional summary highlighting your experience and key strengths...",
  experience: [
    {
      company: "Company Name",
      role: "Job Title",
      duration: "2020 - Present",
      description:
        "• Key achievement or responsibility\n• Another important accomplishment\n• Third bullet point with metrics"
    }
  ],
  skills: ["Skill 1", "Skill 2", "Skill 3"]
};

const EnhancePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [skillInput, setSkillInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state;

  if (!analysisData) {
    navigate("/result");
    return null;
  }

  const {
    recommendedTemplates = [],
    suggestions = [],
    improvements = []
  } = analysisData;

  /* ================= PAGINATION ================= */
  const templatesPerPage = 6;
  const totalPages = Math.ceil(templates.length / templatesPerPage);
  const displayedTemplates = templates.slice(
    currentPage * templatesPerPage,
    (currentPage + 1) * templatesPerPage
  );

  /* ================= HELPERS ================= */
  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    updateField("experience", updated);
  };

  const addExperience = () => {
    updateField("experience", [
      ...resumeData.experience,
      {
        company: "Company Name",
        role: "Job Title",
        duration: "Year - Year",
        description: "• Achievement\n• Responsibility\n• Result with metrics"
      }
    ]);
  };

  const removeExperience = index => {
    updateField(
      "experience",
      resumeData.experience.filter((_, i) => i !== index)
    );
  };

  const addSkill = e => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      updateField("skills", [...resumeData.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = index => {
    updateField(
      "skills",
      resumeData.skills.filter((_, i) => i !== index)
    );
  };

  /* ================= EDIT MODE ================= */
  if (selectedTemplate && isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2">
              <Save size={16} /> Save
            </button>
          </div>
        </nav>

        <main className="pt-28 max-w-4xl mx-auto px-6 space-y-8">
          {/* PERSONAL INFO */}
          <div className="bg-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" value={resumeData.name} onChange={e => updateField("name", e.target.value)} />
              <input className="input" value={resumeData.title} onChange={e => updateField("title", e.target.value)} />
              <input className="input" value={resumeData.email} onChange={e => updateField("email", e.target.value)} />
              <input className="input" value={resumeData.phone} onChange={e => updateField("phone", e.target.value)} />
              <input className="input md:col-span-2" value={resumeData.location} onChange={e => updateField("location", e.target.value)} />
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4 border-b pb-2">Professional Summary</h3>
            <textarea className="textarea" rows={4} value={resumeData.summary} onChange={e => updateField("summary", e.target.value)} />
          </div>

          {/* WORK EXPERIENCE */}
          <div className="bg-card rounded-2xl p-6">
            <h3 className="font-semibold mb-6 border-b pb-2">Work Experience</h3>

            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-secondary/30 rounded-xl p-4 mb-6 relative">
                {resumeData.experience.length > 1 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm">Company</label>
                    <input
                      className="input"
                      value={exp.company}
                      onChange={e => updateExperience(index, "company", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Role</label>
                    <input
                      className="input"
                      value={exp.role}
                      onChange={e => updateExperience(index, "role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm">Duration</label>
                  <input
                    className="input"
                    value={exp.duration}
                    onChange={e => updateExperience(index, "duration", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm">Description</label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={exp.description}
                    onChange={e => updateExperience(index, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="border border-dashed px-4 py-2 rounded hover:bg-secondary transition"
            >
              + Add Experience
            </button>
          </div>

          {/* SKILLS */}
          <div className="bg-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4 border-b pb-2">Skills</h3>
            <input
              className="input mb-4"
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
            />
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, i) => (
                <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2">
                  {skill}
                  <button onClick={() => removeSkill(i)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

/* ================= PREVIEW MODE ================= */
if (selectedTemplate) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
          <button onClick={() => setSelectedTemplate(null)} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(true)} className="border px-4 py-2 rounded flex gap-2">
              <Edit3 size={16} /> Edit
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded flex gap-2">
              <Download size={16} /> Download
            </button>
          </div>
        </div>
      </nav>

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
  <img src={selectedTemplate.image} className="rounded-xl shadow" />
)}

      </main>
    </div>
  );
}


  /* ================= TEMPLATE GRID ================= */
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

        {/* SUGGESTIONS */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-3">Suggestions</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        {/* IMPROVEMENTS */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-3">Improvements</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            {improvements.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>

        <h1 className="text-4xl font-bold text-center">
          Choose Your <span className="text-gradient">Template</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTemplates.map(t => {
            const isRecommended = recommendedTemplates.some(r => r.id === t.id);
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTemplate(t)}
                className={`cursor-pointer bg-card rounded-xl shadow hover:-translate-y-1 transition 
                  ${isRecommended ? "ring-2 ring-primary" : ""}`}
              >
                <img src={t.image} className="rounded-t-xl h-96 w-full object-cover" />
                <div className="p-4 flex justify-between">
                  <h3 className="font-semibold">{t.name}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {isRecommended ? "Recommended" : t.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CONTINUE BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            disabled={!selectedTemplate}
            onClick={() => setIsEditing(true)}
            className={`px-6 py-3 rounded font-semibold
              ${selectedTemplate ? "bg-primary text-white" : "bg-muted cursor-not-allowed"}`}
          >
            Enhance Resume →
          </button>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>
              <ChevronLeft />
            </button>
            <button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>
              <ChevronRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancePage;
