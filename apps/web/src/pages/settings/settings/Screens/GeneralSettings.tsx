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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
	generalSettingsSchema,
	GeneralSettingsSchema,
} from '@/features/Settings/schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const General = () => {
	const form = useForm<GeneralSettingsSchema>({
		// mode: 'onChange',
		resolver: zodResolver(generalSettingsSchema),
		defaultValues: {
			storeName: '',
			storeDescription: '',
			storeDomain: '',
		},
	});

	const onSubmit = (data: GeneralSettingsSchema) => {
		console.log(data);
	};
	return (
		<Card>
			<section className="flex w-full">
				<CardHeader className="flex w-full flex-col text-left">
					<CardTitle>General Settings</CardTitle>
					<CardDescription>
						Configure your store information and preferences.
					</CardDescription>
				</CardHeader>
				<CardContent className="w-full text-left">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="storeName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Store Name</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="storeDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Store Description</FormLabel>
										<FormControl>
											<Textarea placeholder="shadcn" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="storeDomain"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Store Domain</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormDescription>
											Your store's custom domain or subdomain.
										</FormDescription>

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

export default General;
