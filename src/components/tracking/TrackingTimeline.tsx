import { CheckCircle, Circle, Package, Truck, Clock } from "lucide-react";

interface TrackingUpdate {
    id: string;
    status: string;
    description: string;
    timestamp: string;
}

interface TrackingTimelineProps {
    updates: TrackingUpdate[];
}

const statusIcons: Record<string, React.ReactNode> = {
    confirmed: <Package className="w-5 h-5" />,
    processing: <Clock className="w-5 h-5" />,
    shipped: <Truck className="w-5 h-5" />,
    in_transit: <Truck className="w-5 h-5" />,
    delivered: <CheckCircle className="w-5 h-5" />
};

const statusColors: Record<string, string> = {
    confirmed: "bg-gray-400",
    processing: "bg-yellow-400",
    shipped: "bg-primary-400",
    in_transit: "bg-purple-400",
    delivered: "bg-green-400"
};

const TrackingTimeline = ({ updates }: TrackingTimelineProps) => {
    return (
        <div className="space-y-4">
            {updates.map((update, index) => {
                const isLast = index === updates.length - 1;
                const isActive = index === updates.length - 1;
                
                return (
                    <div key={update.id} className="flex gap-4">
                        {/* Icon */}
                        <div className="relative flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                                    isActive ? statusColors[update.status] : "bg-gray-300"
                                }`}
                            >
                                {isActive ? (
                                    statusIcons[update.status] || <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <CheckCircle className="w-5 h-5" />
                                )}
                            </div>
                            {!isLast && (
                                <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between">
                                <p className={`font-medium ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                                    {update.description}
                                </p>
                                <span className="text-sm text-gray-400 dark:text-gray-500">
                                    {new Date(update.timestamp).toLocaleDateString('ar-SA', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            {isActive && (
                                <p className="text-sm text-[#E91E63] mt-1">جاري التنفيذ الآن</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TrackingTimeline;
