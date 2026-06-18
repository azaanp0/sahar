import { BookOpen, Sparkles, Play, CheckCircle2, Award, Zap, Smile } from 'lucide-react';

interface TutorialHubProps {
  onStartTour: (tourId: 'theme' | 'sync' | 'media' | 'redirect') => void;
  completedTours: string[];
}

export default function TutorialHub({ onStartTour, completedTours }: TutorialHubProps) {
  const tutorials = [
    {
      id: 'theme' as const,
      title: 'تخصيص الهوية البصرية وألوان المتجر',
      description: 'تعلم كيفية تغيير ألوان متجر سحر، ورفع الشعار وتغيير بنرات الصفحة الرئيسية ومشاهدة التحديث مباشرة.',
      duration: '٣ دقائق',
      difficulty: 'سهل جداً',
      badge: 'تصميم',
      color: 'from-pink-500 to-rose-400',
    },
    {
      id: 'sync' as const,
      title: 'ربط وسحب المنتجات من نظام Onyx ERP',
      description: 'خطوة بخطوة لضبط اتصال السيرفر وسحب الأصناف بالأسماء والأسعار والصور من قواعد بيانات أونكس.',
      duration: '٤ دقائق',
      difficulty: 'متوسط',
      badge: 'ربط تقني',
      color: 'from-blue-600 to-indigo-500',
    },
    {
      id: 'media' as const,
      title: 'إدارة مكتبة الوسائط ورفع الصور مع نصوص Alt',
      description: 'تعلم كيف تضيف صوراً للمنتجات وتضبط الصورة الأساسية وتعديل نصوص محركات البحث لزيادة المبيعات.',
      duration: '٢ دقيقة',
      difficulty: 'سهل',
      badge: 'وسائط',
      color: 'from-purple-600 to-fuchsia-500',
    },
    {
      id: 'redirect' as const,
      title: 'إنشاء تحويلات الروابط المكسورة (301 Redirect)',
      description: 'كيفية معالجة صفحات الخطأ 404 وتوجيه العملاء ومحركات البحث للروابط الصحيحة بنجاح.',
      duration: '٣ دقائق',
      difficulty: 'سهل',
      badge: 'SEO أرشيف',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const completionRate = Math.round((completedTours.length / tutorials.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-l from-purple-800 to-pink-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-purple-900/10">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 flex items-center justify-center select-none pointer-events-none">
          <BookOpen className="w-64 h-64" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/25 backdrop-filter backdrop-blur-md text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            مركز التدريب التفاعلي المباشر
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
            أهلاً بك في أكاديمية سحر الذكية لشركاء النجاح
          </h1>
          <p className="opacity-90 text-sm leading-relaxed">
            لقد صممنا لك هذه الجلسات التعليمية التفاعلية المباشرة لمساعدتك على إتقان استخدام لوحة التحكم، 
            من ربط قواعد بيانات أونكس وسحب الأصناف، وحتى تغيير هوية متجرك البصرية وتصدر محركات البحث!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-2">
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10">
              <Award className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <div>
                <div className="text-xs text-white/70">نسبة إنجاز التدريب</div>
                <div className="text-lg font-black">{completionRate}% مكتمل</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10">
              <Zap className="w-8 h-8 text-amber-300 flex-shrink-0" />
              <div>
                <div className="text-xs text-white/70">الجلسات المكتملة</div>
                <div className="text-lg font-black">{completedTours.length} من أصل {tutorials.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Assistant Message */}
      <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
          👩‍💼
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-purple-950 text-sm">أهلاً بك، أنا مرشدتك الذكية من فريق سحر!</h3>
          <p className="text-purple-700 text-xs leading-relaxed">
            اختر أي جلسة تدريبية من الأسفل، وسأقوم بمرافقتك داخل لوحة التحكم خطوة بخطوة وسأشير لك بعلامات مضيئة 
            على الشاشة لتوضيح الأزرار والمدخلات التي يجب عليك النقر عليها. لنبدأ التعلم سوياً!
          </p>
        </div>
      </div>

      {/* Grid of Tutorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tour) => {
          const isCompleted = completedTours.includes(tour.id);
          return (
            <div 
              key={tour.id}
              className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden group hover:shadow-lg flex flex-col justify-between ${
                isCompleted 
                  ? 'border-emerald-200 bg-emerald-50/10' 
                  : 'border-purple-100'
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-lg border border-purple-100">
                    {tour.badge}
                  </span>
                  
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      مكتملة
                    </span>
                  ) : (
                    <span className="text-[10px] text-purple-400 font-bold flex items-center gap-1">
                      مدة: {tour.duration} • صعوبة: {tour.difficulty}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-purple-950 group-hover:text-purple-700 transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-purple-600 text-xs leading-relaxed">
                    {tour.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-50/30 border-t border-purple-50 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[11px] text-purple-500">
                  <Smile className="w-4 h-4 text-pink-500" />
                  <span>تدريب حي 100%</span>
                </div>
                <button
                  onClick={() => onStartTour(tour.id)}
                  className={`flex items-center gap-1 px-4.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm group-hover:shadow ${
                    isCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isCompleted ? 'إعادة التدريب' : 'بدء الجلسة الحية'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
