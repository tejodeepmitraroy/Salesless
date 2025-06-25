import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
	storeAddressSchema,
	StoreAddressSchema,
} from '@/features/Settings/schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const AddressSettings = () => {
	// Country options
	const countryOptions = [
		{ value: 'US', label: 'United States', code: '+1' },
		{ value: 'CA', label: 'Canada', code: '+1' },
		{ value: 'GB', label: 'United Kingdom', code: '+44' },
		{ value: 'AU', label: 'Australia', code: '+61' },
		{ value: 'DE', label: 'Germany', code: '+49' },
		{ value: 'FR', label: 'France', code: '+33' },
		{ value: 'JP', label: 'Japan', code: '+81' },
		{ value: 'IN', label: 'India', code: '+91' },
	];
	const form = useForm<StoreAddressSchema>({
		// mode: 'onChange',
		resolver: zodResolver(storeAddressSchema),
		defaultValues: {
			country: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zip: '',
			phone: '',
			country_code: '',
			timezone: '',
			money_format: '',
		},
	});

	const onSubmit = (data: StoreAddressSchema) => {
		console.log(data);
	};
	return (
		<Card>
			<CardHeader className="flex w-full flex-col text-left">
				<CardTitle>Store Address</CardTitle>
				<CardDescription>Configure your store address.</CardDescription>
			</CardHeader>
			{/* <section className="flex w-full"> */}
			<CardContent className="w-full text-left">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid w-full grid-cols-2 gap-4 gap-y-6"
					>
						<FormField
							control={form.control}
							name="address1"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Address Line 1</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="address2"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Address Line 2</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Country</FormLabel>
									<FormControl className="w-full">
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger id="store-country" className="w-full">
												<SelectValue placeholder="Select a country" />
											</SelectTrigger>
											<SelectContent>
												{countryOptions.map((country: any) => (
													<SelectItem key={country.value} value={country.value}>
														{country.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="zip"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Zip</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<section className="flex w-full flex-col gap-2">
							<Label htmlFor="phone">Phone Number</Label>
							<section className="flex w-full">
								<FormField
									control={form.control}
									name="country_code"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={(value) => field.onChange(value)}
												>
													<SelectTrigger className="w-[80px] flex-shrink-0">
														<SelectValue placeholder="Code" />
													</SelectTrigger>
													<SelectContent>
														{countryOptions.map((country: any) => (
															<SelectItem
																key={country.code}
																value={country.code}
															>
																{country.code}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="ml-2 w-full">
											<FormControl>
												<Input
													className="w-full"
													type="number"
													placeholder="shadcn"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</section>
						</section>
					</form>
				</Form>
			</CardContent>

			<Separator />
			<CardFooter className="flex justify-end gap-4">
				<Button size="sm" variant="outline">
					Cancel
				</Button>
				<Button size="sm">Save Changes</Button>
			</CardFooter>
		</Card>
	);
};

export default AddressSettings;
