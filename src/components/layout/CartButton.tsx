
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export const CartButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={() => navigate('/cart')}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-tourwang-orange text-white text-xs flex items-center justify-center">
        0
      </span>
    </Button>
  );
};
