import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { useOrderStore } from '@/stores/useOrderStore';

const OrderFilters = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
}) => {
	const status = useOrderStore((state) => state.status);
	const statusFilter = useOrderStore((state) => state.statusFilter);
	const setStatusFilter = useOrderStore((state) => state.setStatusFilter);
	const sortOrders = useOrderStore((state) => state.sortOrders);
	const setSortOrders = useOrderStore((state) => state.setSortOrders);

	// console.log('Applied By -------------?Filter', statusFilter, sortOrders);
	return (
		<div className="mt-4 flex flex-col gap-4 md:flex-row">
			<div className="relative flex-1">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
				<Input
					placeholder="Search products, SKUs, vendors..."
					className="pl-10"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Select
					value={statusFilter}
					onValueChange={(filter: string) => setStatusFilter(filter)}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value="all">All Orders</SelectItem>
							{status.map((status) => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select
					value={sortOrders}
					onValueChange={(sort: string) => setSortOrders(sort)}
				>
					<SelectTrigger className="w-[180px]">
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4" />
							<span>Sort</span>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="asc">Ascending</SelectItem>
						<SelectItem value="desc">Descending</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default OrderFilters;
