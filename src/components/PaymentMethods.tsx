import { CreditCard, Apple, Smartphone, Wallet, Check } from "lucide-react";

interface PaymentMethod {
    id: string;
    name: string;
    icon: any;
    description: string;
}

interface PaymentMethodsProps {
    selectedMethod: string;
    onMethodChange: (method: string) => void;
}

const PaymentMethods = ({ selectedMethod, onMethodChange }: PaymentMethodsProps) => {
    const paymentMethods: PaymentMethod[] = [
        { id: "credit", name: "بطاقة ائتمانية / مدى", icon: CreditCard, description: "Visa, MasterCard, Mada" },
        { id: "applepay", name: "Apple Pay", icon: Apple, description: "الدفع السريع والآمن" },
        { id: "stcpay", name: "STC Pay", icon: Smartphone, description: "الدفع عبر STC Pay" },
        { id: "tabby", name: "Tabby", icon: Wallet, description: "4 أقساط بدون فوائد" },
        { id: "tamara", name: "Tamara", icon: Wallet, description: "3 أقساط بدون فوائد" },
        { id: "cod", name: "الدفع عند الاستلام", icon: Check, description: "ادفعي عند استلام الطلب" },
    ];

    return (
        <div className="space-y-3">
            {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                    <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            selectedMethod === method.id
                                ? "border-[#E91E63] dark:border-[#C2185B] bg-[#E91E63]/5 dark:bg-[#C2185B]/10"
                                : "border-gray-200 dark:border-gray-600 hover:border-[#E91E63]/50 dark:hover:border-[#C2185B]/50"
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={(e) => onMethodChange(e.target.value)}
                            className="w-5 h-5 text-[#E91E63] border-gray-300 dark:border-gray-600"
                        />
                        <div className={`p-3 rounded-lg ${
                            selectedMethod === method.id ? "bg-[#E91E63] text-white" : "bg-gray-100 dark:bg-[#16213e] text-gray-600 dark:text-gray-300"
                        }`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-black dark:text-white">{method.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                        </div>
                    </label>
                );
            })}
        </div>
    );
};

export default PaymentMethods;
