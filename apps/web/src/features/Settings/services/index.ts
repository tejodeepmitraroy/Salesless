import { customAxios } from '@/api/axios-custom';

export const getGeneralSettingsService = async () => {
	const response = await customAxios.get(`/settings/general`);
	return response.data.data;
};

export const updateGeneralSettingsService = async ({
	name,
	domain,
	description,
}: {
	name: string;
	domain: string;
	description?: string;
}) => {
	const response = await customAxios.patch(`/settings/general`, {
		name,
		domain,
		description,
	});
	return response.data.data;
};

export const getStoreAddressService = async () => {
	const response = await customAxios.get(`/settings/general/address`);
	return response.data.data;
};

export const updateStoreAddressService = async ({
	address1,
	address2,
	city,
	zip,
	phone,
	country,
	countryCode,
	state,
}: {
	address1?: string;
	address2?: string;
	city?: string;
	zip?: string;
	phone?: string;
	country?: string;
	countryCode?: string;
	state?: string;
}) => {
	const response = await customAxios.patch(`/settings/general/address`, {
		address1,
		address2,
		city,
		zip,
		phone,
		country,
		countryCode,
		state,
	});
	return response.data.data;
};

//Api keys Section

export const fetchApiKeysService = async () => {
	const response = await customAxios.get(`/settings/api-keys`);
	return response.data.data;
};

export const createApiKeyService = async () => {
	const response = await customAxios.post(`/settings/api-keys`);
	return response.data.data;
};

export const updateApiKeyService = async () => {
	const response = await customAxios.patch(`/settings/api-keys`);
	return response.data.data;
};

//////

// Payment Gateway Section

export const getPaymentGatewayService = async (): Promise<
	{
		id: string;
		storeId: string;
		gateway: string;
		apiKey: string;
		apiSecret: string;
		mode: string;
		active: true;
		createdAt: string;
		updatedAt: string;
	}[]
> => {
	const response = await customAxios.get(`/payment/gateways`);
	return response.data.data;
};

export const fetchPaymentGatewayDetailsService = async (
	gateway?: 'stripe' | 'razorpay' | 'phonepe' | 'paytm'
): Promise<{
	id: string;
	storeId: string;
	gateway: string;
	apiKey: string;
	apiSecret: string;
	mode: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	apiUrl: string;
}> => {
	const response = await customAxios.get(`/payment/gateways/${gateway}`);
	return response.data.data;
};

export const createPaymentGatewayService = async (formData: {
	gateway: 'razorpay' | 'stripe';
	apiKey: string;
	apiSecret: string;
	active: boolean;
}) => {
	const response = await customAxios.post(`/payment/gateways/setup`, formData);
	return response.data.data;
};

export const updatePaymentGatewayService = async (
	gatewayId: string,
	formData: any
) => {
	const response = await customAxios.patch(
		`/payment/gateways/${gatewayId}`,
		formData
	);
	return response.data.data;
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
	const response = await customAxios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/categories`,
		formData
	);
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

export const deleteStoreService = async ({ storeId }: { storeId: number }) => {
	const response = await customAxios.delete(`/stores/${storeId}`);
	return response.data;
};
