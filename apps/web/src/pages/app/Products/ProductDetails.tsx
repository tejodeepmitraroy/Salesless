//
import { useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';

import { motion } from 'framer-motion';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import ProductVariantManager from '@/features/Products/components/ProductVariantManager';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormValues } from './CreateNewProduct';
import { productFormSchema } from '@/features/Products/schema';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/features/Products/components/ImageUpload';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
	getProductByIdService,
	updateProductService,
} from '@/features/Products/services';

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// const product = useProductStore((state) =>
	// 	state.getProductsById(parseInt(id || '0'))
	// );

	const { data: productData, isLoading } = useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductByIdService({ productId: id! }),
	});
	// setProduct(productData?.data.data);

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log(data);
			setIsSubmitting(true);
			const modifiedData = {
				...data,
				images: data.images?.map((image) => image.url),
			};
			console.log(modifiedData);
			const response = await updateProductService({
				productId: modifiedData.id!,
				formData: modifiedData,
			});
			console.log(response);
			// Here you would typically make an API call to create the product
			// For now, we'll just show a success message
			toast.success('Product created successfully!');
			form.reset();
		} catch (error) {
			console.error('Failed to create product:', error);
			toast.error('Failed to create product');
		} finally {
			setIsSubmitting(false);
		}
	};
	useEffect(() => {
		if (productData?.data.data) {
			form.reset(productData?.data.data);
		}
	}, [productData, form]);

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

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto space-y-6 py-8"
		>
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<h1 className="flex gap-2 text-2xl font-bold">
						{' '}
						<ChevronRight /> New Product
					</h1>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-3 gap-6"
					>
						<section className="col-span-2 space-y-4">
							<Card>
								<CardContent className="grid grid-cols-1 gap-6">
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input placeholder="Enter product name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Enter product description"
														className="resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="images"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Media Images</FormLabel>
												<FormControl>
													<ImageUpload
														images={field.value || []}
														onChange={(images) => field.onChange(images)}
														maxImages={8}
													/>
												</FormControl>
												<FormDescription>
													Add up to 8 images. The featured image will be
													displayed first.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="categoryId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category</FormLabel>
												<FormControl>
													<Input placeholder="Enter category" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-left">Pricing</CardTitle>
								</CardHeader>
								<CardContent className="grid w-full grid-cols-3 gap-4">
									{/* 
								<FormField
									control={form.control}
									name="vendor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Vendor</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select vendor" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{activeVendors.map((vendor) => (
															<SelectItem key={vendor.id} value={vendor.name}>
																{vendor.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormControl>
										</FormItem>
									)}
								/> */}

									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Price</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="Enter price"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="comparedAtPrice"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Compared At Price</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="Enter price"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-left">Inventory</CardTitle>
								</CardHeader>
								<CardContent className="grid w-full grid-cols-1 gap-4">
									<FormField
										control={form.control}
										name="stockQuantity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Stock Quantity</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter stock quantity"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-left">Variants</CardTitle>
								</CardHeader>
								<CardContent className="w-full">
									<FormField
										control={form.control}
										name="variants"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ProductVariantManager
														variants={field.value || []}
														onChange={(variants) => field.onChange(variants)}
													/>
												</FormControl>
												<FormDescription>
													Add product variants for different options like sizes,
													colors, etc.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</section>
						<section className="col-span-1 space-y-6">
							<Card>
								<CardContent className="">
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl className="w-full">
														<SelectTrigger>
															<SelectValue placeholder="Select status" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Active">Active</SelectItem>
														<SelectItem value="Inactive">Inactive</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-left">SEO</CardTitle>
								</CardHeader>
								<CardContent className="grid w-full grid-cols-1 gap-4">
									<FormField
										control={form.control}
										name="seoTitle"
										render={({ field }) => (
											<FormItem>
												<FormLabel>SEO Title</FormLabel>
												<FormControl>
													<Input placeholder="Enter SEO title" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="seoDescription"
										render={({ field }) => (
											<FormItem>
												<FormLabel>SEO Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Enter SEO description"
														className="resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="seoKeywords"
										render={({ field }) => (
											<FormItem>
												<FormLabel>SEO Keywords</FormLabel>
												<FormControl>
													<Input placeholder="Enter SEO keywords" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</section>
						<div className="col-span-2 flex justify-end">
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Creating...' : 'Create Product'}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</motion.div>
	);
};

export default ProductDetails;
