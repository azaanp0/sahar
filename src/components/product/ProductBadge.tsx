import { Flame, Star, Truck, Shield, Leaf, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductBadgeProps {
    type: "sale" | "new" | "bestseller" | "limited" | "organic" | "cruelty-free" | "fast-shipping";
    text?: string;
    className?: string;
}

const ProductBadge = ({ type, text, className }: ProductBadgeProps) => {
    const badges = {
        sale: {
            icon: <Flame className="h-3 w-3" />,
            defaultText: "خصم",
            className: "bg-red-500 text-white",
        },
        new: {
            icon: <Star className="h-3 w-3" />,
            defaultText: "جديد",
            className: "bg-primary-500 text-white",
        },
        bestseller: {
            icon: <Award className="h-3 w-3" />,
            defaultText: "الأكثر مبيعاً",
            className: "bg-amber-500 text-white",
        },
        limited: {
            icon: <Flame className="h-3 w-3" />,
            defaultText: "محدود",
            className: "bg-purple-500 text-white",
        },
        organic: {
            icon: <Leaf className="h-3 w-3" />,
            defaultText: "عضوي",
            className: "bg-green-500 text-white",
        },
        "cruelty-free": {
            icon: <Shield className="h-3 w-3" />,
            defaultText: "خالي من القسوة",
            className: "bg-pink-500 text-white",
        },
        "fast-shipping": {
            icon: <Truck className="h-3 w-3" />,
            defaultText: "شحن سريع",
            className: "bg-primary-500 text-white",
        },
    };

    const badge = badges[type];

    if (!badge) {
        return null;
    }

    return (
        <Badge className={`${badge.className} ${className || ""}`}>
            <span className="flex items-center gap-1">
                {badge.icon}
                {text || badge.defaultText}
            </span>
        </Badge>
    );
};

export default ProductBadge;
