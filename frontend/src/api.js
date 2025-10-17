export const optimizeResume = async (jobDescription, latex) => {
    const res = await fetch("http://localhost:3000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeLatex: latex }),
    });
    const data = await res.json();
    return data.optimizedLatex;
};

export const compileResume = async (latex) => {
    const res = await fetch("http://localhost:3000/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: latex }),
    });
    const blob = await res.blob();
    return URL.createObjectURL(blob);
};

export const getATSScore = async (resumeText, jobDescription) => {
    const res = await fetch("http://localhost:3000/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
    });

    if (!res.ok) {
        throw new Error("Failed to get ATS score");
    }

    const data = await res.json();
    return {
        score: data.score,
        keywords: data.keywords,
    };
};
