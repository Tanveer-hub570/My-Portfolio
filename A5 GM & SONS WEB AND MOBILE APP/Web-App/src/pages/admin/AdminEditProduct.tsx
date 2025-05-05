
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ProductForm } from '@/components/admin/ProductForm';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminEditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, updateProduct } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const product = getProduct(id as string);
  
  const handleSubmit = (productData: any) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    // Simulate a short delay to show loading state
    setTimeout(() => {
      updateProduct(id, productData);
      
      toast({
        title: 'Product Updated',
        description: `${productData.name} has been updated successfully.`,
      });
      
      setIsSubmitting(false);
      navigate('/admin/products');
    }, 500);
  };
  
  if (!product) {
    return (
      <div className="space-y-6 fade-in">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <Alert variant="destructive">
          <AlertTitle>Product Not Found</AlertTitle>
          <AlertDescription>
            The product you're trying to edit doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/admin/products')}
            className="text-primary underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Edit Product: {product.name}</h1>
      <ProductForm 
        initialData={product} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
};

export default AdminEditProduct;
