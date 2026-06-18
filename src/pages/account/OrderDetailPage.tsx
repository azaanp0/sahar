import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft, Package, MapPin, Phone, Calendar, CreditCard, Truck, CheckCircle, Clock } from "lucide-react";

const OrderDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { orders } = useStore();
    const order = orders.find(o => o.id === id);

    if (!order) {
        return (
            <PageLayout title="تفاصيل الطلب">
                <div className="px-4 py-6">
                    <div className="mx-auto max-w-4xl text-center py-12">
                        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-xl font-bold mb-2">الطلب غير موجود</h2>
                        <Link to="/account/orders" className="text-primary hover:underline">
                            العودة لطلباتي
                        </Link>
                    </div>
                </div>
            </PageLayout>
        );
    }

    const timeline = [
        { status: "pending", title: "تم استلام الطلب", date: new Date(order.date).toLocaleDateString("ar-SA"), icon: Clock, completed: true },
        { status: "confirmed", title: "تم تأكيد الطلب", date: new Date(order.date).toLocaleDateString("ar-SA"), icon: CheckCircle, completed: order.status !== "cancelled" },
        { status: "processing", title: "قيد التحضير", date: "", icon: Package, completed: ["shipped", "delivered"].includes(order.status) },
        { status: "shipped", title: "تم الشحن", date: "", icon: Truck, completed: order.status === "delivered" },
        { status: "delivered", title: "تم التسليم", date: "", icon: CheckCircle, completed: order.status === "delivered" },
    ];

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { text: string; className: string }> = {
            processing: { text: "قيد المعالجة", className: "bg-yellow-100 text-yellow-800" },
            shipped: { text: "تم الشحن", className: "bg-primary-100 text-primary-800" },
            delivered: { text: "تم التسليم", className: "bg-green-100 text-green-800" },
            cancelled: { text: "ملغي", className: "bg-red-100 text-red-800" },
        };
        return badges[status] || { text: status, className: "bg-gray-100 text-gray-800" };
    };

    const badge = getStatusBadge(order.status);

    return (
        <PageLayout title={`تفاصيل الطلب #${order.id}`}>
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي", href: "/account" }, { label: "طلباتي", href: "/account/orders" }, { label: `طلب #${order.id}` }]} />
                    <Link to="/account/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft className="h-4 w-4" />
                        العودة لطلباتي
                    </Link>

                    {/* Order Header */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">طلب #{order.id}</h1>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(order.date).toLocaleDateString("ar-SA")}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
                                        {badge.text}
                                    </span>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground">إجمالي الطلب</p>
                                <p className="text-2xl font-bold">{order.total.toFixed(2)} ر.س</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="border-t border-border pt-4">
                            <h3 className="font-medium mb-4">مراحل الطلب</h3>
                            <div className="space-y-4">
                                {timeline.map((step, index) => (
                                    <div key={step.status} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            }`}>
                                                <step.icon className="h-4 w-4" />
                                            </div>
                                            {index < timeline.length - 1 && (
                                                <div className={`w-0.5 flex-1 my-2 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <p className="font-medium">{step.title}</p>
                                            {step.date && <p className="text-sm text-muted-foreground">{step.date}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-6">
                        <h3 className="font-bold mb-4">المنتجات</h3>
                        <div className="space-y-4">
                            {order.items?.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-muted overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium mb-1">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{item.variant || ""}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">الكمية: {item.quantity}</span>
                                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ر.س</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            عنوان التوصيل
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="text-muted-foreground">المستلم:</span> {order.shippingAddress?.name || "غير محدد"}</p>
                            <p><span className="text-muted-foreground">الجوال:</span> {order.shippingAddress?.phone || "غير محدد"}</p>
                            <p><span className="text-muted-foreground">العنوان:</span> {order.shippingAddress?.address || "غير محدد"}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            معلومات الدفع
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">طريقة الدفع</span>
                                <span>{order.paymentMethod || "الدفع عند الاستلام"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">المجموع الفرعي</span>
                                <span>{order.subtotal?.toFixed(2) || order.total.toFixed(2)} ر.س</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">الشحن</span>
                                <span>{order.shipping?.toFixed(2) || "0.00"} ر.س</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">الضريبة (15%)</span>
                                <span>{order.tax?.toFixed(2) || "0.00"} ر.س</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                <span>الإجمالي</span>
                                <span>{order.total.toFixed(2)} ر.س</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    {order.status === "shipped" && (
                        <Link
                            to={`/account/orders/${order.id}/tracking`}
                            className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-center hover:opacity-90 transition-opacity mb-4"
                        >
                            تتبع الطلب على الخريطة
                        </Link>
                    )}

                    {order.status === "delivered" && (
                        <div className="flex gap-2">
                            <button className="flex-1 border border-border py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                                إعادة الطلب
                            </button>
                            <button className="flex-1 border border-border py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                                طلب استرجاع
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default OrderDetailPage;
