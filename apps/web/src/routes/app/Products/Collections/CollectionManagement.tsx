import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Tags } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProductStore } from '@/stores/product-store';
import { useNavigate, useParams } from 'react-router';
import { ProductDataTable } from '@/features/Products/tables/ProductDataTable';
import { productColumns } from '@/features/Products/tables/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/features/Products/services';
import HeaderSection from '@/components/layouts/HeaderSection';

// export const getFeaturedImage = (product: Product) => {
// 	if (!product.images || product.images.length === 0) return undefined;

// 	// Find featured image or use the first one
// 	const featuredImage =
// 		product.images.find((img: ProductImage) => img.isFeatured) ||
// 		product.images[0];
// 	return featuredImage.url;
// };

const CollectionManagement = () => {
	const navigate = useNavigate();
	const { storeId } = useParams<{ storeId: string }>();
	const [searchQuery, setSearchQuery] = useState('');
	// const [filter, setFilter] = useState('all');
	// const [sort, setSort] = useState('');

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

	// const handleExportProducts = (tab: string) => {
	// 	const dataToExport = filteredProducts(tab);

	// 	if (dataToExport.length === 0) {
	// 		toast('No products to export', {
	// 			description: 'There are no products matching your current filters.',
	// 			// variant: 'destructive',
	// 		});
	// 		return;
	// 	}

	// 	const formattedData = dataToExport.map((product) => ({
	// 		ID: product.id,
	// 		Name: product.title,
	// 		Category: product.categoryId,
	// 		Price: `$${product.price.toFixed(2)}`,
	// 		Stock: product.stockQuantity,
	// 		Status: product.status,
	// 		Images: product.media?.length || 0,
	// 	}));

	// 	exportToCSV(
	// 		formattedData,
	// 		`products-${tab}-${new Date().toISOString().split('T')[0]}`
	// 	);

	// 	toast('Export Successful', {
	// 		description: `${dataToExport.length} products have been exported to CSV.`,
	// 	});
	// };

	const { data: productsData } = useQuery({
		queryKey: ['products'],
		queryFn: () => getAllProducts(),
	});

	useEffect(() => {
		if (productsData) {
			console.log(productsData);
			setProducts(productsData);
		}
	}, [productsData, setProducts]);

	return (
		<section className="mx-auto w-full">
			<HeaderSection
				icon={<Tags />}
				title="Collections"
				description="Manage your collections"
			/>
			<section className="flex w-full flex-col">
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
					<Button
						className="bg-primary hover:bg-primary/90 text-white"
						onClick={() => handleAddProduct()}
					>
						<Plus className="mr-2 h-4 w-4" /> Add Collection
					</Button>
				</section>
				<ProductDataTable
					columns={productColumns}
					data={filteredProducts('all')}
				/>
			</section>
		</section>
	);
};

export default CollectionManagement;
