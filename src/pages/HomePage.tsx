
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, User, Map, Calendar, Info } from "lucide-react";
import WangSamMoHero from "@/components/tourism/WangSamMoHero";
import VisitorStats from "@/components/tourism/VisitorStats";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Slideshow */}
      <WangSamMoHero />
      
      {/* Main Content */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="วัฒนธรรม"
            description="สัมผัสวัฒนธรรมอันเก่าแก่ของอำเภอวังสามหมอ"
            icon={<Info className="h-8 w-8 text-gold" />}
            onClick={() => navigate('/heritage')}
          />
          <FeatureCard 
            title="สถานที่ท่องเที่ยว"
            description="ค้นพบแหล่งท่องเที่ยวที่น่าสนใจในวังสามหมอ"
            icon={<Map className="h-8 w-8 text-gold" />}
            onClick={() => navigate('/destinations')}
          />
          <FeatureCard 
            title="กิจกรรมและเทศกาล"
            description="กิจกรรมและเทศกาลที่น่าสนใจตลอดทั้งปี"
            icon={<Calendar className="h-8 w-8 text-gold" />}
            onClick={() => navigate('/events')}
          />
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border-l-4 border-navy"
      onClick={onClick}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-sarabun font-bold text-navy mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
