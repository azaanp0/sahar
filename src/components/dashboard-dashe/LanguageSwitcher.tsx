import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('sahar-language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-[10px] sm:text-xs font-bold transition-all duration-300 ease min-h-[44px]"
      title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B]" />
      <span className="hidden sm:inline">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
      <span className="sm:hidden">{i18n.language === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
}
