
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import VisitorStats from "./VisitorStats";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample images for the slideshow
const slideImages = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmQlMjB0ZW1wbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGhhaWxhbmQlMjBjdWx0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGhhaWxhbmQlMjBuYXR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1580619305218-8423a7ef79b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmQlMjBmZXN0aXZhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494949360228-4e9bde560065?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRoYWlsYW5kJTIwdmlsbGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80"
];

const WangSamMoHero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Auto-rotate the images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', location);
    // Implement search functionality here
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background slideshow */}
      <Carousel className="w-full h-full">
        <CarouselContent>
          {slideImages.map((image, index) => (
            <CarouselItem key={index} className="min-w-0 flex-shrink-0 flex-grow-0">
              <div 
                className="w-full h-[90vh] bg-cover bg-center relative"
                style={{ 
                  backgroundImage: `url(${image})`,
                  animation: `fade-in 0.5s ease-out ${index === currentImageIndex ? 'forwards' : 'backwards'}`
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 z-10 bg-white/70 hover:bg-white" />
        <CarouselNext className="absolute right-4 top-1/2 z-10 bg-white/70 hover:bg-white" />
      </Carousel>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-4">
            อำเภอวังสามหมอ
          </h1>
          <p className="text-xl md:text-2xl font-sarabun text-white/90 mb-8">
            เปิดประตูสู่มรดกวัฒนธรรมไทย สัมผัสความงดงามของวัฒนธรรมไทยที่เป็นเอกลักษณ์
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="ค้นหาสถานที่ท่องเที่ยว..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-full border-2 border-gold focus:outline-none focus:ring-2 focus:ring-gold/50 font-sarabun"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-1 top-1 p-2 rounded-full text-white bg-navy hover:bg-navy/80"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          {/* CTA Button with golden effect */}
          <Button 
            className="bg-gradient-to-r from-[#D4AF37] to-[#F2D478] text-navy font-bold px-8 py-6 rounded-full text-lg shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            สำรวจวังสามหมอ
          </Button>
          
          {/* Visitor stats */}
          <div className="mt-12">
            <VisitorStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WangSamMoHero;
