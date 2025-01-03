import React from 'react';

function Dynamic() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* Bubble decorations */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-pulse delay-150"></div>
        
        {/* Main card */}
        <div className="relative bg-white/70 p-8 rounded-3xl shadow-xl border border-white/20 transform hover:scale-105 transition-transform duration-300 backdrop-blur">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Dynamic Programming
            </h2>
            <p className="text-gray-600 text-center max-w-xs">
              Coming Soon... 💡
            </p>
            
            {/* Loading dots */}
            <div className="flex space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dynamic;