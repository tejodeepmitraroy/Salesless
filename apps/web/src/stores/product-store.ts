import { create } from 'zustand';
import { ProductImage, ProductVariant } from '@/features/Products/schema';
import { devtools } from 'zustand/middleware';

export type Product = {
	id: number;
	storeId: number;
	title: string;
	description?: string;
	price: number;
	comparedAtPrice: number;
	status: string;
	images?: ProductImage[];
	categoryId: string;
	stockQuantity: number;
	variants?: ProductVariant[];
	seoTitle?: string;
	seoDescription?: string;
	seoKeywords?: string;
	seoScore?: number;
};

interface ProductState {
	products: Product[];
	selectedProduct: Product | null;
	searchQuery: string;
	filterCategory: string;
	filterStatus: string;
}

interface ProductActions {
	addProduct: (product: Product) => void;
	setProducts: (products: Product[]) => void;
	updateProduct: (product: Product) => void;
	getProductsById: (productId: number) => Product | null;
	deleteProduct: (productId: number) => void;
	setSelectedProduct: (product: Product | null) => void;
	setSearchQuery: (query: string) => void;
	setFilterCategory: (category: string) => void;
	setFilterStatus: (status: string) => void;
	getFilteredProducts: () => Product[];
}

type ProductStore = ProductState & ProductActions;

const initialState: ProductState = {
	// products: [
	// 	{
	// 		id: 1,
	// 		storeId: 1,
	// 		title: 'Artisan Coffee Mug',
	// 		categoryId: 'Home',
	// 		price: 24.99,
	// 		stock_quantity: 45,
	// 		status: 'Active',
	// 		images: [
	// 			{
	// 				id: 'img1',
	// 				url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
	// 				name: 'Coffee Mug',
	// 				isFeatured: true,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 2,
	// 		storeId: 1,
	// 		title: 'Wireless Earbuds Pro',
	// 		categoryId: 'Electronics',
	// 		price: 79.99,
	// 		stock_quantity: 12,
	// 		status: 'Active',
	// 	},
	// 	{
	// 		id: 3,
	// 		storeId: 1,
	// 		title: 'Leather Wallet',
	// 		categoryId: 'Fashion',
	// 		price: 49.99,
	// 		stock_quantity: 28,
	// 		status: 'Active',
	// 	},
	// 	{
	// 		id: 4,
	// 		storeId: 1,
	// 		title: 'Scented Candle Set',
	// 		categoryId: 'Home',
	// 		price: 34.99,
	// 		stock_quantity: 0,
	// 		status: 'Out of stock',
	// 	},
	// 	{
	// 		id: 5,
	// 		storeId: 1,
	// 		title: 'Facial Serum',
	// 		categoryId: 'Beauty',
	// 		price: 29.99,
	// 		stock_quantity: 5,
	// 		status: 'Low stock',
	// 	},
	// ],
	products: [],
	selectedProduct: null,
	searchQuery: '',
	filterCategory: 'all',
	filterStatus: 'all',
};

export const useProductStore = create<ProductStore>()(
	devtools((set, get) => ({
		...initialState,

		addProduct: (product: Product) =>
			set((state) => ({
				products: [...state.products, product],
			})),
		getProductsById: (productId: number) => {
			const product = get().products.find((p) => p.id === productId);
			return product;
		},
		setProducts: (products: Product[]) =>
			set(() => ({
				products: products,
			})),

		updateProduct: (product: Product) =>
			set((state) => ({
				products: state.products.map((p) =>
					p.id === product.id ? product : p
				),
			})),

		deleteProduct: (productId: number) =>
			set((state) => ({
				products: state.products.filter((p) => p.id !== productId),
			})),

		setSelectedProduct: (product: Product | null) =>
			set(() => ({
				selectedProduct: product,
			})),

		setSearchQuery: (query: string) =>
			set(() => ({
				searchQuery: query,
			})),

		setFilterCategory: (category: string) =>
			set(() => ({
				filterCategory: category,
			})),

		setFilterStatus: (status: string) =>
			set(() => ({
				filterStatus: status,
			})),

		getFilteredProducts: () => {
			const state = get();
			let filtered = state.products;

			// Apply search filter
			if (state.searchQuery) {
				const query = state.searchQuery.toLowerCase();
				filtered = filtered.filter(
					(product) =>
						product.title.toLowerCase().includes(query) ||
						product.categoryId.toLowerCase().includes(query)
				);
			}

			// Apply category filter
			if (state.filterCategory !== 'all') {
				filtered = filtered.filter(
					(product) => product.categoryId === state.filterCategory
				);
			}

			// Apply status filter
			if (state.filterStatus !== 'all') {
				filtered = filtered.filter(
					(product) => product.status === state.filterStatus
				);
			}

			return filtered;
		},
	}))
);
