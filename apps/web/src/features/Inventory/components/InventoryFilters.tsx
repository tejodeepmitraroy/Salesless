import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

interface InventoryFiltersProps {
	searchTerm: string;
	categoryFilter: string;
	statusFilter: string;
	uniqueCategories: string[];
	setSearchTerm: (value: string) => void;
	setCategoryFilter: (value: string) => void;
	setStatusFilter: (value: string) => void;
}

const InventoryFilters: React.FC<InventoryFiltersProps> = ({
	searchTerm,
	categoryFilter,
	statusFilter,
	uniqueCategories,
	setSearchTerm,
	setCategoryFilter,
	setStatusFilter,
}) => {
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
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="w-[180px]">
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4" />
							<span>Category</span>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{uniqueCategories.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[180px]">
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4" />
							<span>Status</span>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Statuses</SelectItem>
						<SelectItem value="In Stock">In Stock</SelectItem>
						<SelectItem value="Low Stock">Low Stock</SelectItem>
						<SelectItem value="Out of Stock">Out of Stock</SelectItem>
						<SelectItem value="Overstocked">Overstocked</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default InventoryFilters;
