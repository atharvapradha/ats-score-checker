import { Link } from "react-router-dom";
import {
  FileText,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">ResumeAI</span>
          </div>

          <Link to="/upload">
            <button className="gradient-primary px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 shadow-glow hover:opacity-90 transition">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-36 pb-32">
        <div className="absolute inset-0 gradient-hero opacity-95" />

        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-10 animate-fade-in">
            <Star className="w-4 h-4" />
            Trusted by 50,000+ job seekers
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-8 animate-slide-up">
            Land Your Dream Job with
            <span className="block text-gradient mt-3">
              ATS-Optimized Resume
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 animate-fade-in">
            Upload your resume, paste the job description, and get instant
            AI-powered analysis with actionable suggestions to beat the ATS and
            impress recruiters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <button className="gradient-primary px-10 py-4 rounded-lg text-white text-lg font-semibold shadow-glow hover:opacity-90 transition flex items-center gap-2">
                Analyze My Resume
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <button className="px-10 py-4 rounded-lg border border-border text-lg hover:bg-card transition">
              See How It Works
            </button>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto mt-20">
            {[
              ["95%", "ATS Pass Rate"],
              ["50K+", "Resumes Analyzed"],
              ["3x", "More Interviews"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-display font-bold text-gradient">
                  {value}
                </div>
                <div className="text-sm text-muted mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-gradient"> Stand Out</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto text-lg">
              Our AI-powered platform analyzes every aspect of your resume to
              maximize your chances
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Target,
                title: "ATS Score Analysis",
                desc: "Detailed score breakdown showing how well your resume matches job requirements",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                desc: "Actionable suggestions in seconds to improve resume effectiveness",
                color: "bg-accent/10 text-accent",
              },
              {
                icon: CheckCircle,
                title: "ATS-Friendly Templates",
                desc: "Professionally designed templates optimized for ATS systems",
                color: "bg-warning/10 text-warning",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-background rounded-2xl p-8 shadow-card hover:shadow-card-hover transition transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-6`}
                >
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {f.title}
                </h3>
                <p className="text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">ResumeAI</span>
          </div>
          <p className="text-sm text-muted">
            © 2025 ResumeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
