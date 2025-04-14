
import React from 'react';
import { useProductData } from '@/hooks/useProductData';
import { ProductDetailProps } from '@/types/product';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ReviewList from '@/components/products/ReviewList';

export default function ProductDetail({ product_id, limit = 10 }: ProductDetailProps) {
  const { 
    product, 
    reviews, 
    averageRating, 
    isLoading, 
    error 
  } = useProductData({ product_id, limit });
  
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  
  if (error || !product) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-xl text-muted-foreground">
            ไม่พบข้อมูลสินค้า หรือเกิดข้อผิดพลาด
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating) 
                    ? "text-yellow-400" 
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({averageRating.toFixed(1)}) จาก {reviews?.length || 0} รีวิว
          </span>
        </div>
        <div className="text-2xl font-bold text-tourwang-orange">
          {new Intl.NumberFormat('th-TH', { 
            style: 'currency', 
            currency: 'THB' 
          }).format(product.price)}
        </div>
        <p className="text-muted-foreground">{product.description}</p>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">รีวิวจากลูกค้า</h2>
        <ReviewList reviews={reviews || []} />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-24 w-full" />
      </div>
      
      <Separator />
      
      <div>
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
