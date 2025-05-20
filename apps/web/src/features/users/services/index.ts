import axios from 'axios';

export const loginService = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const response = await axios.post(
		`${import.meta.env.VITE_API_ENDPOINT_URL}/auth/user/login`,
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

export const getUserData = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_ENDPOINT_URL}/auth/user/get-user-data`,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
