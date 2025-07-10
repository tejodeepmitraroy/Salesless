import { customAxios } from '@/api/axios-custom';

export const getUserData = async () => {
	const response = await customAxios(`/user/profile`);
	return response;
};
