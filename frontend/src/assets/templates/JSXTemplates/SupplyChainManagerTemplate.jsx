import React from "react";

const SectionHeading = ({ title }) => (
  <h2 className="text-2xl font-bold uppercase text-orange-700 border-b border-gray-300 pb-2 mt-8 mb-5">
    {title}
  </h2>
);

const SupplyChainManagerTemplate = ({ data }) => {
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
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    tools = [],
    supplyMetrics = [],
    leadership = [],
    linkedin = "",
  } = data;

  return (
    <div
      id="resume-template"
      className="bg-white w-[900px] mx-auto shadow-lg p-10 text-gray-800"
    >
      {/* Header */}
      <div className="border-b-4 border-orange-600 pb-6">
        <h1 className="text-5xl font-bold">
          {name}
        </h1>

        <h2 className="text-2xl text-orange-600 mt-2">
          {title}
        </h2>

        <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
          <span>{phone}</span>
          <span>{email}</span>
          <span>{location}</span>
          {linkedin && <span>{linkedin}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      <SectionHeading title="Professional Summary" />

      <p className="leading-8">
        {summary}
      </p>

      {/* Core Competencies */}
      <SectionHeading title="Core Competencies" />

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Supply Chain Tools */}
      <SectionHeading title="Supply Chain Tools" />

      <div className="grid grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-3 text-center"
          >
            {tool}
          </div>
        ))}
      </div>

      {/* Professional Experience */}
      <SectionHeading title="Professional Experience" />

      {experience.map((exp, index) => (
        <div key={index} className="mb-8">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold">
                {exp.role}
              </h3>

              <p className="text-orange-600">
                {exp.company}
              </p>
            </div>

            <p>{exp.duration}</p>
          </div>

          <ul className="list-disc ml-6 mt-4">
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

      {/* Projects */}
      <SectionHeading title="Projects" />

      {projects.map((project, index) => (
        <div key={index} className="mb-8">
          <h3 className="font-bold text-lg">
            {project.title}
          </h3>

          <p>{project.description}</p>

          <p className="text-orange-600 text-sm mt-2">
            Tools Used: {project.techStack}
          </p>
        </div>
      ))}

      {/* Key Performance Metrics */}
      <SectionHeading title="Key Performance Metrics" />

      <ul className="list-disc ml-6">
        {supplyMetrics.map((metric, index) => (
          <li
            key={index}
            className="mb-2"
          >
            {metric}
          </li>
        ))}
      </ul>

      {/* Leadership */}
      <SectionHeading title="Leadership" />

      {leadership.map((item, index) => (
        <div key={index} className="mb-5">
          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p>{item.description}</p>
        </div>
      ))}

      {/* Education */}
      <SectionHeading title="Education" />

      <div>
        <h3 className="font-bold">
          {education.degree}
        </h3>

        <p>{education.major}</p>

        <p>{education.university}</p>

        <p>{education.year}</p>
      </div>

      {/* Certifications */}
      <SectionHeading title="Certifications" />

      {certifications.map((cert, index) => (
        <div key={index} className="mb-5">
          <h3 className="font-semibold">
            {cert.title}
          </h3>

          <p>{cert.organization}</p>

          <p className="text-sm text-gray-500">
            {cert.year}
          </p>
        </div>
      ))}

      {/* Achievements */}
      <SectionHeading title="Achievements" />

      <ul className="list-disc ml-6">
        {achievements.map((item, index) => (
          <li
            key={index}
            className="mb-2"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Languages */}
      <SectionHeading title="Languages" />

      <div className="flex gap-6 flex-wrap">
        {languages.map((lang, index) => (
          <div key={index}>
            <strong>{lang.name}</strong>
            <p>{lang.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainManagerTemplate;