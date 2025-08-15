import { ProductVariantColumns } from '../tables/ProductVariantColumn';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { ProductFormValues } from '../schema';
import { ProductVariantDataTable } from '../tables/ProductVariantDataTable';
import { generateVariantsFromOptions } from '../hooks/generateVariantsFromOptions';
import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ProductVariant } from '../schema';

const ProductVariantManager = () => {
	const { control } = useFormContext<ProductFormValues>();

	const options = control._getWatch('options');

	const { fields, replace, update } = useFieldArray({
		control,
		name: 'variants',
	});

	const columns = ProductVariantColumns(control);
	useEffect(() => {
		if (fields.length === 0) {
			const variantsGenerated = generateVariantsFromOptions(options);

			console.log('variantsGenerated', variantsGenerated.variants);
			replace(variantsGenerated.variants); // inject into RHF `variants` field
		}
	}, [replace, options, fields.length]);

	return (
		<ProductVariantDataTable columns={columns} data={fields} update={update} />
	);
};

export default ProductVariantManager;

interface ProductVariantModalProps {
	children: React.ReactNode;
	variant: ProductVariant;
	index: number;
	update: (index: number, data: ProductVariant) => void;
}

export const ProductVariantModal = ({
	children,
	variant,
	index,
	update,
}: ProductVariantModalProps) => {
	const form = useForm<ProductVariant>({
		defaultValues: variant,
	});

	const [isOpen, setIsOpen] = useState(false);
	const { watch, setValue } = form;
	const price = watch('price');
	const costPerItem = watch('costPerItem');

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

	useEffect(() => {
		form.reset(variant);
	}, [variant, form]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild onClick={() => setIsOpen(true)}>
				{children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[625px]">
				<DialogHeader>
					<DialogTitle>
						Edit Variant {`${variant?.option1}+${variant?.option2}`}
					</DialogTitle>
					<DialogDescription>
						Edit variant here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit((data) => {
								update(index, data);
							})(e);
						}}
						className="space-y-6"
					>
						<section className="grid w-full grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name={'price'}
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
													value={field.value}
													onChange={(e) => field.onChange(e.target.value)}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={'comparedAtPrice'}
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

						<section className="mt-4 grid w-full grid-cols-3 gap-4">
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
											<Input placeholder="--" {...field} readOnly />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>
						<Separator />
						<section className="flex w-full flex-col gap-5">
							<section className="w-full text-left text-lg">Inventory</section>
							<section className="grid w-full grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="sku"
									render={({ field }) => (
										<FormItem>
											<FormLabel>SKU (Stock Keeping Unit)</FormLabel>
											<FormControl>
												<Input placeholder="Enter SKU" {...field} />
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
												<Input placeholder="Enter Barcode" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</section>
						</section>
						<Separator />
						<section className="p-1 text-left">
							Save the product to edit more variant details.
						</section>
						<Separator />
						<DialogFooter
							className={`mt-5 flex w-full flex-col items-center sm:justify-between`}
						>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>

							{/* <DialogClose asChild> */}
							<Button type="submit" onClick={() => setIsOpen(false)}>
								Done
							</Button>
							{/* </DialogClose> */}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
