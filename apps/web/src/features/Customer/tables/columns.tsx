import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Customer } from '@/stores/useCustomerStore';
import Cookies from 'js-cookie';
const storeId = Cookies.get('storeId');

export const customerColumns: ColumnDef<Customer>[] = [
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
		accessorKey: 'name',
		header: () => <div className="text-left">Name</div>,
		cell: ({ row }) => {
			const firstName = row.original.firstName;
			const lastName = row.original.lastName;
			return <div className="text-left">{firstName + ' ' + lastName}</div>;
		},
	},
	{
		accessorKey: 'email',
		header: () => <div className="text-left">Email</div>,
		cell: ({ row }) => {
			const email = row.getValue('email') as string;
			return <div className="text-left">{email}</div>;
		},
	},

	{
		accessorKey: 'phone',
		header: () => <div className="text-center">Phone</div>,
		cell: ({ row }) => {
			const phone = row.getValue('phone') as string;
			return <div className="text-center">{phone}</div>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: () => <div className="text-center">Sign Up Date</div>,
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string;
			return <div className="text-center">{createdAt}</div>;
		},
	},
	{
		accessorKey: 'status',
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const emailVerified = row.getValue('emailVerified') as boolean;
			const phoneVerified = row.getValue('phoneVerified') as boolean;
			return (
				<Badge
					className={` ${
						emailVerified &&
						phoneVerified &&
						'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
					} ${
						!emailVerified || !phoneVerified
							? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
							: ''
					} ${
						!emailVerified && !phoneVerified
							? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
							: ''
					} `}
				>
					{emailVerified && phoneVerified ? 'Verified' : 'Not Verified'}
				</Badge>
			);
		},
	},

	{
		accessorKey: 'actions',
		header: () => <div className="text-center">Actions</div>,
		cell: ({ row }) => {
			const id = row.original.id;
			return (
				<div className="text-center font-medium">
					<Link to={`/store/${storeId}/customers/${id}`}>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-red-500"
						// onClick={() => handleDeleteProduct(product.id)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];
