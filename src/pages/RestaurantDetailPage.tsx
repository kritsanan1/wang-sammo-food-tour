
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from 'lucide-react';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-tourwang-brown">
            Restaurant Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Restaurant Name</h2>
              <div className="flex items-center text-yellow-500">
                <Star className="mr-1" />
                <span>4.5</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5 text-tourwang-orange" />
              <span>123 Restaurant Street, City</span>
            </div>
            
            <div className="mt-4">
              <Button 
                className="w-full bg-tourwang-orange hover:bg-tourwang-brown"
              >
                Order Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetailPage;
