
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Star,
  MapPin
} from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  // Function to render price level
  const renderPriceLevel = (level: number) => {
    return Array(level).fill('฿').join('');
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer food-card-shadow"
      onClick={() => onClick(restaurant.id)}
    >
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name} 
            className="object-cover w-full h-full rounded-t-md"
          />
        </AspectRatio>
        
        {restaurant.promotion && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-tourwang-orange hover:bg-tourwang-orange text-white">
              {restaurant.promotion}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{restaurant.name}</h3>
          <span className="text-sm font-medium text-gray-600">
            {renderPriceLevel(restaurant.priceLevel)}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisine.map((type, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-sm mb-2">
          <Star className="h-4 w-4 mr-1 text-yellow-400" />
          <span className="font-medium mr-1">{restaurant.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">• {restaurant.distance}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate max-w-[150px]">{restaurant.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
