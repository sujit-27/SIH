// src/components/RoadmapGenerator.jsx
import React, { useState } from "react";
import RoadmapVisualization from "./RoadmapVisualization";
import { generateRoadmapFromSummary, summarizeUserInput } from "../lib/huggingfaceService";

const RoadmapGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateRoadmap = async () => {
    if (!userInput.trim()) {
      setError("Please enter your career goals or interests");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const summary = await summarizeUserInput(userInput);
      const roadmap = await generateRoadmapFromSummary(summary);
      console.log("Final parsed roadmap:", roadmap);

      if (roadmap && Array.isArray(roadmap.stages) && roadmap.stages.length) {
        setRoadmapData(roadmap);
      } else {
        setError("No roadmap received. Showing default roadmap.");
        setRoadmapData(roadmap);
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Showing default roadmap.");
      setRoadmapData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRoadmap = () => {
    setRoadmapData(null);
    setUserInput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🎯 Career Roadmap Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Describe your career goals and aspirations, and we'll generate a personalized roadmap 
            with detailed stages, steps, and clear progression paths.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm bg-opacity-90">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              💭 Tell us about your career goals:
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., I want to become a Full Stack Java developer and work at Google. I'm currently a beginner with basic programming knowledge..."
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 shadow-inner"
              rows={6}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleGenerateRoadmap}
              disabled={isLoading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Your Roadmap...
                </>
              ) : (
                <>
                  ✨ Generate Roadmap
                </>
              )}
            </button>

            {(roadmapData || userInput) && (
              <button 
                onClick={clearRoadmap} 
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                🗑️ Clear
              </button>
            )}
          </div>
        </div>

        {roadmapData && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 backdrop-blur-sm bg-opacity-90">
            <RoadmapVisualization roadmap={roadmapData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;