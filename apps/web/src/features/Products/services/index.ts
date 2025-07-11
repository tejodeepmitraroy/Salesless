import { customAxios } from '@/api/axios-custom';

export const createProductService = async (formData: any) => {
	const response = await customAxios.post(`/products`, formData);
	return response;
};

export const getAllProducts = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/products/?storeId=${storeId}`);
	return response.data.data;
};

export const getProductByIdService = async ({
	productId,
}: {
	productId: string;
}) => {
	const response = await customAxios.get(`/products/${productId}`);
	return response.data.data;
};

export const updateProductService = async ({
	productId,
	formData,
}: {
	productId: number;
	formData: any;
}) => {
	const response = await customAxios.put(`/products/${productId}`, formData);
	return response.data.data;
};

export const deleteProductService = async ({
	productId,
}: {
	productId: number;
}) => {
	const response = await customAxios.delete(`/products/${productId}`);
	return response.data.data;
};

///Categories
export const createCategoryService = async (formData: any) => {
	const response = await customAxios.post(`/categories`, formData);
	return response.data.data;
};

export const getAllCategoriesService = async (): Promise<
	{
		id: number;
		name: string;
		slug: string;
		description: string;
		parentId: number | null;
		createdAt: string;
		updatedAt: string;
	}[]
> => {
	const response = await customAxios.get(`/category`);
	return response.data.data;
};
