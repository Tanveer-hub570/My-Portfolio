
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = getProduct(id || '');
  
  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 fade-in">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
          <span className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded-full text-xs font-medium">
            Pakistani Product
          </span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-brand-darkGreen">
            Rs. {product.price.toFixed(2)}
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              {product.category === 'fruit' ? 'Fruit' : 'Vegetable'}
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              Pakistani Product
            </span>
          </div>
          
          <div className="pt-2">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <Button 
            size="lg" 
            className="w-full mt-6 flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
