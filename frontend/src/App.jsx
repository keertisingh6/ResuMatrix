import { useState, useEffect } from "react";
import { optimizeResume, compileResume } from "./api";
import JobDescription from "./components/JobDescription";
import LatexResume from "./components/LatexResume";
import ResumePreview from "./components/ResumePreview";
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';


export default function App() {

  const [jobDescription, setJobDescription] = useState("");
  const [latex, setLatex] = useState(`\\documentclass{article}
\\begin{document}
Hello, this is a sample resume.
\\end{document}`);
  const [pdfUrl, setPdfUrl] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    setCompiling(true);
    const timeout = setTimeout(async () => {
      try {
        const url = await compileResume(latex);
        setPdfUrl(url);
      } catch (err) {
        console.error("Compile error:", err);
        setPdfUrl("");
      } finally {
        setCompiling(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [latex]);

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
    <>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Fallback 404 route */}
          <Route path="*" element={<h2 style={{ padding: '40px', textAlign: 'center' }}>404 - Page Not Found</h2>} />
        </Routes>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 flex gap-6 min-h-screen">
        <JobDescription
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />

        <LatexResume latex={latex} setLatex={setLatex} onOptimize={handleOptimize} optimizing={optimizing} />

        <ResumePreview pdfUrl={pdfUrl} compiling={compiling} />
      </div>
    </div>
    </>
  );
}
