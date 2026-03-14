const BusinessAnalystTemplate = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white text-black p-10 shadow-lg max-w-4xl mx-auto font-sans text-sm leading-relaxed">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide">
          {data.name?.toUpperCase()}
        </h1>

        <p className="mt-1 text-gray-700">
          {data.location} • {data.phone} • {data.email}
        </p>

        <hr className="border-gray-400 mt-3" />
      </div>

      {/* SUMMARY */}
      <div className="mt-4 text-center text-gray-800">
        <p>{data.summary}</p>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <section className="mt-6">
        <h2 className="font-bold text-center tracking-wide">
          PROFESSIONAL EXPERIENCE
        </h2>

        <hr className="border-gray-400 my-2" />

        {data.experience?.map((exp, index) => (
          <div key={index} className="mt-4">

            <div className="flex justify-between">
              <h3 className="font-semibold">
                {exp.company}
              </h3>

              <span>{exp.duration}</span>
            </div>

            <p className="font-semibold">{exp.role}</p>

            <ul className="list-disc ml-6 mt-1 space-y-1">
              {exp.description
                ?.split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line.replace("•", "").trim()}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      {data.education && (
        <section className="mt-6">
          <h2 className="font-bold text-center tracking-wide">
            EDUCATION
          </h2>

          <hr className="border-gray-400 my-2" />

          <div className="flex justify-between">
            <div>
              <p className="font-semibold">
                {data.education.university}
              </p>

              <p>
                {data.education.degree}; Major in {data.education.major}
              </p>
            </div>

            <span>{data.education.year}</span>
          </div>
        </section>
      )}

      {/* SKILLS */}
      <section className="mt-6">
        <h2 className="font-bold text-center tracking-wide">
          SKILLS
        </h2>

        <hr className="border-gray-400 my-2" />

        <div className="grid grid-cols-4 gap-2 text-center">
          {data.skillsColumns?.map((column, colIndex) => (
            <ul key={colIndex}>
              {column.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BusinessAnalystTemplate;