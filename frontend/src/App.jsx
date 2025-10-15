import { useState,useEffect } from "react";
import { optimizeResume, compileResume } from "./api";
import JobDescription from "./components/JobDescription";
import LatexResume from "./components/LatexResume";
import ResumePreview from "./components/ResumePreview";
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import { Moon, Sun } from "lucide-react";

export default function App() {

  const [jobDescription, setJobDescription] = useState("");
  const [latex, setLatex] = useState(`\\documentclass{article}
\\begin{document}
Hello, this is a sample resume.
\\end{document}`);
  const [pdfUrl, setPdfUrl] = useState("");
  const [compiling, setCompiling] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [hasCompiledAtLeastOnce, setHasCompiledAtLeastOnce] = useState(false);


    useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const themeToStore = darkMode ? "dark" : "light";
    localStorage.setItem("theme", themeToStore);
  }, [darkMode, mounted]);

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
      await handleCompile(); // compiling resume automatically once its optimized;
    } catch (err) {
      console.error("Optimize error:", err);
    } finally {
      setOptimizing(false);
    }
  };
  if (!mounted) return null;

  return (
    <>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Fallback 404 route */}
          <Route path="*" element={<h2 style={{ padding: '40px', textAlign: 'center' }}>404 - Page Not Found</h2>} />
        </Routes>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative">
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

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-6 left-6 rounded-full p-3 border cursor-pointer
              transition-all duration-300 ease-in-out hover:scale-110
              ${
                darkMode
                  ? "bg-gray-800 text-gray-100 border-gray-700 hover:shadow-[0_0_15px_3px_rgba(255,215,0,0.6)]"
                  : "bg-gray-300 text-gray-800 border-gray-400 hover:shadow-[0_0_15px_3px_rgba(100,149,237,0.6)]"
              }`}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-colors duration-300 ease-in-out hover:text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700 transition-colors duration-300 ease-in-out hover:text-slate-900" />
        )}
      </button>
    </div>
    </>
  );
}
