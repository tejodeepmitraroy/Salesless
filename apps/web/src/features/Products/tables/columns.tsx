import { ColumnDef } from '@tanstack/react-table';
import { Product, ProductMedia } from '@/stores/product-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export const productColumns: ColumnDef<Product>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<div className="z-10 text-center">
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
		accessorKey: 'title',
		header: () => <div className="text-left">Product</div>,
		cell: ({ row }) => {
			const images = row.original.media as ProductMedia[];
			return (
				<div className="flex items-center gap-2 text-left font-medium">
					{images?.length > 0 ? (
						<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border">
							<AspectRatio ratio={1 / 1}>
								<img
									src={images[0].url}
									alt={row.original.title}
									className="h-full w-full object-cover"
								/>
							</AspectRatio>
						</div>
					) : (
						<div className="bg-vsphere-light/50 dark:bg-vsphere-dark/20 flex h-10 w-10 items-center justify-center rounded p-1.5">
							<Package className="text-primary h-4 w-4" />
						</div>
					)}
					{row.getValue('title')}
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
					className={` ${
						status === 'Active'
							? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
							: ''
					} ${
						status === 'Draft'
							? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
							: ''
					} ${
						status === 'Out of stock'
							? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
							: ''
					} `}
				>
					{status}
				</Badge>
			);
		},
	},
	// {
	// 	accessorKey: 'inventory',
	// 	header: () => <div className="text-center">Inventory</div>,
	// 	cell: ({ row }) => {
	// 		const inventory = row.getValue('inventory') as number;
	// 		return <div className="text-center">${inventory}</div>;
	// 	},
	// },
	// {
	// 	accessorKey: 'stockQuantity',
	// 	header: () => <div className="text-center">Stock</div>,
	// 	cell: ({ row }) => {
	// 		const stockQuantity = row.getValue('stockQuantity') as number;
	// 		return <div className="text-center">{stockQuantity}</div>;
	// 	},
	// },
	{
		accessorKey: 'category',
		header: () => <div className="text-center">Category</div>,
		cell: ({ row }) => {
			const category = row.getValue('category') as string;
			return <div className="text-center">{category}</div>;
		},
	},
];
