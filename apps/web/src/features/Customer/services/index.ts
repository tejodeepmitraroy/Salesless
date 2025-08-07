import { customAxios } from '@/api/axios-custom';

export const getCustomersService = async () => {
	const response = await customAxios.get(`/store/customers`);
	return response;
};

export const getCustomerByIdService = async ({
	customerId,
}: {
	customerId: string;
}) => {
	const response = await customAxios.get(`/store/customers/${customerId}`);

	return response;
};

export const createCustomerService = async (data: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) => {
	const response = await customAxios.post(`/store/customers`, data);
	return response;
};
