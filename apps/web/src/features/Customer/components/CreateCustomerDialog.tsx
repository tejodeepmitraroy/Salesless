import * as React from 'react';
import type { AxiosResponse } from 'axios';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomerService } from '../services';

const customerSchema = z.object({
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	email: z.string().email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type CustomerInput = z.infer<typeof customerSchema>;

const CreateCustomerDialog = () => {
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);

	const form = useForm<CustomerInput>({
		resolver: zodResolver(customerSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});

	const { isLoading } = form.formState;

	const { mutate } = useMutation<
		AxiosResponse<any>,
		Error,
		CustomerInput,
		unknown
	>({
		mutationFn: (data: CustomerInput) => createCustomerService(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['customers'] });
			setOpen(false);
			form.reset();
		},
	});

	async function onSubmit(data: CustomerInput) {
		mutate(data);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="gap-2" variant="outline">
					<Plus className="h-4 w-4" /> Create
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create New Customer</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new customer.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
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
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="example@mail.com"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="******" type="password" {...field} />
									</FormControl>
									<FormDescription>
										Password must be at least 6 characters.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Creating...' : 'Create Customer'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCustomerDialog;
