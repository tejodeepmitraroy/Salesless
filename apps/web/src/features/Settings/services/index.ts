import { customAxios } from '@/api/axios-custom';

interface PaymentGatewayDetails {
	id: string;
	storeId: string;
	gateway: 'stripe' | 'razorpay' | 'phonepe' | 'paytm';
	apiKey: string;
	apiSecret: string;
	apiUrl: string;
	isDefault: boolean;
	isTestMode: boolean;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

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
	PaymentGatewayDetails[]
> => {
	const response = await customAxios.get(`/payment/gateways`);
	return response.data.data;
};

export const fetchPaymentGatewayDetailsService = async (
	gateway?: 'stripe' | 'razorpay' | 'phonepe' | 'paytm'
): Promise<PaymentGatewayDetails> => {
	const response = await customAxios.get(`/payment/gateways/${gateway}`);
	return response.data.data;
};

export const addPaymentGatewayService = async ({
	gateway,
	apiKey,
	apiSecret,
	apiUrl,
	isTestMode,
	active,
}: {
	gateway: 'stripe' | 'razorpay' | 'phonepe' | 'paytm';
	apiKey: string;
	apiSecret: string;
	apiUrl?: string;
	isTestMode: boolean;
	active: boolean;
}): Promise<PaymentGatewayDetails> => {
	const response = await customAxios.post(`/payment/gateways/setup`, {
		gateway,
		apiKey,
		apiSecret,
		apiUrl,
		isTestMode,
		active,
	});
	return response.data.data;
};

export const updatePaymentGatewayService = async ({
	id,
	gateway,
	apiKey,
	apiSecret,
	apiUrl,
	isTestMode,
	active,
}: {
	id?: string;
	gateway: 'stripe' | 'razorpay' | 'phonepe' | 'paytm';
	apiKey: string;
	apiSecret: string;
	apiUrl?: string;
	isTestMode: boolean;
	active: boolean;
}): Promise<PaymentGatewayDetails> => {
	const response = await customAxios.put(`/payment/gateways`, {
		id,
		gateway,
		apiKey,
		apiSecret,
		apiUrl,
		isTestMode,
		active,
	});
	return response.data.data;
};

export const setIsDefaultGatewayService = async ({ id }: { id: string }) => {
	const response = await customAxios.patch(`/payment/gateways`, {
		id,
	});
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

export const deleteStoreService = async ({ storeId }: { storeId: number }) => {
	const response = await customAxios.delete(`/stores/${storeId}`);
	return response.data;
};
