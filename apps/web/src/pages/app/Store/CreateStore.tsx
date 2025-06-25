import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
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
import { useState } from 'react';
import ChatButton from '@/components/ChatButton';
import { Label } from '@/components/ui/label';

const CreateStore: React.FC = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

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

			const store = await createStoreService({
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

			navigate(`/store/${store.id}`);
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
		<div className="bg-background flex min-h-screen items-center justify-center p-4">
			<ChatButton />
			<section className="fixed top-0 z-50 flex w-full items-center">
				<div className="mx-auto flex w-full max-w-4xl items-center px-3">
					<div className="my-6 flex items-center gap-2">
						<img
							src="/logo.png"
							alt=""
							className="h-10 w-10 rounded-lg border"
						/>
						<Label className="text-xl font-bold">SalesLess</Label>
					</div>
				</div>
			</section>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-lg"
			>
				{/* <div className="mb-6 text-center">
					<h1 className="mb-2 text-3xl font-bold">
						<span className="text-primary">Vendor</span>
						<span className="text-vsphere-dark">Sphere</span>
					</h1>
					<p className="text-lg text-gray-600">Create your new store</p>
				</div> */}

				<Card className="w-full max-w-lg py-10">
					<CardHeader className="px-10">
						{/* <section className="mb-5 flex items-center gap-2">
							<img
								src="/icons/logo.png"
								alt=""
								className="border-primary h-10 w-10 rounded-lg border"
							/>
						</section> */}
						<CardTitle className="flex items-center gap-2 text-left text-2xl font-bold">
							<Store /> Create Store
						</CardTitle>
						<CardDescription className="text-left">
							Create a new store
						</CardDescription>
					</CardHeader>

					<CardContent className="px-10">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
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
								<section className="flex justify-between">
									<Button
										type="button"
										variant="outline"
										onClick={handleCancel}
									>
										Cancel
									</Button>
									<Button
										type="submit"
										disabled={isLoading}
										className="bg-primary hover:bg-primary/90"
									>
										{isLoading ? 'Creating...' : 'Create Store'}
									</Button>
								</section>
							</form>
						</Form>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default CreateStore;
