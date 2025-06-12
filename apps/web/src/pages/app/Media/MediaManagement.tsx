import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Search, Upload } from 'lucide-react';
import { MediaDataTable } from '@/features/Media/tables/MediaDataTable';
import HeaderSection from '@/components/layouts/HeaderSection';
import { mediaColumns } from '@/features/Media/tables/columns';
import {
	generatePresignedUrl,
	getAllMediaFiles,
} from '@/features/Media/services';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Input } from '@/components/ui/input';

export interface MediaContent {
	id: number;
	fileName: string;
	url: string | null;
	key: string;
	size: number | null;
	createdAt: string;
	lastModified: string;
}

const MediaManagement = () => {
	const [mediaObjects, setMediaObjects] = useState<MediaContent[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const storeId = useParams<{ storeId: string }>().storeId;
	const uploadToS3 = async (file: File): Promise<{ url: string }> => {
		try {
			// Generate presigned URL
			const { uploadUrl, publicS3Url } = await generatePresignedUrl({
				file,
				storeId: storeId!,
			});

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

			return { url: publicS3Url };
		} catch (error) {
			console.error('S3 Upload Error:', error);
			throw error;
		}
	};
	const { data: mediaContents, refetch } = useQuery({
		queryKey: ['mediaContents', storeId],
		queryFn: () => getAllMediaFiles({ storeId: storeId! }),
	});

	const uploadFile = () => {
		console.log('Upload file');
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.multiple = true;
		fileInput.onchange = (event) => {
			const files = (event.target as HTMLInputElement).files;

			if (files) {
				const fileArray = Array.from(files);
				console.log(fileArray);
				for (const file of fileArray) {
					uploadToS3(file).then((result) => {
						console.log(result);
						refetch();
					});
				}
			}
		};
		fileInput.click();
	};

	useEffect(() => {
		if (mediaContents) {
			setMediaObjects(mediaContents);
		}
	}, [mediaContents, refetch]);

	return (
		<section>
			<HeaderSection
				icon={<Image className="h-7 w-7" />}
				title="Media Store"
				description="Manage your media"
			/>

			<section className="space-y-6">
				<section className="flex w-full items-center justify-end gap-6">
					<div className="relative flex w-full items-center gap-2">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<Input
							type="text"
							placeholder="Search media..."
							className="w-full rounded-md border py-2 pr-4 pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<Button onClick={() => uploadFile()} className="gap-2">
						<Upload className="h-4 w-4" />
						Upload File
					</Button>
				</section>

				<MediaDataTable columns={mediaColumns} data={mediaObjects} />
			</section>
		</section>
	);
};

export default MediaManagement;
