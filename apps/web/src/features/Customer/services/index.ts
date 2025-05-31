import { getToken } from '@/config/auth';
import { customAxios } from '@/config/axios-custom';
// import { getStoreDetails } from '@/features/Store/services';

export const getCustomersService = async ({ storeId }: { storeId: string }) => {
	const token = getToken();
	// const storeId = (await getStoreDetails()).data?.id;
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
