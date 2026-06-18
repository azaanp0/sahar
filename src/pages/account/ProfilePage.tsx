import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";
import { User, Mail, Phone, ChevronLeft, Camera, Lock, Calendar } from "lucide-react";

const ProfilePage = () => {
    const { user, updateProfile } = useStore();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate || "",
        gender: user.gender || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        setEditing(false);
        toast.success("تم تحديث البيانات بنجاح");
    };

    return (
        <PageLayout title="بياناتي الشخصية">
            <div className="px-4 py-6">
                <div className="mx-auto max-w-2xl">
                    <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حسابي", href: "/account" }, { label: "الملف الشخصي" }]} />
                    <Link to="/account" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ChevronLeft className="h-4 w-4" />
                        العودة لحسابي
                    </Link>

                    <h1 className="text-2xl font-bold mb-6">بياناتي الشخصية</h1>

                    {/* Profile Header */}
                    <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-10 w-10 text-primary" />
                                </div>
                                <button className="absolute bottom-0 right-0 h-7 w-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                                    <Camera className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold">معلومات الحساب</h2>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="text-primary text-sm font-medium hover:underline"
                                >
                                    تعديل
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        الاسم الكامل
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        رقم الجوال
                                    </label>
                                    <div className="flex gap-2">
                                        <span className="flex items-center justify-center px-3 border border-border rounded-lg text-sm bg-muted">
                                            🇸🇦 +966
                                        </span>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            maxLength={9}
                                            className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        تاريخ الميلاد (اختياري)
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary"
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">الجنس (اختياري)</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === "female"}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="border-border"
                                            />
                                            <span>أنثى</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === "male"}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="border-border"
                                            />
                                            <span>ذكر</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                    >
                                        حفظ التغييرات
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(false);
                                            setFormData({
                                                name: user.name,
                                                email: user.email,
                                                phone: user.phone,
                                                birthDate: user.birthDate || "",
                                                gender: user.gender || "",
                                            });
                                        }}
                                        className="flex-1 border border-border py-2.5 rounded-lg font-medium hover:bg-muted transition-colors"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-border">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">الاسم الكامل</p>
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pb-3 border-b border-border">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                                        <p className="font-medium" dir="ltr">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pb-3 border-b border-border">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">رقم الجوال</p>
                                        <p className="font-medium" dir="ltr">{user.phone}</p>
                                    </div>
                                </div>
                                {user.birthDate && (
                                    <div className="flex items-center gap-3 pb-3 border-b border-border">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">تاريخ الميلاد</p>
                                            <p className="font-medium">{user.birthDate}</p>
                                        </div>
                                    </div>
                                )}
                                {user.gender && (
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">الجنس</p>
                                            <p className="font-medium">{user.gender === "female" ? "أنثى" : "ذكر"}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Change Password */}
                    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 mt-6">
                        <h2 className="font-bold mb-4 flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            تغيير كلمة المرور
                        </h2>
                        <Link
                            to="/reset-password"
                            className="block text-center text-primary font-medium hover:underline"
                        >
                            تغيير كلمة المرور
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProfilePage;
