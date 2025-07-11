import { customAxios } from '@/api/axios-custom';
import axios from 'axios';
import { productFormSchema } from '../schema';
import { z } from 'zod';
import { Order } from '@/stores/useOrderStore';

export const createProductService = async (
	formData: z.infer<typeof productFormSchema>
) => {
	const response = await axios.post(`/products`, formData);
	return response;
};

export const getAllProducts = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/products/?storeId=${storeId}`);
	return response;
};

export const getOrderByIdService = async ({
	orderId,
}: {
	orderId: string;
}): Promise<Order> => {
	const response = await customAxios.get(`/orders/${orderId}`);
	return response.data.data;
};
