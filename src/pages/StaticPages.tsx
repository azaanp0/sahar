import React from "react";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/context/StoreContext";
import type { Order } from "@/types";

interface StaticPageProps {
    title: string;
    content: React.ReactNode;
}

const StaticPage = ({ title, content }: StaticPageProps) => (
    <PageLayout title={title}>
        <div className="px-4 py-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">{title}</h1>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
                    {content}
                </div>
            </div>
        </div>
    </PageLayout>
);

export const AboutPage = () => (
    <StaticPage
        title="من نحن"
        content={
            <>
                <p>سحر هو متجر متخصص في منتجات الجمال والعناية بالبشرة، يضم أكثر من 500 ماركة عالمية ومحلية.</p>
                <p>نهدف إلى تقديم أفضل تجربة تسوق للمرأة السعودية والخليجية من خلال توفير منتجات أصيلة بأسعار تنافسية.</p>
                <p>نؤمن بأن كل امرأة تستحق الأفضل، لذلك نحرص على انتقاء أجود المنتجات وضمان أصالتها 100%.</p>
                <h2 className="text-lg font-bold text-foreground mt-6">رؤيتنا</h2>
                <p>أن نكون الوجهة الأولى للمرأة العربية في عالم الجمال والعناية.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">قيمنا</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>الأصالة والجودة</li>
                    <li>خدمة العملاء المتميزة</li>
                    <li>الأسعار التنافسية</li>
                    <li>التوصيل السريع والموثوق</li>
                </ul>
            </>
        }
    />
);

export const TermsPage = () => (
    <StaticPage
        title="الشروط والأحكام"
        content={
            <>
                <p>بمجرد استخدامك لموقع سحر، فإنك توافق على الشروط والأحكام التالية:</p>
                <h2 className="text-lg font-bold text-foreground mt-4">استخدام الموقع</h2>
                <p>يُقصر استخدام هذا الموقع على الأشخاص الذين يبلغون من العمر 18 عامًا أو أكثر.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">الطلبات والدفع</h2>
                <p>جميع الأسعار المعروضة بالريال السعودي وتشمل ضريبة القيمة المضافة. نحتفظ بحق تعديل الأسعار دون إشعار مسبق.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">الملكية الفكرية</h2>
                <p>جميع المحتويات المنشورة على الموقع محمية بحقوق الملكية الفكرية.</p>
            </>
        }
    />
);

export const PrivacyPage = () => (
    <StaticPage
        title="سياسة الاستخدام والخصوصية"
        content={
            <>
                <p>نحن في سحر نلتزم بحماية خصوصيتك وبياناتك الشخصية.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">البيانات التي نجمعها</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>الاسم ورقم الجوال والبريد الإلكتروني</li>
                    <li>عنوان التوصيل</li>
                    <li>معلومات الطلبات والمشتريات</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">كيف نستخدم بياناتك</h2>
                <p>نستخدم بياناتك لمعالجة طلباتك وتحسين تجربتك وإرسال العروض الخاصة.</p>
                <p>نلتزم بعدم بيع أو تأجير بياناتك لأي طرف ثالث.</p>
            </>
        }
    />
);

export const ShippingPage = () => (
    <StaticPage
        title="سياسة الشحن والتوصيل"
        content={
            <>
                <h2 className="text-lg font-bold text-foreground">التوصيل المجاني</h2>
                <p>جميع الطلبات التي تتجاوز 199 ريال تحظى بتوصيل مجاني.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">مواعيد التوصيل</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>الرياض وجدة والدمام: 1-2 أيام عمل</li>
                    <li>باقي مناطق المملكة: 2-4 أيام عمل</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">رسوم الشحن</h2>
                <p>25 ريال للطلبات التي تقل عن 199 ريال.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">الدفع عند الاستلام</h2>
                <p>خدمة الدفع عند الاستلام متاحة لجميع مناطق المملكة.</p>
            </>
        }
    />
);

export const ReturnsPage = () => (
    <StaticPage
        title="سياسة الاسترجاع والإلغاء"
        content={
            <>
                <h2 className="text-lg font-bold text-foreground">الاسترجاع</h2>
                <p>يمكن إرجاع المنتجات خلال 15 يومًا من تاريخ الاستلام شريطة أن تكون:</p>
                <ul className="list-disc pr-5 space-y-1">
                    <li>في حالتها الأصلية وغير مستخدمة</li>
                    <li>بعبوتها الأصلية وملصقاتها</li>
                    <li>مع إيصال الشراء</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">الإلغاء</h2>
                <p>يمكن إلغاء الطلب خلال 24 ساعة من تقديمه، بعد ذلك لا يمكن الإلغاء.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">الاسترداد</h2>
                <p>يتم رد المبلغ خلال 3-7 أيام عمل حسب طريقة الدفع المستخدمة.</p>
            </>
        }
    />
);

export const BranchesPage = () => (
    <StaticPage
        title="فروع سحر"
        content={
            <>
                <p>يسعدنا استقبالكم في فروعنا المنتشرة في أرجاء المملكة.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">الرياض</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>العليا - شارع التحلية</li>
                    <li>الملقا - بلفار</li>
                    <li>الرياض بارك</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">جدة</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>مول العرب</li>
                    <li>شارع التحلية</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">الدمام</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>بوليفارد الشرقية</li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">ساعات العمل: يومياً من 9 صباحاً حتى 12 منتصف الليل</p>
            </>
        }
    />
);

export const LoyaltyPage = () => (
    <StaticPage
        title="نظام الولاء"
        content={
            <>
                <p>احصلي على نقاط مع كل عملية شراء واستبديليها بخصومات حصرية.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">كيف يعمل النظام</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>كل 1 ريال = نقطة ولاء واحدة</li>
                    <li>100 نقطة = 5 ريال خصم</li>
                    <li>النقاط صالحة لمدة سنة من تاريخ الاكتساب</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">مستويات العضوية</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>برونز: 0 – 500 نقطة</li>
                    <li>فضة: 501 – 1500 نقطة</li>
                    <li>ذهب: 1501+ نقطة (خصم إضافي 5%)</li>
                </ul>
            </>
        }
    />
);

export const WarrantyPage = () => (
    <StaticPage
        title="سياسة ضمان الصيانة للأجهزة"
        content={
            <>
                <p>جميع أجهزة الجمال المباعة في سحر تخضع لسياسة الضمان التالية:</p>
                <h2 className="text-lg font-bold text-foreground mt-4">مدة الضمان</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>أجهزة الشعر: سنة كاملة من تاريخ الشراء</li>
                    <li>أجهزة البشرة والتجميل: 6 أشهر</li>
                    <li>الإكسسوارات: 3 أشهر</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">ما يشمله الضمان</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>عيوب التصنيع</li>
                    <li>أعطال الدوائر الكهربائية في ظروف الاستخدام الطبيعي</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">ما لا يشمله الضمان</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>الكسر أو التلف الناتج عن سوء الاستخدام</li>
                    <li>إدخال الجهاز في الماء إذا لم يكن مقاوماً للماء</li>
                </ul>
            </>
        }
    />
);

export const AffiliatePage = () => (
    <StaticPage
        title="برنامج التسويق بالعمولة"
        content={
            <>
                <p>انضمي لبرنامج سحر للتسويق بالعمولة واربحي من كل عملية بيع تتم من خلال رابطك.</p>
                <h2 className="text-lg font-bold text-foreground mt-4">المزايا</h2>
                <ul className="list-disc pr-5 space-y-1">
                    <li>عمولة تصل إلى 10% على كل عملية بيع</li>
                    <li>لوحة تحكم لمتابعة أرباحك</li>
                    <li>صرف الأرباح شهرياً</li>
                    <li>دعم مخصص للمسوقين</li>
                </ul>
                <h2 className="text-lg font-bold text-foreground mt-4">للتسجيل</h2>
                <p>تواصلي معنا عبر البريد الإلكتروني: affiliate@saher.com.sa</p>
            </>
        }
    />
);

export const ContactPage = () => {
    const [sent, setSent] = React.useState(false);
    const [form, setForm] = React.useState({ name: "", email: "", phone: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <StaticPage
            title="تواصل معنا"
            content={
                <>
                    <p>نسعد بتواصلك معنا. فريق سحر جاهز لمساعدتك في أي استفسار.</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6 not-prose">
                        <div className="space-y-4">
                            <div className="p-4 bg-card border border-border rounded-xl">
                                <h3 className="font-bold text-foreground mb-2">معلومات التواصل</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>الهاتف: <a href="tel:+966573064351" className="text-primary hover:underline">+966573064351</a></li>
                                    <li>واتساب: <a href="https://wa.me/+966573064351" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">+966573064351</a></li>
                                    <li>البريد: <a href="mailto:roaaleon.marketing@gmail.com" className="text-primary hover:underline">roaaleon.marketing@gmail.com</a></li>
                                </ul>
                            </div>
                            <div className="p-4 bg-card border border-border rounded-xl">
                                <h3 className="font-bold text-foreground mb-2">ساعات العمل</h3>
                                <p className="text-sm">يومياً من 9 صباحاً حتى 12 منتصف الليل</p>
                            </div>
                        </div>
                        {sent ? (
                            <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
                                <p className="font-medium text-foreground">شكراً لتواصلك!</p>
                                <p className="text-sm mt-2">تم استلام رسالتك وسنرد عليك في أقرب وقت.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">الاسم</label>
                                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">البريد الإلكتروني</label>
                                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">رقم الجوال</label>
                                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">الموضوع</label>
                                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary bg-background">
                                        <option value="">اختر الموضوع</option>
                                        <option value="order">استفسار عن طلب</option>
                                        <option value="product">استفسار عن منتج</option>
                                        <option value="return">استرجاع أو استبدال</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">الرسالة</label>
                                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary resize-none" />
                                </div>
                                <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                    إرسال الرسالة
                                </button>
                            </form>
                        )}
                    </div>
                </>
            }
        />
    );
};

export const TrackOrderPage = () => {
    const [orderId, setOrderId] = React.useState("");
    const [searched, setSearched] = React.useState(false);
    const [result, setResult] = React.useState<Order | undefined>();
    const { trackOrder } = useStore();

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        setResult(trackOrder(orderId));
    };

    return (
        <StaticPage
            title="تتبع طلبك"
            content={
                <>
                    <form onSubmit={handleTrack} className="mt-2">
                        <label className="block text-sm font-medium text-foreground mb-1.5">رقم الطلب</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="أدخلي رقم الطلب"
                                className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                            />
                            <button type="submit" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                تتبع
                            </button>
                        </div>
                    </form>
                    {result && (
                        <div className="mt-4 p-4 bg-card border border-border rounded-xl">
                            <p className="font-medium">الطلب #{result.id}</p>
                            <p className="text-sm text-muted-foreground">الحالة: {result.status === "processing" ? "قيد المعالجة" : result.status}</p>
                            <p className="text-sm">الإجمالي: {result.total.toFixed(2)} ر.س</p>
                        </div>
                    )}
                    {searched && !result && (
                        <p className="mt-4 text-sm text-muted-foreground">لم يتم العثور على الطلب. تأكدي من رقم الطلب.</p>
                    )}
                    <p className="mt-6 text-sm">أو تواصلي معنا عبر:</p>
                    <ul className="list-disc pr-5 space-y-1 mt-2">
                        <li>واتساب: +966573064351</li>
                        <li>البريد الإلكتروني: roaaleon.marketing@gmail.com</li>
                    </ul>
                </>
            }
        />
    );
};
