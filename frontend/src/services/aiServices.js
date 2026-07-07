import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const rewriteResume = async (resume, jobDescription) => {
  const response = await axios.post(`${API}/rewrite`, {
    resume,
    jobDescription,
  });

  return response.data;
};