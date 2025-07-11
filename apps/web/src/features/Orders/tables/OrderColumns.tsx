import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

import { CheckCircle, Clock, ShoppingCart, Truck, XCircle } from 'lucide-react';

const getStatusIcon = (status: string) => {
	switch (status) {
		case 'Delivered':
			return <CheckCircle className="mr-1 h-4 w-4" />;
		case 'Shipped':
			return <Truck className="mr-1 h-4 w-4" />;
		case 'Processing':
			return <ShoppingCart className="mr-1 h-4 w-4" />;
		case 'Pending':
			return <Clock className="mr-1 h-4 w-4" />;
		case 'Cancelled':
			return <XCircle className="mr-1 h-4 w-4" />;
		default:
			return null;
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case 'Delivered':
			return 'bg-green-100 text-green-700';
		case 'Shipped':
			return 'bg-blue-100 text-blue-700';
		case 'Processing':
			return 'bg-yellow-100 text-yellow-700';
		case 'Pending':
			return 'bg-gray-100 text-gray-700';
		case 'Cancelled':
			return 'bg-red-100 text-red-700';
		default:
			return 'bg-gray-100 text-gray-700';
	}
};

export const orderColumns: ColumnDef<any>[] = [
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
		accessorKey: 'id',
		header: () => <div className="text-left">Order ID</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2 text-left font-medium">
					{row.getValue('id')}
				</div>
			);
		},
	},
	{
		accessorKey: 'customer',
		header: () => <div className="text-center">Customer</div>,
		cell: ({ row }) => {
			const customer = row.getValue('customer') as string;
			return <div className="text-center">{customer}</div>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: () => <div className="text-center">Date</div>,
		cell: ({ row }) => {
			const date = row.getValue('createdAt') as string;
			return <div className="text-center">{date}</div>;
		},
	},
	{
		accessorKey: 'total',
		header: () => <div className="text-center">Total</div>,
		cell: ({ row }) => {
			const total = row.getValue('total') as string;
			return <div className="text-center">{total}</div>;
		},
	},
	{
		accessorKey: 'items',
		header: () => <div className="text-center">Items</div>,
		cell: ({ row }) => {
			const items = row.getValue('items') as number;
			return <div className="text-center">{items}</div>;
		},
	},
	{
		accessorKey: 'status',
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			return (
				<Badge className={getStatusColor(status)}>
					<span className="flex items-center">
						{getStatusIcon(status)}
						{status}
					</span>
				</Badge>
			);
		},
	},
	{
		accessorKey: 'payment',
		header: () => <div className="text-center">Payment</div>,
		cell: ({ row }) => {
			const payment = row.getValue('payment') as string;
			return (
				<Badge
					variant="outline"
					className={
						payment === 'Paid'
							? 'bg-green-50 text-green-700'
							: payment === 'Awaiting'
								? 'bg-yellow-50 text-yellow-700'
								: 'bg-red-50 text-red-700'
					}
				>
					{payment}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: () => <div className="text-center">Actions</div>,
		cell: () => {
			// const storeId = row.original.storeId;
			// const id = row.original.id;

			return (
				<div className="text-center font-medium">
					{/* <Button
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={() => handleViewOrder(row.original)}
					>
						<Eye className="h-4 w-4" />
					</Button> */}
				</div>
			);
		},
	},
];
