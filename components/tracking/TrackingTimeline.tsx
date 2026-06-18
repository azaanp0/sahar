import React from 'react';
import { TrackingEvent } from '../../types/order';
import { Check, Package, Truck, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TrackingTimelineProps {
  events: TrackingEvent[];
  currentStatus: string;
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  events,
  currentStatus,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        return <Package className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
      case 'out_for_delivery':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <Check className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const isCompleted = (eventStatus: string) => {
    const statusOrder = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'out_for_delivery',
      'delivered',
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const eventIndex = statusOrder.indexOf(eventStatus);
    return eventIndex <= currentIndex;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">تتبع الطلب</h3>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const completed = isCompleted(event.status);
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="relative flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 w-12 h-12 rounded-full flex items-center justify-center',
                    completed
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  )}
                >
                  {getStatusIcon(event.status)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.timestamp).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{event.description}</p>
                  )}
                  {event.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
