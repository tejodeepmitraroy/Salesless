import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { ProductVariantOption, productVariantOptionSchema } from '../schema';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface ProductVariantOptionManagerProps {
	options: ProductVariantOption[];
	onChange: (options: ProductVariantOption[]) => void;
}

const ProductVariantOptionManager: React.FC<
	ProductVariantOptionManagerProps
> = ({ options, onChange }) => {
	// const addOption = () => {
	// 	const newOption: ProductVariantOption = {
	// 		id: nanoid(),
	// 		name: 'Size',
	// 		position: options.length + 1,
	// 		values: [
	// 			{
	// 				id: nanoid(),
	// 				value: 'Small',
	// 				position: 1,
	// 			},
	// 			{
	// 				id: nanoid(),
	// 				value: 'Medium',
	// 				position: 2,
	// 			},
	// 			{
	// 				id: nanoid(),
	// 				value: 'Large',
	// 				position: 3,
	// 			},
	// 		],
	// 	};

	// 	onChange([...options, newOption]);
	// };
	// const addValue = (optionId: string) => {
	// 	const option = options.find((option) => option.id === optionId);
	// 	if (!option) return;
	// 	const newValue: ProductVariantOption['values'][number] = {
	// 		id: nanoid(),
	// 		value: '',
	// 		position: option.values.length + 1,
	// 	};

	// 	onChange([
	// 		...options.map((option) =>
	// 			option.id === optionId
	// 				? { ...option, values: [...option.values, newValue] }
	// 				: option
	// 		),
	// 	]);
	// };

	// const removeOption = (id: string) => {
	// 	onChange(options.filter((option) => option.id !== id));
	// };

	// const removeValue = (optionId: string, valueId: string) => {
	// 	onChange(
	// 		options.map((option) =>
	// 			option.id === optionId
	// 				? {
	// 						...option,
	// 						values: option.values.filter((value) => value.id !== valueId),
	// 					}
	// 				: option
	// 		)
	// 	);
	// };

	// const updateOption = (
	// 	id: string,
	// 	field: keyof ProductVariantOption,
	// 	value: any
	// ) => {
	// 	onChange(
	// 		options.map((option) =>
	// 			option.id === id ? { ...option, [field]: value } : option
	// 		)
	// 	);
	// };

	// const updateValue = (
	// 	optionId: string,
	// 	valueId: string,
	// 	field: keyof ProductVariantOption['values'][number],
	// 	valueData: string
	// ) => {
	// 	console.log(optionId, valueId, field, valueData);
	// 	onChange(
	// 		options.map((option) =>
	// 			option.id === optionId
	// 				? {
	// 						...option,
	// 						values: option.values.map((items) =>
	// 							items.id === valueId ? { ...items, [field]: valueData } : items
	// 						),
	// 					}
	// 				: option
	// 		)
	// 	);
	// };

	return (
		<section>
			{options.length === 0 ? (
				// <Button
				// 	type="button"
				// 	variant="ghost"
				// 	className="flex items-center gap-1"
				// >
				// 	<Plus className="h-3 w-3" /> Add Variant
				// </Button>

				<VariantOptionDialog options={options} onChange={onChange} />
			) : (
				<Card className="pb-0">
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">
							Variants Options
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex w-full flex-col items-start gap-1">
							{options.map((option) => (
								<>
									<Card className="relative w-full gap-2 rounded-md border-0 px-0 py-3 shadow-none">
										<CardHeader className="flex items-center justify-between">
											<CardTitle className="text-sm font-medium">
												{option.name}
											</CardTitle>
										</CardHeader>
										<CardContent className="flex w-full flex-wrap items-center justify-start gap-3">
											{option.values.map((value) => (
												<Badge className="rounded-md text-sm" key={value.value}>
													{value.value}
												</Badge>
											))}
										</CardContent>
									</Card>
									<Separator />
								</>
							))}
						</div>

						{/* {options.map((option) => (
							<Card className="relative gap-5 rounded-md border px-0 py-2">
								<CardContent className="space-y-4">
									<section className="flex w-full flex-col items-start gap-1">
										<label className="mb-1 block text-sm font-medium">
											Option Name
										</label>
										<Input
											type="text"
											placeholder="Option name like Size & Color"
											value={option.name || ''}
											onChange={(e) =>
												updateOption(option.id, 'name', e.target.value)
											}
										/>
									</section>
									<section className="flex w-full flex-col items-start gap-1">
										<section className="flex w-full items-center justify-between">
											<label className="mb-1 block text-sm font-medium">
												Option Values
											</label>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => addValue(option.id)}
												className="flex items-center gap-1"
											>
												<Plus className="h-3 w-3" /> Add Value
											</Button>
										</section>
										<div className="flex w-full flex-col gap-2">
											{option.values.length > 0 &&
												option.values.map((value) => (
													<div
														key={value.id}
														className="flex w-full items-center gap-2"
													>
														<Input
															placeholder="Add Value"
															className="h-8 w-full flex-1 text-xs"
															value={value.value}
															onChange={(e) => {
																updateValue(
																	option.id,
																	value.id,
																	'value',
																	e.target.value
																);
															}}
														/>

														{option.values.length > 1 && (
															<Button
																type="button"
																variant="ghost"
																size="sm"
																onClick={() => removeValue(option.id, value.id)}
																className="h-8 w-8 p-0"
															>
																<X className="h-3 w-3" />
															</Button>
														)}
													</div>
												))}
										</div>
									</section>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button
										type="button"
										variant="outline"
										size={'sm'}
										onClick={() => removeOption(option.id)}
									>
										Delete
									</Button>
									<Button
										type="button"
										variant="default"
										size={'sm'}
										onClick={() => removeOption(option.id)}
									>
										Done
									</Button>
								</CardFooter>
							</Card>
						))} */}
					</CardContent>
					<CardFooter className="flex flex-col items-center justify-start p-0">
						<Separator />
						<VariantOptionDialog options={options} onChange={onChange} />
					</CardFooter>

					{/* {options.length === 0 ? (
				<p className="text-muted-foreground text-sm">
					No variants added. Add variants if this product comes in different
					options like sizes or colors.
				</p>
			) : (
				
			)} */}
				</Card>
			)}
		</section>
	);
};

export default ProductVariantOptionManager;

interface VariantOptionDialogProps {
	options: ProductVariantOption[];
	onChange: (options: ProductVariantOption[]) => void;
}

export const VariantOptionDialog: React.FC<VariantOptionDialogProps> = ({
	options,
	onChange,
}) => {
	const form = useForm<z.infer<typeof productVariantOptionSchema>>({
		resolver: zodResolver(productVariantOptionSchema),
		mode: 'onChange',
		defaultValues: {
			position: options.length + 1,
			values: [
				{
					position: 1,
				},
			],
		},
	});

	const {
		watch,
		formState: { isSubmitting },
	} = form;

	const name = watch('name');
	const values = watch('values');
	const isFormIncomplete =
		!name?.trim() || values.some((v) => !v.value?.trim());

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'values',
	});

	function onSubmit(values: z.infer<typeof productVariantOptionSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		// Update parent component
		onChange([...options, values]);

		// Reset the form
		form.reset({
			position: options.length + 2,
			values: [
				{
					position: 1,
				},
			],
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					className="flex items-center gap-1"
				>
					<Plus className="h-3 w-3" /> Add Variant
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Add Variant Option</DialogTitle>
							<DialogDescription>
								Add new variant option here. Click save when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Option Name</FormLabel>
										<FormControl>
											<Input placeholder="e.g. Size, Color" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="values"
								render={() => (
									<FormItem>
										<FormLabel>Option Values</FormLabel>
										<FormControl className="flex flex-col gap-2">
											<div className="space-y-2">
												{fields.map((field, index) => (
													<div
														key={field.id}
														className="flex items-center gap-2"
													>
														<Input
															placeholder="Add Value"
															className="h-8 flex-1 text-xs"
															{...form.register(
																`values.${index}.value` as const,
																{
																	required: 'Value is required',
																}
															)}
														/>

														{fields.length > 1 && (
															<Button
																type="button"
																variant="ghost"
																size="sm"
																onClick={() => remove(index)}
																className="h-8 w-8 p-0"
															>
																<X className="h-3 w-3" />
															</Button>
														)}
													</div>
												))}
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() =>
														append({
															value: '',
															position: fields.length + 1,
														})
													}
													className="flex items-center gap-1"
												>
													<Plus className="h-3 w-3" /> Add Value
												</Button>
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="mt-5 flex items-center justify-between">
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>

							<DialogClose asChild>
								<Button
									disabled={isFormIncomplete || isSubmitting}
									type="submit"
								>
									Save
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
