const express = require("express");

const router = express.Router();

const {
  rewriteResumeController
} = require("../controllers/aiController");

router.post("/rewrite", rewriteResumeController);

module.exports = router;