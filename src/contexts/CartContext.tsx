import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { MenuItem } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const LOCAL_STORAGE_KEY = 'tourwang_cart';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Get cart total price
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity);
    }, 0);
  };

  // Add item to cart
  const addItem = (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.menuItem.id === menuItem.id
      );
      
      // If item already exists in cart, update quantity
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          specialInstructions: specialInstructions || existingItem.specialInstructions
        };
        
        toast({
          title: 'เพิ่มจำนวนในตะกร้า',
          description: `${menuItem.name} (${quantity} ชิ้น)`,
        });
        
        return updatedItems;
      }
      
      // Otherwise, add new item
      toast({
        title: 'เพิ่มลงตะกร้าแล้ว',
        description: `${menuItem.name} (${quantity} ชิ้น)`,
      });
      
      return [
        ...prevItems,
        {
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity,
          specialInstructions
        }
      ];
    });
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast({
          title: 'ลบออกจากตะกร้า',
          description: itemToRemove.menuItem.name,
        });
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    itemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
