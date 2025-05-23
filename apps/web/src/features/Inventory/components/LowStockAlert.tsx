
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { InventoryItem } from './types';

interface LowStockAlertProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lowStockItems: InventoryItem[];
  onRestockItem: (item: InventoryItem) => void;
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({
  isOpen,
  setIsOpen,
  lowStockItems,
  onRestockItem
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Low Stock Alert
          </DialogTitle>
          <DialogDescription>
            The following products are at or below their reorder point.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {lowStockItems.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">All stocked up!</p>
              <p className="text-muted-foreground">
                No products are currently below their reorder points.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{item.productName}</h4>
                    <div className="text-sm text-muted-foreground">
                      SKU: {item.sku} | Current: {item.inStock} | Reorder at: {item.reorderPoint}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestockItem(item)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LowStockAlert;
