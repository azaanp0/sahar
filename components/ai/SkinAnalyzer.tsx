import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

interface SkinType {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  concerns: string[];
  recommendations: string[];
}

export const SkinAnalyzer: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'analyzing' | 'result'>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SkinType | null>(null);

  const questions = [
    {
      id: 'tendency',
      question: 'ما هو ميل بشرتك للإصابة بالحبوب؟',
      options: ['نادراً', 'أحياناً', 'غالباً', 'دائماً'],
    },
    {
      id: 'sensitivity',
      question: 'هل بشرتك حساسة؟',
      options: ['لا', 'قليلاً', 'متوسط', 'شديدة الحساسية'],
    },
    {
      id: 'dryness',
      question: 'كيف تشعر بشرتك بعد غسلها؟',
      options: ['مشددة وجافة', 'طبيعية', 'مرطبة قليلاً', 'زيتية جداً'],
    },
    {
      id: 'sun',
      question: 'كيف تتفاعل بشرتك مع الشمس؟',
      options: ['لا تتأثر', 'تحترق بسهولة', 'تصبح داكنة', 'لا تلاحظ فرقاً'],
    },
  ];

  const skinTypes: SkinType[] = [
    {
      id: 'normal',
      name: 'Normal Skin',
      nameAr: 'البشرة العادية',
      description: 'Well-balanced skin with minimal issues',
      descriptionAr: 'بشرة متوازنة مع مشاكل قليلة',
      concerns: [],
      recommendations: ['Gentle cleanser', 'Light moisturizer', 'Sunscreen SPF 30'],
    },
    {
      id: 'dry',
      name: 'Dry Skin',
      nameAr: 'البشرة الجافة',
      description: 'Skin that feels tight and rough',
      descriptionAr: 'بشرة تشعر بالشد والخشونة',
      concerns: ['Flakiness', 'Fine lines', 'Tightness'],
      recommendations: ['Hydrating cleanser', 'Rich moisturizer', 'Hydrating serum'],
    },
    {
      id: 'oily',
      name: 'Oily Skin',
      nameAr: 'البشرة الدهنية',
      description: 'Skin with excess sebum production',
      descriptionAr: 'بشرة تنتج زيوت زائدة',
      concerns: ['Acne', 'Enlarged pores', 'Shine'],
      recommendations: ['Oil-free cleanser', 'Lightweight moisturizer', 'Clay mask'],
    },
    {
      id: 'combination',
      name: 'Combination Skin',
      nameAr: 'البشرة المختلطة',
      description: 'Oily T-zone, dry or normal cheeks',
      descriptionAr: 'منطقة T دهنية، الخدين جافة أو عادية',
      concerns: ['Oily T-zone', 'Dry cheeks', 'Occasional breakouts'],
      recommendations: ['Balanced cleanser', 'Light moisturizer', 'Targeted treatments'],
    },
    {
      id: 'sensitive',
      name: 'Sensitive Skin',
      nameAr: 'البشرة الحساسة',
      description: 'Skin that reacts easily to products',
      descriptionAr: 'بشرة تتفاعل بسهولة مع المنتجات',
      concerns: ['Redness', 'Irritation', 'Stinging'],
      recommendations: ['Fragrance-free products', 'Gentle cleanser', 'Soothing serum'],
    },
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleAnalyze = () => {
    setStep('analyzing');
    // Simulate AI analysis
    setTimeout(() => {
      // Simple logic to determine skin type based on answers
      let skinType = skinTypes[0]; // Default to normal
      if (answers.dryness === 'مشددة وجافة') {
        skinType = skinTypes.find((s) => s.id === 'dry') || skinType;
      } else if (answers.dryness === 'زيتية جداً' || answers.tendency === 'دائماً') {
        skinType = skinTypes.find((s) => s.id === 'oily') || skinType;
      } else if (answers.sensitivity === 'شديدة الحساسية') {
        skinType = skinTypes.find((s) => s.id === 'sensitive') || skinType;
      } else {
        skinType = skinTypes.find((s) => s.id === 'combination') || skinType;
      }
      setResult(skinType);
      setStep('result');
    }, 2000);
  };

  const handleReset = () => {
    setStep('intro');
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {step === 'intro' && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">تحليل البشرة الذكي</h2>
            <p className="text-gray-600">
              اكتشفي نوع بشرتي واحصلي على توصيات مخصصة للعناية بها
            </p>
          </div>
          <Button onClick={() => setStep('quiz')} variant="primary" size="lg">
            ابدأ التحليل
          </Button>
        </div>
      )}

      {step === 'quiz' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">أجيبي على الأسئلة</h2>
            <p className="text-gray-600">سنساعدك في تحديد نوع بشرتك</p>
          </div>

          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <h3 className="font-medium text-gray-900">{question.question}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={cn(
                        'p-4 rounded-lg border-2 text-center transition-colors',
                        answers[question.id] === option
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep('intro')}
              variant="outline"
              size="md"
              className="flex-1"
            >
              رجوع
            </Button>
            <Button
              onClick={handleAnalyze}
              variant="primary"
              size="md"
              className="flex-1"
              disabled={Object.keys(answers).length < questions.length}
            >
              تحليل
            </Button>
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="text-center space-y-6 py-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">جاري التحليل...</h2>
            <p className="text-gray-600">نحلل إجاباتك لتحديد نوع بشرتك</p>
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">نتيجة التحليل</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">{result.nameAr}</h3>
              <Badge variant="primary">{result.name}</Badge>
            </div>
            <p className="text-gray-600">{result.descriptionAr}</p>

            {result.concerns.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">المشاكل المحتملة:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.concerns.map((concern) => (
                    <Badge key={concern} variant="warning" size="sm">
                      {concern}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900 mb-2">التوصيات:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec) => (
                  <li key={rec} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleReset} variant="outline" size="md" className="flex-1">
              إعادة التحليل
            </Button>
            <Button variant="primary" size="md" className="flex-1">
              تصفح المنتجات المناسبة
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
