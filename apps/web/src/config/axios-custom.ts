import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT_URL;

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

export const generateRefreshToken = async () => {
	try {
		await customAxios('/auth/refresh-token', {
			withCredentials: true,
		});
		console.log('Get new accesstoken');
	} catch (error) {
		console.error(error);
		// toast.error(error?.response?.data?.error.message);
	}
};
