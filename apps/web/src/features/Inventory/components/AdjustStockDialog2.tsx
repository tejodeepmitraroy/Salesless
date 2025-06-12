import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InventoryItem } from './types';
import { Edit } from 'lucide-react';

interface StockAdjustment {
	quantity: number;
	type: string;
	reference: string;
	notes: string;
}

interface AdjustStockDialogProps {
	currentItem: InventoryItem | null;
	onAdjustStock: (adjustment: StockAdjustment) => void;
}

const AdjustStockDialog: React.FC<AdjustStockDialogProps> = ({
	currentItem,
	onAdjustStock,
}) => {
	const [stockAdjustment, setStockAdjustment] = useState<StockAdjustment>({
		quantity: 0,
		type: 'Received',
		reference: '',
		notes: '',
	});

	// Reset form when dialog opens with new item
	useEffect(() => {
		if (currentItem) {
			setStockAdjustment({
				quantity: 0,
				type: 'Received',
				reference: '',
				notes: '',
			});
		}
	}, [currentItem]);

	if (!currentItem) return null;

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="outline" size="sm">
					<Edit className="h-4 w-4" />
					<span className="sr-only">Adjust</span>
				</Button>{' '}
			</DialogTrigger>
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
							onValueChange={(value) =>
								setStockAdjustment({ ...stockAdjustment, type: value })
							}
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
								onChange={(e) =>
									setStockAdjustment({
										...stockAdjustment,
										quantity: parseInt(e.target.value) || 0,
									})
								}
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
								onChange={(e) =>
									setStockAdjustment({
										...stockAdjustment,
										reference: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="notes" className="pt-2 text-right">
							Notes
						</Label>
						<div className="col-span-3">
							<textarea
								id="notes"
								rows={3}
								className="w-full rounded-md border p-2"
								placeholder="Optional notes about this adjustment"
								value={stockAdjustment.notes}
								onChange={(e) =>
									setStockAdjustment({
										...stockAdjustment,
										notes: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						onClick={() => onAdjustStock(stockAdjustment)}
						disabled={
							stockAdjustment.quantity <= 0 || !stockAdjustment.reference
						}
					>
						Update Stock
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdjustStockDialog;
