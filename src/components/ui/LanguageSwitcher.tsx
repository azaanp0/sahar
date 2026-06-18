'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = i18n.language;

  const switchLanguage = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
    localStorage.setItem('sahar-language', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="تبديل اللغة"
      >
        <Globe className="w-5 h-5 text-black dark:text-white" />
        <span className="text-sm font-medium text-black dark:text-white">
          {currentLocale === 'ar' ? 'العربية' : 'English'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 min-w-[140px]">
          <button
            onClick={() => switchLanguage('ar')}
            className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
              currentLocale === 'ar' ? 'bg-[rgba(233,30,99,0.08)] text-[#E91E63] font-bold' : 'text-black dark:text-white'
            }`}
          >
            🇸🇦 العربية
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition ${
              currentLocale === 'en' ? 'bg-[rgba(233,30,99,0.08)] text-[#E91E63] font-bold' : 'text-black dark:text-white'
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  );
}
