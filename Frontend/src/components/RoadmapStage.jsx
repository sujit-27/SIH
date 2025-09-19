<<<<<<< HEAD
import React from 'react';

const RoadmapStage = ({ stage, index, isLast }) => {
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-800';
      case 'medium': return 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400 text-yellow-800';
      case 'hard': return 'bg-gradient-to-br from-red-100 to-red-200 border-red-400 text-red-800';
      default: return 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-800';
    }
  };
=======
// src/components/RoadmapStage.jsx
import React from 'react';

const RoadmapStage = ({ stage, index }) => {
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': 
        return 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-800 shadow-green-200';
      case 'medium': 
        return 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400 text-yellow-800 shadow-yellow-200';
      case 'hard': 
        return 'bg-gradient-to-br from-red-100 to-red-200 border-red-400 text-red-800 shadow-red-200';
      default: 
        return 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-400 text-gray-800 shadow-gray-200';
    }
  };

>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
  const getImportanceIcon = (importance) => {
    switch (importance?.toLowerCase()) {
      case 'high': return '🔥';
      case 'medium': return '⭐';
      case 'low': return '💡';
      default: return '📋';
    }
  };
<<<<<<< HEAD
  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-80 p-6 rounded-xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${getDifficultyStyle(stage.difficulty)}`}>
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{stage.title}</h3>
          <span className="text-2xl">{getImportanceIcon(stage.importance)}</span>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-50 backdrop-blur-sm">
            {stage.difficulty || 'Unknown'} Level
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-50 backdrop-blur-sm">
            {stage.importance || 'Medium'} Priority
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 flex items-center">
            <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
            Key Steps:
          </p>
          <ul className="space-y-2">
            {stage.steps?.map((step, stepIndex) => (
              <li key={stepIndex} className="flex items-start text-sm">
                <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center py-6">
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-blue-600"></div>
        </div>
      )}
=======

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-96 p-6 rounded-2xl border-2 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 transform ${getDifficultyStyle(stage.difficulty)}`}>
        {/* Stage number badge */}
        <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {index + 1}
        </div>

        {/* Header section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 leading-tight">{stage.title}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                {getDifficultyIcon(stage.difficulty)}
                <span className="font-semibold">
                  {stage.difficulty || 'Unknown'} Level
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">{getImportanceIcon(stage.importance)}</span>
            <span className="text-xs font-bold px-2 py-1 bg-white/70 rounded-full backdrop-blur-sm">
              {stage.importance?.toUpperCase() || 'MEDIUM'}
            </span>
          </div>
        </div>

        {/* Priority and difficulty badges */}
        <div className="flex gap-3 mb-6">
          <span className="px-4 py-2 text-sm font-bold rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
            📊 {stage.difficulty || 'Unknown'} Difficulty
          </span>
          <span className="px-4 py-2 text-sm font-bold rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
            🎯 {stage.importance || 'Medium'} Priority
          </span>
        </div>

        {/* Steps section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-current rounded-full mr-3 animate-pulse"></div>
            <h4 className="font-bold text-lg">Key Learning Steps:</h4>
          </div>
          <div className="space-y-3">
            {stage.steps?.map((step, stepIndex) => (
              <div key={stepIndex} className="flex items-start group hover:bg-white/40 p-2 rounded-lg transition-colors duration-200">
                <div className="w-6 h-6 bg-white/80 text-current rounded-full flex items-center justify-center text-xs font-bold mr-4 mt-0.5 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200">
                  {stepIndex + 1}
                </div>
                <span className="text-sm leading-relaxed font-medium flex-1">
                  {step}
                </span>
              </div>
            )) || (
              <div className="text-center text-sm italic opacity-75 py-4">
                No specific steps provided
              </div>
            )}
          </div>
        </div>

        {/* Stage ID footer */}
        <div className="mt-6 pt-4 border-t border-white/40 flex justify-between items-center text-xs">
          <span className="flex items-center gap-2 opacity-75">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
            Stage Identifier
          </span>
          <span className="bg-white/60 px-3 py-1 rounded-full font-mono font-bold">
            #{stage.id}
          </span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full -z-10 animate-pulse delay-1000"></div>
      </div>
>>>>>>> cd27e79f15a5b8eb00c023484bd314c6ccde3bb9
    </div>
  );
};

export default RoadmapStage;
