import { customAxios } from '@/api/axios-custom';

export const createProductService = async (formData: any) => {
	const response = await customAxios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/products`,
		formData
	);

	return response;
};

export const getAllProducts = async ({ storeId }: { storeId: string }) => {
	// const token = getToken();

	const response = await customAxios.get(`/products/?storeId=${storeId}`, {
		// headers: {
		// 	Authorization: `Bearer ${token}`,
		// 	'Content-Type': 'application/json',
		// },
	});
	return response;
};

export const getProductByIdService = async ({
	productId,
}: {
	productId: string;
}) => {
	// const token = getToken();

	const response = await customAxios.get(`/products/${productId}`, {
		// headers: {
		// 	Authorization: `Bearer ${token}`,
		// 	'Content-Type': 'application/json',
		// },
	});
	return response;
};

export const updateProductService = async ({
	productId,
	formData,
}: {
	productId: number;
	formData: any;
}) => {
	// const token = getToken();

	const response = await customAxios.put(`/products/${productId}`, formData, {
		// headers: {
		// 	Authorization: `Bearer ${token}`,
		// 	'Content-Type': 'application/json',
		// },
	});
	return response;
};
