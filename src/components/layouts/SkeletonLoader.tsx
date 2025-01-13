// SkeletonLoader.tsx

import React from 'react';

// CSS classes for skeleton loading effect
const skeletonClasses = 'animate-pulse bg-gray-200 rounded';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-[200px] rounded-sm border p-4 mb-5 shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <div className={`${skeletonClasses} w-3/4 h-6`}></div> {/* Title */}
      </div>
      <div className={`${skeletonClasses} h-4 mb-2`}></div> {/* Description */}
      <div className="flex items-center mt-2 space-x-2">
        <div className={`${skeletonClasses} w-16 h-4`}></div> {/* Priority Badge */}
        <div className={`${skeletonClasses} w-20 h-4`}></div> {/* Date */}
      </div>
    </div>
  );
};

export default SkeletonLoader;
