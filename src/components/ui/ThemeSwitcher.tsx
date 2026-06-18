'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { value: 'light', icon: Sun, label: 'فاتح' },
    { value: 'dark', icon: Moon, label: 'ليلي' },
    { value: 'system', icon: Monitor, label: 'النظام' },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="تبديل الثيم"
      >
        <currentTheme.icon className="w-5 h-5 text-black dark:text-white" />
        <span className="text-sm font-medium text-black dark:text-white hidden sm:inline">
          {currentTheme.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 min-w-[140px]">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.value;
            return (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={`w-full text-right flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
                  isActive ? 'bg-[rgba(233,30,99,0.08)] text-[#E91E63] font-bold' : 'text-black dark:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {isActive && <span className="mr-auto text-[#E91E63]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
