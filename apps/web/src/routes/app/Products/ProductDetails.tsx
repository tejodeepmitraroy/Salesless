import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, DollarSign, Loader, Tag } from 'lucide-react';
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

import {
	productFormSchema,
	ProductFormValues,
} from '@/features/Products/schema';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/features/Products/components/ImageUpload';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
	deleteProductService,
	getAllCategoriesService,
	getProductByIdService,
	updateProductService,
} from '@/features/Products/services';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs } from '@radix-ui/react-tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductVariantOptionManager from '@/features/Products/components/ProductVariantOptionsManager';

const ProductDetails = () => {
	const { productId, storeId } = useParams<{
		productId: string;
		storeId: string;
	}>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const { data: productData, isLoading } = useQuery({
		queryKey: ['product', productId],
		queryFn: () => getProductByIdService({ productId: productId! }),
	});

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
	});

	const { watch, setValue, formState } = form;
	console.log('errors---------->', form.formState.errors);

	console.log('media', watch('media'), formState.errors);

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log('data=====>>>', data);
			setIsSubmitting(true);

			const response = await updateProductService({
				productId: Number(productId),
				formData: data,
			});

			console.log('response=====>>>', response);

			toast.success('Product updated successfully!');
			form.reset();
			navigate(`/store/${storeId}/products`);
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
			await deleteProductService({ productId: Number(productId) });
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

	const { data: categories, isLoading: isLoadingCategories } = useQuery({
		queryKey: ['categories', storeId],
		queryFn: () => getAllCategoriesService(),
	});

	const price = watch('price');
	const costPerItem = watch('costPerItem');
	const isSkuEnabled = watch('isSkuEnabled');
	const requiredShipping = watch('requiredShipping');

	useEffect(() => {
		if (price !== undefined && costPerItem !== undefined) {
			const profit = Number(price) - Number(costPerItem);
			setValue('profit', profit.toString());

			const margin =
				costPerItem === 0
					? '0'
					: ((profit / Number(price)) * 100).toFixed(2) + '%';
			setValue('margin', margin);
		}
	}, [price, costPerItem, setValue]);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto py-8"
		>
			<div className="mx-auto max-w-6xl space-y-6">
				<FormProvider {...form}>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
								<h1 className="flex items-center gap-2 text-3xl font-bold">
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
								<div className="col-span-2 flex justify-end gap-2">
									<Button
										onClick={() => handelDeleteProduct()}
										variant="outline"
										className="border-red-500 text-red-500"
									>
										Delete
									</Button>
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting ? 'Updating...' : 'Update '}
									</Button>
								</div>
							</div>
							<Separator />
							<section className="grid grid-cols-3 gap-6">
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
															<Input
																placeholder="Enter product name"
																{...field}
															/>
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
															<Select
																onValueChange={field.onChange}
																value={field.value}
															>
																<FormControl>
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select category" />
																	</SelectTrigger>
																</FormControl>
																{isLoadingCategories ? (
																	<Loader className="text-primary mb-4 h-10 w-10 animate-spin" />
																) : (
																	<SelectContent defaultValue="0">
																		<SelectItem value="0">
																			Uncategorized
																		</SelectItem>
																		{categories?.map((category) => (
																			<SelectItem
																				key={category.id}
																				value={category.id.toString()}
																			>
																				{category.name}
																			</SelectItem>
																		))}
																	</SelectContent>
																)}
															</Select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</CardContent>
									</Card>

									<Tabs
										defaultValue="single"
										className="w-full"
										value={
											form.watch('isVariantEnabled') ? 'multiple' : 'single'
										}
										onValueChange={(e) =>
											form.setValue('isVariantEnabled', e === 'multiple')
										}
									>
										<TabsList>
											<TabsTrigger value="single">Single Variant</TabsTrigger>
											<TabsTrigger value="multiple">
												Multiple Variant
											</TabsTrigger>
										</TabsList>
										{/* Single Variant */}
										<TabsContent
											value="single"
											className="mt-2 w-full space-y-4"
										>
											<Card>
												<CardHeader>
													<CardTitle className="text-left">Pricing</CardTitle>
												</CardHeader>
												<CardContent className="space-y-6">
													<section className="grid w-full grid-cols-2 gap-4">
														<FormField
															control={form.control}
															name="price"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Price</FormLabel>
																	<FormControl>
																		<div className="relative flex w-full items-center gap-2">
																			<DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />

																			<Input
																				type="number"
																				placeholder="0.00"
																				className="w-full pl-8"
																				{...field}
																			/>
																		</div>
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
																		<div className="relative flex w-full items-center gap-2">
																			<DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />

																			<Input
																				type="number"
																				placeholder="0.00"
																				className="w-full pl-8"
																				{...field}
																			/>
																		</div>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</section>
													<Separator />
													<section className="grid w-full grid-cols-3 gap-4">
														<FormField
															control={form.control}
															name="costPerItem"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Cost Price</FormLabel>
																	<FormControl>
																		<div className="relative flex w-full items-center gap-2">
																			<DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
																			<Input
																				type="number"
																				placeholder="0.00"
																				className="w-full pl-8"
																				{...field}
																			/>
																		</div>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="profit"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Profit</FormLabel>
																	<FormControl>
																		<div className="relative flex w-full items-center gap-2">
																			<DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
																			<Input
																				placeholder="--"
																				className="w-full pl-8"
																				{...field}
																				readOnly
																			/>
																		</div>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="margin"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>Margin</FormLabel>
																	<FormControl>
																		<Input
																			placeholder="--"
																			{...field}
																			readOnly
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</section>
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
													<FormField
														control={form.control}
														name="isSkuEnabled"
														render={({ field }) => (
															<FormItem>
																<div className="flex items-center gap-3">
																	<Checkbox
																		checked={field.value}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange(true)
																				: field.onChange(false);
																		}}
																	/>
																	<Label htmlFor="terms">
																		This is product has Sku & Barcode
																	</Label>
																</div>
															</FormItem>
														)}
													/>
													{isSkuEnabled && (
														<section className="mt-4 grid w-full grid-cols-2 gap-4">
															<FormField
																control={form.control}
																name="sku"
																render={({ field }) => (
																	<FormItem>
																		<FormLabel>
																			SKU (Stock Keeping Unit)
																		</FormLabel>
																		<FormControl>
																			<Input
																				placeholder="Enter SKU"
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name="barcode"
																render={({ field }) => (
																	<FormItem>
																		<FormLabel>Barcode</FormLabel>
																		<FormControl>
																			<Input
																				placeholder="Enter Barcode"
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</section>
													)}
												</CardContent>
											</Card>
											<Card>
												<CardHeader>
													<CardTitle className="text-left">Shipping</CardTitle>
												</CardHeader>
												<CardContent className="grid w-full grid-cols-1 gap-4">
													<FormField
														control={form.control}
														name="requiredShipping"
														render={({ field }) => (
															<FormItem>
																<div className="flex items-center gap-3">
																	<Checkbox
																		checked={field.value}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange(true)
																				: field.onChange(false);
																		}}
																	/>
																	<Label htmlFor="terms">
																		This is product has Sku & Barcode
																	</Label>
																</div>
															</FormItem>
														)}
													/>

													{requiredShipping && (
														<section className="mt-4 flex w-full items-center gap-2">
															<FormField
																control={form.control}
																name="weight"
																render={({ field }) => (
																	<FormItem className="w-[200px]">
																		<FormLabel>Weight</FormLabel>
																		<FormControl>
																			<Input
																				type="number"
																				placeholder="Enter Weight"
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name="weightUnit"
																render={({ field }) => (
																	<FormItem>
																		<Select
																			onValueChange={field.onChange}
																			defaultValue={field.value}
																		>
																			<FormControl className="mt-5 w-[100px]">
																				<SelectTrigger>
																					<SelectValue placeholder="Unit" />
																				</SelectTrigger>
																			</FormControl>

																			<SelectContent>
																				{['kg', 'g', 'oz', 'lb'].map((unit) => (
																					<SelectItem key={unit} value={unit}>
																						{unit}
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</section>
													)}
												</CardContent>
											</Card>
										</TabsContent>
										{/* Multiple Variant */}
										<TabsContent
											value="multiple"
											className="mt-2 w-full space-y-4"
										>
											<Card className="w-full">
												<CardHeader>
													<CardTitle className="text-left">Variants</CardTitle>
												</CardHeader>
												<CardContent className="w-full space-y-4 px-0">
													<ProductVariantOptionManager />

													<ProductVariantManager />
												</CardContent>
											</Card>
										</TabsContent>
									</Tabs>
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
																<SelectItem value="Inactive">
																	Inactive
																</SelectItem>
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
															<Input
																placeholder="Enter SEO keywords"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</CardContent>
									</Card>
								</section>
							</section>
						</form>
					</Form>
				</FormProvider>
			</div>
		</motion.div>
	);
};

export default ProductDetails;
