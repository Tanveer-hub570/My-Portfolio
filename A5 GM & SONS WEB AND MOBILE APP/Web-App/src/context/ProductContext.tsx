
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ProductCategory = 'fruit' | 'vegetable'| 'partner,';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
}

// Initial sample data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Apple',
    category: 'fruit',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80',
    description: 'Fresh red apples from local farms.'
  },
  {
    id: '2',
    name: 'Banana',
    category: 'fruit',
    price: 0.99,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80',
    description: 'Ripe and sweet bananas.'
  },
  {
    id: '3',
    name: 'Carrot',
    category: 'vegetable',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c7f7?auto=format&fit=crop&q=80',
    description: 'Crisp, fresh carrots ideal for cooking or snacking.'
  },
  {
    id: '4',
    name: 'Broccoli',
    category: 'vegetable',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80',
    description: 'Fresh green broccoli heads.'
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    // Try to load from localStorage on initial render
    const savedProducts = localStorage.getItem('gm-sons-products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('gm-sons-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: ProductCategory) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProduct,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
