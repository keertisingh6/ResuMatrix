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
  try {
    const res = await fetch("http://localhost:3000/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: latex }),
    });

    // Check if response is an error (JSON) or success (PDF blob)
    const contentType = res.headers.get("content-type");

    if (!res.ok || contentType?.includes("application/json")) {
      // It's an error response
      const data = await res.json();
      
      // Handle validation errors (400)
      if (res.status === 400 && data.errors) {
        const errorMessages = data.errors.map(err => err.message).join(', ');
        throw new Error(`Validation Error: ${errorMessages}`);
      }
      
      // Handle rate limiting (429)
      if (res.status === 429) {
        throw new Error(data.message || 'Too many compilation requests. Please try again later.');
      }

      // Handle compilation errors (500)
      throw new Error(data.message || 'LaTeX compilation failed');
    }

    // It's a successful PDF response
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
};
