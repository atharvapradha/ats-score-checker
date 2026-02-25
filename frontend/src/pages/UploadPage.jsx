import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ✅ STEP 1: Import API functions
import { uploadResume, analyzeResume } from "../services/api";

const UploadPage = () => {
  const navigate = useNavigate();

  // ✅ STEP 2: State additions
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (
        file.type === "application/pdf" ||
        file.type.includes("document")
      ) {
        setResumeFile(file);
      }
    }
  }, []);

  // ✅ STEP 3: Handle file selection
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  // ✅ STEP 4: Upload resume + analyze via backend & NLP
  // 🔑 THIS IS STEP 4.1 (UploadPage → ResultPage)
  const handleAnalyze = async () => {
    if (!resumeFile) return;

    try {
      setLoading(true);

      // 1️⃣ Upload resume → backend
      const uploadResponse = await uploadResume(resumeFile);
      setResumeText(uploadResponse.resumeText);

      // 2️⃣ Send resumeText + JD → backend → NLP
      const analysisResult = await analyzeResume(
        uploadResponse.resumeText,
        jobDescription
      );

      // 3️⃣ STEP 4.1:
      // 👉 Redirect to ResultPage WITH analysis data
      navigate("/results", {
        state: analysisResult,
      });

    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isReadyToAnalyze =
    resumeFile && jobDescription.trim().length > 50;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= NAVBAR ================= */}
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

          <Link to="/">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md hover:bg-card transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Upload Your{" "}
              <span className="text-gradient">Resume</span>
            </h1>
            <p className="text-muted max-w-xl mx-auto text-lg">
              Upload your resume and paste the job description to get
              started with your ATS analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <div className="animate-slide-up">
              <label className="block text-sm font-semibold mb-3">
                Resume Upload
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition cursor-pointer
                  ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : resumeFile
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-primary/50 hover:bg-card"
                  }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="text-center">
                  {resumeFile ? (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </div>
                      <p className="font-medium mb-1">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-muted mb-4">
                        {(resumeFile.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeFile(null);
                        }}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Remove file
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium mb-1">
                        Drag & drop your resume here
                      </p>
                      <p className="text-sm text-muted mb-4">
                        or click to browse files
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="animate-slide-up">
              <label className="block text-sm font-semibold mb-3">
                Job Description
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste the job description here..."
                className="w-full min-h-[280px] resize-none rounded-2xl border-2 border-border bg-background p-4 text-sm focus:border-primary outline-none transition"
              />

              <div className="text-xs text-muted mt-2 text-right">
                {jobDescription.length} characters
              </div>

              {jobDescription.length > 0 &&
                jobDescription.length < 50 && (
                  <p className="text-xs text-warning mt-2">
                    Please add at least 50 characters
                  </p>
                )}
            </div>
          </div>

          {/* Analyze Button */}
          <div className="mt-12 text-center animate-fade-in">
            <button
              onClick={handleAnalyze}
              disabled={!isReadyToAnalyze || loading}
              className={`px-10 py-5 rounded-lg text-lg font-semibold transition
                ${
                  isReadyToAnalyze
                    ? "gradient-primary text-white shadow-glow hover:opacity-90"
                    : "bg-card text-muted cursor-not-allowed"
                }`}
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>

            {!isReadyToAnalyze && (
              <p className="text-sm text-muted mt-4">
                Upload resume & add job description to continue
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
