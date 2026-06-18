import { Gift, Star, TrendingUp, Award, Crown, Sparkles, ChevronLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progrees";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LoyaltyPage = () => {
    const navigate = useNavigate();
    // Mock data - سيتم جلبها من الـ API
    const loyaltyData = {
        points: 2450,
        tier: "silver",
        nextTier: "gold",
        pointsToNextTier: 550,
        totalSpent: 2450,
        rewards: [
            { id: 1, name: "خصم 10% على طلبك القادم", points: 500, available: true },
            { id: 2, name: "شحن مجاني", points: 300, available: true },
            { id: 3, name: "هدايا حصرية", points: 1000, available: false },
        ],
        history: [
            { id: 1, type: "earned", points: 100, description: "شراء منتجات", date: "2024-01-15" },
            { id: 2, type: "redeemed", points: 300, description: "شحن مجاني", date: "2024-01-10" },
            { id: 3, type: "earned", points: 50, description: "كتابة تقييم", date: "2024-01-05" },
        ],
    };

    const tiers = [
        { name: "برونزي", icon: <Award className="h-5 w-5" />, points: 0, color: "bg-amber-600" },
        { name: "فضي", icon: <Star className="h-5 w-5" />, points: 1000, color: "bg-gray-400" },
        { name: "ذهبي", icon: <Crown className="h-5 w-5" />, points: 3000, color: "bg-yellow-500" },
        { name: "ماسي", icon: <Sparkles className="h-5 w-5" />, points: 5000, color: "bg-primary-400" },
    ];

    const currentTierIndex = tiers.findIndex(t => t.name.toLowerCase() === loyaltyData.tier);

    return (
        <PageLayout title="برنامج الولاء">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <button onClick={() => navigate("/account")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                        <ChevronLeft className="h-4 w-4" />
                        العودة لحسابي
                    </button>
                    {/* Tier Card */}
                    <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Crown className="h-6 w-6 text-primary" />
                                    مستواك الحالي
                                </CardTitle>
                                <Badge className={tiers[currentTierIndex].color}>
                                    {tiers[currentTierIndex].name}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold">{loyaltyData.points}</p>
                                    <p className="text-sm text-muted-foreground">نقطة</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
                                    <p className="font-bold">{loyaltyData.totalSpent} ر.س</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">
                                        {loyaltyData.pointsToNextTier} نقطة للمستوى التالي ({tiers[currentTierIndex + 1]?.name})
                                    </span>
                                    <span className="font-medium">
                                        {Math.round((loyaltyData.points / tiers[currentTierIndex + 1]?.points) * 100)}%
                                    </span>
                                </div>
                                <Progress 
                                    value={(loyaltyData.points / tiers[currentTierIndex + 1]?.points) * 100} 
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tiers Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                مستويات الولاء
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {tiers.map((tier, index) => (
                                    <div
                                        key={tier.name}
                                        className={`p-4 rounded-lg border text-center ${
                                            index <= currentTierIndex
                                                ? "border-primary bg-primary/5"
                                                : "border-border opacity-50"
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full ${tier.color} flex items-center justify-center mx-auto mb-2 text-white`}>
                                            {tier.icon}
                                        </div>
                                        <p className="font-medium">{tier.name}</p>
                                        <p className="text-xs text-muted-foreground">{tier.points} نقطة</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Available Rewards */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Gift className="h-5 w-5" />
                                المكافآت المتاحة
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {loyaltyData.rewards.map((reward) => (
                                    <div
                                        key={reward.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{reward.name}</p>
                                            <p className="text-sm text-muted-foreground">{reward.points} نقطة</p>
                                        </div>
                                        <Button
                                            variant={reward.available ? "default" : "secondary"}
                                            disabled={!reward.available}
                                        >
                                            {reward.available ? "استبدال" : "غير متاح"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Points History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>سجل النقاط</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {loyaltyData.history.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <div>
                                            <p className="font-medium">{item.description}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(item.date).toLocaleDateString("ar-SA")}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={item.type === "earned" ? "default" : "secondary"}
                                            className={item.type === "earned" ? "bg-green-500" : ""}
                                        >
                                            {item.type === "earned" ? "+" : "-"}
                                            {item.points}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* How to Earn */}
                    <Card>
                        <CardHeader>
                            <CardTitle>كيف تكسبين النقاط؟</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span>
                                    1 نقطة لكل 1 ريال تصرفينه
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span>
                                    50 نقطة لكل تقييم تكتبينه
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span>
                                    100 نقطة عند التسجيل لأول مرة
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span>
                                    200 نقطة عند إحالة صديقة
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span>
                                    عروض ومكافآت خاصة في المناسبات
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default LoyaltyPage;
