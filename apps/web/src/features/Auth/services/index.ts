import { customAxios } from '@/api/axios-custom';

const baseURL = import.meta.env.VITE_API_ENDPOINT_URL;

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

export const googleLoginService = () => {
	return `${baseURL}/auth/google`;
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
