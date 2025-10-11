import React from "react";

export default function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Job Description</h2>
      </div>
      <div className="p-4 flex-1 bg-slate-50">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full h-full min-h-[500px] p-3 rounded-lg border border-slate-200 
                   bg-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   outline-none transition-shadow"
          placeholder="Paste job description here..."
        />
      </div>
    </div>
  );
}
