
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/common/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Restaurant, RestaurantFilters } from '@/types';
import { Search, Filter, ChevronDown, ChevronUp, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

// Mock restaurant data
const allRestaurants: Restaurant[] = [
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
  },
  {
    id: '5',
    name: 'ก๋วยเตี๋ยวเรือป้าเล็ก',
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    cuisine: ['ก๋วยเตี๋ยว', 'อาหารจานเดียว'],
    rating: 4.4,
    deliveryTime: '15-25 นาที',
    priceLevel: 1,
    address: 'ตลาดวังสามหมอ',
    distance: '0.9 กม.'
  },
  {
    id: '6',
    name: 'สเต็กลุงหนวด',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80',
    cuisine: ['สเต็ก', 'อาหารตะวันตก'],
    rating: 4.6,
    deliveryTime: '20-30 นาที',
    priceLevel: 3,
    promotion: 'แถมเครื่องดื่ม',
    address: 'หน้า รพ.วังสามหมอ',
    distance: '1.8 กม.'
  },
  {
    id: '7',
    name: 'ข้าวมันไก่ประตูน้ำ',
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    cuisine: ['ข้าวมันไก่', 'อาหารจานเดียว'],
    rating: 4.2,
    deliveryTime: '15-20 นาที',
    priceLevel: 1,
    address: 'ใกล้ตลาดสด',
    distance: '0.7 กม.'
  },
  {
    id: '8',
    name: 'พิซซ่าโฮม',
    imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4fe0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    cuisine: ['พิซซ่า', 'อาหารตะวันตก'],
    rating: 4.0,
    deliveryTime: '30-40 นาที',
    priceLevel: 2,
    promotion: 'ซื้อ 1 แถม 1',
    address: 'ถ.วังสามหมอ',
    distance: '2.2 กม.'
  }
];

// Extract all unique cuisine types
const allCuisineTypes = Array.from(
  new Set(
    allRestaurants.flatMap(restaurant => restaurant.cuisine)
  )
);

const RestaurantListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialCuisine = searchParams.get('cuisine') ?? '';
  
  // State for filters
  const [filters, setFilters] = useState<RestaurantFilters>({
    searchTerm: '',
    cuisines: initialCuisine ? [initialCuisine] : [],
    minRating: 0,
    priceLevel: [1, 2, 3],
    hasPromotion: false
  });
  
  // State for filtered restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>(allRestaurants);
  
  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Effect to apply filters
  useEffect(() => {
    let filtered = [...allRestaurants];
    
    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply cuisine filter
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.some(c => filters.cuisines.includes(c))
      );
    }
    
    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.minRating);
    }
    
    // Apply price level filter
    filtered = filtered.filter(restaurant => 
      filters.priceLevel.includes(restaurant.priceLevel)
    );
    
    // Apply promotion filter
    if (filters.hasPromotion) {
      filtered = filtered.filter(restaurant => restaurant.promotion !== undefined);
    }
    
    setRestaurants(filtered);
  }, [filters]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };
  
  const handleCuisineChange = (cuisine: string) => {
    setFilters(prev => {
      if (prev.cuisines.includes(cuisine)) {
        return { ...prev, cuisines: prev.cuisines.filter(c => c !== cuisine) };
      } else {
        return { ...prev, cuisines: [...prev.cuisines, cuisine] };
      }
    });
  };
  
  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: rating }));
  };
  
  const handlePriceLevelChange = (level: number) => {
    setFilters(prev => {
      if (prev.priceLevel.includes(level)) {
        return { ...prev, priceLevel: prev.priceLevel.filter(p => p !== level) };
      } else {
        return { ...prev, priceLevel: [...prev.priceLevel, level] };
      }
    });
  };
  
  const handlePromotionChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, hasPromotion: checked }));
  };
  
  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurants/${id}`);
  };
  
  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      cuisines: [],
      minRating: 0,
      priceLevel: [1, 2, 3],
      hasPromotion: false
    });
  };
  
  // Determine if any filters are active
  const hasActiveFilters = 
    filters.searchTerm !== '' ||
    filters.cuisines.length > 0 ||
    filters.minRating > 0 ||
    filters.priceLevel.length !== 3 ||
    filters.hasPromotion;
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-tourwang-brown text-white py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">ร้านอาหารทั้งหมด</h1>
            <p className="text-tourwang-cream/90">
              ค้นพบร้านอาหารท้องถิ่นที่ดีที่สุดในวังสามหมอและบริเวณใกล้เคียง
            </p>
          </div>
        </div>
      
        <div className="container py-8">
          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาร้านอาหารหรือประเภทอาหาร..."
                className="pl-10"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4" />
              ตัวกรอง
              {hasActiveFilters && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-tourwang-orange text-white">
                  !
                </Badge>
              )}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden md:block w-64 shrink-0">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">ตัวกรอง</h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm text-tourwang-orange"
                      onClick={handleClearFilters}
                    >
                      ล้างทั้งหมด
                    </Button>
                  )}
                </div>
                
                {/* Cuisine Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">ประเภทอาหาร</h4>
                  <div className="space-y-2">
                    {allCuisineTypes.map(cuisine => (
                      <div key={cuisine} className="flex items-center">
                        <Checkbox 
                          id={`cuisine-${cuisine}`}
                          checked={filters.cuisines.includes(cuisine)}
                          onCheckedChange={() => handleCuisineChange(cuisine)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`cuisine-${cuisine}`}
                          className="text-sm cursor-pointer"
                        >
                          {cuisine}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">คะแนน</h4>
                  <div className="space-y-2">
                    {[0, 3, 3.5, 4, 4.5].map(rating => (
                      <div key={rating} className="flex items-center">
                        <Checkbox 
                          id={`rating-${rating}`}
                          checked={filters.minRating === rating}
                          onCheckedChange={() => handleRatingChange(rating)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`rating-${rating}`}
                          className="text-sm flex items-center cursor-pointer"
                        >
                          {rating > 0 ? (
                            <>
                              <span className="mr-1">{rating}+</span>
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            </>
                          ) : 'ทั้งหมด'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">ราคา</h4>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(level => (
                      <Button 
                        key={level}
                        variant={filters.priceLevel.includes(level) ? "default" : "outline"}
                        className={`flex-1 ${filters.priceLevel.includes(level) ? 'bg-tourwang-orange hover:bg-tourwang-orange/90' : ''}`}
                        onClick={() => handlePriceLevelChange(level)}
                      >
                        {'฿'.repeat(level)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Promotion Filter */}
                <div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="promotion"
                      checked={filters.hasPromotion}
                      onCheckedChange={(checked) => handlePromotionChange(checked as boolean)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor="promotion"
                      className="text-sm cursor-pointer"
                    >
                      มีโปรโมชั่น
                    </label>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Filters - Mobile Accordion */}
            {showMobileFilters && (
              <div className="md:hidden bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">ตัวกรอง</h3>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm text-tourwang-orange"
                      onClick={handleClearFilters}
                    >
                      ล้างทั้งหมด
                    </Button>
                  )}
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {/* Cuisine Filter */}
                  <AccordionItem value="cuisine">
                    <AccordionTrigger>ประเภทอาหาร</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {allCuisineTypes.map(cuisine => (
                          <div key={cuisine} className="flex items-center">
                            <Checkbox 
                              id={`mobile-cuisine-${cuisine}`}
                              checked={filters.cuisines.includes(cuisine)}
                              onCheckedChange={() => handleCuisineChange(cuisine)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`mobile-cuisine-${cuisine}`}
                              className="text-sm cursor-pointer"
                            >
                              {cuisine}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Rating Filter */}
                  <AccordionItem value="rating">
                    <AccordionTrigger>คะแนน</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[0, 3, 3.5, 4, 4.5].map(rating => (
                          <div key={rating} className="flex items-center">
                            <Checkbox 
                              id={`mobile-rating-${rating}`}
                              checked={filters.minRating === rating}
                              onCheckedChange={() => handleRatingChange(rating)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`mobile-rating-${rating}`}
                              className="text-sm flex items-center cursor-pointer"
                            >
                              {rating > 0 ? (
                                <>
                                  <span className="mr-1">{rating}+</span>
                                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                </>
                              ) : 'ทั้งหมด'}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price Filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>ราคา</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(level => (
                          <Button 
                            key={level}
                            variant={filters.priceLevel.includes(level) ? "default" : "outline"}
                            className={`flex-1 ${filters.priceLevel.includes(level) ? 'bg-tourwang-orange hover:bg-tourwang-orange/90' : ''}`}
                            onClick={() => handlePriceLevelChange(level)}
                          >
                            {'฿'.repeat(level)}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Promotion Filter */}
                  <AccordionItem value="promotion">
                    <AccordionTrigger>โปรโมชั่น</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center">
                        <Checkbox 
                          id="mobile-promotion"
                          checked={filters.hasPromotion}
                          onCheckedChange={(checked) => handlePromotionChange(checked as boolean)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor="mobile-promotion"
                          className="text-sm cursor-pointer"
                        >
                          มีโปรโมชั่น
                        </label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
            
            {/* Restaurant Grid */}
            <div className="flex-1">
              {/* Result count & active filters */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">
                    พบ {restaurants.length} ร้านอาหาร
                  </span>
                  
                  {filters.cuisines.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {filters.cuisines.map(cuisine => (
                        <Badge 
                          key={cuisine}
                          variant="outline"
                          className="flex items-center gap-1 pl-2"
                        >
                          {cuisine}
                          <button 
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                            onClick={() => handleCuisineChange(cuisine)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Restaurant Cards */}
              {restaurants.length > 0 ? (
                <div className="restaurant-grid">
                  {restaurants.map(restaurant => (
                    <RestaurantCard 
                      key={restaurant.id} 
                      restaurant={restaurant} 
                      onClick={handleRestaurantClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">ไม่พบร้านอาหารที่ตรงกับตัวกรองของคุณ</h3>
                  <p className="text-muted-foreground mb-4">ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำค้นหาอื่น</p>
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                  >
                    ล้างตัวกรองทั้งหมด
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RestaurantListingPage;
