import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { createStoreSchema } from '@/features/Store/schema';
import { createStoreService } from '@/features/Store/services';

const CreateStore: React.FC = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = React.useState(false);

	const form = useForm({
		resolver: zodResolver(createStoreSchema),
		defaultValues: {
			storeName: '',
			storeDescription: '',
			storeType: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof createStoreSchema>) => {
		setIsLoading(true);

		try {
			// Simulate API call
			// await new Promise((resolve) => setTimeout(resolve, 1500));

			await createStoreService({
				name: values.storeName,
				description: values.storeDescription,
				type: values.storeType,
				country: 'India',
				address: '126, subhash nagar byelane',
				phone: '9674128921',
			});

			toast('Store created', {
				description: `${values.storeName} has been created successfully!`,
			});

			navigate('/admin');
		} catch (error) {
			console.error('Error creating store:', error);
			toast('Error creating store', {
				description: 'Please try again later',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		navigate('/store');
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-lg"
			>
				<div className="mb-6 text-center">
					<h1 className="mb-2 text-3xl font-bold">
						<span className="text-vsphere-primary">Vendor</span>
						<span className="text-vsphere-dark">Sphere</span>
					</h1>
					<p className="text-lg text-gray-600">Create your new store</p>
				</div>

				<Card>
					<CardHeader>
						<div className="mb-3 flex items-center">
							<div className="bg-vsphere-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded-full">
								<Store className="text-vsphere-primary h-5 w-5" />
							</div>
							<div>
								<CardTitle>Store Details</CardTitle>
								<CardDescription>Set up your store information</CardDescription>
							</div>
						</div>
					</CardHeader>

					<Form {...form}>
						<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent className="space-y-6">
								<FormField
									control={form.control}
									name="storeName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Name *</FormLabel>
											<FormControl>
												<Input placeholder="My Awesome Store" {...field} />
											</FormControl>
											{/* <FormDescription>
												Enter a unique name for your store
											</FormDescription> */}
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
												<Textarea
													placeholder="Describe your store in a few words..."
													rows={3}
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
												Briefly describe your store's offerings
											</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="storeType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Type</FormLabel>
											<FormControl>
												<Input
													placeholder="Fashion, Electronics, etc."
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
												Select your store's primary category
											</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button type="button" variant="outline" onClick={handleCancel}>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isLoading}
									className="bg-vsphere-primary hover:bg-vsphere-primary/90"
								>
									{isLoading ? 'Creating...' : 'Create Store'}
								</Button>
							</CardFooter>
						</form>
					</Form>
				</Card>
			</motion.div>
		</div>
	);
};

export default CreateStore;
