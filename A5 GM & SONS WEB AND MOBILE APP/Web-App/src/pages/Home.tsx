import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCategory, useProducts } from '@/context/ProductContext';
import { Apple, Leaf, Handshake } from 'lucide-react';

const Home = () => {
  const { products } = useProducts();

  // All products by category - no specific filtering for partners
  const fruitShowcase = products.filter(product => product.category === 'fruit');
  const vegetableShowcase = products.filter(product => product.category === 'vegetable');
  const partnerShowcase = products.filter(product => product.category === 'partner' as ProductCategory); // This is kept for completeness

  return (
    <div className="space-y-10 fade-in">
      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-brand-lightGreen/20 to-brand-beige rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-darkGreen">
            GM <span className="text-brand-orange">&</span> SONS
          </h1>
          <p className="text-xl mb-8">Premium Fresh Fruits & Vegetables</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/fruits">
              <Button className="flex items-center gap-2" size="lg">
                <Apple className="h-5 w-5" />
                <span>Browse Fruits</span>
              </Button>
            </Link>
            <Link to="/vegetables">
              <Button variant="outline" className="flex items-center gap-2" size="lg">
                <Leaf className="h-5 w-5" />
                <span>Browse Vegetables</span>
              </Button>
            </Link>
            <Link to="/partners">
              <Button variant="ghost" className="flex items-center gap-2 text-brand-purple" size="lg">
                <Handshake className="h-5 w-5" />
                <span>Browse Partners</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fruits Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Apple className="h-6 w-6 mr-2 text-brand-orange" />
            <span>All Fruits</span>
          </h2>
          <Link to="/fruits">
            <Button variant="link" className="text-brand-green">
              View all fruits
            </Button>
          </Link>
        </div>
        <div className="product-grid">
          {fruitShowcase.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {fruitShowcase.length === 0 && (
            <p className="col-span-2 text-center py-8 text-muted-foreground">
              No fruits available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Vegetables Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-brand-green" />
            <span>All Vegetables</span>
          </h2>
          <Link to="/vegetables">
            <Button variant="link" className="text-brand-green">
              View all vegetables
            </Button>
          </Link>
        </div>
        <div className="product-grid">
          {vegetableShowcase.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {vegetableShowcase.length === 0 && (
            <p className="col-span-2 text-center py-8 text-muted-foreground">
              No vegetables available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Handshake className="h-6 w-6 mr-2 text-brand-purple" />
            <span>All Partners</span>
          </h2>
          <Link to="/partners">
            <Button variant="link" className="text-brand-purple">
              View all partners
            </Button>
          </Link>
        </div>
        <div className="product-grid">
          {partnerShowcase.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {partnerShowcase.length === 0 && (
            <p className="col-span-2 text-center py-8 text-muted-foreground">
              No partner products available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 px-6 bg-secondary/50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">About GM & SONS</h2>
        <p className="text-center max-w-2xl mx-auto">
          GM & SONS has been providing premium quality fruits and vegetables since 1995. 
          We source our produce directly from local farms to ensure freshness and support 
          our community.
        </p>
      </section>
    </div>
  );
};

export default Home;
