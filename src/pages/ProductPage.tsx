
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/products/ProductDetail';
import { Separator } from '@/components/ui/separator';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : 0;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="flex mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                หน้าหลัก
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/restaurants" className="text-sm text-muted-foreground hover:text-foreground">
                  ร้านอาหาร
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm">รายละเอียดสินค้า</span>
              </div>
            </li>
          </ol>
        </nav>
        
        <Separator className="mb-8" />
        
        <ProductDetail product_id={productId} limit={10} />
      </div>
    </div>
  );
}
