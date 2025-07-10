import { customAxios } from '@/api/axios-custom';

export const getCustomersService = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/store/${storeId}/customers`);
	return response;
};

export const getCustomerByIdService = async ({
	customerId,
	storeId,
}: {
	customerId: string;
	storeId: string;
}) => {
	const response = await customAxios.get(
		`/store/${storeId}/customers/${customerId}`
	);

	return response;
};
