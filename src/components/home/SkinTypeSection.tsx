import { Link } from "react-router-dom";
import { Droplet, Sun, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SkinType {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    slug: string;
}

const skinTypes: SkinType[] = [
    {
        id: "dry",
        name: "البشرة الجافة",
        description: "منتجات ترطيب عميق وتغذية للبشرة",
        icon: <Droplet className="h-6 w-6" />,
        color: "bg-primary-100 text-primary-600",
        slug: "dry-skin",
    },
    {
        id: "oily",
        name: "البشرة الدهنية",
        description: "منتجات تحكم بالدهون وتنقية المسام",
        icon: <Zap className="h-6 w-6" />,
        color: "bg-yellow-100 text-yellow-600",
        slug: "oily-skin",
    },
    {
        id: "combination",
        name: "البشرة المختلطة",
        description: "منتجات متوازنة لجميع مناطق الوجه",
        icon: <Shield className="h-6 w-6" />,
        color: "bg-green-100 text-green-600",
        slug: "combination-skin",
    },
    {
        id: "sensitive",
        name: "البشرة الحساسة",
        description: "منتجات لطيفة ومهدئة للبشرة",
        icon: <Sun className="h-6 w-6" />,
        color: "bg-purple-100 text-purple-600",
        slug: "sensitive-skin",
    },
];

const SkinTypeSection = () => {
    return (
        <section className="py-8 md:py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">اختاري منتجات حسب نوع بشرتك</h2>
                    <p className="text-muted-foreground">منتجات مخصصة لكل نوع بشرة</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {skinTypes.map((type) => (
                        <Link
                            key={type.id}
                            to={`/category/${type.slug}`}
                            className="group bg-card rounded-xl p-6 border hover:border-primary/50 transition-all hover:shadow-lg"
                        >
                            <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {type.icon}
                            </div>
                            <h3 className="font-bold mb-2">{type.name}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/skin-quiz">
                        <Button variant="outline" size="lg" className="gap-2">
                            اكتشفي نوع بشرتك
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SkinTypeSection;
