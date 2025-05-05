
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart to continue shopping.</p>
        <div className="flex justify-center gap-4">
          <Link to="/fruits">
            <Button>Browse Fruits</Button>
          </Link>
          <Link to="/vegetables">
            <Button variant="outline">Browse Vegetables</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 fade-in">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <ShoppingCart className="mr-3 h-8 w-8" />
        Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex border rounded-lg p-4 gap-4">
              <Link to={`/product/${item.product.id}`} className="shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded-md"
                />
              </Link>
              
              <div className="flex-1">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-medium">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{item.product.category}</p>
                <p className="font-bold mt-2">Rs. {item.product.price.toFixed(2)}</p>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="h-8 px-4 flex items-center justify-center border-y">
                    {item.quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Rs. 150.00</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>Rs. {(totalPrice + 150).toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={handleCheckout}
            >
              {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
