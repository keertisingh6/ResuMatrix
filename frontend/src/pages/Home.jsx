import React, { useState } from "react";
import JobDescription from "../components/JobDescription";
import LatexResume from "../components/LatexResume";
import ResumePreview from "../components/ResumePreview";
import ATSScore from "../components/ATSScore";
import { compileResume, optimizeResume, getATSScore } from "../api";

const Home = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [latex, setLatex] = useState(
        `\\documentclass{article}\n\\begin{document}\nHello, this is a sample resume.\n\\end{document}`
    );
    const [pdfUrl, setPdfUrl] = useState(null);
    const [compiling, setCompiling] = useState(false);
    const [hasCompiledAtLeastOnce, setHasCompiledAtLeastOnce] = useState(false);
    const [atsScore, setATSScore] = useState(null);
    const [atsKeywords, setATSKeywords] = useState([]);
    const [atsLoading, setATSLoading] = useState(false);

    const handleCompile = async () => {
        setCompiling(true);
        try {
            const url = await compileResume(latex);
            setPdfUrl(url);
            setHasCompiledAtLeastOnce(true);
        } catch (error) {
            console.error("Compilation failed:", error);
            alert(
                "Failed to compile resume. Please check your LaTeX code and try again."
            );
        }
        setCompiling(false);
    };

    const handleOptimize = async () => {
        if (!jobDescription) {
            alert("Please add a job description first.");
            return;
        }
        try {
            const optimizedLatex = await optimizeResume(jobDescription, latex);
            setLatex(optimizedLatex);
        } catch (error) {
            console.error("Optimization failed:", error);
            alert("Failed to optimize resume. Please try again later.");
        }
    };

    const handleATSCheck = async () => {
        if (!latex || !jobDescription) {
            alert("Please provide both resume content and job description.");
            return;
        }

        setATSLoading(true);
        try {
            console.log("Sending ATS check request with:", {
                resumeText: latex,
                jobDescription: jobDescription,
            });
            const { score, keywords } = await getATSScore(
                latex,
                jobDescription
            );
            console.log("Received ATS check response:", { score, keywords });
            setATSScore(score);
            setATSKeywords(keywords);
        } catch (error) {
            console.error("ATS check failed:", error);
            alert("Failed to check ATS score. Please try again later.");
        }
        setATSLoading(false);
    };

    return (
        <div className="p-6 flex flex-col min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors duration-500">
            <div className="flex gap-6 mb-6">
                <JobDescription
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                />
                <LatexResume
                    latex={latex}
                    setLatex={setLatex}
                    onCompile={handleCompile}
                    onOptimize={handleOptimize}
                    onATSCheck={handleATSCheck}
                />
                <ResumePreview
                    pdfUrl={pdfUrl}
                    compiling={compiling}
                    hasCompiledAtLeastOnce={hasCompiledAtLeastOnce}
                />
            </div>
            <ATSScore
                score={atsScore}
                keywords={atsKeywords}
                loading={atsLoading}
            />
        </div>
    );
};

export default Home;
