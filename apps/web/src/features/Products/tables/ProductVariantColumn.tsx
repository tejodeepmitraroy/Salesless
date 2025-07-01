import { ColumnDef, Row } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';
import { ProductVariant, ProductVariantOption } from '../schema';

import { ProductFormValues } from '@/routes/app/Products/CreateNewProduct';

export const ProductVariantColumns = (
	control: Control<ProductFormValues>
): ColumnDef<ProductVariant>[] => {
	const optionHeader = control._getWatch('options');
	return [
		{
			id: 'select',
			header: ({ table }) => (
				<div className="text-center">
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && 'indeterminate')
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
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
		// {
		// 	id: 'expander',
		// 	header: () => null,
		// 	cell: ({ row }) =>
		// 		row.getCanExpand() ? (
		// 			<button
		// 				{...{
		// 					onClick: row.getToggleExpandedHandler(),
		// 					className: 'flex items-center justify-center p-1',
		// 				}}
		// 			>
		// 				{row.getIsExpanded() ? (
		// 					<ChevronDown className="h-4 w-4" />
		// 				) : (
		// 					<ChevronRight className="h-4 w-4" />
		// 				)}
		// 			</button>
		// 		) : null,
		// },

		...optionHeader.map((option: ProductVariantOption, index: number) => ({
			accessorKey: `option${index + 1}`,
			header: () => <div className="text-center">{option.name}</div>,
			cell: ({ row }: { row: Row<ProductVariant> }) => {
				return (
					<div className="flex h-8 items-center justify-center text-center">
						{row.getValue(`option${index + 1}`)}
					</div>
				);
			},
		})),
		{
			id: 'price',
			accessorKey: 'price',
			header: () => <div className="text-center">Price</div>,
			cell: ({ row }) => {
				return <div>{row.getValue(`price`)}</div>;
			},
		},
		{
			id: 'inventoryQuantity',
			accessorKey: 'inventoryQuantity',
			header: () => <div className="text-center">Available</div>,
			cell: ({ row }) => {
				return <div>{row.getValue(`inventoryQuantity`)}</div>;
			},
		},
	];
};
