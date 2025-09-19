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
      const response = await generateRoadmapFromSummary(summary);

      console.log("Backend response:", response);

      if (response?.generated_text) {
        try {
          // Strip potential newline characters and parse
          const parsedRoadmap = JSON.parse(response.generated_text.replace(/\n/g, ""));
          console.log("Parsed roadmap:", parsedRoadmap);
          setRoadmapData(parsedRoadmap);
        } catch (parseError) {
          console.error("Parsing error:", parseError);
          setError("Failed to parse roadmap. Showing default roadmap.");
          setRoadmapData(null);
        }
      } else {
        setError("No roadmap received. Showing default roadmap.");
        setRoadmapData(null);
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Career Roadmap Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your career goals, and we'll generate a personalized roadmap with stages and steps.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g., I want to become a Full Stack Java developer and work at Google..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            rows={5}
          />
          {error && <div className="mt-3 text-red-600">{error}</div>}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleGenerateRoadmap}
              disabled={isLoading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate Roadmap"}
            </button>
            {(roadmapData || userInput) && (
              <button
                onClick={clearRoadmap}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <RoadmapVisualization roadmap={roadmapData} />
      </div>
    </div>
  );
};

export default RoadmapGenerator;
