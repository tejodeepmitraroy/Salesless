import { generateRefreshToken } from '@/utils/apis/auth-apis';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

export const customAxios = axios.create({
	baseURL: baseURL,
});

customAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		console.log('Error betwwen Api response=====>>>>>', error);
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await generateRefreshToken();
				return customAxios(originalRequest);
			} catch (refreshError) {
				console.log('Token refresh failed:', refreshError);
			}
		}
		return Promise.reject(error);
	}
);
