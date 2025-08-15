import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React, { FC, useCallback, useRef, useState } from 'react';
import {
	deleteObject,
	generateProfileImagePresignedUrl,
} from '@/features/Media/services';

interface ProfileImage {
	url: string;
	index: number;
	key: string;
}

interface ProfileImageProps {
	avatar?: string;
	onChange?: (avatar: string) => void;
}
const ProfileAvatar: FC<ProfileImageProps> = ({ avatar, onChange }) => {
	const [isUploading, setIsUploading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const uploadToS3 = useCallback(async (file: File): Promise<ProfileImage> => {
		try {
			// Generate presigned URL
			const { uploadUrl, publicS3Url, key } =
				await generateProfileImagePresignedUrl({ file });

			console.log('uploadUrl', uploadUrl, publicS3Url, key);

			// Upload file directly to S3 using the presigned URL
			const response = await fetch(uploadUrl, {
				method: 'PUT',
				body: file,
				headers: {
					'Content-Type': file.type,
				},
			});

			if (!response.ok) {
				throw new Error('Failed to upload file to S3');
			}

			return {
				url: publicS3Url,
				index: 0,
				key,
			};
		} catch (error) {
			console.error('S3 Upload Error:', error);
			throw error;
		}
	}, []);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			setIsUploading(true);
			const result = await uploadToS3(file);
			console.log('Uploaded Image:', result);
			onChange?.(result.url);
			// Do something with the result, e.g., setAvatar(result.url)
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			setIsUploading(false);
		}
	};

	const handleUploadImage = () => {
		fileInputRef.current?.click();
	};

	const handleRemoveImage = (avatar: string) => {
		if (!avatar) return;
		try {
			setIsUploading(true);
			const key = avatar.split('/').splice(3).join('/');
			deleteObject(key);
			onChange?.('');
		} catch (error) {
			console.error('Error removing image:', error);
		} finally {
			setIsUploading(false);
		}
	};

	console.log('Image-->', avatar);

	return (
		<section className="flex items-center justify-start gap-5">
			<Avatar className="flex h-20 w-20 items-center justify-center">
				<AvatarImage src={avatar} />
				<AvatarFallback>AN</AvatarFallback>
			</Avatar>
			<div className="flex items-center gap-2">
				{avatar ? (
					<>
						<input
							type="file"
							accept="image/*"
							hidden
							ref={fileInputRef}
							onChange={(e) => handleFileChange(e)}
						/>
						<Button
							variant="outline"
							disabled={isUploading}
							onClick={() => handleUploadImage()}
						>
							{isUploading ? 'Updating...' : 'Update'}
						</Button>
						<Button
							variant="outline"
							disabled={isUploading}
							onClick={() => handleRemoveImage(avatar)}
						>
							Remove
						</Button>
					</>
				) : (
					<>
						<input
							type="file"
							accept="image/*"
							hidden
							ref={fileInputRef}
							onChange={(e) => handleFileChange(e)}
						/>
						<Button
							variant="outline"
							disabled={isUploading}
							onClick={() => handleUploadImage()}
						>
							{isUploading ? 'Uploading...' : 'Upload'}
						</Button>
					</>
				)}
			</div>
		</section>
	);
};

export default ProfileAvatar;
