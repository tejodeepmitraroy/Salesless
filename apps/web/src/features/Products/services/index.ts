import { customAxios } from '@/api/axios-custom';

interface ProductData {
	id: string;
	storeId: string;
	categoryId: string;
	title: string;
	description: string;
	status: string;
	isVariantEnabled: false;
	seoTitle: string;
	seoDescription: string;
	seoKeywords: string;
	seoScore: null;
	createdAt: string;
	updatedAt: string;
	media: [
		{
			index: number;
			mediaId: string;
			id: string;
			storeId: string;
			fileName: string;
			url: string;
			key: string;
			size: null;
			createdAt: string;
			lastModified: string;
		},
	];
	variant: {
		id: string;
		productId: string;
		sku: null;
		barcode: null;
		price: number;
		comparedAtPrice: number;
		costPerItem: number;
		manageInventory: boolean;
		inventoryQuantity: number;
		lowStockThreshold: number;
		requiresShipping: boolean;
		inventoryPolicy: 'Deny';
		weight: number;
		weightUnit: 'kg' | 'g' | 'oz' | 'lb';
		option1: string | null;
		option2: string | null;
		option3: string | null;
		option4: string | null;
		fulfillmentService: 'manual';
		isActive: boolean;
		position: number | null;
		createdAt: string;
		updatedAt: string;
	};
}

export const createProductService = async (formData: any) => {
	const response = await customAxios.post(`/products`, formData);
	return response;
};

export const getAllProducts = async () => {
	const response = await customAxios.get(`/products`);
	return response.data.data;
};

export const getProductByIdService = async ({
	productId,
}: {
	productId: string;
}): Promise<ProductData> => {
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
