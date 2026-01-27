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
    return jsonify({
        "atsScore": score,
        "matchedKeywords": matched[:20],   # limit output
        "missingKeywords": missing[:20]
    })
if __name__ == "__main__":
    app.run(port=8000)
