import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { ProductVariantOption } from '../schema';
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
import { nanoid } from 'nanoid';
import { Label } from '@/components/ui/label';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProductFormValues } from '@/pages/app/Products/CreateNewProduct';
import { useState } from 'react';

const ProductVariantOptionManager = () => {
	const { control } = useFormContext<ProductFormValues>();

	const {
		fields: options,
		append: appendVariantOption,
		remove: removeVariantOption,
		update: updateVariantOption,
	} = useFieldArray({
		control,
		name: 'options',
	});

	return (
		<section className="mx-6">
			{options.length === 0 ? (
				<VariantOptionDialog
					onAppend={(variant) => appendVariantOption(variant)}
				>
					<Button
						type="button"
						variant="ghost"
						className="flex items-center gap-1"
					>
						<Plus className="h-3 w-3" /> Add Variant
					</Button>
				</VariantOptionDialog>
			) : (
				<Card className="pb-0">
					{/* <CardHeader className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">
							Variants Options
						</CardTitle>
					</CardHeader> */}
					<CardContent className="flex w-full flex-col items-start gap-1">
						{options.map((option, optionIndex) => (
							<VariantOptionDialog
								key={option.name}
								variant={option}
								onUpdate={(variant) =>
									updateVariantOption(optionIndex, variant)
								}
								onRemove={() => removeVariantOption(optionIndex)}
							>
								<Card className="relative flex w-full gap-3 rounded-md border-0 px-0 py-3 shadow-none">
									<CardHeader className="flex items-center justify-between">
										<CardTitle className="text-sm leading-3 font-medium">
											{option.name}
										</CardTitle>
									</CardHeader>
									<CardContent className="flex w-full flex-wrap items-center justify-start gap-2">
										{option.values.map((value) => (
											<Badge className="rounded text-sm" key={value.value}>
												{value.value}
											</Badge>
										))}
									</CardContent>
									<Separator />
								</Card>
							</VariantOptionDialog>
						))}
					</CardContent>
					<CardFooter className="flex flex-col items-center justify-start p-0">
						<Separator />
						<VariantOptionDialog
							onAppend={(variant) => appendVariantOption(variant)}
						>
							<Button
								type="button"
								variant="ghost"
								className="flex items-center gap-1"
							>
								<Plus className="h-3 w-3" /> Add Variant
							</Button>
						</VariantOptionDialog>
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
	children: React.ReactNode;
	variant?: ProductVariantOption;
	onAppend?: (variant: ProductVariantOption) => void;
	onUpdate?: (variant: ProductVariantOption) => void;
	onRemove?: () => void;
}

export const VariantOptionDialog: React.FC<VariantOptionDialogProps> = ({
	onAppend,
	onUpdate,
	onRemove,
	variant,
	children,
}) => {
	const [name, setName] = useState<string>(variant?.name ?? '');
	const [values, setValues] = useState<
		Array<{ id: string; value: string; position: number }>
	>(
		variant?.values.map((value) => ({
			id: nanoid(),
			value: value.value,
			position: value.position,
		})) ?? []
	);

	const isFormIncomplete =
		!name?.trim() || values.some((v) => !v.value?.trim());

	const handleUpdate = () => {
		const option = {
			name: name,
			position: variant?.position ?? 0,
			values: values,
		};
		onUpdate?.(option);
	};

	const handleAppend = () => {
		const option: ProductVariantOption = {
			name: name,
			position: values.length + 1,
			values: values.map((value, index) => ({
				value: value.value,
				position: index + 1,
			})),
		};
		onAppend?.(option);
	};

	const handleAddValues = ({
		valueId,
		value,
	}: {
		valueId: string;
		value: string;
	}) => {
		setValues((prev) =>
			prev.map((valueData) =>
				valueData.id === valueId
					? {
							...valueData,
							value: value,
						}
					: valueData
			)
		);
	};
	const handleRemoveOption = () => {
		onRemove?.();
	};

	const handleRemoveValues = (valueId: string) => {
		setValues((prev) => prev.filter((valueData) => valueData.id !== valueId));
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Variant Option</DialogTitle>
					<DialogDescription>
						Add new variant option here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<section className="space-y-4">
					<div className="flex flex-col items-start gap-3">
						<Label htmlFor="name">Option Name</Label>
						<Input
							placeholder="e.g. Size, Color"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start gap-3">
						<Label htmlFor="values">Option Values</Label>
						<div className="w-full space-y-2">
							{values.map((value) => (
								<div key={value.id} className="flex items-center gap-2">
									<Input
										placeholder=""
										value={value.value}
										className="h-8 w-full flex-1 text-xs"
										onChange={(e) =>
											handleAddValues({
												valueId: value.id,
												value: e.target.value,
											})
										}
									/>
									{values.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => handleRemoveValues(value.id)}
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
								className="flex items-center gap-1"
								onClick={() =>
									setValues((prev) =>
										prev.concat({
											id: nanoid(),
											value: '',
											position: prev.length + 1,
										})
									)
								}
							>
								<Plus className="h-3 w-3" /> Add Value
							</Button>
						</div>
					</div>
				</section>
				<DialogFooter
					className={`mt-5 flex w-full flex-col items-center ${variant ? 'sm:justify-between' : 'sm:justify-end'}`}
				>
					{!!variant && (
						<DialogClose asChild>
							<Button
								onClick={() => handleRemoveOption()}
								variant="outline"
								className="border-red-500 text-red-500 hover:border-red-500 hover:text-red-500"
							>
								Remove
							</Button>
						</DialogClose>
					)}

					<section className="flex items-center gap-2">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<DialogClose asChild>
							{variant ? (
								<Button
									onClick={handleUpdate}
									disabled={isFormIncomplete}
									type="submit"
								>
									Update
								</Button>
							) : (
								<Button
									onClick={handleAppend}
									disabled={isFormIncomplete}
									type="submit"
								>
									Save
								</Button>
							)}
						</DialogClose>
					</section>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
