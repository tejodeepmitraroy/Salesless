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

interface InventoryState {
	products: Product[];
	searchQuery: string;
	filterCategory: string;
	filterStatus: string;
}

interface InventoryActions {
	addProduct: (product: Product) => void;
	setProducts: (products: Product[]) => void;
	updateProduct: (product: Product) => void;
	getProductsById: (productId: number) => Product | null;
	deleteProduct: (productId: number) => void;
	setSearchQuery: (query: string) => void;
	setFilterCategory: (category: string) => void;
	setFilterStatus: (status: string) => void;
	getFilteredProducts: () => Product[];
}

type InventoryStore = InventoryState & InventoryActions;

export const useInventoryStore = create<InventoryStore>()(
	devtools((set, get) => ({
		products: [],
		searchQuery: '',
		filterCategory: 'all',
		filterStatus: 'all',

		addProduct: (product: Product) =>
			set((state) => ({
				products: [...state.products, product],
			})),

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

		getProductsById: (productId: number) => {
			const product = get().products.find((p) => p.id === productId);
			return product || null;
		},

		deleteProduct: (productId: number) =>
			set((state) => ({
				products: state.products.filter((p) => p.id !== productId),
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
			const { products, searchQuery, filterCategory, filterStatus } = get();
			return products.filter((product) => {
				const matchesSearch = product.title
					.toLowerCase()
					.includes(searchQuery.toLowerCase());
				const matchesCategory =
					filterCategory === 'all' || product.categoryId === filterCategory;
				const matchesStatus =
					filterStatus === 'all' || product.status === filterStatus;

				return matchesSearch && matchesCategory && matchesStatus;
			});
		},
	}))
);
