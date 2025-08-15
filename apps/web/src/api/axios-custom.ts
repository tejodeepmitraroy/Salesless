import axios from 'axios';

const baseURL = import.meta.env.VITE_API_ENDPOINT_URL;

let currentStoreId: string | null = null;

export const setStoreId = (storeId: string | null) => {
	currentStoreId = storeId;
	// if (storeId) {
	// 	customAxios.defaults.headers.common['X-Store-ID'] = storeId;
	// } else {
	// 	delete customAxios.defaults.headers.common['X-Store-ID'];
	// }
};
// Create axios instance with default config
export const customAxios = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Function to set store ID in the headers

// // Initialize with no store ID
// setStoreId(null);

// Add store ID in every request automatically
customAxios.interceptors.request.use((config) => {
	if (currentStoreId) {
		config.headers['X-Store-ID'] = currentStoreId;
	} else {
		delete config.headers['X-Store-ID'];
	}
	return config;
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
				window.location.href = '/login';
				console.log('Token refresh failed:', refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export const generateRefreshToken = async () => {
	try {
		const response = await customAxios('/auth/refresh-token', {
			withCredentials: true,
		});
		console.log('Get new accesstoken', response);
		return response.data;
	} catch (error) {
		console.error(error);
		// toast.error(error?.response?.data?.error.message);
	}
};
