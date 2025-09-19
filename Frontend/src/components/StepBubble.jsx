// src/components/StepBubble.jsx
import React from "react";

const StepBubble = ({ id, content, position, side = "left", onClick }) => {
  const isLeftSide = side === "left";

  return (
    <div
      id={id}
      data-id={id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`absolute z-10 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 ${
        isLeftSide ? "animate-slide-in-left" : "animate-slide-in-right"
      }`}
      style={{
        left: position.x,
        top: position.y,
        maxWidth: 280,
        width: "max-content",
      }}
    >
      {/* Step bubble */}
      <div
        className={`relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-3 ${
          isLeftSide ? "rounded-tr-none" : "rounded-tl-none"
        } group-hover:bg-white/95 transition-all duration-200`}
      >
        {/* Pointer triangle */}
        <div
          className={`absolute top-2 ${
            isLeftSide
              ? "right-0 translate-x-full"
              : "left-0 -translate-x-full"
          } w-0 h-0 border-y-8 border-y-transparent ${
            isLeftSide
              ? "border-l-8 border-l-white/90"
              : "border-r-8 border-r-white/90"
          }`}
        />

        {/* Step content */}
        <div className="flex items-start gap-3">
          {/* Step icon */}
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Step text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {content}
            </p>
          </div>
        </div>

        {/* Glow indicator */}
        <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>

        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
            isLeftSide
              ? "from-purple-500/5 to-transparent"
              : "from-transparent to-purple-500/5"
          } pointer-events-none ${
            isLeftSide ? "rounded-tr-none" : "rounded-tl-none"
          }`}
        />
      </div>

      {/* Mini connector preview (just for visual hint) */}
      <div
        className={`absolute top-1/2 ${
          isLeftSide ? "-right-3" : "-left-3"
        } w-6 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-200`}
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default StepBubble;
