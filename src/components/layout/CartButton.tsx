
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative hover:bg-muted hover:text-tourwang-orange focus:outline-none"
      onClick={() => navigate('/cart')}
      aria-label="ตะกร้าสินค้า"
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-tourwang-orange text-white text-xs flex items-center justify-center animate-in fade-in zoom-in">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
      <span className="sr-only">ตะกร้าสินค้า, {itemCount} สินค้า</span>
    </Button>
  );
};

export default CartButton;
