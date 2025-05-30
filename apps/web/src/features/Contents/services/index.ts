import { getToken } from '@/config/auth';
import { customAxios } from '@/config/axios-custom';

export const generatePresignedUrl = async (
	file: File
): Promise<{
	uploadUrl: string;
	fileName: string;
	publicS3Url: string;
	key:string
}> => {
	try {
		const token = getToken();

		const response = await customAxios.post(
			'/contents/upload-url',
			{
				fileName: file.name,
				contentType: file.type,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (response.status !== 200) {
			throw new Error('Failed to generate upload URL');
		}
		const { uploadUrl, fileName, publicS3Url, key } = response.data.data;
		return { uploadUrl, fileName, publicS3Url,key };
	} catch (error) {
		console.error('Error generating presigned URL:', error);

		throw error;
	}
};

export const deleteObject = async (
	key: string
): Promise<{ uploadUrl: string; fileName: string; publicS3Url: string }> => {
	try {
		const token = getToken();

		const response = await customAxios.delete('/contents', {
			data: {
				key,
			},
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (response.status !== 200) {
			throw new Error('Failed to generate upload URL');
		}
		const { uploadUrl, fileName, publicS3Url } = response.data.data;
		return { uploadUrl, fileName, publicS3Url };
	} catch (error) {
		console.error('Error generating presigned URL:', error);

		throw error;
	}
};
