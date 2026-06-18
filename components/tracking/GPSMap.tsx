import React from 'react';
import { MapPin } from 'lucide-react';

interface GPSMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export const GPSMap: React.FC<GPSMapProps> = ({ latitude, longitude, address }) => {
  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">موقع التوصيل غير متاح</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden">
      <iframe
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        title="موقع التوصيل"
      />
      {address && (
        <div className="p-4 bg-white border-t">
          <p className="text-sm text-gray-600">{address}</p>
        </div>
      )}
    </div>
  );
};
