import React from "react";

export default function ResumePreview({ pdfUrl, compiling, hasCompiledAtLeastOnce }) {
  return (
    <div className="w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 flex flex-col overflow-hidden transition-colors duration-500">
      <div className="p-4 border-b border-slate-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
          Compiled Resume
          {compiling && (
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              Compiling...
            </span>
          )}
        </h2>
      </div>
      
      <div className="flex-1 bg-slate-50 dark:bg-gray-900 p-4 transition-colors duration-500">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            title="PDF Preview"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-slate-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-500">
            {compiling ? (
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-slate-600 dark:text-gray-200">Compiling your resume...</p>
              </div>
            ) : (
              <div className="text-center text-slate-500 dark:text-gray-300">
                <svg className="h-12 w-12 mx-auto mb-4 text-slate-400 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-600">No preview yet</p>
                <p className="text-sm mt-1 text-slate-400 dark:text-gray-400">
                  {hasCompiledAtLeastOnce
                    ? "Update the LaTeX and click Compile Resume to refresh the preview."
                    : "Click Compile Resume to generate your first preview."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
