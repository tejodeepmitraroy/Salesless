import { getToken } from '@/config/auth';
import { customAxios } from '@/api/axios-custom';

export const getAllStoreService = async () => {
	const token = getToken();

	const response = await customAxios(`/store`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response;
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
}): Promise<{ id: string }> => {
	const token = getToken();

	const response = await customAxios.post(
		`/store`,
		{
			name,
			description,
			type,
			country,
			address,
			phone,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return response.data.data;
};

export const getStoreDetails = async ({ storeId }: { storeId: string }) => {
	const token = getToken();
	const response = await customAxios.get(`/store/${storeId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response;
};
