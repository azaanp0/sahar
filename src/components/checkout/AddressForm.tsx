import { useState } from "react";
import { MapPin, Phone, User, Building2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { Address } from "@/types";

interface AddressFormProps {
    addresses: Address[];
    selectedAddress?: Address | null;
    onSelectAddress: (address: Address) => void;
    onAddAddress: (address: Omit<Address, "id">) => void;
    onNewAddress: () => void;
}

const AddressForm = ({ addresses, selectedAddress, onSelectAddress, onAddAddress, onNewAddress }: AddressFormProps) => {
    const [showNewForm, setShowNewForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
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
        onAddAddress(newAddress);
        setShowNewForm(false);
        setNewAddress({
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

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
                    <MapPin className="h-5 w-5" />
                    عنوان التوصيل
                </h3>

                {/* Saved Addresses */}
                {addresses.length > 0 && !showNewForm && (
                    <div className="space-y-3 mb-4">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                    selectedAddress?.id === address.id
                                        ? "border-[#E91E63] dark:border-[#C2185B] bg-[#E91E63]/5 dark:bg-[#C2185B]/10"
                                        : "border-gray-200 dark:border-gray-700 hover:border-[#E91E63]/50 dark:hover:border-[#C2185B]/50"
                                }`}
                                onClick={() => onSelectAddress(address)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-black dark:text-white">{address.label}</span>
                                            {address.isDefault && (
                                                <span className="text-xs bg-[#E91E63]/10 dark:bg-[#C2185B]/20 text-[#E91E63] dark:text-[#C2185B] px-2 py-0.5 rounded-full">
                                                    الافتراضي
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-black dark:text-white">{address.fullName}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{address.phone}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {address.city}, {address.district}, {address.street}
                                            {address.building && `, ${address.building}`}
                                        </p>
                                        {address.landmark && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                معلم: {address.landmark}
                                            </p>
                                        )}
                                    </div>
                                    <RadioGroupItem value={address.id} checked={selectedAddress?.id === address.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add New Address Button */}
                {!showNewForm && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowNewForm(true)}
                    >
                        <Building2 className="h-4 w-4 ml-2" />
                        إضافة عنوان جديد
                    </Button>
                )}
            </div>

            {/* New Address Form */}
            {showNewForm && (
                <div className="bg-white dark:bg-[#16213e] border border-gray-200 dark:border-gray-600 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-black dark:text-white">عنوان جديد</h4>
                        <Button variant="ghost" size="sm" onClick={() => setShowNewForm(false)}>
                            إلغاء
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="label">تسمية العنوان</Label>
                                <Input
                                    id="label"
                                    value={newAddress.label}
                                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                    placeholder="المنزل، العمل،..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">الاسم الكامل *</Label>
                                <div className="relative">
                                    <User className="absolute right-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="fullName"
                                        value={newAddress.fullName}
                                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                        className="pr-10"
                                        placeholder="الاسم الكامل"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">رقم الجوال *</Label>
                            <div className="relative">
                                <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="phone"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    className="pr-10"
                                    placeholder="05xxxxxxxx"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">المدينة *</Label>
                                <Input
                                    id="city"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    placeholder="الرياض، جدة،..."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">الحي *</Label>
                                <Input
                                    id="district"
                                    value={newAddress.district}
                                    onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                                    placeholder="اسم الحي"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="street">الشارع *</Label>
                            <div className="relative">
                                <Navigation className="absolute right-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="street"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                    className="pr-10"
                                    placeholder="اسم الشارع ورقم المبنى"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="building">المبنى/العمارة</Label>
                                <Input
                                    id="building"
                                    value={newAddress.building}
                                    onChange={(e) => setNewAddress({ ...newAddress, building: e.target.value })}
                                    placeholder="اختياري"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="landmark">معلم قريب</Label>
                                <Input
                                    id="landmark"
                                    value={newAddress.landmark}
                                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                                    placeholder="اختياري"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                            <input
                                type="checkbox"
                                id="isDefault"
                                checked={newAddress.isDefault}
                                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#E91E63] focus:ring-[#E91E63]"
                            />
                            <Label htmlFor="isDefault" className="text-sm cursor-pointer text-black dark:text-white">
                                تعيين كعنوان افتراضي
                            </Label>
                        </div>

                        <Separator />

                        <div className="flex gap-2">
                            <Button type="submit" className="flex-1">
                                حفظ العنوان
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
                                إلغاء
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Map Placeholder */}
            {!showNewForm && (
                <div className="bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        حددي موقعك على الخريطة
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        سيتم إضافة هذه الميزة عند ربط Google Maps API
                    </p>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
