import { customAxios } from '@/api/axios-custom';
import { Order } from '@/stores/useOrderStore';

interface OrderServiceProps {
	id: string;
	storeId: string;
	customerId: string;
	name: string;
	shippingAddressPhone: string;
	shippingAddressCompany: string;
	shippingAddressName: string;
	shippingAddressAddress1: string;
	shippingAddressAddress2: string;
	shippingAddressCity: string;
	shippingAddressProvince: string;
	shippingAddressCountry: string;
	shippingAddressZip: string;
	billingAddressPhone: string;
	billingAddressCompany: string;
	billingAddressName: string;
	billingAddressAddress1: string;
	billingAddressAddress2: string;
	billingAddressCity: string;
	billingAddressProvince: string;
	billingAddressCountry: string;
	billingAddressZip: string;
	tags: string;
	note: string;
	status: 'pending';
	currency: string;
	totalPrice: string;
	subtotalPrice: string;
	paymentMethod: string;
	additionalPrice: string;
	totalDiscounts: string;
	totalLineItemsPrice: string;
	totalTax: string;
	totalTaxRecovered: string;
	totalWeight: string;
	currentTotalDiscounts: string;
	currentTotalPrice: string;
	currentSubtotalPrice: string;
	currentTotalTax: string;
	cancelledAt: string;
	processedAt: string;
	shippedAt: string;
	createdAt: string;
	updatedAt: string;
}

interface OrderDetailsData {
	id: string;
	name: string;
	status: string;
	items: Array<{
		id: string;
		productId: string;
		name: string;
		quantity: number;
		price: number;
		currency: string;
	}>;
	shippingAddress: {
		name: string;
		phone: string;
		address1: string;
		address2: string;
		city: string;
		province: string;
		country: string;
		zip: string;
	};
	billingAddress: {
		name: string;
		phone: string;
		address1: string;
		address2: string;
		city: string;
		province: string;
		country: string;
		zip: string;
	};
	customerDetails: {
		name: string;
		contactEmail: string;
		contactPhone: string;
	};
}

export const getAllOrdersService = async (): Promise<OrderServiceProps[]> => {
	const response = await customAxios.get(`/store/orders`);

	return response.data.data;
};

export const getOrderByIdService = async ({
	orderId,
}: {
	orderId: string;
}): Promise<OrderDetailsData> => {
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
