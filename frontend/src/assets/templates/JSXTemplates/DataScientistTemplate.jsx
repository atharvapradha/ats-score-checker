import React from "react";

const SectionHeading = ({ title }) => (
  <h2 className="text-2xl font-bold uppercase border-b-2 border-[#2F4A5A] pb-2 mb-5 mt-8">
    {title}
  </h2>
);

const DataScientistTemplate = ({ data }) => {
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
    interests = [],
  } = data;

  return (
    <div
      id="resume-template"
      className="bg-white w-[900px] mx-auto shadow-xl"
    >
      <div className="grid grid-cols-3">
        {/* LEFT SIDEBAR */}
        <div className="bg-[#2F4A5A] text-white p-10">
          <h1 className="text-5xl font-bold leading-tight">
            {name}
          </h1>

          <p className="text-xl mt-3 text-gray-300">
            {title}
          </p>

          {/* Contact */}
          <div className="mt-10">
            <h3 className="uppercase text-lg font-semibold border-b pb-2">
              Contact
            </h3>

            <p className="mt-4">📧 {email}</p>
            <p>📞 {phone}</p>
            <p>📍 {location}</p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h3 className="uppercase text-lg font-semibold border-b pb-2">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mt-10">
            <h3 className="uppercase text-lg font-semibold border-b pb-2">
              Languages
            </h3>

            {languages.map((lang, index) => (
              <p key={index} className="mt-2">
                {lang.name} • {lang.level}
              </p>
            ))}
          </div>

          {/* Interests */}
          <div className="mt-10">
            <h3 className="uppercase text-lg font-semibold border-b pb-2">
              Interests
            </h3>

            <ul className="list-disc ml-5 mt-3">
              {interests.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-2 p-10">
          {/* Summary */}
          <SectionHeading title="Professional Summary" />

          <p className="leading-8 text-gray-700">
            {summary}
          </p>

          {/* Experience */}
          <SectionHeading title="Experience" />

          {experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-xl">
                    {exp.role}
                  </h3>

                  <p className="text-[#2F4A5A]">
                    {exp.company}
                  </p>
                </div>

                <p>{exp.duration}</p>
              </div>

              <ul className="list-disc ml-6 mt-3">
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
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-lg">
                {project.title}
              </h3>

              <p className="text-gray-700">
                {project.description}
              </p>

              <p className="text-sm text-[#2F4A5A] mt-2">
                Tech Stack: {project.techStack}
              </p>
            </div>
          ))}

          {/* Education */}
          <SectionHeading title="Education" />

          <div>
            <h3 className="font-bold text-xl">
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
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataScientistTemplate;