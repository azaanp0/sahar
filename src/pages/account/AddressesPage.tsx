import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { MapPin, Plus, Edit, Trash2, ChevronLeft, Star } from "lucide-react";

const AddressesPage = () => {
    const { addresses, addAddress, updateAddress, deleteAddress } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        label: "المنزل",
        fullName: "",
        phone: "",
        city: "",
        district: "",
        street: "",
        building: "",
        landmark: "",
        isDefault: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            updateAddress(editingId, formData);
            toast.success("تم تحديث العنوان بنجاح");
        } else {
            addAddress(formData);
            toast.success("تمت إضافة العنوان بنجاح");
        }
        
        setShowForm(false);
        setEditingId(null);
        setFormData({
            label: "المنزل",
            fullName: "",
            phone: "",
            city: "",
            district: "",
            street: "",
            building: "",
            landmark: "",
            isDefault: false,
        });
    };

    const handleEdit = (address: any) => {
        setFormData(address);
        setEditingId(address.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("هل أنتِ متأكدة من حذف هذا العنوان؟")) {
            deleteAddress(id);
            toast.success("تم حذف العنوان بنجاح");
        }
    };

    const handleSetDefault = (id: string) => {
        updateAddress(id, { isDefault: true });
        toast.success("تم تعيين العنوان كافتراضي");
    };

    return (
        <PageLayout title="عناويني">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-4xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي", href: "/account" }, { label: "العناوين" }]} />
                    <Link to="/account" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft className="h-4 w-4" />
                        العودة لحسابي
                    </Link>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">عناويني</h1>
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setEditingId(null);
                                setFormData({
                                    label: "المنزل",
                                    fullName: "",
                                    phone: "",
                                    city: "",
                                    district: "",
                                    street: "",
                                    building: "",
                                    landmark: "",
                                    isDefault: false,
                                });
                            }}
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            <Plus className="h-4 w-4" />
                            إضافة عنوان
                        </button>
                    </div>

                    {showForm && (
                        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mb-6">
                            <h2 className="font-bold mb-4">
                                {editingId ? "تعديل العنوان" : "إضافة عنوان جديد"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">تسمية العنوان</label>
                                        <select
                                            value={formData.label}
                                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        >
                                            <option value="المنزل">المنزل</option>
                                            <option value="العمل">العمل</option>
                                            <option value="العائلة">العائلة</option>
                                            <option value="أخرى">أخرى</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">الاسم الكامل</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="أدخلي اسم المستلم"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">رقم الجوال</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="05xxxxxxxx"
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">المدينة</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="أدخلي المدينة"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">الحي</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.district}
                                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                            placeholder="أدخلي الحي"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">الشارع</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        placeholder="اسم الشارع ورقم المبنى"
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">رقم المبنى</label>
                                        <input
                                            type="text"
                                            value={formData.building}
                                            onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                                            placeholder="رقم المبنى"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">معلم مميز (اختياري)</label>
                                        <input
                                            type="text"
                                            value={formData.landmark}
                                            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                            placeholder="مثال: قرب المسجد"
                                            className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={formData.isDefault}
                                        onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                        className="rounded border-border"
                                    />
                                    <span>تعيين كعنوان افتراضي</span>
                                </label>

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                    >
                                        {editingId ? "حفظ التعديلات" : "إضافة العنوان"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingId(null);
                                        }}
                                        className="flex-1 border border-border py-2.5 rounded-lg font-medium hover:bg-muted transition-colors"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {addresses.length === 0 ? (
                        <div className="bg-card border border-border rounded-2xl p-12 text-center">
                            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">لا توجد عناوين محفوظة</h3>
                            <p className="text-muted-foreground mb-6">أضيفي عنوانك الأول للبدء</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`bg-card border rounded-2xl p-4 relative ${
                                        address.isDefault ? "border-primary" : "border-border"
                                    }`}
                                >
                                    {address.isDefault && (
                                        <div className="absolute top-4 left-4">
                                            <Star className="h-4 w-4 text-primary fill-primary" />
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{address.label}</span>
                                                {address.isDefault && (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        الافتراضي
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{address.fullName}</p>
                                            <p className="text-sm text-muted-foreground" dir="ltr">{address.phone}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm space-y-1 mb-4">
                                        <p>{address.city} - {address.district}</p>
                                        <p>{address.street}</p>
                                        {address.building && <p>مبنى {address.building}</p>}
                                        {address.landmark && <p className="text-muted-foreground">{address.landmark}</p>}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="flex-1 flex items-center justify-center gap-1 border border-border py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                                        >
                                            <Edit className="h-3.5 w-3.5" />
                                            تعديل
                                        </button>
                                        {!address.isDefault && (
                                            <button
                                                onClick={() => handleSetDefault(address.id)}
                                                className="flex-1 border border-border py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                                            >
                                                تعيين افتراضي
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="flex items-center justify-center px-3 border border-destructive text-destructive py-2 rounded-lg text-sm hover:bg-destructive/10 transition-colors"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default AddressesPage;
