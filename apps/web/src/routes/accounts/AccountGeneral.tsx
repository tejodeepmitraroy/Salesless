import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AccountDangerZone from '@/features/Account/components/AccountDangerZone';
import ProfileAvatar from '@/features/Account/components/ProfileAvatar';
import {
	generalAccountDetailsSchema,
	GeneralAccountDetailsSchema,
} from '@/features/Account/schema';
import { getUserData } from '@/features/Account/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';

const AccountGeneral = () => {
	const { data: userData } = useQuery({
		queryKey: ['user-data'],
		queryFn: () => getUserData(),
	});

	console.log('userData', userData);

	const form = useForm<GeneralAccountDetailsSchema>({
		resolver: zodResolver(generalAccountDetailsSchema),
	});

	const {
		formState: { isDirty, dirtyFields },
	} = form;

	console.log('isDirty', isDirty);
	console.log('dirtyFields', dirtyFields);
	useEffect(() => {
		if (userData) {
			console.log(userData);
			form.reset({
				firstName: userData.firstName,
				lastName: userData.lastName,
				email: userData.email,
				avatar: userData.avatar,
			});
		}
	}, [userData, form]);

	const onSubmit = (data: GeneralAccountDetailsSchema) => {
		console.log(data);

		toast.success('Event has been created', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			action: {
				label: 'Undo',
				onClick: () => form.reset(),
			},
			position: 'top-center',
		});
	};

	useEffect(() => {
		if (isDirty) {
			toast.loading('Event has been created', {
				description: 'Sunday, December 03, 2023 at 9:00 AM',
				action: {
					label: 'Reset',
					onClick: () => form.reset(),
				},
				position: 'top-center',
			});
		}
	}, [isDirty, form]);
	return (
		<section className="mx-auto w-full max-w-5xl">
			{/* <Alert className="border border-green-500 text-left text-green-500">
				<CircleCheckBig />
				<AlertTitle>Verify the Email</AlertTitle>
				<AlertDescription>
					Your email is not verified. Please verify your email to continue.
				</AlertDescription>
			</Alert> */}
			<header className="flex w-full items-start justify-between pt-4">
				<div className="mb-4 flex flex-col items-start">
					<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-black">
						Account General
					</h1>
					<p className="text-muted-foreground">Manage your account details</p>
				</div>
				<div className="flex items-center gap-2"></div>
			</header>
			<Separator />
			<section className="mt-6 flex w-full flex-col gap-6">
				<section className="grid grid-cols-3 gap-4 space-y-4">
					<section className="col-span-1">
						<Label className="text-lg font-medium">Details</Label>
					</section>
					<section className="col-span-2">
						<Card>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6"
								>
									<CardHeader className="flex items-center justify-start gap-10">
										<FormField
											control={form.control}
											name="avatar"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormControl>
														<ProfileAvatar
															avatar={field.value}
															onChange={field.onChange}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</CardHeader>
									<Separator />
									<CardContent className="space-y-4">
										<section className="flex gap-3">
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input placeholder="John" {...field} />
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input placeholder="Doe" {...field} />
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</section>
										<p className="text-muted-foreground text-left text-xs">
											You can verify your email address by clicking on the link
											in the email we sent to you.
										</p>
									</CardContent>
									<Separator />
									<CardFooter className="flex flex-col">
										{/* <section className="flex w-full flex-col items-center gap-4 space-y-4">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Email</FormLabel>
														<FormControl>
															<div className="flex items-center gap-2">
																<section className="flex w-full items-center gap-2">
																	<CircleCheckBig />

																	<Input
																		placeholder="john@example.com"
																		{...field}
																		readOnly
																	/>
																</section>
																<Button variant="outline">Update</Button>
															</div>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="phone"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Phone</FormLabel>
														<FormControl>
															<div className="flex items-center gap-2">
																<Input
																	placeholder="john@example.com"
																	{...field}
																/>
																<Button variant="outline">Update</Button>
															</div>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</section> */}
										<section className="flex w-full items-center justify-end">
											<Button type="submit">Update</Button>
										</section>
									</CardFooter>
								</form>
							</Form>
						</Card>
					</section>
				</section>

				<Separator />

				<section className="grid grid-cols-3 gap-4 space-y-4">
					<section className="col-span-1">
						<Label className="text-lg font-medium">Stores</Label>
						<p className="text-muted-foreground text-left text-sm">
							View and access stores connected to your account.
						</p>
					</section>
					<section className="col-span-2">
						<Card>
							<CardHeader className="text-left">
								<Link to="/store">View All stores</Link>
							</CardHeader>
						</Card>
					</section>
				</section>
				<Separator />

				{/* <section className="grid grid-cols-3 space-y-4 gap-4">
					<section className="col-span-1">
						<Label className="text-lg font-medium">Preferred language</Label>
						<p className="text-muted-foreground text-left text-sm">
							When you're logged in to Salesless, this is the language you will
							see. It doesn't affect the language your customers see on your
							online store.
						</p>
					</section>
					<section className="col-span-2">
						<Card>
							<CardHeader className="text-left">
								<CardTitle>Preferred Region</CardTitle>
							</CardHeader>
							<CardContent>
								
								
							</CardContent>
						</Card>
					</section> 
				</section>*/}
			</section>

			<AccountDangerZone />
		</section>
	);
};

export default AccountGeneral;
