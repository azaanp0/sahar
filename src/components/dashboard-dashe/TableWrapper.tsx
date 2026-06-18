import React, { memo } from 'react';

interface TableWrapperProps {
  children: React.ReactNode;
  className?: string;
  minWidth?: string;
}

/**
 * TableWrapper - Responsive table container with horizontal scroll
 * Ensures tables never break layout on mobile devices
 */
export const TableWrapper = memo(({ children, className = '', minWidth = '900px' }: TableWrapperProps) => {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <div className="min-w-[{minWidth}]">
        {children}
      </div>
    </div>
  );
});

TableWrapper.displayName = 'TableWrapper';

export default TableWrapper;
