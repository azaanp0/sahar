import React, { memo, useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

/**
 * MobileDrawer - Premium mobile drawer with Framer Motion animations
 * Bottom sheet style for mobile, slide-in drawer for larger screens
 */
export const MobileDrawer = memo(({ 
  isOpen, 
  onClose, 
  children,
  position = 'right'
}: MobileDrawerProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className={`
          fixed z-50 bg-white dark:bg-gray-800 border border-[#E91E63] dark:border-[#C2185B] shadow-2xl
          transition-all duration-300 ease-in-out
          lg:hidden
          ${position === 'right' ? 'right-0 top-0 h-full' : 'left-0 top-0 h-full'}
          w-72 sm:w-80
          ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E91E63] dark:border-[#C2185B] sticky top-0 bg-white dark:bg-gray-800 z-10">
          <span className="font-bold text-black dark:text-white text-sm sm:text-base">
            متجر سحر | لوحة التحكم
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-300"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto h-full pb-20">
          {children}
        </div>
      </div>
    </>
  );
});

MobileDrawer.displayName = 'MobileDrawer';

export default MobileDrawer;
