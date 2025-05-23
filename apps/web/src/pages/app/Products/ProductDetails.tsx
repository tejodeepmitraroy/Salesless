// import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, Edit, Package, Tag, DollarSign, Archive, Image as ImageIcon, Layers } from 'lucide-react';
import { useProductStore } from '@/stores/product-store';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Package className="h-16 w-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600">Product Not Found</h2>
        <Button onClick={() => navigate('/admin/products')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  const getFeaturedImage = () => {
    if (!product.images || product.images.length === 0) return null;
    return product.images.find(img => img.isFeatured) || product.images[0];
  };

  const featuredImage = getFeaturedImage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">Product ID: {product.id}</p>
          </div>
        </div>
        <Button className="bg-vsphere-primary text-white hover:bg-vsphere-primary/90">
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  {/* Featured Image */}
                  {featuredImage && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Featured Image</Badge>
                      </div>
                      <div className="max-w-md">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={featuredImage.url}
                            alt={featuredImage.name}
                            className="w-full h-full object-cover rounded-lg border"
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  )}
                  
                  {/* Other Images */}
                  {product.images.length > 1 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">All Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {product.images.map((image) => (
                          <div key={image.id} className="space-y-2">
                            <AspectRatio ratio={1}>
                              <img 
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover rounded border"
                              />
                            </AspectRatio>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 truncate">{image.name}</span>
                              {image.isFeatured && (
                                <Badge variant="outline" className="text-xs">Featured</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No images uploaded</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Variants */}
          {product.variants && product.variants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Product Variants ({product.variants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.variants.map((variant, index) => (
                    <div key={variant.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Variant {index + 1}</h4>
                        {variant.sku && (
                          <Badge variant="outline">{variant.sku}</Badge>
                        )}
                      </div>
                      
                      {/* Attributes */}
                      {Object.keys(variant.attributes).length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Attributes:</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(variant.attributes).map(([key, value]) => (
                              <Badge key={key} variant="secondary">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Variant Details */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {variant.price && (
                          <div>
                            <p className="text-gray-600">Price</p>
                            <p className="font-medium">${variant.price.toFixed(2)}</p>
                          </div>
                        )}
                        {variant.stock !== undefined && (
                          <div>
                            <p className="text-gray-600">Stock</p>
                            <p className="font-medium">{variant.stock}</p>
                          </div>
                        )}
                        {variant.sku && (
                          <div>
                            <p className="text-gray-600">SKU</p>
                            <p className="font-medium">{variant.sku}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {product.description && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <Badge
                  className={`
                    ${product.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                    ${product.status === "Low stock" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                    ${product.status === "Out of stock" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
                  `}
                >
                  {product.status}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Archive className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className="font-semibold">{product.stock}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold">{product.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Vendor</p>
                    <p className="font-semibold">{product.vendor}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Information */}
          {(product.seoTitle || product.seoDescription || product.seoKeywords) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.seoTitle && (
                  <div>
                    <p className="text-sm text-gray-600">SEO Title</p>
                    <p className="text-sm">{product.seoTitle}</p>
                  </div>
                )}
                {product.seoDescription && (
                  <div>
                    <p className="text-sm text-gray-600">SEO Description</p>
                    <p className="text-sm">{product.seoDescription}</p>
                  </div>
                )}
                {product.seoKeywords && (
                  <div>
                    <p className="text-sm text-gray-600">SEO Keywords</p>
                    <p className="text-sm">{product.seoKeywords}</p>
                  </div>
                )}
                {product.seoScore && (
                  <div>
                    <p className="text-sm text-gray-600">SEO Score</p>
                    <Badge variant={product.seoScore >= 80 ? "default" : product.seoScore >= 60 ? "secondary" : "destructive"}>
                      {product.seoScore}/100
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
