import React, { memo, ReactNode } from 'react';

interface ChartCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  height?: string;
}

/**
 * ChartCard - Premium chart container with responsive height
 * Maintains readability across all devices
 */
export const ChartCard = memo(({ 
  children, 
  title, 
  subtitle,
  className = '',
  height = '280px'
}: ChartCardProps) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800
      rounded-3xl
      border border-gray-200 dark:border-gray-700
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      p-3
      md:p-5
      lg:p-6
      ${className}
    `}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-bold text-black dark:text-white text-sm sm:text-base lg:text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-black/60 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Chart Container */}
      <div 
        className="w-full overflow-x-auto"
        style={{ minHeight: height }}
      >
        {children}
      </div>
    </div>
  );
});

ChartCard.displayName = 'ChartCard';

export default ChartCard;
