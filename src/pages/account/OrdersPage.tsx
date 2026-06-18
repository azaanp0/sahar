import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { useStore } from "@/context/StoreContext";
import { Package, Calendar, CreditCard, ChevronLeft, MapPin, Phone } from "lucide-react";

const OrdersPage = () => {
    const { orders } = useStore();
    const [filter, setFilter] = useState<"all" | "processing" | "shipped" | "delivered" | "cancelled">("all");

    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true;
        return order.status === filter;
    });

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { text: string; className: string }> = {
            processing: { text: "قيد المعالجة", className: "bg-yellow-100 text-yellow-800" },
            shipped: { text: "تم الشحن", className: "bg-primary-100 text-primary-800" },
            delivered: { text: "تم التسليم", className: "bg-green-100 text-green-800" },
            cancelled: { text: "ملغي", className: "bg-red-100 text-red-800" },
        };
        return badges[status] || { text: status, className: "bg-gray-100 text-gray-800" };
    };

    return (
        <PageLayout title="طلباتي">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي", href: "/account" }, { label: "طلباتي" }]} />
                    <Link to="/account" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft className="h-4 w-4" />
                        العودة لحسابي
                    </Link>

                    <h1 className="text-2xl font-bold mb-6">طلباتي</h1>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {(["all", "processing", "shipped", "delivered", "cancelled"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                    filter === f
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                            >
                                {f === "all" && "الكل"}
                                {f === "processing" && "قيد المعالجة"}
                                {f === "shipped" && "تم الشحن"}
                                {f === "delivered" && "تم التسليم"}
                                {f === "cancelled" && "ملغي"}
                            </button>
                        ))}
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="bg-card border border-border rounded-2xl p-12 text-center">
                            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">لا توجد طلبات</h3>
                            <p className="text-muted-foreground mb-6">
                                {filter === "all" ? "لم تقمي بأي طلبات بعد" : "لا توجد طلبات بهذه الحالة"}
                            </p>
                            <Link
                                to="/"
                                className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                ابدأي التسوق
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => {
                                const badge = getStatusBadge(order.status);
                                return (
                                    <div key={order.id} className="bg-card border border-border rounded-2xl p-4 md:p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold">#{order.id}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
                                                        {badge.text}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {new Date(order.date).toLocaleDateString("ar-SA")}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <CreditCard className="h-3.5 w-3.5" />
                                                        {order.items?.length || 0} منتج
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-2xl font-bold">{order.total.toFixed(2)} ر.س</p>
                                            </div>
                                        </div>

                                        {/* Order Items Preview */}
                                        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                                            {order.items?.slice(0, 3).map((item: any, index: number) => (
                                                <div key={index} className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                            {(order.items?.length || 0) > 3 && (
                                                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                                                    +{(order.items?.length || 0) - 3}
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                to={`/account/orders/${order.id}`}
                                                className="flex-1 min-w-[120px] bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity"
                                            >
                                                التفاصيل
                                            </Link>
                                            {order.status === "shipped" && (
                                                <Link
                                                    to={`/account/orders/${order.id}/tracking`}
                                                    className="flex-1 min-w-[120px] border border-border py-2 rounded-lg text-sm font-medium text-center hover:bg-muted transition-colors"
                                                >
                                                    تتبع الطلب
                                                </Link>
                                            )}
                                            {order.status === "delivered" && (
                                                <button className="flex-1 min-w-[120px] border border-border py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                                                    إعادة الطلب
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default OrdersPage;
