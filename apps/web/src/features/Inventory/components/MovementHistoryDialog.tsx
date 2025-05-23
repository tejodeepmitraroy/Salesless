
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InventoryItem, StockMovement } from './types';

interface MovementHistoryDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentItem: InventoryItem | null;
  productMovements: StockMovement[];
  onAdjustStock: () => void;
}

const MovementHistoryDialog: React.FC<MovementHistoryDialogProps> = ({
  isOpen,
  setIsOpen,
  currentItem,
  productMovements,
  onAdjustStock
}) => {
  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Movement History: {currentItem.productName}</DialogTitle>
          <DialogDescription>
            Recent stock movements for this product.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No movements found for this product.
                    </TableCell>
                  </TableRow>
                ) : (
                  productMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="whitespace-nowrap">{movement.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            movement.type === 'Received' || movement.type === 'Returned'
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : movement.type === 'Sold' || movement.type === 'Transferred'
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {movement.type === 'Sold' || movement.type === 'Adjusted' && movement.quantity < 0 ? '-' : ''}
                        {Math.abs(movement.quantity)}
                      </TableCell>
                      <TableCell>{movement.reference}</TableCell>
                      <TableCell>{movement.notes || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onAdjustStock}>
            Adjust Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MovementHistoryDialog;
