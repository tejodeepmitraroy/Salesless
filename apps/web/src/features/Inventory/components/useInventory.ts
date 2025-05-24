import { useState } from 'react';
import {
	InventoryItem,
	StockMovement,
	initialInventory,
	initialStockMovements,
} from './types';
// import { useToast } from '@/hooks/use-toast';
import { exportToCSV } from '@/utils/exportUtils';
import { toast } from 'sonner';

export function useInventory() {
	// const { toast } = useToast();
	const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
	const [stockMovements, setStockMovements] = useState<StockMovement[]>(
		initialStockMovements
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [statusFilter, setStatusFilter] = useState('all');
	const [sortField, setSortField] =
		useState<keyof InventoryItem>('productName');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	// Filtering and sorting functions
	const getFilteredInventory = () => {
		return inventory
			.filter(
				(item) =>
					item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.filter(
				(item) => categoryFilter === 'all' || item.category === categoryFilter
			)
			.filter((item) => statusFilter === 'all' || item.status === statusFilter)
			.sort((a, b) => {
				const aValue = a[sortField];
				const bValue = b[sortField];

				if (typeof aValue === 'string' && typeof bValue === 'string') {
					return sortDirection === 'asc'
						? aValue.localeCompare(bValue)
						: bValue.localeCompare(aValue);
				} else {
					return sortDirection === 'asc'
						? (aValue as number) - (bValue as number)
						: (bValue as number) - (aValue as number);
				}
			});
	};

	const getLowStockItems = () => {
		return inventory.filter((item) => item.inStock <= item.reorderPoint);
	};

	const getProductMovements = (productId: number) => {
		return stockMovements.filter(
			(movement) => movement.productId === productId
		);
	};

	// Action handlers
	const handleSort = (field: keyof InventoryItem) => {
		if (field === sortField) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('asc');
		}
	};

	const handleAdjustStock = (
		currentItem: InventoryItem,
		adjustment: {
			quantity: number;
			type: string;
			reference: string;
			notes: string;
		}
	) => {
		if (!currentItem) return;

		// Process stock adjustment
		const now = new Date();
		const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

		// Create new stock movement record
		const newMovement: StockMovement = {
			id: Math.max(0, ...stockMovements.map((m) => m.id)) + 1,
			productId: currentItem.productId,
			productName: currentItem.productName,
			date: formattedDate,
			type: adjustment.type,
			quantity: adjustment.quantity,
			reference: adjustment.reference,
			notes: adjustment.notes,
			updatedBy: 'Admin User', // In a real app, this would be the logged-in user
		};

		setStockMovements([newMovement, ...stockMovements]);

		// Update inventory
		const updatedInventory = inventory.map((item) => {
			if (item.id === currentItem.id) {
				let newStock = item.inStock;

				switch (adjustment.type) {
					case 'Received':
						newStock += adjustment.quantity;
						break;
					case 'Sold':
					case 'Adjusted':
						newStock -= adjustment.quantity;
						break;
					case 'Returned':
						newStock += adjustment.quantity;
						break;
					case 'Transferred':
						newStock -= adjustment.quantity;
						break;
				}

				// Determine status based on new stock level
				let status: InventoryItem['status'] = 'In Stock';
				if (newStock <= 0) {
					status = 'Out of Stock';
				} else if (newStock <= item.reorderPoint) {
					status = 'Low Stock';
				} else if (newStock > item.reorderPoint * 3) {
					status = 'Overstocked';
				}

				return {
					...item,
					inStock: newStock,
					lastUpdated: now.toISOString().split('T')[0],
					status,
				};
			}
			return item;
		});

		setInventory(updatedInventory);

		toast('Stock Adjusted', {
			description: `${currentItem.productName} stock has been updated successfully.`,
		});
	};

	const handleExportInventory = () => {
		toast('Export Started', {
			description: 'Inventory data is being prepared for download.',
		});

		try {
			// Format data for export if needed
			const dataToExport = inventory.map((item) => ({
				ID: item.id,
				'Product ID': item.productId,
				'Product Name': item.productName,
				SKU: item.sku,
				Category: item.category,
				'In Stock': item.inStock,
				'Reorder Point': item.reorderPoint,
				Status: item.status,
				'Vendor Name': item.vendorName,
				'Last Updated': item.lastUpdated,
			}));

			// Export data as CSV
			exportToCSV(dataToExport, 'inventory_export');

			toast('Export Complete',{
				
				description: 'Inventory data has been exported successfully.',
			});
		} catch (error) {
			console.error('Export error:', error);
			toast('Export Failed',{
				
				description: 'There was an error exporting the inventory data.',
				// variant: 'destructive',
			});
		}
	};

	const uniqueCategories = Array.from(
		new Set(inventory.map((item) => item.category))
	);
	const filteredInventory = getFilteredInventory();
	const lowStockItems = getLowStockItems();

	return {
		inventory,
		stockMovements,
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
		statusFilter,
		setStatusFilter,
		sortField,
		sortDirection,
		handleSort,
		handleAdjustStock,
		handleExportInventory,
		getProductMovements,
		uniqueCategories,
		filteredInventory,
		lowStockItems,
	};
}
