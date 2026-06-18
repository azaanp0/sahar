import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const NotFound = () => (
    <PageLayout title="الصفحة غير موجودة">
        <div className="flex items-center justify-center px-4 py-20">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-[#E91E63] dark:text-[#C2185B] mb-4">404</h1>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">الصفحة غير موجودة</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">عذراً، الصفحة التي تبحثين عنها غير متاحة</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-[#E91E63] dark:bg-[#C2185B] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-colors duration-300 ease">
                    العودة للرئيسية
                </Link>
            </div>
        </div>
    </PageLayout>
);

export default NotFound;
