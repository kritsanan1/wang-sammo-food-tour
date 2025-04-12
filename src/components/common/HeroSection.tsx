
import React from 'react';
import LocationSearch from './LocationSearch';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  backgroundImage?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  backgroundImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  className 
}) => {
  const handleSearch = (location: string) => {
    console.log('Searching for restaurants near:', location);
    // In a real app, you would navigate to the restaurant listing with this location
    // For example: navigate(`/restaurants?location=${encodeURIComponent(location)}`);
  };
  
  const handleUseCurrentLocation = () => {
    console.log('Using current location');
    // In a real app, you would navigate to the restaurant listing with coordinates
    // For example: navigate('/restaurants?useCurrentLocation=true');
  };
  
  return (
    <section 
      className={cn(
        "relative bg-cover bg-center py-16 md:py-24",
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            อร่อยส่งถึงบ้านคุณ
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            ค้นพบร้านอาหารที่ดีที่สุดในวังสามหมอ และสั่งอาหารอร่อยส่งตรงถึงหน้าประตูบ้านคุณเพียงไม่กี่คลิก
          </p>
          
          <LocationSearch 
            onSearch={handleSearch}
            onUseCurrentLocation={handleUseCurrentLocation}
            className="mx-auto"
          />
          
          <p className="text-sm text-white/80 mt-4">
            พร้อมให้บริการใน วังสามหมอ, นายูง, บ้านผือ และอำเภอใกล้เคียง
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
