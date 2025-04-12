
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/common/HeroSection';
import RestaurantCard from '@/components/common/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Utensils, Clock, ThumbsUp, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for featured restaurants
const featuredRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'ร้านอาหารริมน้ำวังสามหมอ',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    cuisine: ['อีสาน', 'ปลาเผา'],
    rating: 4.7,
    deliveryTime: '20-30 นาที',
    priceLevel: 2,
    promotion: 'ฟรีค่าส่ง',
    address: 'ถ.วังสามหมอ',
    distance: '1.2 กม.'
  },
  {
    id: '2',
    name: 'ส้มตำแซ่บนัว',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    cuisine: ['อีสาน', 'ส้มตำ', 'ไก่ย่าง'],
    rating: 4.5,
    deliveryTime: '15-25 นาที',
    priceLevel: 1,
    promotion: 'ลด 10%',
    address: 'ตลาดวังสามหมอ',
    distance: '0.8 กม.'
  },
  {
    id: '3',
    name: 'กระเพราเดือด',
    imageUrl: 'https://images.unsplash.com/photo-1569562211030-efe142af360a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    cuisine: ['ตามสั่ง', 'กระเพรา'],
    rating: 4.3,
    deliveryTime: '15-20 นาที',
    priceLevel: 1,
    address: 'ใกล้ รร.วังสามหมอ',
    distance: '1.5 กม.'
  },
  {
    id: '4',
    name: 'ครัวคุณย่า',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    cuisine: ['อาหารไทย', 'แกงป่า'],
    rating: 4.8,
    deliveryTime: '25-35 นาที',
    priceLevel: 2,
    promotion: 'สั่งครบ 300 ลด 30',
    address: 'หลังตลาดวังสามหมอ',
    distance: '1.0 กม.'
  }
];

// Mock data for cuisine types
const cuisineTypes = [
  { name: 'อาหารอีสาน', icon: '🌶️' },
  { name: 'ตามสั่ง', icon: '🍳' },
  { name: 'ก๋วยเตี๋ยว', icon: '🍜' },
  { name: 'อาหารทะเล', icon: '🦐' },
  { name: 'อาหารจานเดียว', icon: '🍲' },
  { name: 'สตรีทฟู้ด', icon: '🍢' }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurants/${id}`);
  };
  
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        
        {/* Categories Section */}
        <section className="py-10 bg-tourwang-cream/30">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">หมวดหมู่ยอดนิยม</h2>
              <Button 
                variant="ghost" 
                className="text-tourwang-orange flex items-center"
                onClick={() => navigate('/restaurants')}
              >
                ดูทั้งหมด <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cuisineTypes.map((cuisine, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/restaurants?cuisine=${encodeURIComponent(cuisine.name)}`)}
                >
                  <span className="text-3xl mb-2">{cuisine.icon}</span>
                  <span className="text-sm font-medium">{cuisine.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Restaurants */}
        <section className="py-10">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">ร้านแนะนำ</h2>
              <Button 
                variant="ghost" 
                className="text-tourwang-orange flex items-center"
                onClick={() => navigate('/restaurants')}
              >
                ดูทั้งหมด <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="restaurant-grid">
              {featuredRestaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                  onClick={handleRestaurantClick} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Highlight */}
        <section className="py-12 bg-tourwang-brown text-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">ทำไมต้องเลือกเรา</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-4">
                <div className="bg-tourwang-orange/20 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-tourwang-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">ร้านอาหารท้องถิ่น</h3>
                <p className="text-sm opacity-80">รวบรวมร้านอาหารจากท้องถิ่น รสชาติดั้งเดิม มีเอกลักษณ์เฉพาะ</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-tourwang-orange/20 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-tourwang-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">จัดส่งรวดเร็ว</h3>
                <p className="text-sm opacity-80">บริการจัดส่งรวดเร็ว ตรงเวลา อาหารร้อนส่งถึงคุณ</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-tourwang-orange/20 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Percent className="h-8 w-8 text-tourwang-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">โปรโมชั่นพิเศษ</h3>
                <p className="text-sm opacity-80">โปรโมชั่นและส่วนลดพิเศษจากร้านอาหารพันธมิตรของเรา</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-tourwang-orange/20 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                  <ThumbsUp className="h-8 w-8 text-tourwang-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">คุณภาพเยี่ยม</h3>
                <p className="text-sm opacity-80">รับประกันคุณภาพอาหาร สะอาด ปลอดภัย ถูกหลักอนามัย</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Download App CTA */}
        <section className="py-12 bg-tourwang-orange/10">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-6 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">ดาวน์โหลดแอพฯ <br className="hidden md:block" />เพื่อประสบการณ์ที่ดียิ่งขึ้น</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  ดาวน์โหลดแอพพลิเคชั่นของเรา เพื่อรับโปรโมชั่นพิเศษและติดตามสถานะการจัดส่งอาหารได้แบบเรียลไทม์
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-black hover:bg-gray-900 text-white">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    App Store
                  </Button>
                  <Button className="bg-black hover:bg-gray-900 text-white">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                    </svg>
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 max-w-md">
                <img 
                  src="https://img.freepik.com/free-vector/food-app-banner_23-2148557332.jpg?w=826&t=st=1712810288~exp=1712810888~hmac=5184114debf14f0d37cc7c8a7e7d8f1880ad0cd701b08f405c9597395ec61d7f"
                  alt="Tour Der Wang Mobile App"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
