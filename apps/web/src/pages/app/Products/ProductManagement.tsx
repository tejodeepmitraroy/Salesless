import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Download, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Product, useProductStore } from '@/stores/product-store';
import { exportToCSV } from '@/utils/exportUtils';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router';
import { ProductImage } from '@/features/Products/schema';
import { ProductDataTable } from '@/features/Products/tables/ProductDataTable';
import { productColumns } from '@/features/Products/tables/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/features/Products/services';
import HeaderSection from '@/components/layouts/HeaderSection';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
	const [filter, setFilter] = useState('all');
	const [sort, setSort] = useState('');

	const products = useProductStore((state) => state.products);
	const setProducts = useProductStore((state) => state.setProducts);

	// Filter products based on search query and tab
	const filteredProducts = (tab: string) => {
		let filtered = products;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
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

	// const handleDeleteProduct = (productId: number) => {
	// 	const productToDelete = products.find((p) => p.id === productId);
	// 	if (!productToDelete) return;

	// 	toast('Product Deleted', {
	// 		description: `${productToDelete.title} has been successfully removed.`,
	// 		// variant: 'destructive',
	// 	});
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
		<section className="mx-auto w-full max-w-7xl">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Product Management"
				description="Manage your products"
			/>
			<section className="flex w-full flex-col">
				<section className="mb-4 flex flex-col items-start justify-end gap-4 sm:flex-row sm:items-center">
					<div className="relative flex w-fit items-center gap-2">
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
							<Plus className="mr-2 h-4 w-4" /> Add Product
						</Button>
					</div>
				</section>
				<section className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div className="relative flex w-full items-center gap-2">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<Input
							type="text"
							placeholder="Search products..."
							className="w-full rounded-md border py-2 pr-4 pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<Select
						onValueChange={(filter: string) => setFilter(filter)}
						defaultValue={filter}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filter" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Filter</SelectLabel>
								<SelectItem value="all">All Products</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(sort: string) => setSort(sort)}
						defaultValue={sort}
					>
						<SelectTrigger className="w-fit">
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</section>
				<ProductDataTable
					columns={productColumns}
					data={filteredProducts(filter)}
				/>
			</section>
		</section>
	);
};

export default ProductManagement;
