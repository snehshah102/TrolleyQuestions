import React from 'react';

const Progress = ({ current, total, isComplete }) => {
  const percentage = isComplete ? 100 : (current / total) * 100;
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-secondary-100 shadow-sm"
      role="navigation"
      aria-label="Question Progress"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Question Counter or Complete Status */}
          <div className="flex items-center space-x-3">
            {isComplete ? (
              <span className="text-4xl font-display font-bold gradient-text">
                Complete
              </span>
            ) : (
              <>
                <span className="text-5xl font-display font-bold gradient-text">
                  {String(current + 1).padStart(2, '0')}
                </span>
                <div className="text-sm font-medium">
                  <div className="text-secondary-600">Question</div>
                  <div className="text-primary-600">of {String(total).padStart(2, '0')}</div>
                </div>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-12">
            <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Question Progress"
              />
            </div>
          </div>

          {/* Journey Phase */}
          <div className="text-sm font-medium">
            <span className={
              isComplete || current === total - 1 
                ? 'text-primary-600 font-semibold'
                : 'text-secondary-400'
            }>
              {isComplete ? 'Journey Complete' : current === total - 1 ? 'Final Question' : 'Your Journey'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress; 