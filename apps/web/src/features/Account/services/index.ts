import { customAxios } from '@/api/axios-custom';

export const getUserData = async (): Promise<{
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	phone: string;
	phoneVerified: boolean;
	googleId: null;
	avatar: string;
	gender: string;
	age: number;
	isActive: boolean;
	isBan: boolean;
	createdAt: string;
	updatedAt: string;
}> => {
	const response = await customAxios(`/user/profile`);
	return response.data.data;
};

export const deleteAccountData = async (): Promise<void> => {
	const response = await customAxios.delete(`/user/account`);
	return response.data.data;
};
