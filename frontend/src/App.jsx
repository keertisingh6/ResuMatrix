import { useState } from "react";
import { optimizeResume, compileResume } from "./api";
import JobDescription from "./components/JobDescription";
import LatexResume from "./components/LatexResume";
import ResumePreview from "./components/ResumePreview";


export default function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [latex, setLatex] = useState(`\\documentclass{article}
\\begin{document}
Hello, this is a sample resume.
\\end{document}`);
  const [pdfUrl, setPdfUrl] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [hasCompiledAtLeastOnce, setHasCompiledAtLeastOnce] = useState(false);

  const handleCompile = async () => {
    setCompiling(true);
    try {
      const url = await compileResume(latex);
      setPdfUrl(url);
      setHasCompiledAtLeastOnce(true);
    } catch (err) {
      console.error("Compile error:", err);
      setPdfUrl("");
    } finally {
      setCompiling(false);
    }
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    try {
      const optimized = await optimizeResume(jobDescription, latex);
      setLatex(optimized);
    } catch (err) {
      console.error("Optimize error:", err);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 flex gap-6 min-h-screen">
        <JobDescription
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />

        <LatexResume
          latex={latex}
          setLatex={setLatex}
          onOptimize={handleOptimize}
          optimizing={optimizing}
          onCompile={handleCompile}
          compiling={compiling}
        />

        <ResumePreview
          pdfUrl={pdfUrl}
          compiling={compiling}
          hasCompiledAtLeastOnce={hasCompiledAtLeastOnce}
        />
      </div>
    </div>
  );
}
