
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple, Leaf, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function AppLayout() {
  const { totalItems } = useCart();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-brand-darkGreen">
            GM <span className="text-brand-orange">&</span> SONS
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-brand-green transition-colors">
              Home
            </Link>
            <Link to="/fruits" className="hover:text-brand-green transition-colors">
              Fruits
            </Link>
            <Link to="/vegetables" className="hover:text-brand-green transition-colors">
              Vegetables
            </Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-brand-green transition-colors">
                Admin
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GM & SONS</h3>
              <p className="text-muted-foreground">
                Premium Pakistani fruits and vegetables delivered to your doorstep.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/" className="hover:text-brand-green">Home</Link>
                <Link to="/fruits" className="hover:text-brand-green">Fruits</Link>
                <Link to="/vegetables" className="hover:text-brand-green">Vegetables</Link>
                <Link to="/cart" className="hover:text-brand-green">Cart</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">
                Lahore, Pakistan<br />
                Phone: +92 300 1234567<br />
                Email: info@gmandson.pk
              </p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-4 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} GM & SONS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
