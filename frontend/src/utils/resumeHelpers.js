export const updateField = (setResumeData, field, value) => {
  setResumeData(prev => ({ ...prev, [field]: value }));
};

export const updateExperience = (resumeData, setResumeData, index, field, value) => {
  const updated = [...resumeData.experience];
  updated[index][field] = value;
  setResumeData(prev => ({ ...prev, experience: updated }));
};

export const addExperience = (resumeData, setResumeData) => {
  setResumeData(prev => ({
    ...prev,
    experience: [
      ...resumeData.experience,
      {
        company: "Company Name",
        role: "Job Title",
        duration: "Year - Year",
        description: "• Achievement\n• Responsibility\n• Result with metrics"
      }
    ]
  }));
};

export const removeExperience = (resumeData, setResumeData, index) => {
  setResumeData(prev => ({
    ...prev,
    experience: resumeData.experience.filter((_, i) => i !== index)
  }));
};