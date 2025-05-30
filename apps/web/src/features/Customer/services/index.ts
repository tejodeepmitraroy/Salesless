import { getToken } from '@/config/auth';
import { customAxios } from '@/config/axios-custom';

export const loginService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const response = await customAxios.post(
		`/auth/user/login`,
		{
			email,
			password,
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
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
	const response = await customAxios.post(
		`/auth/user/register`,
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
	const response = await customAxios.post(
		`/auth/user/forget-password`,
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

export const getUserData = async () => {
	const token = getToken();
	const response = await customAxios(`/user/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export const logoutService = async () => {
	const response = await customAxios.post(
		`/auth/user/logout`,
		{},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};
