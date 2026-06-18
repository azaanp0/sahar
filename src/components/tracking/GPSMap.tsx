import { MapPin } from "lucide-react";

interface GPSMapProps {
    driverLocation: { lat: number; lng: number };
    customerLocation: { lat: number; lng: number };
}

const GPSMap = ({ driverLocation, customerLocation }: GPSMapProps) => {
    // In a real implementation, this would use Google Maps or Mapbox
    // For now, we'll create a visual placeholder that shows the concept

    return (
        <div className="relative w-full h-80 bg-gray-100 flex items-center justify-center">
            {/* Placeholder for actual map implementation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-green-50">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                        {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="border border-gray-300" />
                        ))}
                    </div>
                </div>

                {/* Driver marker */}
                <div
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{
                        left: `${30 + (driverLocation.lng - 46.6753) * 10000}%`,
                        top: `${40 + (driverLocation.lat - 24.7136) * 10000}%`
                    }}
                >
                    <div className="relative">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <TruckIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary-500" />
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                        المندوب
                    </div>
                </div>

                {/* Customer marker */}
                <div
                    className="absolute"
                    style={{
                        left: "60%",
                        top: "60%"
                    }}
                >
                    <div className="relative">
                        <div className="w-10 h-10 bg-[#E91E63] rounded-full flex items-center justify-center shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-[#E91E63]" />
                    </div>
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                        وجهتك
                    </div>
                </div>

                {/* Route line (simplified) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                        x1="35%"
                        y1="45%"
                        x2="60%"
                        y2="60%"
                        stroke="#E91E63"
                        strokeWidth="3"
                        strokeDasharray="10,5"
                        className="animate-pulse"
                    />
                </svg>
            </div>

            {/* Map controls placeholder */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-50">
                    <span className="text-lg font-bold">+</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-50">
                    <span className="text-lg font-bold">−</span>
                </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow p-3">
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary-500 rounded-full" />
                        <span>المندوب</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#E91E63] rounded-full" />
                        <span>وجهتك</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TruckIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
    </svg>
);

export default GPSMap;
