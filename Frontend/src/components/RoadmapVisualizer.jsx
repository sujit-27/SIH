// import { useState } from "react";

// const RoadmapVisualization = ({ roadmapData }) => {
//   if (!roadmapData?.stages?.length) {
//     return (
//       <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
//         <div className="text-center">
//           <div className="text-6xl mb-4 animate-bounce">🗺️</div>
//           <p className="text-xl font-semibold text-gray-600 mb-2">No Roadmap Generated Yet</p>
//           <p className="text-sm text-gray-500">Enter your career goals above to create your personalized roadmap</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Career Roadmap</h2>
//         {roadmapData.summary && (
//           <p className="text-gray-600 bg-white bg-opacity-50 rounded-lg px-4 py-2 inline-block">
//             <span className="font-medium">Based on:</span> {roadmapData.summary}
//           </p>
//         )}
//       </div>
      
//       {/* Roadmap Stages */}
//       <div className="flex flex-col items-center space-y-0">
//         {roadmapData.stages.map((stage, index) => (
//           <RoadmapStage
//             key={stage.id}
//             stage={stage}
//             index={index}
//             isLast={index === roadmapData.stages.length - 1}
//           />
//         ))}
//       </div>
      
//       {/* Legend */}
//       <div className="mt-8 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4">
//         <h4 className="font-semibold text-gray-800 mb-3">Legend:</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div>
//             <span className="font-medium">Difficulty Levels:</span>
//             <div className="flex gap-2 mt-1 flex-wrap">
//               <span className="px-2 py-1 rounded bg-green-100 border border-green-400 text-green-800">Easy</span>
//               <span className="px-2 py-1 rounded bg-yellow-100 border border-yellow-400 text-yellow-800">Medium</span>
//               <span className="px-2 py-1 rounded bg-red-100 border border-red-400 text-red-800">Hard</span>
//             </div>
//           </div>
//           <div>
//             <span className="font-medium">Priority Levels:</span>
//             <div className="flex gap-3 mt-1 flex-wrap">
//               <span>🔥 High Priority</span>
//               <span>⭐ Medium Priority</span>
//               <span>💡 Low Priority</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const RoadmapVisualizer = () => {
//   const [userInput, setUserInput] = useState('');
//   const [roadmapData, setRoadmapData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleGenerateRoadmap = async () => {
//     if (!userInput.trim()) {
//       setError('Please enter your career goals or interests');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Step 1: Summarize user input
//       console.log('Summarizing user input...');
//       const summary = await summarizeUserInput(userInput);
      
//       // Step 2: Generate roadmap from summary
//       console.log('Generating roadmap...');
//       const roadmap = await generateRoadmapFromSummary(summary);
      
//       setRoadmapData(roadmap);
//     } catch (err) {
//       console.error('Error generating roadmap:', err);
//       setError('Failed to generate roadmap. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearRoadmap = () => {
//     setRoadmapData(null);
//     setUserInput('');
//     setError('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <div className="max-w-4xl mx-auto p-6 space-y-8">
//         {/* Header */}
//         <div className="text-center py-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
//             Career Roadmap Generator
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Transform your career aspirations into a structured, actionable roadmap. 
//             Tell us about your goals and we'll create a personalized learning path for you.
//           </p>
//         </div>

//         {/* Input Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//           <label className="block text-lg font-semibold text-gray-700 mb-4">
//             📝 Describe your career goals and aspirations:
//           </label>
//           <textarea
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="e.g., I want to become a Full Stack Java developer and work at Google. I love building web applications and have some programming experience. I'm particularly interested in Spring Boot and React..."
//             className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
//             rows={6}
//           />
          
//           {error && (
//             <div className="mt-3 flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
//               <span className="text-xl mr-2">⚠️</span>
//               {error}
//             </div>
//           )}

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleGenerateRoadmap}
//               disabled={isLoading}
//               className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                   Generating Your Roadmap...
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center">
//                   <span className="text-xl mr-2">🚀</span>
//                   Generate My Roadmap
//                 </div>
//               )}
//             </button>
            
//             {roadmapData && (
//               <button
//                 onClick={clearRoadmap}
//                 className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Roadmap Visualization */}
//         <RoadmapVisualization roadmapData={roadmapData} />

//         {/* Sample roadmap for demo when no data */}
//         {!roadmapData && (
//           <div className="opacity-75">
//             <RoadmapVisualization roadmapData={{
//               summary: "Sample: Full Stack Java Developer Career Path",
//               stages: [
//                 {
//                   id: "beginner",
//                   title: "Foundation Building",
//                   steps: [
//                     "Master Java fundamentals and OOP concepts",
//                     "Learn HTML, CSS, and JavaScript basics", 
//                     "Understand database concepts (SQL)",
//                     "Get comfortable with an IDE (IntelliJ IDEA)"
//                   ],
//                   next: ["intermediate"],
//                   importance: "high",
//                   difficulty: "easy"
//                 },
//                 {
//                   id: "intermediate", 
//                   title: "Framework Mastery",
//                   steps: [
//                     "Learn Spring Boot for backend development",
//                     "Master React or Angular for frontend",
//                     "Build REST APIs and consume them",
//                     "Learn version control with Git",
//                     "Work with databases (MySQL, PostgreSQL)"
//                   ],
//                   next: ["advanced"],
//                   importance: "high",
//                   difficulty: "medium"
//                 },
//                 {
//                   id: "advanced",
//                   title: "Professional Excellence", 
//                   steps: [
//                     "Master microservices architecture",
//                     "Learn cloud platforms (AWS, GCP, Azure)",
//                     "Implement DevOps practices and CI/CD",
//                     "Build scalable, production-ready applications",
//                     "Contribute to open source projects"
//                   ],
//                   next: [],
//                   importance: "high",
//                   difficulty: "hard"
//                 }
//               ]
//             }} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoadmapVisualizer;