import React from 'react';
import { Order } from '../../types/order';
import { TrackingTimeline } from './TrackingTimeline';
import { formatPrice } from '../../lib/utils';

interface OrderTrackingProps {
  order: Order;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  return (
    <div className="space-y-8">
      {/* Order Info */}
      <div className="bg-white dark:bg-[#16213e] rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              طلب #{order.orderNumber}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              تم الطلب في{' '}
              {new Date(order.createdAt).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">الحالة</p>
            <p className="text-lg font-bold text-primary">
              {order.status === 'pending' && 'قيد الانتظار'}
              {order.status === 'confirmed' && 'مؤكد'}
              {order.status === 'processing' && 'قيد المعالجة'}
              {order.status === 'shipped' && 'تم الشحن'}
              {order.status === 'out_for_delivery' && 'في الطريق'}
              {order.status === 'delivered' && 'تم التوصيل'}
              {order.status === 'cancelled' && 'ملغي'}
              {order.status === 'refunded' && 'مسترد'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">المجموع الفرعي</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(order.subtotal)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الشحن</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {order.shipping === 0 ? 'مجاني' : formatPrice(order.shipping)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الإجمالي</p>
            <p className="text-lg font-bold text-primary">{formatPrice(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white dark:bg-[#16213e] rounded-xl shadow-sm dark:shadow-gray-900/20 p-6">
        <TrackingTimeline
          events={order.trackingEvents || []}
          currentStatus={order.status}
        />
      </div>

      {/* Estimated Delivery */}
      {order.estimatedDelivery && (
        <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">التوصيل المتوقع</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {new Date(order.estimatedDelivery).toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
