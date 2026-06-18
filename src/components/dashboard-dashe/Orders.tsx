import React, { useState, useMemo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { Order } from '@/lib/dashboard-dashe/db';
import {
  ShoppingBag, Search, Filter, Eye, Truck, CheckCircle,
  XCircle, Clock, RefreshCw, Download, Calendar
} from 'lucide-react';
import { TableWrapper } from './TableWrapper';
import { Filters } from './Filters';
import { ResponsiveCard } from './ResponsiveCard';

const STATUS_CONFIG: Record<Order['status'], { label: string; color: string; icon: React.ElementType; bgClass: string }> = {
  pending:   { label: 'قيد الانتظار', color: 'text-[#F59E0B]', icon: Clock,        bgClass: 'bg-[#FEF3C7] text-[#92400E]' },
  confirmed: { label: 'مؤكد',         color: 'text-[#3B82F6]', icon: CheckCircle,   bgClass: 'bg-[#DBEAFE] text-[#1E40AF]' },
  shipped:   { label: 'في الشحن',     color: 'text-[#3B82F6]', icon: Truck,         bgClass: 'bg-[#DBEAFE] text-[#1E40AF]' },
  delivered: { label: 'تم التسليم',   color: 'text-[#22C55E]', icon: CheckCircle,   bgClass: 'bg-[#DCFCE7] text-[#166534]' },
  cancelled: { label: 'ملغي',         color: 'text-[#EF4444]', icon: XCircle,       bgClass: 'bg-[#FEE2E2] text-[#991B1B]' },
};

export default function Orders() {
  const [orders] = useState<Order[]>(db.getOrders());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [dateFilter, setDateFilter] = useState('الكل');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(search.toLowerCase()) ||
                         order.customerPhone.includes(search);
      const matchStatus = statusFilter === 'الكل' || order.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const statusOptions = [
    { label: 'جميع الحالات', value: 'الكل' },
    { label: 'قيد الانتظار', value: 'pending' },
    { label: 'مؤكد', value: 'confirmed' },
    { label: 'في الشحن', value: 'shipped' },
    { label: 'تم التسليم', value: 'delivered' },
    { label: 'ملغي', value: 'cancelled' },
  ];

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  }), [orders]);

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-[#E91E63] dark:text-[#C2185B]" />
            إدارة الطلبات
          </h1>
          <p className="text-xs sm:text-sm text-black/60 dark:text-gray-400 mt-1">
            إجمالي {stats.total} طلب · {stats.pending} في الانتظار · {stats.shipped} في الشحن
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 min-h-[44px] shadow-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">تصدير التقرير</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {[
          { label: 'إجمالي الطلبات', value: stats.total, color: 'border-[#E91E63]' },
          { label: 'قيد الانتظار', value: stats.pending, color: 'border-[#F59E0B]' },
          { label: 'في الشحن', value: stats.shipped, color: 'border-[#3B82F6]' },
          { label: 'تم التسليم', value: stats.delivered, color: 'border-[#22C55E]' },
          { label: 'ملغي', value: stats.cancelled, color: 'border-[#EF4444]' },
        ].map((stat, idx) => (
          <ResponsiveCard key={idx} className={`p-3 sm:p-4 border-l-4 ${stat.color}`}>
            <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">{stat.label}</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white mt-1">{stat.value}</p>
          </ResponsiveCard>
        ))}
      </div>

      {/* Filters */}
      <Filters
        searchPlaceholder="بحث برقم الطلب، اسم العميل، أو الهاتف..."
        searchValue={search}
        onSearchChange={setSearch}
        filterOptions={statusOptions}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {/* Orders Table */}
      <ResponsiveCard className="p-0 overflow-hidden">
        <TableWrapper minWidth="900px">
          <table className="w-full">
            <thead className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] border-b border-[#E91E63] dark:border-[#C2185B]">
              <tr>
                {['رقم الطلب', 'العميل', 'المدينة', 'المبلغ', 'الحالة', 'التاريخ', 'الإجراءات'].map(header => (
                  <th key={header} className="px-4 py-3 text-right text-xs font-semibold text-black dark:text-white whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E91E63] dark:divide-[#C2185B]">
              {filteredOrders.map(order => {
                const StatusIcon = STATUS_CONFIG[order.status].icon;
                return (
                  <tr key={order.id} className="hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300">
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-[#E91E63] dark:text-[#C2185B] text-xs sm:text-sm">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-black dark:text-white text-xs sm:text-sm">{order.customerName}</p>
                      <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm text-black dark:text-gray-300">{order.city}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-black dark:text-white text-xs sm:text-sm">
                        {order.total.toLocaleString('ar-SA')} ر.س
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${STATUS_CONFIG[order.status].bgClass}`}>
                        <StatusIcon className="w-3 h-3" />
                        {STATUS_CONFIG[order.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[10px] sm:text-xs text-black dark:text-gray-300">{order.createdAt}</td>
                    <td className="px-4 py-3">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 min-h-[32px] min-w-[32px]" title="عرض التفاصيل">
                        <Eye className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-black dark:text-gray-400" />
                    <p className="text-sm text-black/60 dark:text-gray-400">لا توجد طلبات تطابق البحث</p>
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
