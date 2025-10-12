import React from "react";

export default function LatexResume({ latex, setLatex, onOptimize, optimizing, onCompile, compiling }) {
  return (
   <div className="w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500">
      <div className="p-4 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800  dark:text-gray-100">Resume LaTeX</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onOptimize}
            disabled={optimizing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white 
                     px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow
                     transform transition-all duration-200 hover:-translate-y-0.5
                     active:translate-y-0 cursor-pointer disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            {optimizing ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Optimizing...
              </>
            ) : (
              "Optimize Resume"
            )}
          </button>
          <button
            onClick={onCompile}
            disabled={compiling}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white 
                     px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow
                     transform transition-all duration-200 hover:-translate-y-0.5
                     active:translate-y-0 cursor-pointer disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            {compiling ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Compiling...
              </>
            ) : (
              "Compile Resume"
            )}
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 bg-slate-50 dark:bg-gray-900 transition-colors duration-500">
        <textarea
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          className="w-full h-full min-h-[500px] p-3 rounded-lg border border-slate-200 dark:border-gray-700
                     font-mono text-sm bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-100
                     resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                     transition-colors duration-500"
          placeholder="LaTeX code here..."
        />
      </div>
    </div>
  );
}
