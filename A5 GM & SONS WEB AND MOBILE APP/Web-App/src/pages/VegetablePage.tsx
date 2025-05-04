
import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Leaf } from 'lucide-react';

const VegetablePage = () => {
  const { getProductsByCategory } = useProducts();
  const vegetables = getProductsByCategory('vegetable');
  
  return (
    <div className="space-y-6 fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Leaf className="h-8 w-8 mr-2 text-brand-green" />
          <span>Fresh Vegetables</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse our selection of premium fresh vegetables sourced from local farms.
        </p>
      </header>
      
      <div className="product-grid">
        {vegetables.map(vegetable => (
          <ProductCard key={vegetable.id} product={vegetable} />
        ))}
        {vegetables.length === 0 && (
          <p className="col-span-full text-center py-12 text-muted-foreground">
            No vegetables available at the moment. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};

export default VegetablePage;
