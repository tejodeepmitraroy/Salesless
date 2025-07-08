import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MediaContent } from '@/routes/app/Media/MediaManagement';

export const mediaColumns: ColumnDef<MediaContent>[] = [
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
		accessorKey: 'fileName',
		header: () => <div className="text-left">File Name</div>,
		cell: ({ row }) => {
			const imageUrl = row.original.url;
			return (
				<div className="flex items-center gap-2 text-left font-medium">
					<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border">
						<AspectRatio ratio={1 / 1}>
							<img
								src={imageUrl!}
								alt={row.original.fileName}
								className="h-full w-full object-cover"
							/>
						</AspectRatio>
					</div>

					{row.getValue('fileName')}
				</div>
			);
		},
	},
	{
		accessorKey: 'altText',
		header: () => <div className="text-center">Alt Text</div>,
		cell: ({ row }) => {
			const altText = row.getValue('altText') as string;
			return <div className="text-center">{altText}</div>;
		},
	},
	{
		accessorKey: 'createdAt',
		header: () => <div className="text-right">Date Added</div>,
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt') as string;
			return <div className="text-right">{createdAt}</div>;
		},
	},
	{
		accessorKey: 'size',
		header: () => <div className="text-center">Size</div>,
		cell: ({ row }) => {
			const size = row.getValue('size') as string;
			return <div className="text-center">{size}</div>;
		},
	},
];
