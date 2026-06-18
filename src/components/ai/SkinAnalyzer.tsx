import { useState } from "react";
import { Camera, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SkinAnalyzer = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{
        skinType: string;
        concerns: string[];
        recommendations: string[];
    } | null>(null);

    const handleAnalyze = () => {
        setAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
            setResult({
                skinType: "مختلطة",
                concerns: ["رؤوس سوداء في منطقة T", "جفاف في الخدين", "مسام واسعة"],
                recommendations: [
                    "غسول متوازن للبشرة المختلطة",
                    "تونر منقي للمسام",
                    "مرطب خفيف للمناطق الدهنية",
                    "مرطب غني للمناطق الجافة"
                ]
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#E91E63] dark:text-[#C2185B]" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">تحليل نوع البشرة بالذكاء الاصطناعي</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">صوري بشرتك واحصلي على تحليل فوري</p>
                </div>
            </div>

            {!result ? (
                <div className="space-y-6">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors cursor-pointer">
                        <Camera className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">اضغطي لالتقاط صورة أو رفعها</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">PNG, JPG حتى 10MB</p>
                    </div>

                    <Button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="w-full bg-[#E91E63] dark:bg-[#C2185B] hover:bg-[#B089C0] dark:hover:bg-[#AD1457]"
                    >
                        {analyzing ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                جاري التحليل...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                تحليل البشرة
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        * التحليل بالذكاء الاصطناعي للأغراض التوجيهية فقط. للحصول على تشخيص دقيق، استشيري طبيب الجلدية.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Result */}
                    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-bold text-green-800 dark:text-green-200">اكتمل التحليل</span>
                        </div>
                        <p className="text-green-700 dark:text-green-300">نوع بشرتك: <span className="font-bold">{result.skinType}</span></p>
                    </div>

                    {/* Concerns */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">المشاكل المكتشفة</h4>
                        <ul className="space-y-2">
                            {result.concerns.map((concern, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <div className="w-2 h-2 bg-[#E91E63] dark:bg-[#C2185B] rounded-full" />
                                    {concern}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">المنتجات المقترحة</h4>
                        <ul className="space-y-2">
                            {result.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Button
                        onClick={() => setResult(null)}
                        variant="outline"
                        className="w-full"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        تحليل جديد
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default SkinAnalyzer;
