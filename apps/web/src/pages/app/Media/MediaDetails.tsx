import { useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { SquareChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getMediaDetails } from '@/features/Media/services';

const MediaDetails = () => {
	const navigate = useNavigate();
	const { fileId, storeId } = useParams<{ fileId: string; storeId: string }>();

	const { data: mediaContent } = useQuery({
		queryKey: ['mediaContent', storeId, fileId],
		queryFn: () => getMediaDetails({ mediaId: fileId!, storeId: storeId! }),
	});

	const backToMedia = () => {
		navigate(`/store/${storeId}/media`);
	};

	return (
		<section className="w-full bg-black">
			<section className="flex h-[3rem] w-full items-center justify-between bg-gray-800 px-5">
				<section className="w-fit text-white">
					<Button onClick={() => backToMedia()} variant="ghost" size={'sm'}>
						<SquareChevronLeft className="mr-2 h-4 w-4" />
						Back
					</Button>
				</section>
			</section>
			<section className="flex h-[calc(100vh-3rem)] w-full">
				<section className="flex w-3/4 items-center justify-center border border-white p-6">
					<img
						src={mediaContent?.url}
						alt={mediaContent?.fileName}
						className="aspect-auto h-full"
					/>
				</section>
				<section className="w-1/4"></section>
			</section>

			{/* Navbar */}
		</section>
	);
};

export default MediaDetails;
