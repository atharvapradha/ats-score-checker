import React from "react";

const SectionHeading = ({ title }) => (
  <h3 className="uppercase text-[#8B2C0F] font-semibold text-xl border-b pb-2 mb-5 mt-8">
    {title}
  </h3>
);

const CloudArchitectTemplate = ({ data }) => {
  const {
    name,
    title,
    email,
    phone,
    location,
    summary,
    experience = [],
    education = {},
    skills = [],
  } = data;

  return (
    <div
      id="resume-template"
      className="bg-white w-[850px] mx-auto p-10 text-gray-700"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-[#8B2C0F]">
          {name}
        </h1>

        <h2 className="text-3xl text-gray-600 mt-3">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {location} • {phone} • {email}
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <>
          <SectionHeading title="Professional Summary" />
          <p className="leading-7">{summary}</p>
        </>
      )}

      {/* Work Experience */}
      <SectionHeading title="Work Experience" />

      {experience.map((exp, index) => (
        <div key={index} className="mb-8">
          <div className="flex justify-between">
            <div>
              <h3 className="text-3xl font-medium">
                {exp.company}
              </h3>

              <p className="italic text-gray-500">
                {exp.companyDescription}
              </p>
            </div>

            <div>{exp.duration}</div>
          </div>

          <h4 className="font-bold mt-2">
            {exp.role}
          </h4>

          <ul className="list-disc ml-8 mt-3">
            {(exp.description || "")
              .split("\n")
              .filter((item) => item.trim() !== "")
              .map((item, i) => (
                <li key={i}>
                  {item.replace("•", "")}
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Education */}
      <SectionHeading title="Education" />

      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            {education.university}
          </h3>

          <p>{education.degree}</p>

          <p>{education.major}</p>
        </div>

        <div>{education.year}</div>
      </div>

      {/* Skills */}
      <SectionHeading title="Skills" />

      <p>
        <strong>Hard Skills:</strong> {skills.join(", ")}
      </p>
    </div>
  );
};

export default CloudArchitectTemplate;