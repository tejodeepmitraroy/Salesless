import { customAxios } from '@/api/axios-custom';
import axios from 'axios';

export const getAllInventory = async ({ storeId }: { storeId: string }) => {
	const response = await customAxios.get(`/inventory/?storeId=${storeId}`);
	return response.data.data;
};

export const signUpService = async ({
	email,
	password,
	name,
	mobile,
	confirmPassword,
}: {
	email: string;
	password: string;
	name: string;
	mobile: string;
	confirmPassword: string;
}) => {
	const response = await axios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/auth/user/register`,
		{
			email,
			password,
			name,
			mobile,
			confirmPassword,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};

export const forgetPassword = async (email: string) => {
	const response = await axios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/auth/user/forget-password`,
		{
			email,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};
