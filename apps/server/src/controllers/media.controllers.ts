import { eq } from 'drizzle-orm';
import { db } from '../db';
import { media } from '../db/schema';
import {
	deleteObject,
	getObjectMetaData,
	getObjectUrl,
	listObjects,
	uploadToS3,
} from '../helper/generate-upload-url';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';

import { Request, Response } from 'express';

export const uploadFileToS3 = asyncHandler(
	async (request: Request, response: Response): Promise<void> => {
		const { fileName: uploadFileName, contentType } = request.body;
		const storeId = Number(request.query.storeId);

		console.log(storeId);

		if (!uploadFileName || !contentType) {
			response
				.status(400)
				.json({ message: 'fileName and contentType are required' });
		}

		console.log(contentType);
		try {
			const { uploadUrl, publicS3Url, key } = await uploadToS3({
				fileName: uploadFileName,
				contentType,
			});

			const storeMedia = await db
				.insert(media)
				.values({
					fileName: uploadFileName,
					key,
					storeId,
					url: publicS3Url,
				})
				.returning();

			const storedObject = storeMedia[0];
			response.status(200).json(
				new ApiResponse(200, {
					uploadUrl,
					fileName: storedObject.fileName,
					publicS3Url: storedObject.url,
					key: storedObject.key,
					mediaId: storedObject.id,
				})
			);
		} catch (error) {
			console.error('Error generating presigned URL:', error);
			response
				.status(500)
				.json(new ApiError(500, 'Upload Url not generated', error));
		}
	}
);

export const getMediaFiles = asyncHandler(
	async (request: Request, response: Response) => {
		const storeId = Number(request.query.storeId);
		const mediaId = Number(request.params.mediaId);
		try {
			if (mediaId) {
				const mediaFile = await db.query.media.findFirst({
					where: eq(media.id, mediaId),
				});

				response.status(200).json(new ApiResponse(200, mediaFile));
				return;
			} else {
				const allMediaFiles = await db.query.media.findMany({
					where: eq(media.storeId, storeId),
				});

				response.status(200).json(new ApiResponse(200, allMediaFiles));
			}
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Upload Url not generated', error));
		}
	}
);

// Add route for checking upload status
export const checkUploadStatus = asyncHandler(
	async (request: Request, response: Response) => {
		try {
			const { fileName } = request.params;

			try {
				const result = await getObjectMetaData({ fileName });
				// Try to get object metadata

				response
					.status(200)
					.json(new ApiResponse(200, { result, exists: true }));
			} catch (error) {
				// If file doesn't exist, S3 will throw an error
				response
					.status(200)
					.json(
						new ApiError(200, "File doesn't exist", { error, exists: false })
					);
			}
		} catch (error) {
			console.error('Error checking upload status:', error);
			response
				.status(500)
				.json(new ApiError(500, 'Failed to check upload status', error));
		}
	}
);

export const viewUrl = asyncHandler(
	async (request: Request, response: Response): Promise<void> => {
		const { key } = request.body;
		try {
			const uploadUrl = await getObjectUrl({ key });
			response.status(200).json(new ApiResponse(200, { uploadUrl }));
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Upload Url not generated', error));
		}
	}
);
export const listAllObjects = asyncHandler(
	async (request: Request, response: Response): Promise<void> => {
		try {
			const listAllFiles = await listObjects();
			const mediaFiles = listAllFiles.Contents?.map((file) => ({
				fileName: file.Key,
				key: file.Key,
				size: file.Size,
				lastModified: file.LastModified,
				storageClass: file.StorageClass,
			}));

			response.status(200).json(new ApiResponse(200, mediaFiles));
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Upload Url not generated', error));
		}
	}
);

export const deleteAObject = asyncHandler(
	async (request: Request, response: Response): Promise<void> => {
		const { key } = request.body;
		try {
			const deleteFile = await deleteObject({ key });
			response.status(200).json(new ApiResponse(200, deleteFile));
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiError(500, 'Upload Url not generated', error));
		}
	}
);
