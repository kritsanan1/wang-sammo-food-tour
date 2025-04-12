
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  onSearch: (location: string) => void;
  onUseCurrentLocation: () => void;
  className?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onSearch, 
  onUseCurrentLocation,
  className 
}) => {
  const [location, setLocation] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };
  
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          onUseCurrentLocation();
          // In a real app, you might reverse-geocode these coordinates to get an address
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('ไม่สามารถรับตำแหน่งปัจจุบันได้ กรุณาลองอีกครั้งหรือป้อนที่อยู่ด้วยตนเอง');
        }
      );
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="ป้อนที่อยู่ของคุณ..."
          className="pl-10 pr-[120px] h-12 text-base"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1 h-10 px-3 text-tourwang-orange"
          onClick={handleCurrentLocation}
        >
          <MapPin className="mr-2 h-4 w-4" />
          ตำแหน่งปัจจุบัน
        </Button>
      </div>
      <Button 
        type="submit" 
        className="w-full mt-3 bg-tourwang-orange hover:bg-tourwang-orange/90 h-12 text-base"
      >
        ค้นหาร้านอาหารใกล้ฉัน
      </Button>
    </form>
  );
};

export default LocationSearch;
