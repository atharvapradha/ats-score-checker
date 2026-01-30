import { Link } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Lightbulb,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";

const ResultsPage = () => {
  /* ================= MOCK DATA (API READY) ================= */

  const overallScore = 72;

  const resumeDescription =
    "Your resume shows strong technical fundamentals and relevant experience, but it lacks some important keywords and role-specific customization required to maximize ATS performance.";

  const goodReasons = [
    "Strong use of action verbs in experience section",
    "Relevant technical skills are clearly mentioned",
    "Projects include measurable achievements",
    "Resume format is ATS-friendly (single column)",
  ];

  const badReasons = [
    "Several important job-specific keywords are missing",
    "Skills section does not fully match job requirements",
    "Professional summary is too generic",
  ];

  const suggestions = [
    "Add missing keywords from the job description naturally",
    "Tailor your professional summary to the target role",
    "Include tools and technologies mentioned in the JD",
    "Quantify impact using numbers (e.g., increased performance by 30%)",
  ];

  const scoreBreakdown = [
    { name: "Keywords", score: 85, color: "#10b981" },
    { name: "Formatting", score: 65, color: "#0ea5e9" },
    { name: "Experience Match", score: 78, color: "#f59e0b" },
    { name: "Skills Alignment", score: 60, color: "#8b5cf6" },
  ];

  const radialData = [
    {
      name: "Score",
      value: overallScore,
      fill:
        overallScore >= 70
          ? "#10b981"
          : overallScore >= 50
          ? "#f59e0b"
          : "#ef4444",
    },
  ];

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Work";
    return "Poor";
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">
              ResumeAI
            </span>
          </Link>

          <Link to="/upload">
            <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-card transition">
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </button>
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* HEADER */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Your ATS <span className="text-gradient">Score Results</span>
            </h1>
            <p className="text-muted text-lg">
              Here's how your resume performs against the ATS system
            </p>
          </div>

          {/* RESUME DESCRIPTION */}
          <div className="bg-card rounded-2xl p-8 shadow-card mb-12 animate-fade-in">
            <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Resume Overview
            </h2>
            <p className="text-muted leading-relaxed">
              {resumeDescription}
            </p>
          </div>

          {/* SCORE SECTION */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display font-semibold mb-6 text-center">
                Overall ATS Score
              </h3>

              <div className="relative w-48 h-48 mx-auto mb-6">
                <ResponsiveContainer>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-display font-bold">
                    {overallScore}
                  </span>
                  <span className="text-sm text-muted">
                    out of 100
                  </span>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {getScoreLabel(overallScore)}
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display font-semibold mb-6">
                Score Breakdown
              </h3>

              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={scoreBreakdown} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                      {scoreBreakdown.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* GOOD vs BAD */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                What’s Working
              </h3>
              <div className="space-y-3">
                {goodReasons.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Needs Improvement
              </h3>
              <div className="space-y-3">
                {badReasons.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <XCircle className="w-4 h-4 text-warning mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SUGGESTIONS */}
          <div className="bg-card rounded-2xl p-8 shadow-card mb-12">
            <h3 className="font-display font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              Suggestions to Improve Your Score
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {suggestions.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-accent mt-1" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/enhance">
              <button className="gradient-primary px-10 py-4 rounded-lg text-white font-semibold shadow-glow hover:opacity-90 transition">
                Enhance My Resume
                <ArrowRight className="ml-2 inline w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
