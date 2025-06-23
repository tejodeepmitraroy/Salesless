import { getToken } from '@/config/auth';
import { customAxios } from '@/api/axios-custom';

export const getCustomersService = async ({ storeId }: { storeId: string }) => {
	const token = getToken();
	const response = await customAxios.get(`/store/${storeId}/customers`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export const getCustomerByIdService = async ({
	customerId,
	storeId,
}: {
	customerId: string;
	storeId: string;
}) => {
	const token = getToken();
	const response = await customAxios.get(
		`/store/${storeId}/customers/${customerId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};
