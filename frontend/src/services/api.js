import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Upload resume file
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await axios.post(
    `${API_BASE_URL}/resume/upload`,
    formData
  );

  return response.data; // { resumeText }
};

// Analyze resume + JD
export const analyzeResume = async (resumeText, jobDescription) => {
  const response = await axios.post(
    `${API_BASE_URL}/analyze`,
    {
      resumeText,
      jobDescription
    }
  );

  return response.data; // ATS score + suggestions + templates
};
