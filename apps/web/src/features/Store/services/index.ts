import { customAxios } from '@/api/axios-custom';

interface StoreServiceProps {
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
	isTestMode: boolean;
	plan: 'free';
	createdAt: string;
	updatedAt: string;
}

export const getAllStoreService = async (): Promise<
	Array<{
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
		isTestMode: boolean;
		plan: 'free';
		createdAt: string;
		updatedAt: string;
	}>
> => {
	const response = await customAxios(`/store`);
	return response.data.data;
};

export const getStoreByIdService = async (): Promise<StoreServiceProps> => {
	const response = await customAxios(`/store/details`);
	return response.data.data;
};

export const getStoreDetails = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/store/${storeId}`);
	return response.data.data;
};

export const createStoreService = async ({
	name,
	description,
	type,
	country,
	address,
	phone,
}: {
	name: string;
	description?: string;
	type?: string;
	country: string;
	address: string;
	phone: string;
}) => {
	const response = await customAxios.post(`/store`, {
		name,
		description,
		type,
		country,
		address,
		phone,
	});
	return response.data.data;
};

export const updateStoreTestMode = async ({
	isTestMode,
}: {
	isTestMode: boolean;
}) => {
	const response = await customAxios.patch(`/store/testMode`, {
		isTestMode,
	});
	return response.data.data;
};
