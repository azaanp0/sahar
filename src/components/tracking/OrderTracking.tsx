import { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Truck, CheckCircle, Package, ArrowRight } from "lucide-react";
import GPSMap from "@/components/tracking/GPSMap";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";

interface OrderTrackingProps {
    orderId: string;
}

interface TrackingUpdate {
    id: string;
    status: string;
    description: string;
    timestamp: string;
    location?: {
        lat: number;
        lng: number;
    };
}

const OrderTracking = ({ orderId }: OrderTrackingProps) => {
    const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([
        {
            id: "1",
            status: "confirmed",
            description: "تم تأكيد طلبك",
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        },
        {
            id: "2",
            status: "processing",
            description: "جاري تحضير طلبك",
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
            id: "3",
            status: "shipped",
            description: "تم شحن الطلب",
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString()
        },
        {
            id: "4",
            status: "in_transit",
            description: "المندوب في الطريق إليك",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            location: { lat: 24.7136, lng: 46.6753 }
        }
    ]);

    const [driverLocation, setDriverLocation] = useState({ lat: 24.7136, lng: 46.6753 });
    const [customerLocation] = useState({ lat: 24.7136, lng: 46.6753 });
    const [eta, setEta] = useState("15 دقيقة");

    // Simulate real-time GPS updates
    useEffect(() => {
        const interval = setInterval(() => {
            setDriverLocation(prev => ({
                lat: prev.lat + (Math.random() - 0.5) * 0.001,
                lng: prev.lng + (Math.random() - 0.5) * 0.001
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const currentStatus = trackingUpdates[trackingUpdates.length - 1].status;
    const driverInfo = {
        name: "أحمد محمد",
        phone: "+966501234567",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    };

    return (
        <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white dark:bg-[#16213e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">رقم الطلب: {orderId}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">تتبع مباشر عبر GPS</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#E91E63]">
                        <Truck className="w-5 h-5" />
                        <span className="font-medium">نشط</span>
                    </div>
                </div>

                {/* ETA */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 flex items-center gap-4">
                    <Clock className="w-6 h-6 text-[#E91E63]" />
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">الوصول المتوقع</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{eta}</p>
                    </div>
                </div>
            </div>

            {/* GPS Map */}
            <div className="bg-white dark:bg-[#16213e] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white">موقع المندوب</h4>
                </div>
                <GPSMap
                    driverLocation={driverLocation}
                    customerLocation={customerLocation}
                />
            </div>

            {/* Driver Info */}
            {currentStatus === "in_transit" && (
                <div className="bg-white dark:bg-[#16213e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">معلومات المندوب</h4>
                    <div className="flex items-center gap-4">
                        <img
                            src={driverInfo.image}
                            alt={driverInfo.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">{driverInfo.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{driverInfo.phone}</p>
                        </div>
                        <button className="flex items-center gap-2 bg-[#E91E63] text-white px-4 py-2 rounded-lg hover:bg-[#B089C0] transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>اتصال</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Tracking Timeline */}
            <div className="bg-white dark:bg-[#16213e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">مراحل الطلب</h4>
                <TrackingTimeline updates={trackingUpdates} />
            </div>
        </div>
    );
};

export default OrderTracking;
