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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	regionalSettingsSchema,
	RegionalSettingsSchema,
} from '@/features/Settings/schema';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useStoreConfig } from '@/stores/useStoreConfig';

const RegionalSettings = () => {
	const settings = useStoreConfig((state) => state.settings);
	// Timezone options for the store settings
	const timezoneOptions = [
		{ value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
		{ value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
		{ value: 'America/Chicago', label: 'Central Time (US & Canada)' },
		{ value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
		{ value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
		{ value: 'Europe/London', label: 'London' },
		{ value: 'Europe/Paris', label: 'Paris' },
		{ value: 'Asia/Tokyo', label: 'Tokyo' },
		{ value: 'Australia/Sydney', label: 'Sydney' },
	];
	// Money format options
	const moneyFormatOptions = [
		{ value: '${{amount}}', label: '$ - USD ($10.00)' },
		{ value: '€{{amount}}', label: '€ - EUR (€10.00)' },
		{ value: '£{{amount}}', label: '£ - GBP (£10.00)' },
		{ value: '¥{{amount}}', label: '¥ - JPY (¥1000)' },
		{ value: '{{amount}} kr', label: 'kr - SEK (10.00 kr)' },
	];

	const form = useForm<RegionalSettingsSchema>({
		// mode: 'onChange',
		resolver: zodResolver(regionalSettingsSchema),
		defaultValues: {
			timezone: settings?.timezone || '',
			currency_format: settings?.currency_format || '',
		},
	});

	const onSubmit = (data: RegionalSettingsSchema) => {
		console.log(data);
	};

	return (
		<Card className="mt-6">
			<section className="flex w-full flex-col md:flex-row">
				<CardHeader className="flex w-full flex-col text-left">
					<CardTitle>Regional Settings</CardTitle>
					<CardDescription>
						Configure your store information and preferences.
					</CardDescription>
				</CardHeader>
				<CardContent className="mt-6 w-full text-left">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="timezone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Timezone</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
											>
												<SelectTrigger className="w-full" id="timezone">
													<SelectValue placeholder="Select a timezone" />
												</SelectTrigger>
												<SelectContent>
													{timezoneOptions.map((timezone: any) => (
														<SelectItem
															key={timezone.value}
															value={timezone.value}
														>
															{timezone.label}
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
								name="currency_format"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Store Description</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={(value) => field.onChange(value)}
											>
												<SelectTrigger className="w-full" id="money-format">
													<SelectValue placeholder="Select a currency format" />
												</SelectTrigger>
												<SelectContent>
													{moneyFormatOptions.map((format: any) => (
														<SelectItem key={format.value} value={format.value}>
															{format.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
			</section>
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

export default RegionalSettings;
