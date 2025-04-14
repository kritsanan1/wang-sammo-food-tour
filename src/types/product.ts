
// Product related types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at?: string;
}

// Review related types
export interface Review {
  id: number;
  product_id: number;
  rating: number;
  review_text: string;
  created_at?: string;
}

// Product detail props
export interface ProductDetailProps {
  product_id: number;
  limit?: number;
}
