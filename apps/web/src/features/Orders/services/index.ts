import { customAxios } from '@/api/axios-custom';
import { Order } from '@/stores/useOrderStore';

// export const createProductService = async (
// 	formData: z.infer<typeof productFormSchema>
// ) => {
// 	const response = await axios.post(`/products`, formData);
// 	return response;
// };

export const getAllOrdersService = async () => {
	const response = await customAxios.get(`/store/orders`);
	console.log('response', response);
	return response.data.data;
};

export const getOrderByIdService = async ({
	orderId,
}: {
	orderId: string;
}): Promise<Order> => {
	const response = await customAxios.get(`/store/orders/${orderId}`);
	return response.data.data;
};

export const deleteOrderByIdService = async ({
	orderId,
}: {
	orderId: string;
}): Promise<Order> => {
	const response = await customAxios.delete(`/store/orders/${orderId}`);
	return response.data.data;
};
