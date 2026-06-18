import { useState, useEffect } from 'react';
import { db } from './lib/db';
import type { AdminUser } from './lib/db';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import type { Page } from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import OnyxSync from './components/OnyxSync';
import ProductManager from './components/ProductManager';
import MediaLibrary from './components/MediaLibrary';
import ThemeCustomizer from './components/ThemeCustomizer';
import SeoRedirects from './components/SeoRedirects';
import TutorialHub from './components/TutorialHub';
import { 
  Menu, X, Bell, Sparkles, BookOpen, LogOut,
  ChevronRight, ChevronLeft
} from 'lucide-react';

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

function App() {
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
          <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-sm space-y-6 text-right">
            <h2 className="text-xl font-bold text-purple-950">إعدادات النظام العامة</h2>
            <div className="bg-purple-50 p-4 rounded-xl text-purple-700 text-xs">
              مرحباً بك في لوحة إعدادات النظام. الميزات المتاحة حالياً تشمل إدارة الحسابات، صلاحيات المدراء، ومزامنة قواعد البيانات الخارجية.
            </div>
            <div className="space-y-4">
              <div className="border border-purple-100 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-purple-900 text-sm">حساب المشرف الحالي</h4>
                  <p className="text-xs text-purple-600 mt-1">الاسم: {admin.name} ({admin.role})</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all">
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
    <div className="min-h-screen bg-[#F8F6FB] flex text-right font-sans w-full overflow-hidden">
      
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 bg-purple-950 text-white h-full shadow-2xl z-50 animate-slideLeft">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="font-bold text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5" />
                متجر سحر | لوحة التحكم
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded bg-white/10 hover:bg-white/20">
                <X className="w-5 h-5" />
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
        <header className="h-16 bg-white border-b border-purple-100 flex items-center justify-between px-6 z-30 shadow-sm flex-shrink-0">
          {/* Right Section (Burger Menu + Brand logo/Title) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-purple-950 hover:bg-purple-50 rounded-xl lg:hidden transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>

            <span className="font-extrabold text-sm text-purple-950 hidden sm:flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
              منصة سحر Care & Beauty
            </span>
          </div>

          {/* Left Section (Search + Sales + Profile + Notifications) */}
          <div className="flex items-center gap-4">
            
            {/* Daily Simulated Sales Indicator */}
            <div className="hidden md:flex items-center gap-2 bg-pink-50 text-pink-700 border border-pink-100 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
              مبيعات اليوم: <span className="font-mono text-purple-950 font-black">٤,٨٢٠ ر.س</span>
            </div>

            {/* Quick Tutorial Hub Link */}
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
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-100 rounded-xl text-xs font-bold transition-all"
            >
              <BookOpen className="w-4 h-4 text-pink-500" />
              المركز التعليمي
            </button>

            {/* Notifications Button */}
            <button className="p-2 text-purple-700 hover:bg-purple-50 rounded-xl relative transition-all">
              <span className="w-2 h-2 bg-pink-500 rounded-full absolute top-1.5 left-1.5 animate-ping"></span>
              <span className="w-2 h-2 bg-pink-500 rounded-full absolute top-1.5 left-1.5"></span>
              <Bell className="w-5 h-5" />
            </button>

            {/* Admin Profile User Card */}
            <div className="flex items-center gap-2 border-r border-purple-100 pr-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 overflow-hidden flex items-center justify-center font-bold text-purple-700 text-xs">
                {admin.avatar ? <span className="text-base">{admin.avatar}</span> : admin.name[0]}
              </div>
              <div className="hidden md:block text-right">
                <div className="text-xs font-bold text-purple-950">{admin.name}</div>
                <div className="text-[10px] text-purple-500 font-medium">مشرف النظام</div>
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Tutorial Assistant Overlay */}
      {activeTour && TOURS[activeTour][tourStep] && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-white rounded-3xl border-2 border-pink-500 p-5 shadow-2xl animate-bounceIn flex flex-col gap-4 text-right">
          
          {/* Header Assistant details */}
          <div className="flex items-center gap-3 border-b border-purple-50 pb-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl shadow-inner flex-shrink-0">
              👩‍💼
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-purple-950">مساعد سحر التدريبي</h4>
              <p className="text-[10px] text-pink-600 font-bold">
                الجلسة: {activeTour === 'theme' ? 'تخصيص المظهر' : activeTour === 'sync' ? 'مزامنة أونكس' : activeTour === 'media' ? 'مكتبة الصور' : 'روابط SEO'} 
                • الخطوة {tourStep + 1} من {TOURS[activeTour].length}
              </p>
            </div>
            <button 
              onClick={endTour}
              className="mr-auto p-1 rounded-lg text-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
              title="إنهاء الجلسة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Assistant Bubble Text */}
          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100/60 text-xs text-purple-950 leading-relaxed font-semibold">
            {TOURS[activeTour][tourStep].text}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={prevTourStep}
              disabled={tourStep === 0}
              className="px-3.5 py-1.5 border border-purple-100 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>
            
            <button
              onClick={nextTourStep}
              className="px-5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1"
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

export default App;
