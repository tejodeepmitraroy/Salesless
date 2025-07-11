import { create } from 'zustand';
import { ProductVariant } from '@/features/Products/schema';
import { devtools } from 'zustand/middleware';

export interface ProductMedia {
	id: number;
	storeId: number;
	fileName: string;
	url: string;
	key: string;
	size: number | null;
	createdAt: string;
	lastModified: string;
}
export type Product = {
	id: number;
	storeId: number;
	title: string;
	description?: string;
	price: number;
	comparedAtPrice: number;
	status: string;
	media: Array<ProductMedia>;
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
