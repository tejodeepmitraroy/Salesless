import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Package,
	Search,
	Download,
	AlertTriangle,
	History,
	Loader,
} from 'lucide-react';
// Import refactored components
import { useInventory } from '@/features/Inventory/components/useInventory';
import { InventoryItem } from '@/features/Inventory/components/types';
import InventoryFilters from '@/features/Inventory/components/InventoryFilters';
import MovementHistoryTable from '@/features/Inventory/components/MovementHistoryTable';
import AdjustStockDialog from '@/features/Inventory/components/AdjustStockDialog';
import MovementHistoryDialog from '@/features/Inventory/components/MovementHistoryDialog';
import LowStockAlert from '@/features/Inventory/components/LowStockAlert';
import HeaderSection from '@/components/layouts/HeaderSection';
import { InventoryDataTable } from '@/features/Inventory/tables/InventoryDataTable';
import { useQuery } from '@tanstack/react-query';
import { getAllInventory } from '@/features/Inventory/services';
import { useParams } from 'react-router';
import { inventoryColumns } from '@/features/Inventory/tables/InventoryColumns';

const InventoryManagement: React.FC = () => {
	const { storeId } = useParams<{ storeId: string }>();
	const {
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
		statusFilter,
		setStatusFilter,
		// sortField,
		// sortDirection,
		// handleSort,
		handleAdjustStock,
		handleExportInventory,
		getProductMovements,
		uniqueCategories,
		// filteredInventory,
		lowStockItems,
		stockMovements,
	} = useInventory();

	// Dialogs state
	const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
	const [isMovementHistoryOpen, setIsMovementHistoryOpen] = useState(false);
	const [isLowStockOpen, setIsLowStockOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

	const { data: inventoryData, isLoading } = useQuery({
		queryKey: ['inventory'],
		queryFn: () => getAllInventory({ storeId: storeId! }),
	});

	console.log('inventoryData', inventoryData);

	return isLoading ? (
		<Loader className="h-5 w-5 animate-spin" />
	) : (
		<div className="mx-auto w-full max-w-7xl space-y-6">
			<HeaderSection
				icon={<Package />}
				title="Inventory Management"
				description="Monitor and manage your product inventory"
			/>

			<section className="space-y-6">
				<Tabs defaultValue="current">
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<TabsList>
							<TabsTrigger value="current" className="flex items-center gap-2">
								<Package className="h-4 w-4" />
								Current Inventory
							</TabsTrigger>
							<TabsTrigger
								value="movements"
								className="flex items-center gap-2"
							>
								<History className="h-4 w-4" />
								Stock Movements
							</TabsTrigger>
						</TabsList>
						<div className="flex items-center gap-2">
							<Button
								onClick={handleExportInventory}
								variant="outline"
								className="flex items-center gap-2"
							>
								<Download className="h-4 w-4" />
								Export to Excel
							</Button>
							<Button
								onClick={() => setIsLowStockOpen(true)}
								variant={lowStockItems.length > 0 ? 'destructive' : 'outline'}
								className="flex items-center gap-2"
							>
								<AlertTriangle className="h-4 w-4" />
								Low Stock Items ({lowStockItems.length})
							</Button>
						</div>
					</div>

					<TabsContent value="current" className="space-y-6">
						<InventoryFilters
							searchTerm={searchTerm}
							categoryFilter={categoryFilter}
							statusFilter={statusFilter}
							uniqueCategories={uniqueCategories}
							setSearchTerm={setSearchTerm}
							setCategoryFilter={setCategoryFilter}
							setStatusFilter={setStatusFilter}
						/>

						<InventoryDataTable
							columns={inventoryColumns}
							data={inventoryData}
						/>
					</TabsContent>

					<TabsContent value="movements" className="space-y-6">
						<div className="relative mt-4 w-full">
							<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
							<Input
								placeholder="Search movements..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<MovementHistoryTable
							movements={stockMovements}
							searchTerm={searchTerm}
						/>
					</TabsContent>
				</Tabs>

				{/* Dialogs */}
				<AdjustStockDialog
					isOpen={isAdjustStockOpen}
					setIsOpen={setIsAdjustStockOpen}
					currentItem={currentItem}
					onAdjustStock={(adjustment) => {
						if (currentItem) {
							handleAdjustStock(currentItem, adjustment);
							setIsAdjustStockOpen(false);
						}
					}}
				/>

				<MovementHistoryDialog
					isOpen={isMovementHistoryOpen}
					setIsOpen={setIsMovementHistoryOpen}
					currentItem={currentItem}
					productMovements={
						currentItem ? getProductMovements(currentItem.productId) : []
					}
					onAdjustStock={() => {
						setIsMovementHistoryOpen(false);
						setIsAdjustStockOpen(true);
					}}
				/>

				<LowStockAlert
					isOpen={isLowStockOpen}
					setIsOpen={setIsLowStockOpen}
					lowStockItems={lowStockItems}
					onRestockItem={(item) => {
						setCurrentItem(item);
						setIsLowStockOpen(false);
						setIsAdjustStockOpen(true);
					}}
				/>
			</section>
		</div>
	);
};

export default InventoryManagement;
