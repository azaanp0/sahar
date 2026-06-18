import React, { useState, useMemo } from 'react';
import {
  BarChart3, TrendingUp, Users, ShoppingCart, DollarSign,
  Calendar, Download, Filter
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { ChartCard } from './ChartCard';
import { ResponsiveCard } from './ResponsiveCard';
import { Filters } from './Filters';

const salesData = [
  { month: 'يناير', sales: 45000, orders: 180, visitors: 12500 },
  { month: 'فبراير', sales: 52000, orders: 210, visitors: 14200 },
  { month: 'مارس', sales: 48000, orders: 195, visitors: 13800 },
  { month: 'أبريل', sales: 61000, orders: 245, visitors: 15600 },
  { month: 'مايو', sales: 58000, orders: 230, visitors: 14900 },
  { month: 'يونيو', sales: 72000, orders: 290, visitors: 18200 },
];

const categoryData = [
  { name: 'العناية بالبشرة', value: 35, color: '#E91E63' },
  { name: 'المكياج', value: 25, color: '#C2185B' },
  { name: 'العطور', value: 20, color: '#F48FB1' },
  { name: 'العناية بالشعر', value: 12, color: '#AD1457' },
  { name: 'أخرى', value: 8, color: '#F8BBD0' },
];

const trafficData = [
  { source: 'مباشر', value: 35, color: '#E91E63' },
  { source: 'بحث عضوي', value: 28, color: '#22C55E' },
  { source: 'سوشيال ميديا', value: 22, color: '#3B82F6' },
  { source: 'إعلانات', value: 10, color: '#F59E0B' },
  { source: 'أخرى', value: 5, color: '#9CA3AF' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('6months');

  const stats = useMemo(() => ({
    totalRevenue: salesData.reduce((sum, d) => sum + d.sales, 0),
    totalOrders: salesData.reduce((sum, d) => sum + d.orders, 0),
    avgOrderValue: Math.round(salesData.reduce((sum, d) => sum + d.sales, 0) / salesData.reduce((sum, d) => sum + d.orders, 0)),
    conversionRate: ((salesData.reduce((sum, d) => sum + d.orders, 0) / salesData.reduce((sum, d) => sum + d.visitors, 0)) * 100).toFixed(2),
  }), []);

  const periodOptions = [
    { label: 'آخر 6 أشهر', value: '6months' },
    { label: 'آخر 3 أشهر', value: '3months' },
    { label: 'هذا الشهر', value: 'month' },
    { label: 'هذا الأسبوع', value: 'week' },
  ];

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-6 animate-fadeIn overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#E91E63] dark:text-[#C2185B]" />
            التحليلات والتقارير
          </h1>
          <p className="text-xs sm:text-sm text-black/60 dark:text-gray-400 mt-1">
            رؤى شاملة حول أداء متجرك
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#C2185B] dark:hover:bg-[#AD1457] transition-all duration-300 min-h-[44px] shadow-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">تصدير التقرير</span>
        </button>
      </div>

      {/* Period Filter */}
      <Filters
        filterOptions={periodOptions}
        filterValue={period}
        onFilterChange={setPeriod}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#E91E63] dark:border-[#C2185B]">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-[#E91E63] dark:text-[#C2185B]" />
            <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">إجمالي الإيرادات</p>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white">
            {stats.totalRevenue.toLocaleString('ar-SA')} ر.س
          </p>
          <p className="text-[10px] sm:text-xs text-[#22C55E] dark:text-green-400 mt-1">+12.5% من الفترة السابقة</p>
        </ResponsiveCard>

        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#3B82F6]">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-4 h-4 text-[#3B82F6]" />
            <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">إجمالي الطلبات</p>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white">
            {stats.totalOrders}
          </p>
          <p className="text-[10px] sm:text-xs text-[#22C55E] dark:text-green-400 mt-1">+8.3% من الفترة السابقة</p>
        </ResponsiveCard>

        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#22C55E]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#22C55E]" />
            <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">متوسط قيمة الطلب</p>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white">
            {stats.avgOrderValue.toLocaleString('ar-SA')} ر.س
          </p>
          <p className="text-[10px] sm:text-xs text-[#22C55E] dark:text-green-400 mt-1">+3.2% من الفترة السابقة</p>
        </ResponsiveCard>

        <ResponsiveCard className="p-3 sm:p-4 border-l-4 border-[#F59E0B]">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#F59E0B]" />
            <p className="text-[10px] sm:text-xs text-black/60 dark:text-gray-400">معدل التحويل</p>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black text-black dark:text-white">
            {stats.conversionRate}%
          </p>
          <p className="text-[10px] sm:text-xs text-[#F59E0B] dark:text-yellow-400 mt-1">-0.5% من الفترة السابقة</p>
        </ResponsiveCard>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Sales Trend */}
        <ChartCard title="اتجاه المبيعات" subtitle="إجمالي المبيعات شهرياً">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FCE4EC" className="dark:stroke-gray-700" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#000000' }} className="dark:[&:text]:fill-white" />
              <YAxis tick={{ fontSize: 11, fill: '#000000' }} className="dark:[&:text]:fill-white" />
              <Tooltip
                contentStyle={{ borderRadius: '14px', border: '1px solid #E91E63', fontSize: '12px' }}
                formatter={(v: any) => [`${v.toLocaleString('ar-SA')} ر.س`, 'المبيعات']}
              />
              <Line type="monotone" dataKey="sales" stroke="#E91E63" strokeWidth={3} dot={{ fill: '#F48FB1', r: 5 }} activeDot={{ r: 7, fill: '#C2185B' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Orders Trend */}
        <ChartCard title="اتجاه الطلبات" subtitle="عدد الطلبات شهرياً">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FCE4EC" className="dark:stroke-gray-700" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#000000' }} className="dark:[&:text]:fill-white" />
              <YAxis tick={{ fontSize: 11, fill: '#000000' }} className="dark:[&:text]:fill-white" />
              <Tooltip
                contentStyle={{ borderRadius: '14px', border: '1px solid #E91E63', fontSize: '12px' }}
                formatter={(v: any) => [v, 'الطلبات']}
              />
              <Bar dataKey="orders" fill="#E91E63" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Category Distribution */}
        <ChartCard title="توزيع الفئات" subtitle="المبيعات حسب الفئة">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, 'النسبة']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-shrink-0">
              {categoryData.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-black dark:text-white">{c.name}</span>
                  <span className="font-bold text-black dark:text-white">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Traffic Sources */}
        <ChartCard title="مصادر الزيارات" subtitle="من أين يأتي عملاؤك">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={trafficData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {trafficData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, 'النسبة']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-shrink-0">
              {trafficData.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-black">{c.source}</span>
                  <span className="font-bold text-black">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
