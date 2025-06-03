import { useParams } from 'react-router';

import { mediaContent } from './MediaManagement';

const MediaDetails = () => {
	const { fileId } = useParams<{ fileId: string }>();

	const media = mediaContent.find((media) => media.id === parseInt(fileId!));

	// const product = useProductStore((state) =>
	// 	state.getProductsById(parseInt(id || '0'))
	// );

	// if (!product) {
	// 	return (
	// 		<div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
	// 			<Package className="h-16 w-16 text-gray-400" />
	// 			<h2 className="text-xl font-semibold text-gray-600">
	// 				Product Not Found
	// 			</h2>
	// 			<Button onClick={() => navigate('/products')} variant="outline">
	// 				<ArrowLeft className="mr-2 h-4 w-4" />
	// 				Back to Products
	// 			</Button>
	// 		</div>
	// 	);
	// }

	// const getFeaturedImage = () => {
	// 	if (!product.images || product.images.length === 0) return null;
	// 	return product.images.find((img) => img.isFeatured) || product.images[0];
	// };

	// const featuredImage = getFeaturedImage();

	return (
		<section className="w-full">
			<section className="w-1/2">
				<img src={media?.url} alt={media?.fileName} />
			</section>
			<section className="w-1/2"></section>
		</section>
	);
};

export default MediaDetails;
