import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

// import ImageUpload from '@/features/Products/components/ImageUpload';
// import ProductVariantManager from '@/features/Products/components/ProductVariantManager';
// import { ProductImage, ProductVariant } from '@/features/Products/schema';
import { useVendorStore } from '@/stores/vendor-store';
import { motion } from 'framer-motion';

// Define the form schema
const productFormSchema = z.object({
	name: z.string().min(2, 'Name is required').max(50),
	category: z.string().min(2, 'Category is required').max(50),
	vendor: z.string().min(2, 'Vendor is required').max(50),
	price: z.string().min(1, 'Price is required'),
	stock: z.string().min(1, 'Stock is required'),
	status: z.string(),
	description: z.string().optional(),
	images: z.array(z.unknown()).optional(),
	variants: z.array(z.unknown()).optional(),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const CreateNewProduct = () => {
	const { activeVendors } = useVendorStore();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: '',
			category: '',
			vendor: '',
			price: '',
			stock: '',
			status: 'Active',
			description: '',
			images: [],
			variants: [],
			seoTitle: '',
			seoDescription: '',
			seoKeywords: '',
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log(data);
			setIsSubmitting(true);
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

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="container mx-auto py-8"
			>
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-6 text-2xl font-bold">Create New Product</h1>
					<div className="rounded-lg bg-white p-6 shadow">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid grid-cols-2 gap-6"
							>
								<div className="grid grid-cols-1 gap-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Product Name</FormLabel>
												<FormControl>
													<Input placeholder="Enter product name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="category"
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
									/>

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
										name="stock"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Stock</FormLabel>
												<FormControl>
													<Input
														type="number"
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
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
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
								</div>

								<div className="grid grid-cols-1 gap-4">
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
								</div>

								<div className="col-span-2 flex justify-end">
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting ? 'Creating...' : 'Create Product'}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default CreateNewProduct;
