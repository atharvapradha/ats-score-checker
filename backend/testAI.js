require("dotenv").config();

const { rewriteResume } = require("./services/aiService");

async function test() {
  const resume = `
Software Engineer
React
Node.js
MongoDB
`;

  const jd = `
Looking for a Full Stack Developer with React,
Node.js, Express, MongoDB,
REST APIs and Git experience.
`;

  const output = await rewriteResume(resume, jd);

  console.log(output);
}

test();