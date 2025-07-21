import { customAxios } from '@/api/axios-custom';

export const generatePresignedUrl = async ({
	file,
	storeId,
}: {
	file: File;
	storeId?: string;
}): Promise<{
	uploadUrl: string;
	fileName: string;
	publicS3Url: string;
	key: string;
	mediaId: string;
}> => {
	try {
		const response = await customAxios.post(
			`/media/upload-url?storeId=${storeId}`,
			{
				fileName: file.name,
				contentType: file.type,
			}
		);

		if (response.status !== 200) {
			throw new Error('Failed to generate upload URL');
		}
		const { uploadUrl, fileName, publicS3Url, key, mediaId } =
			response.data.data;
		return { uploadUrl, fileName, publicS3Url, key, mediaId };
	} catch (error) {
		console.error('Error generating presigned URL:', error);
		throw error;
	}
};

export const generateProfileImagePresignedUrl = async ({
	file,
}: {
	file: File;
}): Promise<{
	uploadUrl: string;
	fileName: string;
	publicS3Url: string;
	key: string;
}> => {
	try {
		const response = await customAxios.post(`/media/profile-pic`, {
			fileName: file.name,
			contentType: file.type,
		});

		if (response.status !== 200) {
			throw new Error('Failed to generate upload URL');
		}
		const { uploadUrl, fileName, publicS3Url, key } = response.data.data;
		return { uploadUrl, fileName, publicS3Url, key };
	} catch (error) {
		console.error('Error generating presigned URL:', error);
		throw error;
	}
};

export const deleteObject = async (
	key: string
): Promise<{ uploadUrl: string; fileName: string; publicS3Url: string }> => {
	try {
		const response = await customAxios.delete('/media', {
			data: {
				key,
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

export const getAllMediaFiles = async ({
	storeId,
}: {
	storeId: string;
}): Promise<
	Array<{
		id: number;
		fileName: string;
		url: string | null;
		key: string;
		size: number | null;
		createdAt: string;
		lastModified: string;
	}>
> => {
	const response = await customAxios.get(`/media/files?storeId=${storeId}`);

	const mediaContents = response.data.data;
	return mediaContents;
};

export const getMediaDetails = async ({
	mediaId,
	storeId,
}: {
	mediaId: string;
	storeId: string;
}): Promise<{
	id: number;
	fileName: string;
	url: string;
	key: string;
	size: number;
	createdAt: string;
	lastModified: string;
}> => {
	const response = await customAxios.get(
		`/media/files/${mediaId}?storeId=${storeId}`
	);

	const mediaContents = response.data.data;
	return mediaContents;
};
