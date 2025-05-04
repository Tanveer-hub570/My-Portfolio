
import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Apple } from 'lucide-react';

const FruitPage = () => {
  const { getProductsByCategory } = useProducts();
  const fruits = getProductsByCategory('fruit');
  
  return (
    <div className="space-y-6 fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Apple className="h-8 w-8 mr-2 text-brand-orange" />
          <span>Fresh Fruits</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse our selection of premium fresh fruits sourced from local farms.
        </p>
      </header>
      
      <div className="product-grid">
        {fruits.map(fruit => (
          <ProductCard key={fruit.id} product={fruit} />
        ))}
        {fruits.length === 0 && (
          <p className="col-span-full text-center py-12 text-muted-foreground">
            No fruits available at the moment. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};

export default FruitPage;
