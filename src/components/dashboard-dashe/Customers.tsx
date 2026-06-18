import React, { useState, useMemo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import {
  Users, Search, Mail, Phone, MapPin, Calendar,
  TrendingUp, ShoppingBag, Star, Filter
} from 'lucide-react';
import { TableWrapper } from './TableWrapper';
import { Filters } from './Filters';
import { ResponsiveCard } from './ResponsiveCard';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string;
  joinedDate: string;
  loyaltyPoints: number;
}

// Mock customer data derived from orders
const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '0501234567',
    city: 'الرياض',
    totalOrders: 12,
    totalSpent: 4580,
    avgOrderValue: 382,
    lastOrderDate: '2024-01-15',
    joinedDate: '2023-06-10',
    loyaltyPoints: 1200,
  },
  {
    id: 'CUST002',
    name: 'محمد العلي',
    email: 'mohammed@example.com',
    phone: '0559876543',
    city: 'جدة',
    totalOrders: 8,
    totalSpent: 3200,
    avgOrderValue: 400,
    lastOrderDate: '2024-01-14',
    joinedDate: '2023-08-22',
    loyaltyPoints: 800,
  },
  {
    id: 'CUST003',
    name: 'فاطمة الخالدي',
    email: 'fatima@example.com',
    phone: '0541112233',
    city: 'الدمام',
    totalOrders: 5,
    totalSpent: 1850,
    avgOrderValue: 370,
    lastOrderDate: '2024-01-12',
    joinedDate: '2023-10-05',
    loyaltyPoints: 500,
  },
  {
    id: 'CUST004',
    name: 'عبدالله السعيد',
    email: 'abdullah@example.com',
    phone: '0567778888',
    city: 'مكة',
    totalOrders: 15,
    totalSpent: 6200,
    avgOrderValue: 413,
    lastOrderDate: '2024-01-16',
    joinedDate: '2023-03-15',
    loyaltyPoints: 1500,
  },
  {
    id: 'CUST005',
    name: 'نورة الحربي',
    email: 'noura@example.com',
    phone: '0523334444',
    city: 'المدينة',
    totalOrders: 3,
    totalSpent: 990,
    avgOrderValue: 330,
    lastOrderDate: '2024-01-10',
    joinedDate: '2023-11-20',
    loyaltyPoints: 300,
  },
];

export default function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('الكل');

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchSearch = customer.name.toLowerCase().includes(search.toLowerCase()) ||
                         customer.email.toLowerCase().includes(search.toLowerCase()) ||
                         customer.phone.includes(search);
      const matchCity = cityFilter === 'الكل' || customer.city === cityFilter;
      return matchSearch && matchCity;
    });
  }, [customers, search, cityFilter]);

  const cities = useMemo(() => {
    return ['الكل', ...Array.from(new Set(customers.map(c => c.city)))];
  }, [customers]);

  const stats = useMemo(() => ({
    total: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrders: Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length),
    topSpender: customers.reduce((max, c) => c.totalSpent > max.totalSpent ? c : max, customers[0]),
  }), [customers]);

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#E91E63] dark:text-[#C2185B]" />
            إدارة العملاء
          </h1>
          <p className="text-xs sm:text-sm text-black/60 dark:text-gray-400 mt-1">
            {stats.total} عميل نشط · إجمالي الإنفاق {stats.totalRevenue.toLocaleString('ar-SA')} ر.س
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#E91E63] dark:border-[#C2185B]">
          <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">إجمالي العملاء</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white mt-1">{stats.total}</p>
        </ResponsiveCard>
        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#22C55E]">
          <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">إجمالي الإنفاق</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white mt-1">{stats.totalRevenue.toLocaleString('ar-SA')}</p>
        </ResponsiveCard>
        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#3B82F6]">
          <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">متوسط الطلبات</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white mt-1">{stats.avgOrders}</p>
        </ResponsiveCard>
        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#F59E0B]">
          <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">أعلى منفق</p>
          <p className="text-sm sm:text-base font-bold text-black dark:text-white mt-1 truncate">{stats.topSpender.name}</p>
        </ResponsiveCard>
      </div>

      {/* Filters */}
      <Filters
        searchPlaceholder="بحث بالاسم، البريد، أو الهاتف..."
        searchValue={search}
        onSearchChange={setSearch}
        filterOptions={cities.map(city => ({ label: city, value: city }))}
        filterValue={cityFilter}
        onFilterChange={setCityFilter}
      />

      {/* Customers Table */}
      <ResponsiveCard className="p-0 overflow-hidden">
        <TableWrapper minWidth="1000px">
          <table className="w-full">
            <thead className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border-b border-[#E91E63] dark:border-[#C2185B]">
              <tr>
                {['العميل', 'معلومات الاتصال', 'المدينة', 'إجمالي الطلبات', 'إجمالي الإنفاق', 'متوسط الطلب', 'نقاط الولاء', 'آخر طلب', 'الإجراءات'].map(header => (
                  <th key={header} className="px-4 py-3 text-right text-xs font-semibold text-black dark:text-white whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E91E63] dark:divide-[#C2185B]">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] flex items-center justify-center text-sm font-bold text-[#E91E63] dark:text-[#C2185B]">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-black dark:text-white text-xs sm:text-sm">{customer.name}</p>
                        <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-black dark:text-gray-300">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-black dark:text-gray-300">
                        <Phone className="w-3 h-3 flex-shrink-0" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm text-black dark:text-gray-300">{customer.city}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3 h-3 text-[#E91E63] dark:text-[#C2185B]" />
                      <span className="font-bold text-black dark:text-white text-xs sm:text-sm">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-black dark:text-white text-xs sm:text-sm">{customer.totalSpent.toLocaleString('ar-SA')} ر.س</p>
                  </td>
                  <td className="px-4 py-3 text-[10px] sm:text-xs text-black dark:text-gray-300">{customer.avgOrderValue.toLocaleString('ar-SA')} ر.س</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[rgba(255,152,0,0.1)] text-[#FF9800] rounded-full text-[10px] sm:text-xs font-semibold">
                      <Star className="w-3 h-3 fill-[#FF9800]" />
                      {customer.loyaltyPoints}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10px] sm:text-xs text-black dark:text-gray-300">{customer.lastOrderDate}</td>
                  <td className="px-4 py-3">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 min-h-[32px] min-w-[32px]" title="عرض التفاصيل">
                      <Users className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30 text-black dark:text-gray-400" />
                    <p className="text-sm text-black/60 dark:text-gray-400">لا يوجد عملاء يطابقون البحث</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>
      </ResponsiveCard>
    </div>
  );
}
