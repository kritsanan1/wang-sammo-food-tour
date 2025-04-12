
// Restaurant related types
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceLevel: 1 | 2 | 3; // 1=$, 2=$$, 3=$$$
  promotion?: string;
  address: string;
  distance?: string;
}

// MenuItem related types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  popular?: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  name: string;
  choices: {
    id: string;
    name: string;
    price: number;
  }[];
  required: boolean;
}

// Cart related types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: {
    [optionName: string]: string;
  };
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string; // e.g., "Home", "Work"
  street: string;
  apartment?: string;
  city: string;
  zipCode: string;
  instructions?: string;
  isDefault: boolean;
}

// Order related types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveryAddress: Address;
  paymentMethod: string;
  riderInfo?: {
    name: string;
    phone: string;
    eta?: string;
  };
}

// Filter related types
export interface RestaurantFilters {
  searchTerm: string;
  cuisines: string[];
  minRating: number;
  priceLevel: number[];
  maxDeliveryTime?: number;
  hasPromotion: boolean;
}
