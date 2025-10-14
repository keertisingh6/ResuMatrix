import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import {clearFolder} from "./utils/clearFolder.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
dotenv.config();

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not set in environment variables");
  console.error("Please create a .env file in the backend directory with GEMINI_API_KEY=your_api_key_here");
  process.exit(1);
}

app.use(express.json({ limit: "5mb" }));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpDir = path.join(__dirname, "tmp");

// Ensure tmp directory exists
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
  console.log(`Created tmp directory at: ${tmpDir}`);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------------------- Compile LaTeX -----------------------
app.post("/api/compile", async (req, res) => {
  const tex = req.body.code;
  const texPath = path.join(tmpDir, "resume.tex");
  const pdfPath = path.join(tmpDir, "resume.pdf");

  fs.writeFileSync(texPath, tex);

  const command = `pdflatex -interaction=nonstopmode -output-directory=${tmpDir} ${texPath}`;
  exec(command, async(err, stdout, stderr) => {
    console.log("LaTeX log:\n", stdout);

    if (fs.existsSync(pdfPath)) {
      const pdf = fs.readFileSync(pdfPath);
      await clearFolder(tmpDir);
      res.contentType("application/pdf");
      res.send(pdf);
    } else {
      res.status(500).json({
        message: "LaTeX compilation failed",
        error: stderr || stdout || err?.message,
      });
    }
  });
});

// ----------------------- Optimize Resume -----------------------
app.post("/api/optimize", async (req, res) => {
  const { jobDescription, resumeLatex } = req.body;

const prompt = `
    You are an expert in ATS resume optimization.

Follow these STRICT rules to update the user's LaTeX resume using the job description:

- Return ONLY the revised LaTeX code. Output nothing else.
- DO NOT exceed one page. If the resume is too long, first trim or shorten bullet points in Achievements, Certifications, and Projects, using fewer words or synonyms (ATS OPTIMIZED) until it fits. Never remove or alter project or section names.
- DO NOT add new sections, personal information, images, icons, graphics, tables, fonts, or colors. Keep everything black and white.
- ONLY modify existing content to add or emphasize relevant, *truthful* keywords and skills from the job description. Do NOT invent or exaggerate experience.
- NEVER change or rename any project titles, work experiences, or education items. Only minor section titles (e.g. “Achievements” to “Awards”) may be renamed for ATS if relevant.
- KEEP the original structure, order, and formatting. Do NOT alter font size, font family, or margins.
- DO NOT add bold or italic formatting to individual skills in Technical Skills. Only section headings like Technologies or Languages may use \textbf{}.
- For bullet points, rewrite only to better align with the job description, incorporate relevant keywords honestly, and increase ATS score—without adding unsupported content.
- Resume must compile and remain strictly within a single page at all times.
- ZERO commentary, explanation, or extra text—ONLY the final, optimized LaTeX code.

Input:

Job Description:
${jobDescription}

User Resume LaTeX:
${resumeLatex}

`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let optimizedLatex = result.response.text().replaceAll("```","");
    optimizedLatex = optimizedLatex.replace("latex","");

    res.json({ optimizedLatex });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error optimizing resume");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
