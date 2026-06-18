import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";

interface QuizAnswer {
    question: number;
    answer: string;
}

const SkinQuizPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 1,
            question: "كيف تشعرين بشرتك بعد غسلها؟",
            options: [
                { value: "tight", label: "مشدودة وجافة", skinType: "dry" },
                { value: "oily", label: "دهنية وزيتية", skinType: "oily" },
                { value: "normal", label: "طبيعية ومريحة", skinType: "normal" },
                { value: "mixed", label: "دهنية في بعض المناطق وجافة في أخرى", skinType: "combination" }
            ]
        },
        {
            id: 2,
            question: "ما حجم مسام بشرتك؟",
            options: [
                { value: "small", label: "صغيرة جداً وغير مرئية", skinType: "dry" },
                { value: "large", label: "واضحة وكبيرة", skinType: "oily" },
                { value: "medium", label: "متوسطة الحجم", skinType: "normal" },
                { value: "mixed", label: "كبيرة في منطقة T وصغيرة في باقي الوجه", skinType: "combination" }
            ]
        },
        {
            id: 3,
            question: "كم مرة تعانين من حب الشباب أو الرؤوس السوداء؟",
            options: [
                { value: "rarely", label: "نادراً", skinType: "dry" },
                { value: "often", label: "بشكل متكرر", skinType: "oily" },
                { value: "sometimes", label: "أحياناً", skinType: "normal" },
                { value: "t-zone", label: "في منطقة T فقط", skinType: "combination" }
            ]
        },
        {
            id: 4,
            question: "كيف تتفاعل بشرتك مع المنتجات الجديدة؟",
            options: [
                { value: "sensitive", label: "تهيج بسهولة", skinType: "sensitive" },
                { value: "resistant", label: "لا تتفاعل", skinType: "oily" },
                { value: "normal", label: "تتكيف بسهولة", skinType: "normal" },
                { value: "mixed", label: "تهيج في بعض المناطق فقط", skinType: "combination" }
            ]
        },
        {
            id: 5,
            question: "هل تعانين من احمرار أو تهيج متكرر؟",
            options: [
                { value: "yes", label: "نعم، كثيراً", skinType: "sensitive" },
                { value: "no", label: "لا أبداً", skinType: "oily" },
                { value: "rarely", label: "نادراً", skinType: "normal" },
                { value: "sometimes", label: "أحياناً", skinType: "combination" }
            ]
        }
    ];

    const skinTypeResults: Record<string, {
        name: string;
        description: string;
        tips: string[];
        products: string[];
    }> = {
        dry: {
            name: "البشرة الجافة",
            description: "بشرتك تحتاج إلى ترطيب مكثف وعناية خاصة للحفاظ على نضارتها",
            tips: [
                "استخدمي غسولاً لطيفاً لا يحتوي على الكحول",
                "رطبي بشرتك مرتين يومياً بمرطب غني",
                "تجنبي الماء الساخن جداً",
                "استخدمي قناع الوجه المرطب أسبوعياً"
            ],
            products: ["غسول مرطب", "سيروم الهيالورونيك", "مرطب غني", "زيت الوجه"]
        },
        oily: {
            name: "البشرة الدهنية",
            description: "بشرتك تنتج زيوت زائدة وتحتاج إلى منتجات توازن الزيوت وتنقي المسام",
            tips: [
                "استخدمي غسولاً يحتوي على حمض الساليسيليك",
                "رطبي بشرتك بمرطب خفيف خالٍ من الزيوت",
                "استخدمي تونر لتنظيف المسام",
                "تجنبي لمس وجهك كثيراً"
            ],
            products: ["غسول للبشرة الدهنية", "تونر منقي", "مرطب خفيف", "قناع الطين"]
        },
        normal: {
            name: "البشرة العادية",
            description: "بشرتك متوازنة وتحتاج إلى الحفاظ على هذا التوازن",
            tips: [
                "حافظي على روتين عناية منتظم",
                "استخدمي واقي الشمس يومياً",
                "رطبي بشرتك بانتظام",
                "تجنبي المنتجات القاسية"
            ],
            products: ["غسول متوازن", "مرطب متوازن", "واقي شمس", "سيروم فيتامين سي"]
        },
        combination: {
            name: "البشرة المختلطة",
            description: "بشرتك تجمع بين خصائص البشرة الدهنية والجافة وتحتاج عناية متوازنة",
            tips: [
                "استخدمي منتجات متوازنة لجميع أنواع البشرة",
                "رطبي المناطق الجافة أكثر",
                "استخدمي قناع الطين على منطقة T",
                "تجنبي المنتجات القاسية"
            ],
            products: ["غسول متوازن", "تونر لطيف", "مرطب متوازن", "قناع متعدد"]
        },
        sensitive: {
            name: "البشرة الحساسة",
            description: "بشرتك حساسة وتتفاعل بسهولة، تحتاج إلى منتجات لطيفة وخالية من العطور",
            tips: [
                "استخدمي منتجات خالية من العطور والكحول",
                "اختبري المنتجات الجديدة على منطقة صغيرة",
                "تجنبي الماء الساخن",
                "استخدمي منتجات مهدئة تحتوي على الألوفيرا"
            ],
            products: ["غسول للبشرة الحساسة", "مرطب مهدئ", "سيروم مهدئ", "قناع مهدئ"]
        }
    };

    const handleAnswer = (answer: string, skinType: string) => {
        setAnswers([...answers, { question: currentStep, answer }]);
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
        }
    };

    const getSkinType = () => {
        const typeCount: Record<string, number> = {};
        answers.forEach(a => {
            const question = questions.find(q => q.id === a.question + 1);
            const option = question?.options.find(o => o.value === a.answer);
            if (option) {
                typeCount[option.skinType] = (typeCount[option.skinType] || 0) + 1;
            }
        });
        
        return Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "normal";
    };

    const result = showResult ? skinTypeResults[getSkinType()] : null;

    if (showResult && result) {
        return (
            <>
                <PageMeta 
                    title="اختياري ما يناسب بشرتك | سحر"
                    description="اكتشفي نوع بشرتك والمنتجات المناسبة لك"
                />
                
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
                    <div className="container mx-auto px-4">
                        <Breadcrumb 
                            items={[
                                { label: "الرئيسية", href: "/" },
                                { label: "اختياري ما يناسب بشرتك" }
                            ]}
                        />

                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <div className="text-center mb-8">
                                    <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-4" />
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">نوع بشرتك: {result.name}</h1>
                                    <p className="text-gray-600">{result.description}</p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-bold mb-4 text-[#E91E63]">نصائح للعناية ببشرتك</h2>
                                    <ul className="space-y-3">
                                        {result.tips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <ChevronRight className="w-5 h-5 text-[#E91E63] mt-1 flex-shrink-0" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-bold mb-4 text-[#E91E63]">المنتجات المقترحة</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {result.products.map((product, idx) => (
                                            <span key={idx} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                                                {product}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        to="/products"
                                        className="flex-1 bg-[#E91E63] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#B089C0] transition-colors text-center"
                                    >
                                        تصفح المنتجات المقترحة
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setCurrentStep(0);
                                            setAnswers([]);
                                            setShowResult(false);
                                        }}
                                        className="flex-1 border-2 border-[#E91E63] text-[#E91E63] py-3 px-6 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                                    >
                                        إعادة الاختبار
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <PageMeta 
                title="اختياري ما يناسب بشرتك | سحر"
                description="اكتشفي نوع بشرتك والمنتجات المناسبة لك"
            />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
                <div className="container mx-auto px-4">
                    <Breadcrumb 
                        items={[
                            { label: "الرئيسية", href: "/" },
                            { label: "اختياري ما يناسب بشرتك" }
                        ]}
                    />

                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">اختياري ما يناسب بشرتك</h1>
                            <p className="text-gray-600">أجيبي على 5 أسئلة بسيطة لاكتشاف نوع بشرتك والمنتجات المناسبة لك</p>
                        </div>

                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">السؤال {currentStep + 1} من {questions.length}</span>
                                <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-[#E91E63] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                {questions[currentStep].question}
                            </h2>

                            <div className="space-y-4">
                                {questions[currentStep].options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleAnswer(option.value, option.skinType)}
                                        className="w-full p-4 text-right border-2 border-gray-200 rounded-xl hover:border-[#E91E63] hover:bg-purple-50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900 group-hover:text-[#E91E63] transition-colors">
                                                {option.label}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#E91E63] transition-colors" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkinQuizPage;
