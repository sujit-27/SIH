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
  const getImportanceIcon = (importance) => {
    switch (importance?.toLowerCase()) {
      case 'high': return '🔥';
      case 'medium': return '⭐';
      case 'low': return '💡';
      default: return '📋';
    }
  };
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
    </div>
  );
};

export default RoadmapStage;
