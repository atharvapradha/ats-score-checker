import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/ai`;

export const rewriteResume = async (resume, jobDescription) => {
  const response = await axios.post(`${API}/rewrite`, {
    resume,
    jobDescription,
  });

  return response.data;
};