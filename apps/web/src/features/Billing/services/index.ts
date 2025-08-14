import { customAxios } from '@/api/axios-custom';

export const checkoutSubscription = async (tierName: string) => {
	const response = await customAxios.post(`/subscription/checkout`, {
		tierName,
	});
	return response.data.data;
};
