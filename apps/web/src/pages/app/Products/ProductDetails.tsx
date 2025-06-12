import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, ChevronDown, ChevronRight, Tag, Trash2 } from 'lucide-react';
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
	deleteProductService,
	getProductByIdService,
	updateProductService,
} from '@/features/Products/services';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { storeId } = useParams<{ storeId: string }>();
	const navigate = useNavigate();

	const { data: productData, isLoading } = useQuery({
		queryKey: ['product', id],
		queryFn: () => getProductByIdService({ productId: id! }),
	});

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
	});

	const { watch, formState } = form;

	console.log('media', watch('media'), formState.errors);

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log('data=====>>>', data);
			setIsSubmitting(true);

			const response = await updateProductService({
				productId: data.id!,
				formData: data,
			});

			console.log('response=====>>>', response);

			toast.success('Product updated successfully!');
			form.reset();
		} catch (error) {
			console.error('Failed to update product:', error);
			toast.error('Failed to update product');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handelDeleteProduct = async () => {
		try {
			setIsSubmitting(true);
			await deleteProductService({ productId: Number(id) });
			toast.success('Product deleted successfully!');
			navigate(`/store/${storeId}/products`);
			form.reset();
		} catch (error) {
			console.error('Failed to delete product:', error);
			toast.error('Failed to delete product');
		} finally {
			setIsSubmitting(false);
		}
	};
	useEffect(() => {
		if (productData) {
			console.log(productData);
			form.reset(productData);
		}
	}, [productData, form]);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto space-y-6 py-8"
		>
			<section className="mx-auto max-w-4xl space-y-6">
				<section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<h1 className="flex items-center gap-2 text-2xl font-bold">
						<Tag />
						<ChevronRight /> {productData?.title}{' '}
						<Badge
							className={` ${
								productData?.status === 'Active'
									? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
									: ''
							} ${
								productData?.status === 'Draft'
									? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
									: ''
							} ${
								productData?.status === 'Out of stock'
									? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
									: ''
							} `}
						>
							{productData?.status}
						</Badge>
					</h1>

					<section className="flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button className="bg-accent hover:bg-accent/80 flex items-center gap-2 text-black">
									More Actions
									<ChevronDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator /> */}
								<DropdownMenuItem>
									{' '}
									<Archive />
									Archive
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handelDeleteProduct()}
									className="text-red-500 hover:bg-red-500 hover:text-white"
								>
									{' '}
									<Trash2 className="text-red-500 hover:text-white" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				</section>
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
										name="media"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Media Images</FormLabel>
												<FormControl>
													<ImageUpload
														media={field.value || []}
														onChange={(media) => field.onChange(media)}
														maxImages={8}
														storeId={storeId!}
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
										name="inventoryQuantity"
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
														<SelectItem value="Draft">Draft</SelectItem>
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
								{isSubmitting ? 'Updating...' : 'Update Product'}
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</motion.section>
	);
};

export default ProductDetails;
