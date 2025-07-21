import { customAxios } from '@/api/axios-custom';
import { Order } from '@/stores/useOrderStore';

// export const createProductService = async (
// 	formData: z.infer<typeof productFormSchema>
// ) => {
// 	const response = await axios.post(`/products`, formData);
// 	return response;
// };

export const getAllOrdersService = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/store/${storeId}/orders`);
	return response.data.data;
};

export const getOrderByIdService = async ({
	orderId,
	storeId,
}: {
	orderId: string;
	storeId: string;
}): Promise<Order> => {
	const response = await customAxios.get(`/store/${storeId}/orders/${orderId}`);
	return response.data.data;
};

export const deleteOrderByIdService = async ({
	orderId,
	storeId,
}: {
	orderId: string;
	storeId: string;
}): Promise<Order> => {
	const response = await customAxios.delete(`/store/${storeId}/orders/${orderId}`);
	return response.data.data;
};
