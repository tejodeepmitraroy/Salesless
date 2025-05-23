
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

import { nanoid } from 'nanoid';
import { ProductVariant } from '../schema';

interface ProductVariantManagerProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

const ProductVariantManager: React.FC<ProductVariantManagerProps> = ({
  variants = [],
  onChange,
}) => {
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: nanoid(),
      attributes: {},
      price: undefined,
      stock: undefined,
      sku: undefined,
    };
    
    onChange([...variants, newVariant]);
  };

  const removeVariant = (id: string) => {
    onChange(variants.filter((variant) => variant.id !== id));
  };

  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    onChange(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const updateAttribute = (
    variantId: string,
    key: string,
    value: string
  ) => {
    onChange(
      variants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              attributes: {
                ...variant.attributes,
                [key]: value,
              },
            }
          : variant
      )
    );
  };

  const addAttribute = (variantId: string) => {
    // Find variant
    const variant = variants.find((v) => v.id === variantId);
    if (!variant) return;

    // Create a unique key name
    let newKey = 'attribute';
    let counter = 1;
    while (variant.attributes[newKey + counter]) {
      counter++;
    }
    
    updateAttribute(variantId, newKey + counter, '');
  };

  const removeAttribute = (variantId: string, key: string) => {
    onChange(
      variants.map((variant) => {
        if (variant.id === variantId) {
          const { [key]: removed, ...remainingAttributes } = variant.attributes;
          return {
            ...variant,
            attributes: remainingAttributes,
          };
        }
        return variant;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Product Variants</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={addVariant}
          className="flex items-center gap-1"
        >
          <Plus className="h-3 w-3" /> Add Variant
        </Button>
      </div>

      {variants.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No variants added. Add variants if this product comes in different options like sizes or colors.
        </p>
      ) : (
        <div className="space-y-6">
          {variants.map((variant, ) => (
            <div 
              key={variant.id} 
              className="border rounded-md p-4 space-y-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeVariant(variant.id)}
                className="absolute right-2 top-2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Price (Optional)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Variant price"
                    value={variant.price || ''}
                    onChange={(e) => updateVariant(variant.id, 'price', parseFloat(e.target.value) || undefined)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Stock (Optional)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Variant stock"
                    value={variant.stock || ''}
                    onChange={(e) => updateVariant(variant.id, 'stock', parseInt(e.target.value, 10) || undefined)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1">
                    SKU (Optional)
                  </label>
                  <Input
                    placeholder="SKU-123"
                    value={variant.sku || ''}
                    onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium">Attributes</label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addAttribute(variant.id)}
                    className="h-6 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
                
                {Object.keys(variant.attributes).length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No attributes added. Examples: Color, Size, Material.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(variant.attributes).map(([key, value]) => (
                      <div key={key} className="flex gap-2 items-center">
                        <Input
                          placeholder="Name"
                          className="flex-1 text-xs h-8"
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value;
                            if (newKey && newKey !== key) {
                              // Create new attribute with new key
                              const newVariant = { ...variant };
                              const attrValue = newVariant.attributes[key];
                              delete newVariant.attributes[key];
                              newVariant.attributes[newKey] = attrValue;
                              
                              // Update variants with this modified variant
                              onChange(
                                variants.map((v) =>
                                  v.id === variant.id ? newVariant : v
                                )
                              );
                            }
                          }}
                        />
                        <Input
                          placeholder="Value"
                          className="flex-1 text-xs h-8"
                          value={value}
                          onChange={(e) => updateAttribute(variant.id, key, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttribute(variant.id, key)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVariantManager;
