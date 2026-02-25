import React from "react";

const BusinessAnalystTemplate = () => {
  return (
    <div className="bg-white text-black max-w-4xl mx-auto p-10 shadow text-[15px] leading-relaxed">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide">FIRST LAST</h1>

        <p className="text-gray-700 text-sm mt-1">
          Bay Area, California • +1-234-456-789 • professionalemail@resumeworded.com • linkedin.com/in/username
        </p>

        <hr className="my-4 border-gray-400" />

        <p className="text-sm text-gray-800">
          Business analyst with five years of experience designing and optimizing
          business processes. Led teams of 5-15 people across technology, data
          science, business and design departments.
        </p>
      </div>

      {/* EXPERIENCE */}
      <section className="mt-6">
        <h2 className="text-center font-bold tracking-widest text-sm mb-2">
          PROFESSIONAL EXPERIENCE
        </h2>
        <hr className="border-gray-400 mb-4" />

        {/* Resume Worded */}
        <div className="mb-6">
          <div className="flex justify-between">
            <h3 className="font-semibold">Resume Worded, New York, NY</h3>
            <span>2017 – Present</span>
          </div>
          <p className="font-semibold">Business Analyst</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Managed user engagement analytics strategy, providing insight into how users interact with apps.</li>
            <li>Analyzed company’s sales results to develop five-year projections.</li>
            <li>Reduced development costs by 25% by merging related products.</li>
            <li>Oversaw integration of external technology solution resulting in $1MM additional sales.</li>
            <li>Developed Excel macro reducing turnaround time by 35%.</li>
          </ul>
        </div>

        {/* Growthsi */}
        <div className="mb-6">
          <div className="flex justify-between">
            <h3 className="font-semibold">Growthsi, San Diego, CA</h3>
            <span>2015 – 2017</span>
          </div>

          <p className="font-semibold">Business Analyst (2016 – 2017)</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Promoted within 18 months due to strong performance.</li>
            <li>Facilitated design thinking workshops to identify business requirements.</li>
          </ul>

          <p className="font-semibold mt-2">Junior Business Analyst (2015 – 2016)</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Authored business requirements document and led requirements sessions.</li>
            <li>Interviewed clients to analyze requirements and recommend improvements.</li>
          </ul>
        </div>

        {/* Rofocus */}
        <div className="mb-6">
          <div className="flex justify-between">
            <h3 className="font-semibold">Rofocus, New York, NY</h3>
            <span>2012 – 2014</span>
          </div>
          <p className="font-semibold">Marketing Business Analyst</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Managed redevelopment of tracking system used by 125 employees.</li>
            <li>Optimized Google AdWords campaign increasing ROI by 20%.</li>
            <li>Tip to jobseeker: Bullet points should be in format Action Verb + Metric.</li>
          </ul>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mt-6">
        <h2 className="text-center font-bold tracking-widest text-sm mb-2">
          EDUCATION
        </h2>
        <hr className="border-gray-400 mb-4" />

        <div className="flex justify-between">
          <h3 className="font-semibold">
            Resume Worded University, San Francisco, CA
          </h3>
          <span>2015</span>
        </div>

        <p>
          <span className="font-semibold">Master of Engineering</span>; Major in Business Analytics
        </p>
      </section>

      {/* SKILLS */}
      <section className="mt-6">
        <h2 className="text-center font-bold tracking-widest text-sm mb-2">
          SKILLS
        </h2>
        <hr className="border-gray-400 mb-4" />

        <div className="grid grid-cols-4 gap-4 text-sm">
          <ul className="list-disc ml-5 space-y-1">
            <li>SQL</li>
            <li>Microsoft Access</li>
            <li>User Acceptance Testing</li>
          </ul>

          <ul className="list-disc ml-5 space-y-1">
            <li>Scrum</li>
            <li>Agile Project Management</li>
            <li>Business Analysis</li>
          </ul>

          <ul className="list-disc ml-5 space-y-1">
            <li>Software Development Life Cycle (SDLC)</li>
            <li>PRINCE2</li>
          </ul>

          <ul className="list-disc ml-5 space-y-1">
            <li>Tableau</li>
            <li>Business Intelligence (BI)</li>
            <li>Python</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default BusinessAnalystTemplate;
