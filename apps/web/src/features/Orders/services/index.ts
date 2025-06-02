import { getToken } from '@/config/auth';
import { customAxios } from '@/api/axios-custom';
import axios from 'axios';
import { productFormSchema } from '../schema';
import { z } from 'zod';

export const createProductService = async (
	formData: z.infer<typeof productFormSchema>
) => {
	const token = getToken();
	const response = await axios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/products`,
		formData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};

export const getAllProducts = async ({ storeId }: { storeId: string }) => {
	const token = getToken();

	const response = await customAxios.get(`/products/?storeId=${storeId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export const getProductById = async ({ productId }: { productId: string }) => {
	const token = getToken();

	const response = await customAxios.get(`/products/${productId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response;
};
