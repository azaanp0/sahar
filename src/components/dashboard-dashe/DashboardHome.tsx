import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import type { Order } from '@/lib/dashboard-dashe/db';
import { useTheme } from 'next-themes';
import {
  TrendingUp, ShoppingBag, Package, Star, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Eye, Clock, CheckCircle,
  Truck, XCircle, RefreshCw, BarChart2
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const salesData = [
  { day: 'الأحد',  sales: 3200, orders: 12 },
  { day: 'الاثنين', sales: 4800, orders: 18 },
  { day: 'الثلاثاء', sales: 3900, orders: 15 },
  { day: 'الأربعاء', sales: 6200, orders: 24 },
  { day: 'الخميس', sales: 7800, orders: 31 },
  { day: 'الجمعة', sales: 9100, orders: 38 },
  { day: 'السبت', sales: 5400, orders: 21 },
];

const categoryData = [
  { name: 'العناية بالبشرة', value: 38, color: '#E91E63' },
  { name: 'المكياج',          value: 28, color: '#C2185B' },
  { name: 'العطور',           value: 18, color: '#F48FB1' },
  { name: 'العناية بالشعر',  value: 10, color: '#AD1457' },
  { name: 'أخرى',            value:  6, color: '#F8BBD0' },
];

const topProducts = [
  { name: 'كريم مرطب الوجه بالورد', sales: 245, revenue: 21805 },
  { name: 'أحمر شفاه مات فاخر',     sales: 189, revenue: 14175 },
  { name: 'سيروم فيتامين سي',        sales: 167, revenue: 10855 },
  { name: 'عطر وردة الشرق',         sales: 98,  revenue: 27440 },
  { name: 'ماسك الشعر بالأرغان',    sales: 134, revenue: 16080 },
];

const statusConfig: Record<Order['status'], { label: string; color: string; icon: React.ElementType; bgClass: string }> = {
  pending:   { label: 'قيد الانتظار', color: 'text-[#F59E0B]',  icon: Clock,        bgClass: 'bg-[#FEF3C7] text-[#92400E]' },
  confirmed: { label: 'مؤكد',         color: 'text-[#3B82F6]', icon: CheckCircle,   bgClass: 'bg-[#DBEAFE] text-[#1E40AF]' },
  shipped:   { label: 'في الشحن',     color: 'text-[#3B82F6]', icon: Truck,         bgClass: 'bg-[#DBEAFE] text-[#1E40AF]' },
  delivered: { label: 'تم التسليم',   color: 'text-[#22C55E]', icon: CheckCircle,   bgClass: 'bg-[#DCFCE7] text-[#166534]' },
  cancelled: { label: 'ملغي',         color: 'text-[#EF4444]', icon: XCircle,       bgClass: 'bg-[#FEE2E2] text-[#991B1B]' },
};

const StatCard = memo(({ title, value, sub, icon: Icon, trend, trendUp, loading, theme }: {
  title: string; value: string; sub: string; icon: React.ElementType;
  trend?: string; trendUp?: boolean; loading?: boolean; theme: 'light' | 'dark';
}) => (
  <div className="rounded-3xl p-3 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 ease border border-[#E91E63] dark:border-[#C2185B] bg-white dark:bg-gray-800 text-black dark:text-white">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border border-[#E91E63] dark:border-[#C2185B] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E91E63] dark:text-[#C2185B]" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-[rgba(76,175,80,0.1)] text-[#4CAF50] border border-[#4CAF50]' : 'bg-[rgba(244,67,54,0.1)] text-[#F44336] border border-[#F44336]'}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
    <p className="text-xs sm:text-sm mb-1 text-black dark:text-gray-300">{title}</p>
    <p className="text-xl sm:text-3xl font-black text-black dark:text-white">{loading ? <span className="shimmer block h-8 w-24 rounded" /> : value}</p>
    <p className="text-[10px] sm:text-xs mt-1 text-black dark:text-gray-400">{sub}</p>
  </div>
));

StatCard.displayName = 'StatCard';

export default function DashboardHome() {
  const { theme } = useTheme();
  const [stats, setStats] = useState(db.getStats());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStats(db.getStats());
      setOrders(db.getOrders().slice(0, 5));
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const lowStockProducts = useMemo(() => db.getProducts().filter(p => p.stock < 60).slice(0, 4), []);


  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn text-black dark:text-white" style={{ fontFamily: 'var(--font-main, \'Cairo\'), \'Tajawal\', sans-serif' }}>
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <StatCard title="مبيعات اليوم" value={`${stats.salesToday.toLocaleString('ar-SA')} ر.س`} sub="إجمالي الطلبات المكتملة اليوم" icon={TrendingUp} trend="+12%" trendUp loading={loading} theme={theme} />
        <StatCard title="إجمالي الطلبات" value={stats.ordersCount.toString()} sub={`${stats.pendingOrders} طلب في الانتظار`} icon={ShoppingBag} trend="+5%" trendUp loading={loading} theme={theme} />
        <StatCard title="المنتجات النشطة" value={stats.activeProducts.toString()} sub={`من ${stats.productsCount} منتج إجمالاً`} icon={Package} trend="+3%" trendUp loading={loading} theme={theme} />
        <StatCard title="متوسط التقييم" value={`${stats.avgRating} ⭐`} sub={`${stats.newCustomers} عميل جديد هذا الأسبوع`} icon={Star} trend="+0.2" trendUp loading={loading} theme={theme} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Sales Line Chart */}
        <div className="lg:col-span-2 rounded-3xl p-3 sm:p-5 border border-[#E91E63] dark:border-[#C2185B] shadow-sm hover:shadow-xl transition-all duration-300 ease overflow-hidden bg-white dark:bg-gray-800 text-black dark:text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-5 gap-2">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-black dark:text-white">مبيعات الأسبوع</h3>
              <p className="text-[10px] sm:text-xs text-black dark:text-gray-400">إجمالي المبيعات اليومية</p>
            </div>
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#E91E63] dark:border-[#C2185B] bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
              <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B]" />
              <span className="text-[10px] sm:text-xs font-bold text-black dark:text-white">39,400 ر.س</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" minWidth={400} height={180}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2A2A4A' : '#FCE4EC'} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: theme === 'dark' ? '#A0A0B0' : '#000000' }} />
                <YAxis tick={{ fontSize: 10, fill: theme === 'dark' ? '#A0A0B0' : '#000000' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '14px', border: '1px solid #E91E63', fontSize: '11px', backgroundColor: theme === 'dark' ? '#1A1A2E' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}
                  formatter={(v: any) => [`${v.toLocaleString('ar-SA')} ر.س`, 'المبيعات']}
                />
                <Line type="monotone" dataKey="sales" stroke="#E91E63" strokeWidth={3} dot={{ fill: '#F48FB1', r: 4 }} activeDot={{ r: 6, fill: '#C2185B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-3xl p-3 sm:p-5 border border-[#E91E63] dark:border-[#C2185B] shadow-sm hover:shadow-xl transition-all duration-300 ease bg-white dark:bg-gray-800 text-black dark:text-white">
          <h3 className="font-bold mb-1 text-sm sm:text-base text-black dark:text-white">توزيع الفئات</h3>
          <p className="text-[10px] sm:text-xs mb-3 sm:mb-4 text-black dark:text-gray-400">المبيعات حسب القسم</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, 'النسبة']} contentStyle={{ backgroundColor: theme === 'dark' ? '#1A1A2E' : '#fff', color: theme === 'dark' ? '#fff' : '#000', border: '1px solid #E91E63', borderRadius: '14px', fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 sm:space-y-1.5 mt-2">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="truncate text-black dark:text-gray-300">{c.name}</span>
                </div>
                <span className="font-bold text-black dark:text-white">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 rounded-3xl p-3 sm:p-5 border border-[#E91E63] dark:border-[#C2185B] shadow-sm hover:shadow-xl transition-all duration-300 ease overflow-hidden bg-white dark:bg-gray-800 text-black dark:text-white">
          <h3 className="font-bold mb-2 sm:mb-4 text-sm sm:text-base text-black dark:text-white">أعلى المنتجات مبيعاً</h3>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" minWidth={350} height={160}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2A2A4A' : '#FCE4EC'} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: theme === 'dark' ? '#A0A0B0' : '#000000' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: theme === 'dark' ? '#A0A0B0' : '#000000', width: 100 }} width={100} />
                <Tooltip formatter={(v: any) => [`${v} وحدة`, 'المبيعات']} contentStyle={{ backgroundColor: theme === 'dark' ? '#1A1A2E' : '#fff', color: theme === 'dark' ? '#fff' : '#000', border: '1px solid #E91E63', borderRadius: '14px', fontSize: '11px' }} />
                <Bar dataKey="sales" fill="#E91E63" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-3xl p-3 sm:p-5 border border-[#E91E63] dark:border-[#C2185B] shadow-sm hover:shadow-xl transition-all duration-300 ease space-y-2 sm:space-y-3 bg-white dark:bg-gray-800 text-black dark:text-white">
          <h3 className="font-bold mb-2 text-sm sm:text-base text-black dark:text-white">تنبيهات المخزون</h3>
          {lowStockProducts.map(p => (
            <div key={p.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border border-[#E91E63] dark:border-[#C2185B] rounded-xl transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold truncate text-black dark:text-white">{p.nameAr}</p>
                <p className="text-[10px] sm:text-xs text-black dark:text-gray-400">متبقي: <span className="font-bold text-[#E91E63] dark:text-[#C2185B]">{p.stock}</span> قطعة</p>
              </div>
            </div>
          ))}
          <button onClick={() => alert('سيتم عرض جميع التنبيهات')} className="w-full text-[10px] sm:text-xs font-semibold text-center py-1.5 sm:py-2 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease text-black dark:text-gray-300">
            عرض جميع التنبيهات →
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-3xl shadow-sm hover:shadow-xl border border-[#E91E63] dark:border-[#C2185B] transition-all duration-300 ease overflow-hidden bg-white dark:bg-gray-800 text-black dark:text-white">
        <div className="px-3 sm:px-6 py-2 sm:py-4 border-b border-[#E91E63] dark:border-[#C2185B] flex items-center justify-between bg-white dark:bg-gray-800">
          <h3 className="font-bold text-sm sm:text-base text-black dark:text-white">أحدث الطلبات</h3>
          <button onClick={refreshData} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease text-black dark:text-gray-300" aria-label="تحديث البيانات">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">تحديث</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
              <tr>
                {['رقم الطلب', 'العميل', 'المدينة', 'المبلغ', 'الحالة', 'التاريخ', ''].map(h => (
                  <th key={h} className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-semibold whitespace-nowrap text-black dark:text-gray-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y divide-[#E91E63] ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
              {orders.map(order => {
                const cfg = statusConfig[order.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={order.id} className="hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease">
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-mono font-bold text-[#E91E63] whitespace-nowrap">{order.orderNumber}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5">
                      <p className="text-xs sm:text-sm font-semibold truncate text-black dark:text-white">{order.customerName}</p>
                      <p className="text-[10px] sm:text-xs text-black dark:text-gray-400">{order.customerPhone}</p>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm whitespace-nowrap text-black dark:text-gray-300">{order.city}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap text-black dark:text-white">{order.total.toLocaleString('ar-SA')} ر.س</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5">
                      <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${cfg.bgClass}`}>
                        <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5 text-[10px] sm:text-xs text-black dark:text-gray-300 whitespace-nowrap">{order.createdAt}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3.5">
                      <button onClick={() => alert(`عرض تفاصيل الطلب: ${order.orderNumber}`)} className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(233,30,99,0.08)] dark:hover:bg-[rgba(194,24,91,0.15)] transition-colors duration-300 ease" aria-label="عرض التفاصيل">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E91E63] dark:text-[#C2185B]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
