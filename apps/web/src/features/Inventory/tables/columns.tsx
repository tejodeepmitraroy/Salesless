import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';

import { InventoryItem } from '../components/types';
import { Button } from '@/components/ui/button';

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="text-center">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'productName',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Product
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			// const images = row.original.media as ProductMedia[];
			return (
				<div className="flex items-center gap-2 text-left font-medium">
					{/* {images?.length > 0 ? (
						<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border">
							<AspectRatio ratio={1 / 1}>
								<img
									src={images[0].url}
									alt={row.original.productName}
									className="h-full w-full object-cover"
								/>
							</AspectRatio>
						</div>
					) : (
						<div className="bg-vsphere-light/50 dark:bg-vsphere-dark/20 flex h-10 w-10 items-center justify-center rounded p-1.5">
							<Package className="text-primary h-4 w-4" />
						</div>
					)} */}
					{row.getValue('productName')}
				</div>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: 'sku',
		header: () => <div className="text-center">SKU</div>,
		cell: ({ row }) => {
			const sku = row.getValue('sku') as string;
			return <div className="text-center">{sku}</div>;
		},
	},
	{
		accessorKey: 'price',
		header: () => <div className="text-center">Price</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					${row.original.retailPrice.toFixed(2)}
					<div className="text-muted-foreground text-xs">
						Cost: ${row.original.costPrice.toFixed(2)}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'status',
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return (
				<Badge
					className={
						status === 'In Stock'
							? 'bg-green-100 text-green-800 hover:bg-green-100'
							: status === 'Low Stock'
								? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
								: status === 'Out of Stock'
									? 'bg-red-100 text-red-800 hover:bg-red-100'
									: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
					}
				>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'orders',
		header: () => <div className="text-center">Committed</div>,
		cell: ({ row }) => {
			const orders = row.getValue('orders') as number;
			return <div className="text-center">{orders}</div>;
		},
	},
	{
		accessorKey: 'inStock',
		header: () => <div className="text-center">In Stock</div>,
		cell: ({ row }) => {
			const stockQuantity = row.getValue('inStock') as number;
			return (
				<div className="text-center">
					{stockQuantity}
					<div className="text-muted-foreground text-xs">
						Reorder at: {row.original.reorderPoint}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'action',
		header: () => <div className="text-center">Actions</div>,
		cell: () => {
			return (
				<div className="flex justify-end gap-2">
					{/* <AdjustStockDialog2
						currentItem={row.original}
						onAdjustStock={(adjustment) => {
							if (row.original) {
								handleAdjustStock(row.original, adjustment);
							}
						}}
					/>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onViewHistory(row.original)}
					>
						<History className="h-4 w-4" />
						<span className="sr-only">History</span>
					</Button> */}
				</div>
			);
		},
	},
];
