import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, ArrowUpDown, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Product, useProductStore } from '@/stores/product-store';
import { exportToCSV } from '@/utils/exportUtils';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router';
import { ProductImage } from '@/features/Products/schema';
import { DataTable } from '@/features/Products/tables/data-table';
import { productColumns } from '@/features/Products/tables/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/features/Products/services';

export const getFeaturedImage = (product: Product) => {
	if (!product.images || product.images.length === 0) return undefined;

	// Find featured image or use the first one
	const featuredImage =
		product.images.find((img: ProductImage) => img.isFeatured) ||
		product.images[0];
	return featuredImage.url;
};
const ProductManagement = () => {
	const navigate = useNavigate();
	const { storeId } = useParams<{ storeId: string }>();
	const [searchQuery, setSearchQuery] = useState('');

	const products = useProductStore((state) => state.products);
	const setProducts = useProductStore((state) => state.setProducts);

	// Filter products based on search query and tab
	const filteredProducts = (tab: string) => {
		let filtered = products;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(product) =>
					product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.categoryId.toLowerCase().includes(searchQuery.toLowerCase())
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
		navigate(`/store/${storeId}/products/create`);
	};

	// const handleEditProduct = (product: Product) => {
	// 	setCurrentProduct(product);
	// 	setIsModalOpen(true);
	// };

	// const handleDeleteProduct = (productId: number) => {
	// 	const productToDelete = products.find((p) => p.id === productId);
	// 	if (!productToDelete) return;

	// 	setProducts(products.filter((p) => p.id !== productId));

	// 	toast('Product Deleted', {
	// 		description: `${productToDelete.title} has been successfully removed.`,
	// 		// variant: 'destructive',
	// 	});
	// };

	// const handleSaveProduct = (product: Product) => {
	// 	if (currentProduct) {
	// 		// Update existing product
	// 		setProducts(products.map((p) => (p.id === product.id ? product : p)));
	// 	} else {
	// 		// Add new product
	// 		setProducts([...products, product]);
	// 	}
	// };

	const handleExportProducts = (tab: string) => {
		const dataToExport = filteredProducts(tab);

		if (dataToExport.length === 0) {
			toast('No products to export', {
				description: 'There are no products matching your current filters.',
				// variant: 'destructive',
			});
			return;
		}

		const formattedData = dataToExport.map((product) => ({
			ID: product.id,
			Name: product.title,
			Category: product.categoryId,

			Price: `$${product.price.toFixed(2)}`,
			Stock: product.stockQuantity,
			Status: product.status,
			Images: product.images?.length || 0,
		}));

		exportToCSV(
			formattedData,
			`products-${tab}-${new Date().toISOString().split('T')[0]}`
		);

		toast('Export Successful', {
			description: `${dataToExport.length} products have been exported to CSV.`,
		});
	};

	const { data: productsData } = useQuery({
		queryKey: ['products'],
		queryFn: () => getAllProducts({ storeId: storeId! }),
	});

	useEffect(() => {
		if (productsData?.data.data) {
			console.log(productsData?.data.data);
			setProducts(productsData?.data.data);
		}
	}, [productsData, setProducts]);

	return (
		<div className="space-y-3">
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
						className="bg-primary hover:bg-primary/90 text-white"
						onClick={() => handleAddProduct()}
					>
						<Plus className="mr-2 h-4 w-4" /> Add New Product
					</Button>
				</div>
			</div>

			<Tabs defaultValue="all">
				<div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-3">
						<TabsTrigger value="all">All Products</TabsTrigger>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="draft">Draft</TabsTrigger>
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
								<span>All Products ({products.length})</span>
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
						<CardContent>
							{
								<DataTable
									columns={productColumns}
									data={filteredProducts('all')}
								/>
							}
						</CardContent>
					</Card>
				</TabsContent>

				{['active', 'draft'].map((tab) => (
					<TabsContent key={tab} value={tab}>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center justify-between text-lg">
									<span>
										{tab === 'active'
											? 'Active'
											: tab === 'draft'
												? 'Draft'
												: 'All Products'}
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
							{/* <CardContent>{renderProductsTable(tab)}</CardContent> */}
							<CardContent>
								<DataTable
									columns={productColumns}
									data={filteredProducts(tab)}
								/>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>

			{/* {isModalOpen && (
				<ProductModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					product={currentProduct}
					onSave={handleSaveProduct}
				/>
			)} */}
		</div>
	);
};

export default ProductManagement;
