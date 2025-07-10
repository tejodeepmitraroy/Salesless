import { customAxios } from '@/api/axios-custom';
export const getAllInventory = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/inventory/?storeId=${storeId}`);
	return response.data.data;
};
