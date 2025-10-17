export const optimizeResume = async (jobDescription, latex) => {
  try {
    const res = await fetch("http://localhost:3000/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription, resumeLatex: latex }),
    });

    const data = await res.json();

    // Handle HTTP error responses
    if (!res.ok) {
      // Handle validation errors (400)
      if (res.status === 400 && data.errors) {
        const errorMessages = data.errors.map(err => err.message).join(', ');
        throw new Error(`Validation Error: ${errorMessages}`);
      }
      
      // Handle rate limiting (429)
      if (res.status === 429) {
        throw new Error(data.message || 'Too many requests. Please try again later.');
      }

      // Handle other errors
      throw new Error(data.message || 'Failed to optimize resume');
    }

    // Check for success field in response
    if (!data.success || !data.optimizedLatex) {
      throw new Error('Invalid response from server');
    }

    return data.optimizedLatex;
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
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
