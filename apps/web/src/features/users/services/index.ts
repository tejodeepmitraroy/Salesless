import { getToken } from '@/config/auth';
import { customAxios } from '@/api/axios-custom';

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
