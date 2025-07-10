import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Eye, EyeOff, Mail, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { signUpSchema } from '@/features/users/schema';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { googleLoginService, signUpService } from '@/features/Auth/services';
import ChatButton from '@/components/ChatButton';

const SignupPage = () => {
	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	const [isLoading, setIsLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(false);
	// const { toast } = useToast();
	const navigate = useNavigate();

	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
		setIsLoading(true);
		try {
			await signUpService(data);
			toast('Account created!', {
				description: 'Your account has been successfully created.',
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
			toast('Registration failed', {
				description:
					'There was an error creating your account. Please try again.',
				// variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const toggleShowPassword = () => setShowPassword(!showPassword);

	return (
		<>
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
			<div className="flex min-h-screen items-center justify-center p-4">
				<Card className="w-full max-w-lg py-10">
					<CardHeader className="px-10">
						{/* <section className="mb-5 flex items-center gap-2">
							<img
								src="/logo.png"
								alt=""
								className="border-primary h-10 w-10 rounded-lg border"
							/>
						</section> */}
						<CardTitle className="text-left text-2xl font-bold">
							Create a Salesless account
						</CardTitle>
						<CardDescription className="text-left">
							Just a few steps to your store
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-5 px-10">
						<Link to={googleLoginService()} className="w-full">
							<Button
								variant="outline"
								className="hover:bg-primary/85 flex h-12 w-full items-center justify-center gap-3 text-black hover:text-white"
							>
								<img
									src={'/icons/google.png'}
									width={20}
									height={20}
									alt="google"
								/>
								<span>Sign up with Google</span>
							</Button>
						</Link>
						<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
							<span className="bg-card text-muted-foreground relative z-10 px-2">
								Or continue with
							</span>
						</div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<div className="relative flex w-full items-center gap-2">
													<Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
													<Input
														type="text"
														placeholder="Search products..."
														className="w-full rounded-md border py-2 pr-4 pl-10"
														{...field}
														required
													/>
												</div>
												{/* <Input
													id="email"
													type="email"
													placeholder="john.doe@example.com"
													{...field}
													required
												/> */}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<section className="flex w-full gap-2">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel htmlFor="firstName">First Name</FormLabel>
												<FormControl>
													<Input
														id="name"
														type="text"
														placeholder="John Doe"
														{...field}
														required
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel htmlFor="lastName">Last Name</FormLabel>
												<FormControl>
													<Input
														id="name"
														type="text"
														placeholder="John Doe"
														{...field}
														required
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</section>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel htmlFor="password">Password</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														id="password"
														type={showPassword ? 'text' : 'password'}
														placeholder=""
														{...field}
														required
													/>
												</FormControl>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute top-0 right-0"
													onClick={toggleShowPassword}
												>
													{showPassword ? (
														<EyeOff size={16} />
													) : (
														<Eye size={16} />
													)}
												</Button>
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="space-y-1">
											<FormLabel htmlFor="confirmPassword">
												Confirm Password
											</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														id="confirmPassword"
														type={showPassword ? 'text' : 'password'}
														placeholder=""
														{...field}
														required
													/>
												</FormControl>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute top-0 right-0"
													onClick={toggleShowPassword}
												>
													{showPassword ? (
														<EyeOff size={16} />
													) : (
														<Eye size={16} />
													)}
												</Button>
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<span className="flex items-center gap-2">
											Creating account...
										</span>
									) : (
										<span className="flex items-center gap-2">
											<UserPlus className="h-4 w-4" />
											Create Account
										</span>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter className="mt-2 flex flex-col items-start gap-2 space-y-2 px-10">
						<div className="text-muted-foreground text-left text-sm">
							Already have an account?{' '}
							<Link to="/login" className="text-primary hover:underline">
								Login
							</Link>
						</div>
						<p className="text-muted-foreground text-left text-sm">
							By providing your email, you agree to our{' '}
							<Link to="/terms" className="text-primary hover:underline">
								Terms and Service
							</Link>{' '}
							and{' '}
							<Link to="/privacy" className="text-primary hover:underline">
								Privacy Policy
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default SignupPage;
