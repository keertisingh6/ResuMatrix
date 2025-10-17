import React from "react";

export default function ATSScore({ score, keywords, loading }) {
    return (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 transition-colors duration-500">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mb-3">
                ATS Score Analysis
            </h3>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </div>
            ) : score !== null ? (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-gray-300 mb-1">
                                Match Score
                            </p>
                            <p className="text-3xl font-bold text-slate-800 dark:text-gray-100">
                                {score}%
                            </p>
                        </div>
                        <div
                            className={`text-sm px-3 py-1 rounded-full ${
                                score >= 80
                                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                    : score >= 60
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            }`}
                        >
                            {score >= 80
                                ? "Excellent Match"
                                : score >= 60
                                ? "Good Match"
                                : "Needs Improvement"}
                        </div>
                    </div>

                    {keywords && keywords.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-gray-200 mb-2">
                                Key Terms Found:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-slate-600 dark:text-gray-300 text-center py-4">
                    Click "Check ATS Score" to analyze your resume
                </p>
            )}
        </div>
    );
}
