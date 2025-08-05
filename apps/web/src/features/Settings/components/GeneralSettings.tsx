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
// import { useStoreStore } from '@/stores/useStore-Store';
import {
	getGeneralSettingsService,
	updateGeneralSettingsService,
} from '../services';
import { toast } from 'sonner';

const General = () => {
	const form = useForm<GeneralSettingsSchema>({
		// mode: 'onChange',
		resolver: zodResolver(generalSettingsSchema),
		defaultValues: async () => {
			const response = await getGeneralSettingsService();
			return {
				storeName: response.name,
				storeDomain: response.domain,
				storeDescription: response.description,
			};
		},
	});

	const {
		formState: { isDirty },
		reset,
	} = form;

	const onSubmit = async (data: GeneralSettingsSchema) => {
		try {
			const response = await updateGeneralSettingsService({
				name: data.storeName,
				domain: data.storeDomain,
				description: data.storeDescription,
			});
			toast.success('General Settings Updated Successfully');
			console.log(response);
		} catch (error) {
			console.log(error);
		}

		console.log(data);
	};

	return (
		<Card className="mt-6">
			<section className="flex w-full flex-col md:flex-row">
				<CardHeader className="flex w-full flex-col text-left">
					<CardTitle>General Settings</CardTitle>
					<CardDescription>
						Configure your store information and preferences.
					</CardDescription>
				</CardHeader>
				<CardContent className="mt-6 w-full text-left">
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
				<Button
					size="sm"
					variant="outline"
					disabled={!isDirty}
					onClick={() => reset()}
				>
					Cancel
				</Button>
				<Button size="sm" disabled={!isDirty}>
					Save Changes
				</Button>
			</CardFooter>
		</Card>
	);
};

export default General;
