
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, Review } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface UseProductDataProps {
  product_id: number;
  limit?: number;
}

export function useProductData({ product_id, limit = 10 }: UseProductDataProps) {
  // Validate inputs
  const isValidProductId = typeof product_id === 'number' && product_id > 0;
  const isValidLimit = typeof limit === 'number' && limit > 0;
  
  const sanitizedLimit = isValidLimit ? limit : 10;
  
  // Fetch product data
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ['product', product_id],
    queryFn: async () => {
      if (!isValidProductId) {
        throw new Error('Invalid product ID');
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', product_id)
        .single();
        
      if (error) throw error;
      if (!data) throw new Error('Product not found');
      
      return data as Product;
    },
    enabled: isValidProductId,
  });
  
  // Fetch reviews for the product
  const {
    data: reviews,
    isLoading: areReviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ['product-reviews', product_id, sanitizedLimit],
    queryFn: async () => {
      if (!isValidProductId) {
        throw new Error('Invalid product ID');
      }
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', product_id)
        .order('created_at', { ascending: false })
        .limit(sanitizedLimit);
        
      if (error) throw error;
      
      return data as Review[];
    },
    enabled: isValidProductId,
  });
  
  // Calculate average rating
  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
    
  // Show error toast for any errors
  useEffect(() => {
    if (productError) {
      toast({
        title: "ไม่พบสินค้า",
        description: "ไม่สามารถโหลดข้อมูลสินค้าได้",
        variant: "destructive",
      });
    }
    
    if (reviewsError) {
      toast({
        title: "ไม่สามารถโหลดรีวิว",
        description: "เกิดข้อผิดพลาดในการโหลดรีวิว",
        variant: "destructive",
      });
    }
  }, [productError, reviewsError]);

  return {
    product,
    reviews,
    averageRating,
    isLoading: isProductLoading || areReviewsLoading,
    error: productError || reviewsError,
    isError: !!productError || !!reviewsError,
  };
}
