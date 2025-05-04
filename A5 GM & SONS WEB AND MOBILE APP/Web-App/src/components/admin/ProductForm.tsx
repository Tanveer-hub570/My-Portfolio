
import React, { useEffect, useState } from 'react';
import { Product, ProductCategory } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Image as ImageIcon, FileImage } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  isSubmitting: boolean;
}

export function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<ProductCategory>(initialData?.category || 'fruit');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Product, 'id'>, string>>>({});

  // For image preview
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setPrice(initialData.price.toString());
      setImage(initialData.image);
      setImagePreview(initialData.image);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Product, 'id'>, string>> = {};
    
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';
    if (!image.trim()) newErrors.image = 'Image URL is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit({
      name,
      category,
      price: Number(price),
      image,
      description,
    });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
    setImagePreview(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setImage(dataUrl);
          setImagePreview(dataUrl);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const placeholderImages = {
    fruit: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80',
    vegetable: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80',
  };

  const handleUseDefaultImage = () => {
    const defaultImage = placeholderImages[category];
    setImage(defaultImage);
    setImagePreview(defaultImage);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label>Product Category</Label>
            <RadioGroup 
              value={category} 
              onValueChange={(value) => setCategory(value as ProductCategory)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fruit" id="fruit" />
                <Label htmlFor="fruit" className="cursor-pointer">Fruit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vegetable" id="vegetable" />
                <Label htmlFor="vegetable" className="cursor-pointer">Vegetable</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Product Image</Label>
            <div className="flex gap-2 mb-2">
              <Button 
                type="button"
                variant={uploadMethod === 'url' ? "default" : "outline"}
                onClick={() => setUploadMethod('url')}
                className="flex-1"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                URL
              </Button>
              <Button 
                type="button"
                variant={uploadMethod === 'file' ? "default" : "outline"}
                onClick={() => setUploadMethod('file')}
                className="flex-1"
              >
                <FileImage className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>

            {uploadMethod === 'url' ? (
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={image}
                  onChange={handleImageUrlChange}
                  placeholder="Enter image URL"
                  className={errors.image ? 'border-red-500' : ''}
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleUseDefaultImage}
                  title="Use a default image"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <div className="border rounded p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Input
                    type="file"
                    id="imageFile"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <Label htmlFor="imageFile" className="cursor-pointer flex flex-col items-center w-full">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-center text-sm text-muted-foreground">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </Label>
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
            )}
          </div>

          <Card className="border-dashed">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="w-full">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-64 object-cover rounded-md"
                    onError={() => setImagePreview(null)}
                  />
                </div>
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center bg-muted/40 rounded-md">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {uploadMethod === 'url' 
                      ? 'Enter an image URL above to see a preview'
                      : 'Upload an image to see a preview'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
