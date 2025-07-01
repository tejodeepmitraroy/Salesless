import { customAxios } from '@/api/axios-custom';

export const getAllStoreService = async () => {
	const response = await customAxios(`/store`);
	return response.data.data;
};

export const getStoreByIdService = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios(`/store/${storeId}`);
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
