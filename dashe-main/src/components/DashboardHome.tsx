import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { Order } from '../lib/db';
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
  { name: 'العناية بالبشرة', value: 38, color: '#C6AAD0' },
  { name: 'المكياج',          value: 28, color: '#E91E8C' },
  { name: 'العطور',           value: 18, color: '#9A68A8' },
  { name: 'العناية بالشعر',  value: 10, color: '#7D4F8A' },
  { name: 'أخرى',            value:  6, color: '#D9B8E6' },
];

const topProducts = [
  { name: 'كريم مرطب الوجه بالورد', sales: 245, revenue: 21805 },
  { name: 'أحمر شفاه مات فاخر',     sales: 189, revenue: 14175 },
  { name: 'سيروم فيتامين سي',        sales: 167, revenue: 10855 },
  { name: 'عطر وردة الشرق',         sales: 98,  revenue: 27440 },
  { name: 'ماسك الشعر بالأرغان',    sales: 134, revenue: 16080 },
];

const statusConfig: Record<Order['status'], { label: string; color: string; icon: React.ElementType; badge: string }> = {
  pending:   { label: 'قيد الانتظار', color: 'text-warning',  icon: Clock,        badge: 'badge-pending'   },
  confirmed: { label: 'مؤكد',         color: 'text-info',    icon: CheckCircle,   badge: 'badge-shipped'   },
  shipped:   { label: 'في الشحن',     color: 'text-info',    icon: Truck,         badge: 'badge-shipped'   },
  delivered: { label: 'تم التسليم',   color: 'text-success', icon: CheckCircle,   badge: 'badge-delivered' },
  cancelled: { label: 'ملغي',         color: 'text-danger',  icon: XCircle,       badge: 'badge-cancelled' },
};

export default function DashboardHome() {
  const [stats, setStats] = useState(db.getStats());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats(db.getStats());
      setOrders(db.getOrders().slice(0, 5));
      setLoading(false);
    }, 600);
  }, []);

  const StatCard = ({ title, value, sub, icon: Icon, cardClass, trend, trendUp }: {
    title: string; value: string; sub: string; icon: React.ElementType;
    cardClass: string; trend?: string; trendUp?: boolean;
  }) => (
    <div className={`rounded-2xl p-5 shadow-card hover:shadow-cardHover transition-all hover-lift ${cardClass}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shadow-sm">
          <Icon className="w-6 h-6 text-current opacity-70" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-black text-gray-900">{loading ? <span className="shimmer block h-8 w-24 rounded" /> : value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="مبيعات اليوم" value={`${stats.salesToday.toLocaleString('ar-SA')} ر.س`} sub="إجمالي الطلبات المكتملة اليوم" icon={TrendingUp} cardClass="stat-card-purple" trend="+12%" trendUp />
        <StatCard title="إجمالي الطلبات" value={stats.ordersCount.toString()} sub={`${stats.pendingOrders} طلب في الانتظار`} icon={ShoppingBag} cardClass="stat-card-pink" trend="+5%" trendUp />
        <StatCard title="المنتجات النشطة" value={stats.activeProducts.toString()} sub={`من ${stats.productsCount} منتج إجمالاً`} icon={Package} cardClass="stat-card-green" trend="+3%" trendUp />
        <StatCard title="متوسط التقييم" value={`${stats.avgRating} ⭐`} sub={`${stats.newCustomers} عميل جديد هذا الأسبوع`} icon={Star} cardClass="stat-card-blue" trend="+0.2" trendUp />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">مبيعات الأسبوع</h3>
              <p className="text-xs text-gray-400">إجمالي المبيعات اليومية</p>
            </div>
            <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-xl">
              <BarChart2 className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-700">39,400 ر.س</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3E8F7" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E8D5F0', fontSize: '12px' }}
                formatter={(v: any) => [`${v.toLocaleString('ar-SA')} ر.س`, 'المبيعات']}
              />
              <Line type="monotone" dataKey="sales" stroke="#9A68A8" strokeWidth={3} dot={{ fill: '#C6AAD0', r: 5 }} activeDot={{ r: 7, fill: '#E91E8C' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-gray-900 mb-1">توزيع الفئات</h3>
          <p className="text-xs text-gray-400 mb-4">المبيعات حسب القسم</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, 'النسبة']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-gray-600">{c.name}</span>
                </div>
                <span className="font-bold text-gray-800">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-bold text-gray-900 mb-4">أعلى المنتجات مبيعاً</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3E8F7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6B7280', width: 140 }} width={140} />
              <Tooltip formatter={(v: any) => [`${v} وحدة`, 'المبيعات']} />
              <Bar dataKey="sales" fill="#C6AAD0" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
          <h3 className="font-bold text-gray-900 mb-2">تنبيهات المخزون</h3>
          {db.getProducts().filter(p => p.stock < 60).slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 bg-warning/5 border border-warning/20 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{p.nameAr}</p>
                <p className="text-xs text-gray-500">متبقي: <span className="font-bold text-warning">{p.stock}</span> قطعة</p>
              </div>
            </div>
          ))}
          <button className="w-full text-xs text-primary-600 font-semibold text-center py-2 hover:text-primary-800 transition-colors">
            عرض جميع التنبيهات →
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-gray-900">أحدث الطلبات</h3>
          <button className="flex items-center gap-2 text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors">
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                {['رقم الطلب', 'العميل', 'المدينة', 'المبلغ', 'الحالة', 'التاريخ', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map(order => {
                const cfg = statusConfig[order.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={order.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3.5 text-sm font-mono font-bold text-primary-700">{order.orderNumber}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{order.city}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{order.total.toLocaleString('ar-SA')} ر.س</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}>
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400">{order.createdAt}</td>
                    <td className="px-4 py-3.5">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-primary-50 transition-colors">
                        <Eye className="w-4 h-4 text-primary-600" />
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
