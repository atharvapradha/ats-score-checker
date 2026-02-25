# -------------------- IMPORTS --------------------

# Import Flask to create an API
from flask import Flask, request, jsonify

# Import NLP and ML tools
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Import text processing libraries
import nltk
import re

# Download stopwords (common words like "the", "is", "and")
nltk.download('stopwords')
from nltk.corpus import stopwords

# Create Flask app
app = Flask(__name__)

# -------------------- TEXT CLEANING FUNCTION --------------------
def clean_text(text):
    # Convert text to lowercase
    text = text.lower()
    # Remove numbers, symbols, punctuation
    text = re.sub(r'[^a-zA-Z ]', '', text)
    # Split text into individual words
    words = text.split()
    # Remove common stopwords
    words = [w for w in words if w not in stopwords.words('english')]
    # Join words back into a sentence
    return " ".join(words)

# -------------------- GOOD REASONS LOGIC --------------------
def get_good_reasons(score, matched_keywords):
    reasons = []

    if score >= 70:
        reasons.append("Strong overall match with the job description")

    if len(matched_keywords) >= 5:
        reasons.append("Good number of relevant technical keywords found")

    if "project" in matched_keywords:
        reasons.append("Project-based experience detected")

    if "experience" in matched_keywords:
        reasons.append("Relevant experience-related keywords present")

    return reasons

# -------------------- BAD REASONS LOGIC --------------------
def get_bad_reasons(score, missing_keywords):
    reasons = []

    if score < 50:
        reasons.append("Low ATS compatibility score")

    if len(missing_keywords) >= 10:
        reasons.append("Many important job-related keywords are missing")

    if "experience" in missing_keywords:
        reasons.append("Experience-related keywords are missing")

    if "skills" in missing_keywords:
        reasons.append("Technical skills section appears to be weak or missing")

    return reasons

# -------------------- SUGGESTIONS LOGIC --------------------
def get_suggestions(missing_keywords):
    suggestions = []

    if missing_keywords:
        suggestions.append(
            "Add these important skills to your resume: " +
            ", ".join(missing_keywords[:5])
        )

    suggestions.append(
        "Use strong action verbs such as implemented, designed, optimized, developed"
    )

    suggestions.append(
        "Quantify your achievements using numbers (e.g., improved performance by 30%)"
    )

    suggestions.append(
        "Ensure keywords from the job description appear naturally in your resume"
    )

    return suggestions

# -------------------- IMPROVEMENTS LOGIC --------------------
def get_improvements(score):
    improvements = []

    if score < 60:
        improvements.append("Add a dedicated Technical Skills section")
        improvements.append("Include more job-relevant tools and technologies")
        improvements.append("Mention projects that closely align with the job role")
    else:
        improvements.append("Refine resume wording to improve ATS keyword density")

    improvements.append("Keep resume format single-column for better ATS readability")
    improvements.append("Avoid tables, graphics, and icons that ATS systems cannot read")

    return improvements

# -------------------- TEMPLATE RECOMMENDATION LOGIC --------------------
def recommend_templates(score):
    templates = []

    if score < 50:
        templates.append({
            "name": "Single Column ATS Optimized Resume",
            "reason": "Improves keyword scanning and avoids formatting issues with ATS systems"
        })

    templates.append({
        "name": "Project-Focused Resume",
        "reason": "Highlights hands-on technical projects and skills"
    })

    templates.append({
        "name": "Minimal Professional Resume",
        "reason": "Clean layout preferred by most recruiters and ATS tools"
    })

    return templates

# -------------------- ANALYZE API --------------------
@app.route("/analyze", methods=["POST"])
def analyze():
    # Get JSON data sent from Node.js
    data = request.json

    # Extract resume and job description text
    resume = clean_text(data["resume"])
    jd = clean_text(data["jobDescription"])

    # Convert text into numerical vectors
    vectorizer = TfidfVectorizer()

    # Fit and transform both texts
    vectors = vectorizer.fit_transform([resume, jd])

    # Measure similarity between resume and JD
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]

    # Convert similarity to percentage
    score = round(similarity * 100, 2)

    # Convert resume and JD into sets of words
    resume_words = set(resume.split())
    jd_words = set(jd.split())

    # Find common keywords
    matched = list(resume_words & jd_words)

    # Find missing keywords
    missing = list(jd_words - resume_words)

    # Get analysis results
    good_reasons = get_good_reasons(score, matched)
    bad_reasons = get_bad_reasons(score, missing)
    suggestions = get_suggestions(missing)
    improvements = get_improvements(score)
    templates = recommend_templates(score)

    # Final response
    return jsonify({
        "atsScore": score,
        "matchedKeywords": matched[:20],
        "missingKeywords": missing[:20],
        "goodReasons": good_reasons,
        "badReasons": bad_reasons,
        "suggestions": suggestions,
        "improvements": improvements,
        "recommendedTemplates": templates
    })

# -------------------- RUN SERVER --------------------
if __name__ == "__main__":
    app.run(port=8000)
