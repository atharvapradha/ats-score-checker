import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

const ResumeEditorPage = ({ resumeData, setResumeData, onBack }) => {
  const [skillInput, setSkillInput] = useState("");

  /* ---------- BASIC FIELD UPDATE ---------- */
  const updateField = (field, value) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  /* ---------- EDUCATION UPDATE ---------- */
  const updateEducation = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }));
  };

  /* ---------- EXPERIENCE ---------- */
  const updateExperience = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    updateField("experience", updated);
  };

  const addExperience = () => {
    updateField("experience", [
      ...resumeData.experience,
      {
        company: "",
        role: "",
        duration: "",
        description: ""
      }
    ]);
  };

  const removeExperience = index => {
    updateField(
      "experience",
      resumeData.experience.filter((_, i) => i !== index)
    );
  };

  /* ---------- SKILLS ---------- */
  const addSkill = e => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      updateField("skills", [
        ...resumeData.skills,
        skillInput.trim()
      ]);

      setSkillInput("");
    }
  };

  const removeSkill = index => {
    updateField(
      "skills",
      resumeData.skills.filter((_, i) => i !== index)
    );
  };

  /* ---------- SAVE ---------- */
  const handleSave = () => {
    onBack(); // return to preview
  };

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/80 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">

          <button
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Save size={16} />
            Save
          </button>

        </div>
      </nav>

      <main className="pt-28 max-w-4xl mx-auto px-6 space-y-8">

        {/* PERSONAL INFO */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 border-b pb-2">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="input"
              placeholder="Full Name"
              value={resumeData.name}
              onChange={e => updateField("name", e.target.value)}
            />

            <input
              className="input"
              placeholder="Email"
              value={resumeData.email}
              onChange={e => updateField("email", e.target.value)}
            />

            <input
              className="input"
              placeholder="Phone"
              value={resumeData.phone}
              onChange={e => updateField("phone", e.target.value)}
            />

            <input
              className="input"
              placeholder="Location"
              value={resumeData.location}
              onChange={e => updateField("location", e.target.value)}
            />

          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 border-b pb-2">
            Professional Summary
          </h3>

          <textarea
            className="textarea"
            rows={4}
            value={resumeData.summary}
            onChange={e => updateField("summary", e.target.value)}
          />
        </div>

        {/* EXPERIENCE */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-6 border-b pb-2">
            Work Experience
          </h3>

          {resumeData.experience.map((exp, index) => (
            <div
              key={index}
              className="bg-secondary/30 rounded-xl p-4 mb-6 relative"
            >

              {resumeData.experience.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-4">

                <input
                  className="input"
                  placeholder="Company"
                  value={exp.company}
                  onChange={e =>
                    updateExperience(index, "company", e.target.value)
                  }
                />

                <input
                  className="input"
                  placeholder="Role"
                  value={exp.role}
                  onChange={e =>
                    updateExperience(index, "role", e.target.value)
                  }
                />

              </div>

              <input
                className="input mb-4"
                placeholder="Duration"
                value={exp.duration}
                onChange={e =>
                  updateExperience(index, "duration", e.target.value)
                }
              />

              <textarea
                className="textarea"
                rows={4}
                placeholder="• Achievement\n• Result\n• Impact"
                value={exp.description}
                onChange={e =>
                  updateExperience(index, "description", e.target.value)
                }
              />

            </div>
          ))}

          <button
            onClick={addExperience}
            className="border border-dashed px-4 py-2 rounded hover:bg-secondary transition"
          >
            + Add Experience
          </button>
        </div>

        {/* EDUCATION */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 border-b pb-2">
            Education
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="input"
              placeholder="University"
              value={resumeData.education?.university || ""}
              onChange={e =>
                updateEducation("university", e.target.value)
              }
            />

            <input
              className="input"
              placeholder="Degree"
              value={resumeData.education?.degree || ""}
              onChange={e =>
                updateEducation("degree", e.target.value)
              }
            />

            <input
              className="input"
              placeholder="Major"
              value={resumeData.education?.major || ""}
              onChange={e =>
                updateEducation("major", e.target.value)
              }
            />

            <input
              className="input"
              placeholder="Year"
              value={resumeData.education?.year || ""}
              onChange={e =>
                updateEducation("year", e.target.value)
              }
            />

          </div>
        </div>

        {/* SKILLS */}
        <div className="bg-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4 border-b pb-2">
            Skills
          </h3>

          <input
            className="input mb-4"
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={addSkill}
          />

          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}

                <button onClick={() => removeSkill(index)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default ResumeEditorPage;