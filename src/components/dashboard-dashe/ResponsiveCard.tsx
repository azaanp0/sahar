import React, { memo, ReactNode } from 'react';

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

/**
 * ResponsiveCard - Premium card component with intelligent responsive design
 * Desktop feeling, mobile optimized
 */
export const ResponsiveCard = memo(({ 
  children, 
  className = '', 
  onClick,
  hover = true 
}: ResponsiveCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        shadow-sm
        ${hover ? 'hover:shadow-xl' : ''}
        transition-all
        duration-300
        p-3
        md:p-5
        lg:p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

ResponsiveCard.displayName = 'ResponsiveCard';

export default ResponsiveCard;
