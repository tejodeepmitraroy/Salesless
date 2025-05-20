import { create } from "zustand";

export type Product = {
  id: number;
  name: string;
  category: string;
  vendor: string;
  price: number;
  stock: number;
  status: string;
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
  deleteProduct: (productId: number) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterStatus: (status: string) => void;
  getFilteredProducts: () => Product[];
}

type ProductStore = ProductState & ProductActions;

const initialState: ProductState = {
  products: [
    {
      id: 1,
      name: "Artisan Coffee Mug",
      category: "Home",
      vendor: "Artisan Crafts",
      price: 24.99,
      stock: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      vendor: "Tech Universe",
      price: 79.99,
      stock: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Leather Wallet",
      category: "Fashion",
      vendor: "Fashion Forward",
      price: 49.99,
      stock: 28,
      status: "Active",
    },
    {
      id: 4,
      name: "Scented Candle Set",
      category: "Home",
      vendor: "Home Elegance",
      price: 34.99,
      stock: 0,
      status: "Out of stock",
    },
    {
      id: 5,
      name: "Facial Serum",
      category: "Beauty",
      vendor: "Beauty Essentials",
      price: 29.99,
      stock: 5,
      status: "Low stock",
    },
  ],
  selectedProduct: null,
  searchQuery: "",
  filterCategory: "all",
  filterStatus: "all",
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  addProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  setProducts: (products: Product[]) =>
    set((state) => ({
      products:  products,
    })),

  updateProduct: (product: Product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
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
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.vendor.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (state.filterCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === state.filterCategory
      );
    }

    // Apply status filter
    if (state.filterStatus !== "all") {
      filtered = filtered.filter(
        (product) => product.status === state.filterStatus
      );
    }

    return filtered;
  },
}));
