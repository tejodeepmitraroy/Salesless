import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface subscription {
	type: 'trial' | 'basic' | 'grow' | 'scale';
}
export interface StoreConfigState {
	storeId: string | null;
	storeName: string;
	storeDescription: string;
	isTestMode: boolean;
	publishableKey: string | null;
	secretKey: string | null;
	region: string | null;
	timezone: string | null;
	currency: CurrencyCode | null;
	isSubscripted: boolean;
	subscription: subscription | null;
	settings: {
		timezone: string;
		currency_format: string;
	};
}

export interface StoreConfigActions {
	setStoreId: (id: string | null) => void;
	setStoreData: (
		name: string,
		description: string,
		isTestMode: boolean,
		isSubscripted: boolean,
		tier: 'trial' | 'basic' | 'grow' | 'scale'
	) => void;
	setIsTestMode: (isTest: boolean) => void;
	setPublishableKey: (key: string | null) => void;
	setSecretKey: (key: string | null) => void;
	setRegion: (region: string | null) => void;
	setTimezone: (tz: string | null) => void;
	setCurrency: (currency: CurrencyCode | null) => void;
	reset: () => void;
}

type StoreConfigStore = StoreConfigState & StoreConfigActions;

const initialState: StoreConfigState = {
	storeId: '',
	storeName: 'Tejodeep',
	storeDescription: 'Tejodeep 2131231231231231313',
	isTestMode: true,
	publishableKey: null,
	secretKey: null,
	isSubscripted: false,
	subscription: {
		type: 'trial',
	},
	region: null,
	timezone: null,
	currency: null,
	settings: {
		timezone: '',
		currency_format: '',
	},
};

export const useStoreConfig = create<StoreConfigStore>()(
	devtools(
		// persist(
		(set) => ({
			...initialState,
			setStoreId: (id) => set({ storeId: id }),
			setStoreData: (name, description, isTestMode, isSubscripted, tier) =>
				set({
					storeName: name,
					storeDescription: description,
					isTestMode,
					isSubscripted,
					subscription: {
						type: tier,
					},
				}),
			setIsTestMode: (isTest) => set({ isTestMode: isTest }),
			setPublishableKey: (key) => set({ publishableKey: key }),
			setSecretKey: (key) => set({ secretKey: key }),
			setRegion: (region) => set({ region }),
			setTimezone: (tz) => set({ timezone: tz }),
			setCurrency: (currency) => set({ currency }),
			reset: () => set({ ...initialState }),
		})
		// 	{
		// 		name: 'config',
		// 		storage: createJSONStorage(() => localStorage),
		// 	}
		// )
	)
);
