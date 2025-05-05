import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from '@/context/ProductContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {product.description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-brand-darkGreen">
          Rs. {product.price.toFixed(2)}
        </span>
        <span className="text-xs px-2 py-1 bg-secondary rounded-full capitalize">
          {product.category}
        </span>
      </CardFooter>
    </Card>
  );
}
