
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your order! We will contact you shortly for confirmation.",
      });
      
      clearCart();
      navigate('/order-success');
      setIsSubmitting(false);
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto py-8 fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Delivery Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for delivery"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="payment" 
                    value="cod" 
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.quantity} x {item.product.name}
                  </span>
                  <span>Rs. {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t my-2 pt-2"></div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>Rs. 150.00</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>Rs. {(totalPrice + 150).toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
