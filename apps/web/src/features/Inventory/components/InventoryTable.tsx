
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, History, ArrowUpDown } from 'lucide-react';
import { InventoryItem } from './types';

interface InventoryTableProps {
  filteredInventory: InventoryItem[];
  sortField: keyof InventoryItem;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof InventoryItem) => void;
  onAdjustStock: (item: InventoryItem) => void;
  onViewHistory: (item: InventoryItem) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredInventory,
  sortField,
  sortDirection,
  handleSort,
  onAdjustStock,
  onViewHistory
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer whitespace-nowrap"
              onClick={() => handleSort('productName')}
            >
              <div className="flex items-center gap-1">
                Product
                {sortField === 'productName' && (
                  <ArrowUpDown className="h-3 w-3" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('sku')}
            >
              <div className="flex items-center gap-1">
                SKU
                {sortField === 'sku' && (
                  <ArrowUpDown className="h-3 w-3" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('inStock')}
            >
              <div className="flex items-center justify-end gap-1">
                In Stock
                {sortField === 'inStock' && (
                  <ArrowUpDown className="h-3 w-3" />
                )}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Location</TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort('retailPrice')}
            >
              <div className="flex items-center justify-end gap-1">
                Price
                {sortField === 'retailPrice' && (
                  <ArrowUpDown className="h-3 w-3" />
                )}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No inventory items found.
              </TableCell>
            </TableRow>
          ) : (
            filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.productName}
                  <div className="text-xs text-muted-foreground">
                    {item.category}
                  </div>
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell className="text-right">
                  {item.inStock}
                  <div className="text-xs text-muted-foreground">
                    Reorder at: {item.reorderPoint}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.status === 'In Stock' 
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : item.status === 'Low Stock'
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : item.status === 'Out of Stock'
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.vendorName}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">
                  ${item.retailPrice.toFixed(2)}
                  <div className="text-xs text-muted-foreground">
                    Cost: ${item.costPrice.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAdjustStock(item)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Adjust</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewHistory(item)}
                    >
                      <History className="h-4 w-4" />
                      <span className="sr-only">History</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
