import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	passwordSetupSchema,
	PasswordSetupSchema,
} from '@/features/Account/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const AccountSecurity = () => {
	const form = useForm<PasswordSetupSchema>({
		resolver: zodResolver(passwordSetupSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (data: PasswordSetupSchema) => {
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
						<Label className="text-lg font-medium">Password</Label>
					</section>
					<section className="col-span-2">
						<Card>
							<CardHeader className="text-left">
								<CardTitle>You have never changed your password.</CardTitle>
							</CardHeader>
							<CardContent className="flex items-start justify-start">
								<Dialog>
									<DialogTrigger>
										<Button variant="outline">Change Password</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Change Password</DialogTitle>
										</DialogHeader>
										<section>
											<Form {...form}>
												<form
													onSubmit={form.handleSubmit(onSubmit)}
													className="space-y-6"
												>
													<FormField
														control={form.control}
														name="currentPassword"
														render={({ field }) => (
															<FormItem className="w-full">
																<FormLabel>Current Password</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Current Password"
																		{...field}
																	/>
																</FormControl>

																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={form.control}
														name="newPassword"
														render={({ field }) => (
															<FormItem className="w-full">
																<FormLabel>New Password</FormLabel>
																<FormControl>
																	<Input
																		placeholder="New Password"
																		{...field}
																	/>
																</FormControl>

																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="confirmPassword"
														render={({ field }) => (
															<FormItem className="w-full">
																<FormLabel>Confirm Password</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Confirm Password"
																		{...field}
																	/>
																</FormControl>

																<FormMessage />
															</FormItem>
														)}
													/>
												</form>
											</Form>
										</section>
										<DialogFooter>
											<DialogClose>
												<Button type="submit">Change Password</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</CardContent>
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

export default AccountSecurity;
