import React, { memo, ReactNode } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FiltersProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  children?: ReactNode;
  showClear?: boolean;
  onClear?: () => void;
}

/**
 * Filters - Premium responsive filter component
 * Collapsible on mobile, expanded on desktop
 */
export const Filters = memo(({ 
  searchPlaceholder = 'بحث...',
  searchValue = '',
  onSearchChange,
  filterOptions = [],
  filterValue = '',
  onFilterChange,
  children,
  showClear = false,
  onClear
}: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-3xl shadow-sm border border-[#E91E63] dark:border-[#C2185B] transition-all duration-300">
      {/* Search */}
      {onSearchChange && (
        <div className="flex items-center gap-2 flex-1 min-w-[150px] sm:min-w-[200px] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border border-[#E91E63] dark:border-[#C2185B] rounded-xl px-3 py-2 transition-all duration-300">
          <Search className="w-4 h-4 text-black dark:text-gray-300 flex-shrink-0" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-xs sm:text-sm outline-none flex-1 text-black dark:text-white min-w-0"
            aria-label="بحث"
          />
        </div>
      )}

      {/* Filter Dropdown */}
      {onFilterChange && filterOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black dark:text-gray-300 flex-shrink-0" />
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-[#E91E63] dark:border-[#C2185B] rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-[#E91E63] dark:focus:ring-[#C2185B] transition-all duration-300 min-h-[44px]"
            aria-label="تصفية"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Additional Filters */}
      {children}

      {/* Clear Button */}
      {showClear && onClear && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-2 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white rounded-xl text-xs sm:text-sm transition-colors duration-300 min-h-[44px]"
          aria-label="مسح الفلاتر"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">مسح</span>
        </button>
      )}
    </div>
  );
});

Filters.displayName = 'Filters';

export default Filters;
