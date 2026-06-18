import { useState, useEffect } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { AdminUser } from '@/lib/dashboard-dashe/db';
import Auth from './Auth';
import Sidebar from './Sidebar';
import type { Page } from './Sidebar';
import DashboardHome from './DashboardHome';
import OnyxSync from './OnyxSync';
import ProductManager from './ProductManager';
import MediaLibrary from './MediaLibrary';
import ThemeCustomizer from './ThemeCustomizer';
import SeoRedirects from './SeoRedirects';
import TutorialHub from './TutorialHub';
import {
  Menu, X, Bell, Sparkles, BookOpen, LogOut,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import '@/styles/index.css';

interface TourStep {
  selector: string;
  text: string;
  tab: Page;
}

const TOURS: Record<string, TourStep[]> = {
  theme: [
    { tab: 'theme', selector: '[data-tour="theme-tab-general"]', text: 'مرحباً بك! سنقوم معاً بتعلم كيفية تخصيص واجهات المتجر. أولاً، انقر على تبويب "هوية وألوان المتجر" لفتح خيارات الألوان والخطوط.' },
    { tab: 'theme', selector: '[data-tour="theme-presets"]', text: 'ممتاز! هنا يمكنك اختيار أحد الألوان الجاهزة لمتجرك أو تخصيص اللون الأساسي واللون الفرعي يدوياً.' },
    { tab: 'theme', selector: '[data-tour="theme-preview"]', text: 'شاهد هنا! في هذا القسم تظهر لك معاينة حية لشكل المتجر الفعلي على الجوال أو الكمبيوتر في الوقت الفعلي أثناء تعديلاتك.' },
    { tab: 'theme', selector: '[data-tour="theme-save"]', text: 'أخيراً، بعد تعديل الألوان، انقر على زر "حفظ التغييرات" لتطبيق المظهر الجديد على متجرك بنجاح!' }
  ],
  sync: [
    { tab: 'onyx-sync', selector: '[data-tour="sync-settings"]', text: 'أهلاً بك في دليل ربط المخازن! هنا يمكنك إدخال إعدادات خادم Onyx ERP ورمز الفرع ومفتاح API لربط قواعد البيانات.' },
    { tab: 'onyx-sync', selector: '[data-tour="sync-button"]', text: 'رائع! بعد إعداد الخادم، انقر على زر "بدء المزامنة الآن" للاتصال بقواعد البيانات وسحب الأصناف حياً.' },
    { tab: 'onyx-sync', selector: '[data-tour="sync-progress"]', text: 'هنا يظهر سجل الاتصال ونسبة التقدم الحية أثناء سحب الأسماء والمخزون والصور من قواعد بيانات أونكس.' },
    { tab: 'onyx-sync', selector: '[data-tour="sync-items-table"]', text: 'اكتمل السحب! هنا تظهر كافة الأصناف المسحوبة. حدد المنتجات واضغط "إضافة للمتجر" لتبدأ في عرضها للعملاء.' }
  ],
  media: [
    { tab: 'media', selector: '[data-tour="media-dropzone"]', text: 'مرحباً بك في دليل مكتبة الصور. هنا يمكنك سحب وإفلات أي صورة لرفعها مباشرة للمتجر.' },
    { tab: 'media', selector: '[data-tour="media-first-card"]', text: 'الآن، انقر على الصورة المصغرة لأول منتج متوفر في مكتبة الصور لعرض بياناتها وتعديلها في لوحة التحكم.' },
    { tab: 'media', selector: '[data-tour="media-alt-input"]', text: 'اكتب هنا وصفاً معبراً ودقيقاً للصورة في حقل "النص البديل (Alt)" لتهيئة متجرك لمحركات بحث جوجل والـ SEO.' },
    { tab: 'media', selector: '[data-tour="media-save-details"]', text: 'رائع! أخيراً انقر على زر "حفظ Alt" لتحديث بيانات الصورة وربطها بالمنتج بنجاح.' }
  ],
  redirect: [
    { tab: 'seo', selector: '[data-tour="seo-tab-redirects"]', text: 'أهلاً بك في دليل تهيئة محركات البحث (SEO). أولاً، تأكد أنك في تبويب "روابط التحويل" لإدارة روابط 301.' },
    { tab: 'seo', selector: '[data-tour="seo-from-input"]', text: 'أدخل هنا المسار القديم المكسور الذي لم يعد يعمل (مثل: /old-shampoo) مع البدء بشرطة مائلة /.' },
    { tab: 'seo', selector: '[data-tour="seo-to-input"]', text: 'ثم أدخل هنا المسار الجديد الذي ترغب في توجيه الزبائن ومحركات البحث إليه.' },
    { tab: 'seo', selector: '[data-tour="seo-add-button"]', text: 'أخيراً، اضغط على زر "إضافة الرابط" ليتم تسجيل التحويل وبدء تفعيله فوراً على متجر سحر.' }
  ]
};

export default function DasheDashboard() {
  const [admin, setAdmin] = useState<AdminUser | null>(db.getAdmin());
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guided Tour States
  const [activeTour, setActiveTour] = useState<'theme' | 'sync' | 'media' | 'redirect' | null>(null);
  const [tourStep, setTourStep] = useState<number>(0);
  const [completedTours, setCompletedTours] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sahar_completed_tours');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Handle logout
  const handleLogout = () => {
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
      db.logout();
      setAdmin(null);
      setActiveTour(null);
    }
  };

  // Launch Tour from Tutorial Hub
  const startTour = (tourId: 'theme' | 'sync' | 'media' | 'redirect') => {
    setActiveTour(tourId);
    setTourStep(0);
    const firstStep = TOURS[tourId][0];
    setCurrentPage(firstStep.tab);
    setMobileMenuOpen(false);
  };

  // Next Step in Tour
  const nextTourStep = () => {
    if (!activeTour) return;
    const steps = TOURS[activeTour];
    if (tourStep < steps.length - 1) {
      const nextStepIndex = tourStep + 1;
      setTourStep(nextStepIndex);
      setCurrentPage(steps[nextStepIndex].tab);
    } else {
      // Completed Tour!
      const updated = [...completedTours];
      if (!updated.includes(activeTour)) {
        updated.push(activeTour);
        setCompletedTours(updated);
        localStorage.setItem('sahar_completed_tours', JSON.stringify(updated));
      }
      alert('تهانينا! لقد أكملت الجلسة التدريبية بنجاح. يمكنك المتابعة بشكل حقيقي الآن! 🎉');
      setActiveTour(null);
      setCurrentPage('tutorial');
    }
  };

  // Previous Step in Tour
  const prevTourStep = () => {
    if (!activeTour || tourStep === 0) return;
    const steps = TOURS[activeTour];
    const prevStepIndex = tourStep - 1;
    setTourStep(prevStepIndex);
    setCurrentPage(steps[prevStepIndex].tab);
  };

  // End Tour Early
  const endTour = () => {
    if (confirm('هل ترغب في إنهاء الجلسة التعليمية الحالية؟')) {
      setActiveTour(null);
    }
  };

  // Highlight elements during the tour
  useEffect(() => {
    if (!activeTour) {
      // Remove all highlights
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
      return;
    }

    const steps = TOURS[activeTour];
    const step = steps[tourStep];
    if (!step) return;

    // Wait for view component to render
    const timer = setTimeout(() => {
      // Clean previous
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });

      // Highlight target element
      const el = document.querySelector(step.selector);
      if (el) {
        el.classList.add('tutorial-highlight');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [activeTour, tourStep, currentPage]);

  // If not logged in, render Auth form
  if (!admin) {
    return <Auth onLogin={() => setAdmin(db.getAdmin())} />;
  }

  // Render Page Content based on tab
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'onyx-sync':
        return <OnyxSync />;
      case 'products':
        return <ProductManager />;
      case 'media':
        return <MediaLibrary />;
      case 'theme':
        return <ThemeCustomizer />;
      case 'seo':
        return <SeoRedirects />;
      case 'tutorial':
        return <TutorialHub onStartTour={startTour} completedTours={completedTours} />;
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-[14px] border border-[#E91E63] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease space-y-6 text-right">
            <h2 className="text-xl font-bold text-black">إعدادات النظام العامة</h2>
            <div className="bg-[rgba(233,30,99,0.08)] p-4 rounded-[14px] text-black text-xs">
              مرحباً بك في لوحة إعدادات النظام. الميزات المتاحة حالياً تشمل إدارة الحسابات، صلاحيات المدراء، ومزامنة قواعد البيانات الخارجية.
            </div>
            <div className="space-y-4">
              <div className="border border-[#E91E63] p-4 rounded-[14px] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-black text-sm">حساب المشرف الحالي</h4>
                  <p className="text-xs text-black mt-1">الاسم: {admin.name} ({admin.role})</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-[14px] text-xs transition-all">
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FB] dark:bg-gray-900 flex text-right w-full overflow-x-hidden" style={{ fontFamily: 'var(--font-main, \'Cairo\'), \'Tajawal\', sans-serif' }}>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block h-screen sticky top-0 flex-shrink-0">
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            if (activeTour) {
              if (confirm('تنبيه: سيؤدي تغيير الصفحة يدوياً إلى إنهاء الجلسة التعليمية. هل تريد المتابعة؟')) {
                setActiveTour(null);
                setCurrentPage(page);
              }
            } else {
              setCurrentPage(page);
            }
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 sm:w-80 bg-white dark:bg-gray-800 border border-[#E91E63] dark:border-[#C2185B] text-black dark:text-white h-full shadow-2xl z-50 animate-slideLeft overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#E91E63] dark:border-[#C2185B] sticky top-0 bg-white dark:bg-gray-800 z-10">
              <span className="font-bold text-black dark:text-white text-sm sm:text-base">
                متجر سحر | لوحة التحكم
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>

            <Sidebar
              currentPage={currentPage}
              onNavigate={(page) => {
                setMobileMenuOpen(false);
                if (activeTour) {
                  setActiveTour(null);
                }
                setCurrentPage(page);
              }}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content Shell */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Top Header Bar */}
        <header className="h-14 sm:h-16 bg-white dark:bg-gray-800 border-b border-[#E91E63] dark:border-[#C2185B] flex items-center justify-between px-3 sm:px-6 z-30 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex-shrink-0">
          {/* Right Section (Burger Menu + Brand logo/Title) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 sm:p-2 text-gray-900 hover:bg-pink-50 rounded-xl lg:hidden transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <span className="font-bold text-black dark:text-white text-sm sm:text-base">سحر</span>
            </div>
          </div>

          {/* Left Section (Search + Sales + Profile + Notifications) */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Daily Simulated Sales Indicator - Mobile Icon Only */}
            <div className="flex sm:hidden items-center gap-1.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-white border border-[#E91E63] dark:border-[#C2185B] px-2 py-1.5 rounded-[14px] text-[10px] font-bold shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
              <Sparkles className="w-3 h-3 text-[#E91E63] dark:text-[#C2185B] animate-spin" />
              <span className="font-mono text-black dark:text-white font-black">٤,٨٢٠</span>
            </div>

            {/* Daily Simulated Sales Indicator - Desktop Full */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-white border border-[#E91E63] dark:border-[#C2185B] px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-[14px] text-[10px] sm:text-xs font-bold shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E91E63] dark:text-[#C2185B] animate-spin" />
              <span className="hidden sm:inline">مبيعات اليوم:</span> <span className="font-mono text-black dark:text-white font-black">٤,٨٢٠ ر.س</span>
            </div>

            {/* Quick Tutorial Hub Link - Mobile Icon Only */}
            <button
              onClick={() => {
                if (activeTour) {
                  if (confirm('هل ترغب في مغادرة الجلسة الحالية والذهاب لمركز التدريب؟')) {
                    setActiveTour(null);
                    setCurrentPage('tutorial');
                  }
                } else {
                  setCurrentPage('tutorial');
                }
              }}
              className="flex sm:hidden items-center gap-1 px-2 py-1.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-[10px] font-bold transition-all duration-300 ease min-h-[44px]"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E91E63] dark:text-[#C2185B]" />
            </button>

            {/* Quick Tutorial Hub Link - Desktop Full */}
            <button
              onClick={() => {
                if (activeTour) {
                  if (confirm('هل ترغب في مغادرة الجلسة الحالية والذهاب لمركز التدريب؟')) {
                    setActiveTour(null);
                    setCurrentPage('tutorial');
                  }
                } else {
                  setCurrentPage('tutorial');
                }
              }}
              className="hidden sm:flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-[10px] sm:text-xs font-bold transition-all duration-300 ease"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B]" />
              <span className="hidden sm:inline">المركز التعليمي</span>
            </button>

            {/* Notifications Button */}
            <button onClick={() => alert('الإشعارات: لديك 3 إشعارات جديدة')} className="p-2 sm:p-2 text-black dark:text-white hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] rounded-[14px] relative transition-all duration-300 ease min-h-[44px] min-w-[44px] flex items-center justify-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-full absolute top-1 sm:top-1.5 left-1 sm:left-1.5 animate-ping"></span>
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-full absolute top-1 sm:top-1.5 left-1 sm:left-1.5"></span>
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Admin Profile User Card */}
            <div className="flex items-center gap-1.5 sm:gap-2 border-r border-[#E91E63] dark:border-[#C2185B] pr-2 sm:pr-4">
              <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border border-[#E91E63] dark:border-[#C2185B] overflow-hidden flex items-center justify-center font-bold text-black dark:text-white text-xs sm:text-xs min-h-[32px] min-w-[32px]">
                {admin.avatar ? <span className="text-xs sm:text-base">{admin.avatar}</span> : admin.name[0]}
              </div>
              <div className="hidden md:block text-right">
                <div className="text-xs sm:text-xs font-bold text-black dark:text-white">{admin.name}</div>
                <div className="text-[10px] sm:text-[10px] text-black dark:text-gray-400 font-medium">مشرف النظام</div>
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 space-y-3 sm:space-y-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Tutorial Assistant Overlay */}
      {activeTour && TOURS[activeTour][tourStep] && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-50 max-w-sm w-full bg-white dark:bg-gray-800 rounded-[14px] border-2 border-[#E91E63] dark:border-[#C2185B] p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] animate-bounceIn flex flex-col gap-3 sm:gap-4 text-right transition-all duration-300 ease">

          {/* Header Assistant details */}
          <div className="flex items-center gap-3 border-b border-[#E91E63] dark:border-[#C2185B] pb-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] flex items-center justify-center text-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex-shrink-0">
              👩‍💼
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-black dark:text-white">مساعد سحر التدريبي</h4>
              <p className="text-[10px] text-black dark:text-gray-400 font-bold">
                الجلسة: {activeTour === 'theme' ? 'تخصيص المظهر' : activeTour === 'sync' ? 'مزامنة أونكس' : activeTour === 'media' ? 'مكتبة الصور' : 'روابط SEO'}
                • الخطوة {tourStep + 1} من {TOURS[activeTour].length}
              </p>
            </div>
            <button
              onClick={endTour}
              className="mr-auto p-1 rounded-lg text-black dark:text-white hover:text-[#E91E63] dark:hover:text-[#C2185B] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-all duration-300 ease"
              title="إنهاء الجلسة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Assistant Bubble Text */}
          <div className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] p-3.5 rounded-[14px] border border-[#E91E63] dark:border-[#C2185B] text-xs text-black dark:text-white leading-relaxed font-semibold transition-all duration-300 ease">
            {TOURS[activeTour][tourStep].text}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2 gap-2">
            <button
              onClick={prevTourStep}
              disabled={tourStep === 0}
              className="px-3 sm:px-3.5 py-2 sm:py-1.5 border border-[#E91E63] dark:border-[#C2185B] text-black dark:text-white text-xs font-bold rounded-[14px] hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all duration-300 ease flex items-center gap-1 min-h-[44px]"
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>

            <button
              onClick={nextTourStep}
              className="px-4 sm:px-5 py-2 sm:py-1.5 bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#C2185B] dark:hover:bg-[#AD1457] text-white text-xs font-bold rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease flex items-center gap-1 min-h-[44px]"
            >
              {tourStep === TOURS[activeTour].length - 1 ? 'إكمال الجلسة 🎉' : 'التالي'}
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
