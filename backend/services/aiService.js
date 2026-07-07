const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rewrite Resume Function
async function rewriteResume(resume, jobDescription) {
  // Select Gemini Model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  // Prompt
  const prompt = `
You are an expert ATS Resume Writer.

Resume:
${resume}

Job Description:
${jobDescription}

Rewrite the resume to better match the Job Description.

Rules:

1. Improve the Professional Summary.
2. Improve Work Experience descriptions.
3. Add missing ATS keywords naturally.
4. Improve the Skills section.
5. Keep all information truthful.
6. Never invent companies, education, or experience.
7. Improve grammar and readability.
8. Return ONLY valid JSON.
9. Do NOT return markdown.
10. Do NOT wrap JSON inside \`\`\`.

Return the JSON exactly in this format:

{
  "summary": "",
  "skills": [
    ""
  ],
  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "description": ""
    }
  ]
}
`;

  // Generate AI Response
  const result = await model.generateContent(prompt);

  const response = await result.response;

 const text = response.text();

return JSON.parse(text);

  // Remove markdown if Gemini accidentally returns it
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    // Convert JSON string to JavaScript object
    return JSON.parse(text);
  } catch (error) {
    console.error("Invalid JSON received from Gemini:");
    console.log(text);

    throw new Error("Gemini returned invalid JSON.");
  }
}

module.exports = {
  rewriteResume,
};