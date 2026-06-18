import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => (
    <PageLayout title="خطأ في الخادم" showMobileNav={false}>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <AlertTriangle className="h-20 w-20 text-red-600 dark:text-red-400 mb-4" />
            <h1 className="text-6xl font-bold text-black dark:text-white mb-2">500</h1>
            <h2 className="text-xl font-bold text-black dark:text-white mb-2">حدث خطأ غير متوقع</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">نعتذر، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى.</p>
            <div className="flex gap-3">
                <button onClick={() => window.location.reload()} className="bg-[#E91E63] dark:bg-[#C2185B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">إعادة المحاولة</button>
                <Link to="/" className="border border-gray-300 dark:border-gray-600 text-black dark:text-white px-6 py-3 rounded-xl font-medium hover:border-[#E91E63] dark:hover:border-[#C2185B] transition-colors duration-300 ease">العودة للرئيسية</Link>
            </div>
        </div>
    </PageLayout>
);

export default ErrorPage;
