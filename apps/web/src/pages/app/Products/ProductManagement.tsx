import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Package,
	Search,
	Plus,
	Edit,
	Trash2,
	Filter,
	ArrowUpDown,
	Download,
} from 'lucide-react';
// import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/stores/product-store';
import { exportToCSV } from '@/utils/exportUtils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ProductModal from '@/features/Products/components/ProductModal';

const ProductManagement = () => {
	// const { toast } = useToast();
	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);

	const products = useProductStore((state) => state.products);
	const setProducts = useProductStore((state) => state.setProducts);

	// Filter products based on search query and tab
	const filteredProducts = (tab: string) => {
		let filtered = products;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Apply tab filter
		if (tab !== 'all') {
			const statusMap: Record<string, string> = {
				active: 'Active',
				low: 'Low stock',
				out: 'Out of stock',
			};
			filtered = filtered.filter(
				(product) => product.status === statusMap[tab]
			);
		}

		return filtered;
	};

	const handleAddProduct = () => {
		setCurrentProduct(null);
		setIsModalOpen(true);
	};

	const handleEditProduct = (product) => {
		setCurrentProduct(product);
		setIsModalOpen(true);
	};

	const handleDeleteProduct = (productId: number) => {
		const productToDelete = products.find((p) => p.id === productId);
		if (!productToDelete) return;

		setProducts(products.filter((p) => p.id !== productId));

		toast('Product Deleted', {
			description: `${productToDelete.name} has been successfully removed.`,
			// variant: "destructive",
		});
	};

	const handleSaveProduct = (product) => {
		if (currentProduct) {
			// Update existing product
			setProducts(products.map((p) => (p.id === product.id ? product : p)));
		} else {
			// Add new product
			setProducts([...products, product]);
		}
	};

	const handleExportProducts = (tab: string) => {
		const dataToExport = filteredProducts(tab);

		if (dataToExport.length === 0) {
			toast('No products to export', {
				description: 'There are no products matching your current filters.',
				// variant: "destructive",
			});
			return;
		}

		const formattedData = dataToExport.map((product) => ({
			ID: product.id,
			Name: product.name,
			Category: product.category,
			Vendor: product.vendor,
			Price: `$${product.price.toFixed(2)}`,
			Stock: product.stock,
			Status: product.status,
		}));

		exportToCSV(
			formattedData,
			`products-${tab}-${new Date().toISOString().split('T')[0]}`
		);

		toast('Export Successful', {
			description: `${dataToExport.length} products have been exported to CSV.`,
		});
	};

	const renderProductsTable = (tabValue: string) => {
		const filtered = filteredProducts(tabValue);

		return (
			<>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b dark:border-gray-700">
								<th className="py-3 text-left">Product</th>
								<th className="py-3 text-left">Category</th>
								<th className="py-3 text-left">Vendor</th>
								<th className="py-3 text-right">Price</th>
								<th className="py-3 text-right">Stock</th>
								<th className="py-3 text-center">Status</th>
								<th className="py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filtered.length === 0 ? (
								<tr>
									<td
										colSpan={7}
										className="py-4 text-center text-gray-500 dark:text-gray-400"
									>
										No products found matching your criteria.
									</td>
								</tr>
							) : (
								filtered.map((product, index) => (
									<motion.tr
										key={product.id}
										className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.02 }}
									>
										<td className="flex items-center gap-2 py-3">
											<div className="bg-vsphere-light/50 dark:bg-vsphere-dark/20 rounded p-1.5">
												<Package className="text-vsphere-primary h-4 w-4" />
											</div>
											<span>{product.name}</span>
										</td>
										<td className="py-3">{product.category}</td>
										<td className="py-3">{product.vendor}</td>
										<td className="py-3 text-right">
											${product.price.toFixed(2)}
										</td>
										<td className="py-3 text-right">{product.stock}</td>
										<td className="py-3 text-center">
											<Badge
												className={` ${
													product.status === 'Active'
														? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
														: ''
												} ${
													product.status === 'Low stock'
														? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
														: ''
												} ${
													product.status === 'Out of stock'
														? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
														: ''
												} `}
											>
												{product.status}
											</Badge>
										</td>
										<td className="flex justify-end gap-2 py-3">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={() => handleEditProduct(product)}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-red-500"
												onClick={() => handleDeleteProduct(product.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</td>
									</motion.tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</>
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-6"
		>
			<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="text-2xl font-bold">Product Management</h1>
				<div className="flex flex-wrap gap-2">
					<Button
						variant="outline"
						className="flex items-center gap-2"
						onClick={() => handleExportProducts('all')}
					>
						<Download className="h-4 w-4" /> Export to CSV
					</Button>
					<Button
						className="bg-vsphere-primary hover:bg-vsphere-primary/90 text-white"
						onClick={handleAddProduct}
					>
						<Plus className="mr-2 h-4 w-4" /> Add New Product
					</Button>
				</div>
			</div>

			<Tabs defaultValue="all">
				<div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<TabsList className="grid w-full grid-cols-4 sm:w-auto sm:grid-cols-4">
						<TabsTrigger value="all">All Products</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="low">Low Stock</TabsTrigger>
						<TabsTrigger value="out">Out of Stock</TabsTrigger>
					</TabsList>
					<div className="relative w-full sm:w-auto">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<Input
							type="text"
							placeholder="Search products..."
							className="w-full rounded-md border py-2 pr-4 pl-10 sm:w-64"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<TabsContent value="all" className="mt-0">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center justify-between text-lg">
								<span>All Products ({filteredProducts('all').length})</span>
								<div className="flex gap-2">
									<Button variant="outline" size="sm">
										<Filter className="mr-2 h-3.5 w-3.5" /> Filter
									</Button>
									<Button variant="outline" size="sm">
										<ArrowUpDown className="mr-2 h-3.5 w-3.5" /> Sort
									</Button>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>{renderProductsTable('all')}</CardContent>
					</Card>
				</TabsContent>

				{['active', 'low', 'out'].map((tab) => (
					<TabsContent key={tab} value={tab}>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center justify-between text-lg">
									<span>
										{tab === 'active'
											? 'Active'
											: tab === 'low'
												? 'Low Stock'
												: 'Out of Stock'}
										Products ({filteredProducts(tab).length})
									</span>
									<Button
										variant="outline"
										size="sm"
										className="flex items-center gap-2"
										onClick={() => handleExportProducts(tab)}
									>
										<Download className="h-3.5 w-3.5" />
										Export
									</Button>
								</CardTitle>
							</CardHeader>
							<CardContent>{renderProductsTable(tab)}</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>

			{isModalOpen && (
				<ProductModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					product={currentProduct}
					onSave={handleSaveProduct}
				/>
			)}
		</motion.div>
	);
};

export default ProductManagement;
