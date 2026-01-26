const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { extractResumeText } = require("../controllers/resumeController");

router.post("/upload", upload.single("resume"), extractResumeText);

module.exports = router;
