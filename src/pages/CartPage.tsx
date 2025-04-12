
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl py-8">
          <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>
          <Card className="mb-6">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex flex-col items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">ตะกร้าของคุณว่างเปล่า</h3>
                <p className="text-gray-500 mb-6">ลองเลือกร้านอาหารและเพิ่มเมนูในตะกร้า</p>
                <Button 
                  onClick={() => navigate('/restaurants')}
                  className="px-8"
                >
                  ดูร้านอาหาร
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container max-w-4xl py-8">
        <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">รายการอาหาร</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  {item.menuItem.imageUrl && (
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                      <img 
                        src={item.menuItem.imageUrl} 
                        alt={item.menuItem.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{item.menuItem.name}</h3>
                    {item.specialInstructions && (
                      <p className="text-sm text-gray-500">{item.specialInstructions}</p>
                    )}
                    <p className="text-sm font-medium">{formatCurrency(item.menuItem.price)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex justify-between mb-2">
              <span>ราคารวม</span>
              <span className="font-medium">{formatCurrency(getCartTotal())}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>ค่าจัดส่ง</span>
              <span className="font-medium">฿40.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="font-medium">รวมทั้งสิ้น</span>
              <span className="font-bold">{formatCurrency(getCartTotal() + 40)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button className="w-full" onClick={() => navigate('/checkout')}>
              ดำเนินการสั่งซื้อ
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearCart}
            >
              ล้างตะกร้า
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

// Add this to make sure the missing icon is resolved
const ShoppingBag = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
};

export default CartPage;
