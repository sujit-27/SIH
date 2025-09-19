import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RoadmapGenerator from "./RoadmapGenerator";

// Quiz questions
const questions = [
  {
    id: 1,
    question: "Which subject do you enjoy the most?",
    options: [
      { label: "Mathematics", scores: { CSE: 5, Mechanical: 4, Civil: 3, BBA: 1 } },
      { label: "Science", scores: { MBBS: 5, BDS: 4, BSc: 3, CSE: 2 } },
      { label: "Biology", scores: { MBBS: 5, BDS: 4, Nursing: 4 } },
      { label: "Arts", scores: { Design: 5, Teaching: 4, Law: 3 } },
      { label: "Technology", scores: { CSE: 5, IT: 4, AI: 5 } },
      { label: "Commerce", scores: { BBA: 5, BCom: 4, CA: 5 } }
    ]
  },
  {
    id: 2,
    question: "Which activity excites you the most?",
    options: [
      { label: "Problem Solving", scores: { CSE: 5, Mechanical: 4, DataScience: 5 } },
      { label: "Experiments", scores: { MBBS: 5, BDS: 4, BSc: 3 } },
      { label: "Designing/Creative", scores: { Design: 5, FineArts: 4, UIUX: 5 } },
      { label: "Business/Management", scores: { BBA: 5, BCom: 5, CA: 5 } },
      { label: "Teaching/Academics", scores: { Teaching: 5, BA: 4, Law: 3 } }
    ]
  },
  {
    id: 3,
    question: "Preferred work style?",
    options: [
      { label: "Analytical & logical", scores: { CSE: 5, AI: 5, DataScience: 5, Mechanical: 3 } },
      { label: "Helping people", scores: { MBBS: 5, Nursing: 5, Teaching: 4 } },
      { label: "Creative & design", scores: { Design: 5, FineArts: 4, UIUX: 5 } },
      { label: "Business & management", scores: { BBA: 5, CA: 5, MBA: 5 } },
      { label: "Research & academics", scores: { BA: 4, BSc: 4, Law: 3 } }
    ]
  }
];

// Career details
const careerDetails = {
  MBBS: { courses: ["MBBS"], exams: ["NEET"], skills: ["Biology", "Compassion", "Focus"] },
  BDS: { courses: ["BDS"], exams: ["NEET"], skills: ["Biology", "Precision"] },
  Nursing: { courses: ["BSc Nursing"], exams: ["Entrance Exam varies by state"], skills: ["Care", "Patience"] },
  CSE: { courses: ["BTech CSE", "BCA"], exams: ["JEE Main", "State CETs"], skills: ["Programming", "Logical Thinking"] },
  Mechanical: { courses: ["BTech Mechanical"], exams: ["JEE Main/Advanced"], skills: ["Mechanics", "Problem Solving"] },
  Civil: { courses: ["BTech Civil"], exams: ["JEE Main"], skills: ["Engineering", "Design Thinking"] },
  AI: { courses: ["BTech AI", "MTech AI"], exams: ["JEE Main/Advanced"], skills: ["Maths", "Programming"] },
  DataScience: { courses: ["BSc Data Science", "BTech CSE"], exams: ["JEE", "Entrance Tests"], skills: ["Maths", "Programming", "Analytics"] },
  Design: { courses: ["BDes", "UI/UX"], exams: ["NID", "UCEED"], skills: ["Creativity", "Sketching"] },
  FineArts: { courses: ["BFA"], exams: ["Entrance Exams"], skills: ["Creativity", "Artistic Skills"] },
  UIUX: { courses: ["UI/UX Design"], exams: ["Portfolio Based"], skills: ["Design Thinking", "Tools like Figma"] },
  BBA: { courses: ["BBA", "MBA"], exams: ["IPU CET", "Various State CETs"], skills: ["Management", "Communication"] },
  BCom: { courses: ["BCom"], exams: ["CETs"], skills: ["Accounting", "Finance"] },
  CA: { courses: ["Chartered Accountancy"], exams: ["CA Foundation, IPCC"], skills: ["Accounting", "Finance"] },
  Teaching: { courses: ["BEd"], exams: ["CETs"], skills: ["Communication", "Teaching Skills"] },
  BA: { courses: ["BA"], exams: ["Various College Entrance Exams"], skills: ["Literature", "Analysis"] },
  Law: { courses: ["LLB"], exams: ["CLAT", "State LLB exams"], skills: ["Analysis", "Debating"] }
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [scores, setScores] = useState({});
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[step];

  function handleNext() {
    if (!selectedOption) return;

    const newScores = { ...scores };
    for (let career in selectedOption.scores) {
      newScores[career] = (newScores[career] || 0) + selectedOption.scores[career];
    }
    setScores(newScores);
    setSelectedOption(null);

    if (step < questions.length - 1) setStep(step + 1);
    else setFinished(true);
  }

  function getTopCareers() {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 5).map(([career]) => career);
  }

  if (finished) {
    const topCareers = getTopCareers();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Top Career Suggestions</h2>
          <ul className="space-y-6">
            {topCareers.map((career, idx) => (
              <li key={idx} className="p-4 border rounded-lg">
                <div className="font-semibold text-indigo-600">{career}</div>
                <div className="text-sm text-slate-600 mt-1">
                  <strong>Courses:</strong> {careerDetails[career]?.courses.join(", ")}
                  <br />
                  <strong>Exams:</strong> {careerDetails[career]?.exams.join(", ")}
                  <br />
                  <strong>Skills:</strong> {careerDetails[career]?.skills.join(", ")}
                </div>
                <GenerateRoadmapButton career={career} />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full"
      >
        <div className="mb-4 text-sm text-slate-500">
          Question {step + 1} of {questions.length}
        </div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setSelectedOption(opt)}
              className={`px-4 py-2 rounded-lg border text-left ${
                selectedOption === opt ? "border-indigo-600 bg-indigo-50" : "border-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
            disabled={!selectedOption}
          >
            {step === questions.length - 1 ? "Finish" : "Next Question"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Button to generate roadmap for each career
function GenerateRoadmapButton({ career }) {
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setShowRoadmap(!showRoadmap)}
        className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm"
      >
        {showRoadmap ? "Hide Roadmap" : "Generate Roadmap"}
      </button>

      {showRoadmap && <RoadmapGenerator career={career} />}
    </div>
  );
}
