
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/ProductContext';
import { usePartners } from '@/context/PartnerContext';
import { LayoutDashboard, Apple, Leaf, Plus, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { partners } = usePartners();
  
  const fruitCount = products.filter(p => p.category === 'fruit').length;
  const vegetableCount = products.filter(p => p.category === 'vegetable').length;
  const partnerCount = partners.length;
  
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          <LayoutDashboard className="h-8 w-8 mr-2" />
          <span>Admin Dashboard</span>
        </h1>
        <div className="flex gap-2">
          <Link to="/admin/products/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Button>
          </Link>
          <Link to="/admin/partners">
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Manage Partners</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Products */}
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>All products in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{products.length}</p>
          </CardContent>
          <CardFooter>
            <Link to="/admin/products">
              <Button variant="outline" className="w-full">View All Products</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Fruits */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Fruits</CardTitle>
              <CardDescription>Total fruit products</CardDescription>
            </div>
            <Apple className="h-6 w-6 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{fruitCount}</p>
          </CardContent>
          <CardFooter>
            <Link to="/fruits">
              <Button variant="outline" className="w-full">View Fruits</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Vegetables */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Vegetables</CardTitle>
              <CardDescription>Total vegetable products</CardDescription>
            </div>
            <Leaf className="h-6 w-6 text-brand-green" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{vegetableCount}</p>
          </CardContent>
          <CardFooter>
            <Link to="/vegetables">
              <Button variant="outline" className="w-full">View Vegetables</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Partners */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Partners</CardTitle>
              <CardDescription>Business partners</CardDescription>
            </div>
            <Users className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{partnerCount}</p>
          </CardContent>
          <CardFooter>
            <Link to="/admin/partners">
              <Button variant="outline" className="w-full">Manage Partners</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link to="/admin/products/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add New Product</span>
              </Button>
            </Link>
            <Link to="/admin/products">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Manage Products</span>
              </Button>
            </Link>
            <Link to="/admin/partners">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Manage Partners</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
