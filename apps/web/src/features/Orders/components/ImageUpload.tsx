import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
	Upload,
	Trash2,
	ChevronLeft,
	ChevronRight,
	Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ProductImage } from '@/features/Products/schema';
import {
	generatePresignedUrl,
	deleteObject,
} from '@/features/Contents/services';

interface ImageUploadProps {
	images: ProductImage[];
	onChange: (images: ProductImage[]) => void;
	maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	images = [],
	onChange,
	maxImages = 10,
}) => {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress] = useState<Record<string, number>>({});

	// Initialize S3 client
	// const s3Client = new S3Client({
	// 	region: process.env.NEXT_PUBLIC_AWS_REGION,
	// 	credentials: {
	// 		accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
	// 		secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
	// 	},
	// });

	// Upload to S3
	const uploadToS3 = async (file: File): Promise<ProductImage> => {
		try {
			// Generate presigned URL
			const { uploadUrl, fileName, publicS3Url, key } =
				await generatePresignedUrl(file);

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

			// Get the public URL
			// const s3Url = `https://${aws_s3_config.bucket}.s3.${aws_s3_config.region}.amazonaws.com/products/${fileName}`;

			return {
				id: fileName,
				url: publicS3Url,
				name: file.name,
				isFeatured: false,
				key,
			};
		} catch (error) {
			console.error('S3 Upload Error:', error);
			throw error;
		}
	};

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			// Filter out non-image files
			const imageFiles = acceptedFiles.filter((file) =>
				file.type.startsWith('image/')
			);

			if (imageFiles.length === 0) {
				toast.error('Please upload image files only');
				return;
			}

			// Check if adding these would exceed max images
			if (images.length + imageFiles.length > maxImages) {
				toast.error(`You can upload a maximum of ${maxImages} images`);
				return;
			}

			setIsUploading(true);

			try {
				// Upload all images in parallel
				const uploadPromises = imageFiles.map((file) => uploadToS3(file));
				const uploadedImages = await Promise.all(uploadPromises);

				// Set the first image as featured if there are no images yet
				if (images.length === 0 && uploadedImages.length > 0) {
					uploadedImages[0].isFeatured = true;
				}

				// Add new images to the existing array
				onChange([...images, ...uploadedImages]);

				toast.success(
					`${uploadedImages.length} image${uploadedImages.length > 1 ? 's' : ''} uploaded successfully`
				);
			} catch (error) {
				toast.error('Failed to upload images. Please try again.');
				console.error('Upload error:', error);
			} finally {
				setIsUploading(false);
			}
		},
		[images, onChange, maxImages]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
		disabled: isUploading || images.length >= maxImages,
	});

	const removeImage = (id: string) => {
		const Id = images.find((image) => image.id === id)!.key;
		deleteObject(Id);
		onChange(images.filter((image) => image.id !== id));
	};

	const setFeaturedImage = (id: string) => {
		onChange(
			images.map((image) => ({
				...image,
				isFeatured: image.id === id,
			}))
		);
	};

	const moveImage = (from: number, to: number) => {
		if (to < 0 || to >= images.length) return;

		const newImages = [...images];
		const [movedImage] = newImages.splice(from, 1);
		newImages.splice(to, 0, movedImage);
		onChange(newImages);
	};

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={cn(
					'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
					isDragActive
						? 'border-primary bg-primary/5'
						: 'hover:border-primary border-gray-300',
					isUploading || images.length >= maxImages
						? 'cursor-not-allowed opacity-50'
						: ''
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center space-y-2">
					<Upload className="h-8 w-8 text-gray-500" />
					<p className="text-sm font-medium">
						{isDragActive
							? 'Drop the files here...'
							: isUploading
								? 'Uploading...'
								: images.length >= maxImages
									? `Maximum ${maxImages} images reached`
									: 'Drag & drop images, or click to select'}
					</p>
					<p className="text-xs text-gray-500">
						{isUploading
							? 'Please wait while we upload your images'
							: 'PNG, JPG, and JPEG up to 5MB'}
					</p>
				</div>
			</div>

			{Object.keys(uploadProgress).length > 0 && (
				<div className="space-y-2">
					{Object.entries(uploadProgress).map(([id, progress]) => (
						<div key={id} className="space-y-1">
							<div className="flex items-center justify-between text-xs">
								<span className="flex items-center">
									<Loader2 className="mr-1 h-3 w-3 animate-spin" />
									Uploading...
								</span>
								<span>{progress}%</span>
							</div>
							<div className="h-1.5 w-full rounded-full bg-gray-200">
								<div
									className="h-1.5 rounded-full bg-blue-500"
									style={{ width: `${progress}%` }}
								></div>
							</div>
						</div>
					))}
				</div>
			)}

			{images.length > 0 && (
				<div className="space-y-3">
					<div className="flex items-center justify-between text-sm font-medium">
						<span>Product Images</span>
						<span className="text-xs text-gray-500">
							{images.length} of {maxImages}
						</span>
					</div>

					<motion.div
						className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
						layout
					>
						<AnimatePresence>
							{images.map((image, index) => (
								<motion.div
									key={image.id}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									layout
									className="group relative aspect-square overflow-hidden rounded-md border"
								>
									<img
										src={image.url}
										alt={image.name}
										className="h-full w-full object-cover"
									/>

									{/* Badge for featured image */}
									{image.isFeatured && (
										<div className="bg-primary absolute top-2 left-2 rounded-full px-2 py-1 text-xs text-white">
											Featured
										</div>
									)}

									{/* Overlay with controls */}
									<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
										<div className="flex space-x-2">
											{!image.isFeatured && (
												<Button
													size="sm"
													variant="secondary"
													onClick={() => setFeaturedImage(image.id)}
													className="text-xs"
												>
													Set as Featured
												</Button>
											)}
											<Button
												size="sm"
												variant="destructive"
												onClick={() => removeImage(image.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
										<div className="absolute bottom-2 flex w-full justify-between px-2">
											<Button
												size="sm"
												variant="secondary"
												className="h-8 w-8 p-0"
												onClick={() => moveImage(index, index - 1)}
												disabled={index === 0}
											>
												<ChevronLeft className="h-4 w-4" />
											</Button>
											<Button
												size="sm"
												variant="secondary"
												className="h-8 w-8 p-0"
												onClick={() => moveImage(index, index + 1)}
												disabled={index === images.length - 1}
											>
												<ChevronRight className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
