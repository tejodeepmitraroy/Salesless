import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Send, Mail } from 'lucide-react';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { forgotPasswordSchema } from '@/features/users/schema';
import { forgetPassword } from '@/features/Auth/services';

const ForgotPasswordPage = () => {
	const form = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const { watch } = form;

	const email = watch('email');

	const [submitted, setSubmitted] = useState(false);

	const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
		try {
			await forgetPassword(data.email);
			// setEmail(data.email);
			setSubmitted(true);
			toast('Reset link sent', {
				description: 'Check your email for a link to reset your password.',
			});
		} catch (error) {
			console.log('Super Error', error);
			toast('Request failed', {
				description: "We couldn't process your request. Please try again.",
				// variant: "destructive",
			});
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="flex justify-center">
						<Link
							to="/login"
							className="text-primary mb-4 flex items-center hover:underline"
						>
							<ArrowLeft className="mr-1 h-4 w-4" />
							Back to login
						</Link>
					</div>
					<CardTitle className="text-center text-2xl font-bold">
						Forgot Password
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email and we'll send you a reset link
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!submitted ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<div className="relative">
													<Mail className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
													<Input
														type="email"
														placeholder="your.email@example.com"
														{...field}
														className="pl-9"
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									className="w-full"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? (
										<span className="flex items-center gap-2">
											<Send className="h-4 w-4 animate-pulse" />
											Sending...
										</span>
									) : (
										<span className="flex items-center gap-2">
											<Send className="h-4 w-4" />
											Send Reset Link
										</span>
									)}
								</Button>
							</form>
						</Form>
					) : (
						<div className="space-y-4 text-center">
							<div className="flex justify-center">
								<Mail className="text-primary h-16 w-16" />
							</div>
							<h3 className="text-lg font-medium">Check your email</h3>
							<p className="text-sm text-gray-500">
								We've sent a password reset link to <strong>{email}</strong>
							</p>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => setSubmitted(false)}
							>
								Send to a different email
							</Button>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<div className="text-center text-sm">
						Remember your password?{' '}
						<Link to="/login" className="text-primary hover:underline">
							Login
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ForgotPasswordPage;
