import { Truck, Clock, Package, Store } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ShippingMethod {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
    icon: React.ReactNode;
    isFree?: boolean;
}

interface ShippingMethodsProps {
    selectedMethod: string;
    onSelectMethod: (method: string) => void;
    subtotal: number;
}

const ShippingMethods = ({ selectedMethod, onSelectMethod, subtotal }: ShippingMethodsProps) => {
    const methods: ShippingMethod[] = [
        {
            id: "standard",
            name: "التوصيل القياسي",
            description: "توصيل خلال 3-5 أيام عمل",
            price: subtotal >= 199 ? 0 : 29,
            estimatedDays: "3-5 أيام",
            icon: <Truck className="h-5 w-5" />,
            isFree: subtotal >= 199,
        },
        {
            id: "express",
            name: "التوصيل السريع",
            description: "توصيل خلال 1-2 يوم عمل",
            price: 39,
            estimatedDays: "1-2 يوم",
            icon: <Package className="h-5 w-5" />,
        },
        {
            id: "same-day",
            name: "صباح اليوم التالي",
            description: "توصيل صباح اليوم التالي",
            price: 49,
            estimatedDays: "صباح الغد",
            icon: <Clock className="h-5 w-5" />,
        },
        {
            id: "pickup",
            name: "استلام من الفرع",
            description: "استلمي طلبك من أقرب فرع",
            price: 0,
            estimatedDays: "متاح فوراً",
            icon: <Store className="h-5 w-5" />,
            isFree: true,
        },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                <Truck className="h-5 w-5" />
                طريقة الشحن
            </h3>

            <RadioGroup value={selectedMethod} onValueChange={onSelectMethod}>
                <div className="space-y-3">
                    {methods.map((method) => (
                        <div
                            key={method.id}
                            className={`relative flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                                selectedMethod === method.id
                                    ? "border-[#E91E63] dark:border-[#C2185B] bg-[#E91E63]/5 dark:bg-[#C2185B]/10"
                                    : "border-gray-200 dark:border-gray-600 hover:border-[#E91E63]/50 dark:hover:border-[#C2185B]/50"
                            }`}
                        >
                            <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                            <Label
                                htmlFor={method.id}
                                className="flex-1 cursor-pointer flex items-start gap-4"
                            >
                                <div className={`p-2 rounded-lg ${
                                    selectedMethod === method.id ? "bg-[#E91E63] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                }`}>
                                    {method.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-black dark:text-white">{method.name}</span>
                                        {method.isFree && (
                                            <Badge variant="secondary" className="text-xs">
                                                مجاني
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm font-medium text-black dark:text-white">
                                            {method.price === 0 ? "مجاني" : `${method.price} ر.س`}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {method.estimatedDays}
                                        </span>
                                    </div>
                                </div>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>

            {subtotal < 199 && (
                <div className="bg-[#E91E63]/10 dark:bg-[#C2185B]/20 border border-[#E91E63]/20 dark:border-[#C2185B]/30 rounded-lg p-3 text-sm">
                    <p className="text-[#E91E63] dark:text-[#C2185B] font-medium">
                        💡 شحن مجاني للطلبات فوق 199 ر.س
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        أضيفي منتجات بقيمة {(199 - subtotal).toFixed(2)} ر.س للحصول على شحن مجاني
                    </p>
                </div>
            )}
        </div>
    );
};

export default ShippingMethods;
