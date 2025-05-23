
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StockMovement } from './types';

interface MovementHistoryTableProps {
  movements: StockMovement[];
  searchTerm: string;
}

const MovementHistoryTable: React.FC<MovementHistoryTableProps> = ({
  movements,
  searchTerm
}) => {
  const filteredMovements = movements.filter(movement => 
    movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMovements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell className="whitespace-nowrap">{movement.date}</TableCell>
              <TableCell>{movement.productName}</TableCell>
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
              <TableCell>{movement.updatedBy}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {movement.notes || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MovementHistoryTable;
