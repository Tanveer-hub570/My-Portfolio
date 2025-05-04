
import React from 'react';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto py-16 px-4 text-center fade-in">
      <div className="max-w-md mx-auto">
        <div className="text-brand-green mb-6">
          <CheckCircle className="h-20 w-20 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-muted-foreground mb-8">
          Thank you for your order! We will contact you shortly to confirm the details.
          Your delicious Pakistani fruits and vegetables will be on their way soon.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button variant="default" className="w-full sm:w-auto flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/fruits">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
