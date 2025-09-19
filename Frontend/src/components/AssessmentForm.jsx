import { useState } from "react";
import { summarizeUserInput, generateRoadmapFromSummary } from "../lib/huggingfaceService";

export default function AssessmentForm({ onRoadmapReady }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1️⃣ Summarize user input
      const summary = await summarizeUserInput(input || "I like coding, AI, and math.");

      // 2️⃣ Generate dynamic roadmap JSON from AI
      const roadmapJSON = await generateRoadmapFromSummary(summary);

      // 3️⃣ Send roadmap to parent
      onRoadmapReady(roadmapJSON);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <textarea
        className="w-full max-w-lg p-3 border rounded-lg"
        rows={4}
        placeholder="Describe your skills, interests, and goals..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        {loading ? "Generating Roadmap..." : "Generate Career Roadmap"}
      </button>
    </div>
  );
}
