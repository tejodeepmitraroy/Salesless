import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
	generalAccountDetailsSchema,
	GeneralAccountDetailsSchema,
} from '@/features/Account/schema';
import { getUserData } from '@/features/users/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const AccountGeneral = () => {
	const { data: userData } = useQuery({
		queryKey: ['user-data'],
		queryFn: () => getUserData(),
	});

	const form = useForm<GeneralAccountDetailsSchema>({
		resolver: zodResolver(generalAccountDetailsSchema),
		defaultValues: {
			firstName: userData?.firstName || '',
			lastName: userData?.lastName || '',
			email: userData?.email || '',
		},
	});

	const onSubmit = (data: GeneralAccountDetailsSchema) => {
		console.log(data);
	};

	return (
		<section className="mx-auto w-full max-w-5xl">
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
				<section className="grid grid-cols-3 space-y-4">
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
									<CardHeader className="flex items-center justify-between">
										<Avatar className="flex items-center justify-center">
											<AvatarImage src={userData?.avatar} />
											<AvatarFallback>AN</AvatarFallback>
										</Avatar>
										<div className="flex items-center gap-2">
											<Button variant="outline">Change</Button>
											<Button variant="outline">Update</Button>
										</div>
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
										<section className="flex w-full items-center gap-4 space-y-4">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input
																placeholder="john@example.com"
																{...field}
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="emailVerified"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Checkbox
																checked={field.value}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange(true)
																		: field.onChange(false);
																}}
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</section>
										<section className="flex w-full items-center gap-4 space-y-4">
											<FormField
												control={form.control}
												name="phone"
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input
																placeholder="john@example.com"
																{...field}
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="phoneVerified"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Checkbox
																checked={field.value}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange(true)
																		: field.onChange(false);
																}}
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
										</section>
									</CardFooter>
								</form>
							</Form>
						</Card>
					</section>
				</section>

				<section className="grid grid-cols-3 space-y-4">
					<section className="col-span-1">
						<Label className="text-lg font-medium">Stores</Label>
						<p className="text-muted-foreground text-left text-sm">
							View and access stores connected to your account.
						</p>
					</section>
					<section className="col-span-2">
						<Card>
							<CardHeader className="text-left">
								<Link to="/stores">View All stores</Link>
							</CardHeader>
						</Card>
					</section>
				</section>
			</section>
		</section>
	);
};

export default AccountGeneral;
