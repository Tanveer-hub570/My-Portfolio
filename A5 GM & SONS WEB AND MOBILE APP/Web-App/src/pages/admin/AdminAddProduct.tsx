
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ProductForm } from '@/components/admin/ProductForm';
import { useToast } from '@/components/ui/use-toast';

const AdminAddProduct = () => {
  const { addProduct } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (productData: any) => {
    setIsSubmitting(true);
    
    // Simulate a short delay to show loading state
    setTimeout(() => {
      addProduct(productData);
      
      toast({
        title: 'Product Added',
        description: `${productData.name} has been added to the inventory.`,
      });
      
      setIsSubmitting(false);
      navigate('/admin/products');
    }, 500);
  };

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <div className="mb-4">
        <p className="text-muted-foreground">
          Add a new product to your inventory. You can upload an image or provide a URL.
        </p>
      </div>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AdminAddProduct;
