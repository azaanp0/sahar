import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <Truck className="h-8 w-8" />,
            title: "شحن سريع",
            description: "توصيل خلال 3-5 أيام عمل",
        },
        {
            icon: <ShieldCheck className="h-8 w-8" />,
            title: "منتجات أصلية",
            description: "ضمان 100% منتجات أصلية",
        },
        {
            icon: <Headphones className="h-8 w-8" />,
            title: "دعم فني",
            description: "خدمة عملاء 24/7",
        },
        {
            icon: <RotateCcw className="h-8 w-8" />,
            title: "استرجاع سهل",
            description: "استرجاع خلال 14 يوم",
        },
    ];

    return (
        <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-[#E91E63]/10 dark:bg-[#C2185B]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#E91E63] dark:text-[#C2185B]">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
