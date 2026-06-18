import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Address } from '../../types/order';

interface AddressFormProps {
  initialData?: Partial<Address>;
  onSubmit: (data: Address) => void;
  onCancel?: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<Partial<Address>>(
    initialData || {
      fullName: '',
      phone: '',
      street: '',
      building: '',
      apartment: '',
      landmark: '',
      city: '',
      area: '',
      postalCode: '',
      country: 'SA',
      isDefault: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="الاسم الكامل"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <Input
          label="رقم الهاتف"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="الشارع"
        name="street"
        value={formData.street}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="المبنى - اختياري"
          name="building"
          value={formData.building}
          onChange={handleChange}
        />
        <Input
          label="الشقة - اختياري"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
        />
      </div>

      <Input
        label="معلم بارز - اختياري"
        name="landmark"
        value={formData.landmark}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="المدينة"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <Input
          label="المنطقة"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="الرمز البريدي"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <Input
          label="الدولة"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          id="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
          className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-primary bg-white dark:bg-[#1a1a2e]"
        />
        <label htmlFor="isDefault" className="text-sm text-gray-700 dark:text-gray-300">
          تعيين كعنوان افتراضي
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" variant="primary" size="md">
          حفظ العنوان
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" size="md" onClick={onCancel}>
            إلغاء
          </Button>
        )}
      </div>
    </form>
  );
};
