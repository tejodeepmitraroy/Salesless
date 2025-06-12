import { getToken } from '@/config/auth';
import { customAxios } from '@/api/axios-custom';

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
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
}: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;

	confirmPassword: string;
}) => {
	const response = await customAxios.post(
		`/user/register`,
		{
			email,
			firstName,
			lastName,
			password,
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
