import { getAllStoreService } from '@/features/Store/services';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Store {
	id: string;
	name: string;
	description: string;
	country: string;
	address1: string;
	address2: string;
	zip: string | null;
	city: string | null;
	phone: string;
	countryCode: string | null;
	timezone: string | null;
	moneyFormat: string | null;
	domain: string | null;
	createdAt: string;
	updatedAt: string;
}

interface StoreState {
	stores: Store[];
	selectedStore: Store | null;
	searchQuery: string;
	filterCategory: string;
	filterStatus: string;
}

interface StoreActions {
	fetchStores: () => Promise<void>;
	getAllStores: () => Store[];
	setSelectedStore: (storeId: string) => void;
	setStores: (stores: Store[]) => void;
	updateStore: (store: Store) => void;
	getStoresById: (storeId: string) => Store | null;
	deleteStore: (storeId: string) => void;
	setSearchQuery: (query: string) => void;
	setFilterCategory: (category: string) => void;
	setFilterStatus: (status: string) => void;
	getFilteredStores: () => Store[];
}

type StoreStore = StoreState & StoreActions;

const initialState: StoreState = {
	stores: [],
	selectedStore: null,
	searchQuery: '',
	filterCategory: 'all',
	filterStatus: 'all',
};

export const useStoreStore = create<StoreStore>()(
	devtools((set, get) => ({
		...initialState,
		fetchStores: async () => {
			try {
				const data = await getAllStoreService();
				console.log('fetch strore from StoreStore', data);
				set({ stores: data! });
			} catch (error) {
				console.error(error);
			}
		},
		setStores: (stores: Store[]) => set({ stores }),
		getAllStores: () => get().stores,
		setSelectedStore: (storeId: string) =>
			set({
				selectedStore:
					get().stores.find((store) => store.id === storeId) || null,
			}),
	}))
);
