import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductVariantModal } from '../components/ProductVariantManager';
import { ProductVariant } from '../schema';

interface DataTableProps {
	columns: ColumnDef<ProductVariant, any>[];
	data: ProductVariant[];
	onRowClick?: (row: ProductVariant) => void;
	update: (index: number, row: ProductVariant) => void;
}

export function ProductVariantDataTable({
	columns,
	data,
	update,
}: DataTableProps) {
	const table = useReactTable<ProductVariant>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		// getRowCanExpand: (row) => !!row.original.children?.length,
		// getSubRows: (row) => row.children,
	});

	return (
		<div>
			<div className="h-[calc(100vh-300px)] overflow-y-auto border-y border-gray-200">
				<Table>
					<TableHeader className="rounded-t-md">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<React.Fragment key={row.id}>
									<ProductVariantModal
										key={`${row.original.sku}-${row.index}`}
										variant={row.original}
										index={row.index}
										update={update}
									>
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
											className={'cursor-pointer'}
										>
											{row
												.getVisibleCells()
												.map((cell) =>
													cell.column.id === 'select' ||
													cell.column.id === 'price' ||
													cell.column.id === 'inventoryQuantity' ? (
														<TableCell key={cell.id}>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)}
														</TableCell>
													) : (
														<TableCell key={cell.id}>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext()
															)}
														</TableCell>
													)
												)}
										</TableRow>
									</ProductVariantModal>
									{/* ✅ Sub-row here */}

									{/* {row.getIsExpanded() && (
									<tr>
									<td
									colSpan={row.getVisibleCells().length}
									className="bg-muted px-4 py-2"
									>
									
											<div className="text-muted-foreground text-sm">
												Sub-row content for <b>{row.original.option1}</b>
												</div>
										</td>
									</tr>
								)} */}
								</React.Fragment>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between px-6 py-4">
				<div className="text-muted-foreground w-fit text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
