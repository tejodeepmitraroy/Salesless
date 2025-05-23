
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { InventoryItem } from './types';

interface StockAdjustment {
  quantity: number;
  type: string;
  reference: string;
  notes: string;
}

interface AdjustStockDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentItem: InventoryItem | null;
  onAdjustStock: (adjustment: StockAdjustment) => void;
}

const AdjustStockDialog: React.FC<AdjustStockDialogProps> = ({
  isOpen,
  setIsOpen,
  currentItem,
  onAdjustStock
}) => {
  const [stockAdjustment, setStockAdjustment] = useState<StockAdjustment>({
    quantity: 0,
    type: 'Received',
    reference: '',
    notes: ''
  });

  // Reset form when dialog opens with new item
  useEffect(() => {
    if (isOpen && currentItem) {
      setStockAdjustment({
        quantity: 0,
        type: 'Received',
        reference: '',
        notes: ''
      });
    }
  }, [isOpen, currentItem]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adjust Stock: {currentItem.productName}</DialogTitle>
          <DialogDescription>
            Update inventory levels for this product.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-stock" className="text-right">
              Current Stock
            </Label>
            <div className="col-span-3">
              <Input
                id="current-stock"
                value={currentItem.inStock}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adjustment-type" className="text-right">
              Adjustment Type
            </Label>
            <Select
              value={stockAdjustment.type}
              onValueChange={(value) => setStockAdjustment({...stockAdjustment, type: value})}
            >
              <SelectTrigger id="adjustment-type" className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Received">Received (Add Stock)</SelectItem>
                <SelectItem value="Sold">Sold (Remove Stock)</SelectItem>
                <SelectItem value="Returned">Returned (Add Stock)</SelectItem>
                <SelectItem value="Adjusted">Inventory Adjustment</SelectItem>
                <SelectItem value="Transferred">Transferred Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3">
              <Input
                id="quantity"
                type="number"
                min={1}
                value={stockAdjustment.quantity}
                onChange={(e) => setStockAdjustment({
                  ...stockAdjustment, 
                  quantity: parseInt(e.target.value) || 0
                })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reference" className="text-right">
              Reference #
            </Label>
            <div className="col-span-3">
              <Input
                id="reference"
                placeholder="e.g. PO-2024-123, ORD-9876"
                value={stockAdjustment.reference}
                onChange={(e) => setStockAdjustment({
                  ...stockAdjustment, 
                  reference: e.target.value
                })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">
              Notes
            </Label>
            <div className="col-span-3">
              <textarea
                id="notes"
                rows={3}
                className="w-full border rounded-md p-2"
                placeholder="Optional notes about this adjustment"
                value={stockAdjustment.notes}
                onChange={(e) => setStockAdjustment({
                  ...stockAdjustment, 
                  notes: e.target.value
                })}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => onAdjustStock(stockAdjustment)}
            disabled={stockAdjustment.quantity <= 0 || !stockAdjustment.reference}
          >
            Update Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdjustStockDialog;
