
import React, { useState, useEffect } from 'react';
import { Users, MapPin, Camera } from 'lucide-react';

const VisitorStats: React.FC = () => {
  // Mock data - in a real app these would come from an API
  const [stats, setStats] = useState({
    currentVisitors: 0,
    totalVisitors: 0,
    popularLocations: 0,
    totalPhotosShared: 0
  });
  
  useEffect(() => {
    // Simulate loading data
    const loadStats = () => {
      // In a real app, fetch from an API
      setStats({
        currentVisitors: 246,
        totalVisitors: 15879,
        popularLocations: 42,
        totalPhotosShared: 7234
      });
    };
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        currentVisitors: prev.currentVisitors + Math.floor(Math.random() * 3) - 1, // Random fluctuation
        totalVisitors: prev.totalVisitors + 1,
        totalPhotosShared: prev.totalPhotosShared + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 5000);
    
    loadStats();
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <StatBox icon={<Users className="w-6 h-6 text-gold" />} value={stats.currentVisitors} label="ผู้เยี่ยมชมเว็บไซต์" />
      <StatBox icon={<MapPin className="w-6 h-6 text-gold" />} value={stats.popularLocations} label="สถานที่ท่องเที่ยว" />
      <StatBox icon={<Camera className="w-6 h-6 text-gold" />} value={stats.totalPhotosShared} label="ภาพที่แชร์" />
    </div>
  );
};

interface StatBoxProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const StatBox: React.FC<StatBoxProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-3 flex items-center space-x-3 border border-white/30">
      <div className="rounded-full bg-navy/20 p-2">
        {icon}
      </div>
      <div className="text-white">
        <p className="font-montserrat font-bold text-2xl">{value.toLocaleString()}</p>
        <p className="font-sarabun text-sm">{label}</p>
      </div>
    </div>
  );
};

export default VisitorStats;
