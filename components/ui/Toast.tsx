import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  duration = 3000,
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border shadow-lg',
        bgColors[type]
      )}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/5 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};
