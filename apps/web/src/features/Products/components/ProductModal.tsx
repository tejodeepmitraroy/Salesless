import React, { useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
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
import { useVendorStore } from '@/stores/vendor-store';
import { toast } from 'sonner';
import { productSchema } from '../schema';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Product } from '@/stores/product-store';
import ImageUpload from './ImageUpload';
import ProductVariantManager from './ProductVariantManager';

interface ProductModalProps {
	isOpen: boolean;
	onClose: () => void;
	product: Product | null;
	onSave: (product: Product) => void;
}

// Create a new schema that properly defines all required fields
const productFormSchema = z.object({
	name: z.string().min(2).max(50),
	category: z.string().min(2).max(50),
	vendor: z.string().min(2).max(50),
	price: z.string(),
	stock: z.string(),
	id: z.number(),
	status: z.string(),
	description: z.string().optional(),
	images: z.array(z.unknown()).optional(),
	variants: z.array(z.unknown()).optional(),
	seoTitle: z.string().optional(),
	seoDescription: z.string().optional(),
	seoKeywords: z.string().optional(),
	seoScore: z.number().optional(),
});

// Extract the schema type
type ProductFormValues = z.infer<typeof productFormSchema>;

const initialProductState: Product = {
	id: 0,
	name: '',
	category: '',
	vendor: '',
	price: 0,
	stock: 0,
	status: 'Active',
	description: '',
	images: [],
	variants: [],
};

const ProductModal: React.FC<ProductModalProps> = ({
	isOpen,
	onClose,
	product,
	onSave,
}) => {
	const { activeVendors } = useVendorStore();

	// Initialize form with react-hook-form and zod validation
	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: productSchema.parse({
			name: '',
			category: '',
			vendor: '',
			price: 0,
			stock: 0,
			status: 'Active',
			description: '',
			images: [],
			variants: [],
			id: 0,
			seoTitle: '',
			seoDescription: '',
			seoKeywords: '',
			seoScore: 0,
		}),
	});

	// Reset form when product changes
	useEffect(() => {
		if (product) {
			form.reset({
				...product,
				price: String(product.price),
				stock: String(product.stock),
				images: product.images || [],
				variants: product.variants || [],
			});
		} else {
			// Generate a new ID for new products
			const newId = Math.floor(Math.random() * 10000);
			form.reset({
				id: newId,
				name: '',
				category: '',
				vendor: '',
				price: '0',
				stock: '0',
				status: 'Active',
				description: '',
				images: [],
				variants: [],
			});
		}
	}, [product, form]);

	const updateStatus = (stock: number) => {
		// Update status based on stock
		let status = 'Active';
		if (stock <= 0) {
			status = 'Out of stock';
		} else if (stock < 10) {
			status = 'Low stock';
		}
		return status;
	};

	const onSubmit = (values: ProductFormValues) => {
		// Convert string values to numbers
		const price = parseFloat(values.price);
		const stock = parseInt(values.stock, 10);

		// Update the status based on stock
		const status = updateStatus(stock);

		const finalProduct: Product = {
			id: product?.id || values.id || 0,
			name: values.name,
			category: values.category,
			vendor: values.vendor,
			price,
			stock,
			status,
			description: values.description,
			images: values.images,
			variants: values.variants,
			seoTitle: values.seoTitle,
			seoDescription: values.seoDescription,
			seoKeywords: values.seoKeywords,
			seoScore: values.seoScore,
		};

		onSave(finalProduct);
		onClose();
		toast.success(
			product ? 'Product updated successfully' : 'Product added successfully'
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold">
						{product ? 'Edit Product' : 'Add New Product'}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Electronics">Electronics</SelectItem>
												<SelectItem value="Fashion">Fashion</SelectItem>
												<SelectItem value="Home">Home</SelectItem>
												<SelectItem value="Sports & Outdoors">
													Sports & Outdoors
												</SelectItem>
												<SelectItem value="Beauty">Beauty</SelectItem>
												<SelectItem value="Books">Books</SelectItem>
												<SelectItem value="Toys & Games">
													Toys & Games
												</SelectItem>
												<SelectItem value="Food & Beverages">
													Food & Beverages
												</SelectItem>
											</SelectContent>
										</Select>
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
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a vendor" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{activeVendors.map((vendor) => (
													<SelectItem key={vendor.id} value={vendor.name}>
														{vendor.name}
													</SelectItem>
												))}
												<SelectItem value="Direct Supplier">
													Direct Supplier
												</SelectItem>
												<SelectItem value="Other">Other</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Base Price</FormLabel>
										<div className="relative">
											<span className="absolute top-1/2 left-3 -translate-y-1/2">
												$
											</span>
											<FormControl>
												<Input
													type="number"
													min="0"
													step="0.01"
													placeholder="0.00"
													className="pl-7"
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Base Stock Quantity</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="0"
												placeholder="Enter stock quantity"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="space-y-2">
								<FormLabel>Status</FormLabel>
								<Input
									value={
										form.watch('stock') && parseInt(form.watch('stock')) > 0
											? parseInt(form.watch('stock')) < 10
												? 'Low stock'
												: 'Active'
											: 'Out of stock'
									}
									readOnly
									className="bg-gray-100 dark:bg-gray-800"
								/>
								<p className="text-xs text-gray-500">
									Status is auto-calculated based on stock levels
								</p>
							</div>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter product description"
											rows={4}
											{...field}
											value={field.value || ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Product Variants */}
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

						<FormField
							control={form.control}
							name="images"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Images</FormLabel>
									<FormControl>
										<ImageUpload
											images={field.value || []}
											onChange={(images) => field.onChange(images)}
											maxImages={8}
										/>
									</FormControl>
									<FormDescription>
										Add up to 8 images. The featured image will be displayed
										first.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							transition={{ duration: 0.3 }}
						>
							<div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
								<h3 className="font-medium">SEO Information (Optional)</h3>

								<FormField
									control={form.control}
									name="seoTitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel>SEO Title</FormLabel>
											<FormControl>
												<Input
													placeholder="SEO title for product"
													{...field}
													value={field.value || ''}
												/>
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
													placeholder="SEO description for product"
													rows={2}
													{...field}
													value={field.value || ''}
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
													placeholder="Comma-separated keywords"
													{...field}
													value={field.value || ''}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</motion.div>

						<DialogFooter>
							<Button type="button" variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">
								{product ? 'Update Product' : 'Add Product'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ProductModal;
