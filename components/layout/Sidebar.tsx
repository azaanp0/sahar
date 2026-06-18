import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'الرئيسية',
    path: '/',
  },
  {
    label: 'المنتجات',
    path: '/products',
  },
  {
    label: 'الماركات',
    path: '/brands',
  },
  {
    label: 'العروض',
    path: '/offers',
  },
  {
    label: 'المدونة',
    path: '/blog',
  },
  {
    label: 'حسابي',
    path: '/account',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);

    return (
      <div key={item.label}>
        <Link
          to={item.path || '#'}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.label);
            } else {
              onClose();
            }
          }}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            depth > 0 && 'pr-8',
            item.path ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-900 font-medium'
          )}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            <button className="p-1">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </Link>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children?.map((child) => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">القائمة</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => renderSidebarItem(item))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Link
              to="/contact"
              onClick={onClose}
              className="block w-full py-3 text-center bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
