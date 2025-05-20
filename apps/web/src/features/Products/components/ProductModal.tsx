
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVendorStore } from '@/stores/vendor-store';
import { z } from 'zod';
import { toast } from 'sonner';

import { motion } from 'framer-motion';
import { productSchema } from '../schema';

export type Product = {
  id: number;
  name: string;
  category: string;
  vendor: string;
  price: number;
  stock: number;
  status: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoScore?: number;
};

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

const initialProductState: Product = {
  id: 0,
  name: '',
  category: '',
  vendor: '',
  price: 0,
  stock: 0,
  status: 'Active',
  description: '',
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<Product>({ ...initialProductState });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { activeVendors } = useVendorStore();

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      // Generate a new ID for new products
      const newId = Math.floor(Math.random() * 10000);
      setFormData({ ...initialProductState, id: newId });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateStatus = () => {
    // Update status based on stock
    let status = 'Active';
    if (formData.stock <= 0) {
      status = 'Out of stock';
    } else if (formData.stock < 10) {
      status = 'Low stock';
    }
    setFormData({
      ...formData,
      status,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    try {
      productSchema.parse({
        name: formData.name,
        category: formData.category,
        vendor: formData.vendor,
        price: String(formData.price),
        stock: String(formData.stock),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update status before validation
    updateStatus();
    
    if (validateForm()) {
      onSave(formData);
      onClose();
      toast.success(product ? 'Product updated successfully' : 'Product added successfully');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                  <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Toys & Games">Toys & Games</SelectItem>
                  <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select
                value={formData.vendor}
                onValueChange={(value) => handleSelectChange('vendor', value)}
              >
                <SelectTrigger className={errors.vendor ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a vendor" />
                </SelectTrigger>
                <SelectContent>
                  {activeVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.name}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Direct Supplier">Direct Supplier</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.vendor && <p className="text-xs text-red-500">{errors.vendor}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`pl-7 ${errors.price ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={formData.status}
                readOnly
                className="bg-gray-100 dark:bg-gray-800"
              />
              <p className="text-xs text-gray-500">Status is auto-calculated based on stock levels</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium">SEO Information (Optional)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  name="seoTitle"
                  value={formData.seoTitle || ''}
                  onChange={handleChange}
                  placeholder="SEO title for product"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  name="seoDescription"
                  value={formData.seoDescription || ''}
                  onChange={handleChange}
                  placeholder="SEO description for product"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seoKeywords">SEO Keywords</Label>
                <Input
                  id="seoKeywords"
                  name="seoKeywords"
                  value={formData.seoKeywords || ''}
                  onChange={handleChange}
                  placeholder="Comma-separated keywords"
                />
              </div>
            </div>
          </motion.div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
