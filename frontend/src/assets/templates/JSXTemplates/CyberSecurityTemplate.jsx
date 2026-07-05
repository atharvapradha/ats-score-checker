import React from "react";

const SectionHeading = ({ title }) => (
  <h3 className="text-3xl uppercase border-b pb-2 mb-5 mt-10">
    {title}
  </h3>
);

const CyberSecurityTemplate = ({ data }) => {
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
    languages = [],
    certifications = [],
    strengths = [],
    achievements = [],
    passions = [],
  } = data;

  return (
    <div
      id="resume-template"
      className="bg-white w-[900px] mx-auto shadow-lg"
    >
      <div className="grid grid-cols-3">
        {/* LEFT SIDE */}
        <div className="col-span-2 p-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-800">
              {name}
            </h1>

            <h2 className="text-2xl text-blue-600 mt-2">
              {title}
            </h2>

            <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
              <span>{phone}</span>
              <span>{email}</span>
              <span>{location}</span>
            </div>
          </div>

          {/* Summary */}
          <SectionHeading title="Summary" />

          <p className="leading-8 text-gray-700">
            {summary}
          </p>

          {/* Experience */}
          <SectionHeading title="Experience" />

          {experience.map((exp, index) => (
            <div key={index} className="mb-10">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {exp.role}
                  </h3>

                  <p className="text-blue-600">
                    {exp.company}
                  </p>
                </div>

                <div className="text-right">
                  <p>{exp.duration}</p>
                  <p>{location}</p>
                </div>
              </div>

              <ul className="list-disc ml-8 mt-4">
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

          <div>
            <h3 className="text-2xl font-semibold">
              {education.degree}
            </h3>

            <p className="text-blue-600">
              {education.university}
            </p>

            <p>{education.year}</p>
          </div>

          {/* Languages */}
          <SectionHeading title="Languages" />

          {languages.map((lang, index) => (
            <div
              key={index}
              className="flex justify-between mb-3"
            >
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}

          {/* Training / Courses */}
          <SectionHeading title="Training / Courses" />

          {certifications.map((cert, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-blue-600 font-semibold">
                {cert.title}
              </h4>

              <p>{cert.description}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-[#27435E] text-white p-10">
          {/* Skills */}
          <h3 className="uppercase text-2xl border-b pb-2 mb-5">
            Skills
          </h3>

          {skills.map((skill, index) => (
            <p key={index} className="mb-3">
              • {skill}
            </p>
          ))}

          {/* Strengths */}
          <h3 className="uppercase text-2xl border-b pb-2 mt-10 mb-5">
            Strengths
          </h3>

          {strengths.map((item, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="text-sm mt-2">
                {item.description}
              </p>
            </div>
          ))}

          {/* Achievements */}
          <h3 className="uppercase text-2xl border-b pb-2 mt-10 mb-5">
            Achievements
          </h3>

          {achievements.map((item, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="text-sm">
                {item.description}
              </p>
            </div>
          ))}

          {/* Passions */}
          <h3 className="uppercase text-2xl border-b pb-2 mt-10 mb-5">
            Passions
          </h3>

          {passions.map((item, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CyberSecurityTemplate;