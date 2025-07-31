import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, CheckCircle2, AlertCircle, Package } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import {
	gatewaySettingsSchema,
	GatewaySettingsSchema,
} from '@/features/Settings/schema';

import { Switch } from '@/components/ui/switch';
import { fetchPaymentGatewayDetailsService } from '@/features/Settings/services';
import { useQuery } from '@tanstack/react-query';
import { supportedPaymentsGateways } from '@/features/Settings/config/paymentGateway-config';

const GatewaySlug = () => {
	const { storeId, gatewaySlug } = useParams<{
		storeId: string;
		gatewaySlug: string;
	}>();
	// const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const gatewayData = supportedPaymentsGateways.find(
		(p) => p.slug === gatewaySlug
	);

	const { data: paymentGatewayDetails } = useQuery({
		queryKey: ['paymentGatewayDetails', gatewayData?.gateway],
		queryFn: () => fetchPaymentGatewayDetailsService(gatewayData?.gateway),
	});

	console.log('paymentGatewayDetails', paymentGatewayDetails);
	const form = useForm<GatewaySettingsSchema>({
		resolver: zodResolver(gatewaySettingsSchema),
		defaultValues: {},
	});

	useEffect(() => {
		form.reset({
			apiKey: paymentGatewayDetails?.apiKey,
			apiSecret: paymentGatewayDetails?.apiSecret,
			apiUrl: paymentGatewayDetails?.apiUrl,
			isTestMode: paymentGatewayDetails?.mode === 'test',
		});
	}, [form, paymentGatewayDetails]);

	const onSubmit = async (data: GatewaySettingsSchema) => {
		try {
			// setIsSubmitting(true);
			setError(null);

			// Here you would typically make an API call to save the credentials
			console.log('Submitting gateway credentials:', data);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setIsSuccess(true);
			setTimeout(() => setIsSuccess(false), 3000);
		} catch (err) {
			setError('Failed to save credentials. Please try again.');
			console.error('Error saving gateway credentials:', err);
		} finally {
			// setIsSubmitting(false);
		}
	};

	if (!gatewayData) {
		return <Navigate replace to={`/store/${storeId}/settings/payments`} />;
	}

	return (
		<div className="container mx-auto max-w-7xl p-6">
			{/* Back button and header */}
			<header className="mb-8 flex flex-col items-start">
				<Link
					to={`/store/${storeId}/settings/payments`}
					className="inline-block"
				>
					<Button variant="ghost" size="sm" className="mb-6">
						<ChevronLeft className="mr-2 h-4 w-4" />
						Back to Payment Gateways
					</Button>
				</Link>

				<section className="flex items-center gap-4">
					<div className="flex aspect-square h-12 w-12 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
						<img
							src={gatewayData?.icon}
							alt={gatewayData?.name}
							className="aspect-square h-12 w-12 object-contain"
							onError={(e) => {
								// Fallback to a default icon if the image fails to load
								const target = e.target as HTMLImageElement;
								target.src = '/icons/payment-default.png';
							}}
						/>
					</div>
					<section className="flex w-full flex-col items-start px-3">
						<h1 className="text-lg font-bold">{gatewayData?.name}</h1>
						<p className="text-muted-foreground text-sm">
							{gatewayData?.description}
						</p>
					</section>
				</section>
			</header>

			<Tabs defaultValue="overview" className="w-full">
				<section className="bg-background flex w-full items-start justify-start">
					<TabsList>
						<TabsTrigger value="overview" className="text-base">
							Overview
						</TabsTrigger>
						<TabsTrigger value="api" className="text-base">
							API Credentials
						</TabsTrigger>
					</TabsList>
				</section>
				<Separator className="mb-4" />

				<TabsContent value="overview">
					<section className="flex w-full items-start justify-start">
						<h2 className="text-2xl font-bold">Overview</h2>
					</section>
					<section className="mt-5 flex w-full items-start justify-start gap-10">
						<div className="flex flex-col items-start justify-start text-xs">
							<span className="text-muted-foreground">BUILT BY</span>
							<span className="text-lg font-medium">Salesless</span>
						</div>
						<div className="flex flex-col items-start justify-start text-xs">
							<span className="text-muted-foreground">DOCS</span>
							<span className="flex items-center text-lg font-medium">
								<Package className="mr-2 h-4 w-4" />
								Salesless
							</span>
						</div>
						<div className="flex flex-col items-start justify-start text-xs">
							<span className="text-muted-foreground">STATUS</span>
							{paymentGatewayDetails?.active ? (
								<Badge className="bg-green-500 text-base font-medium">
									Active
								</Badge>
							) : (
								<Badge className="bg-red-500 text-base font-medium">
									Inactive
								</Badge>
							)}
						</div>
					</section>
					<section className="mt-5 w-full border"></section>
				</TabsContent>
				<TabsContent value="api">
					<section className="mt-5 w-full">
						{/* Main form */}
						<Card>
							<Form {...form}>
								<section className="flex w-full">
									<CardHeader className="flex w-full flex-col text-left">
										<CardTitle>Create a Stripe wrapper Settings</CardTitle>
										<CardDescription>
											Configure your Stripe wrapper settings.
										</CardDescription>
									</CardHeader>
									<CardContent className="w-full text-left">
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className="space-y-6"
										>
											<FormField
												control={form.control}
												name="apiKey"
												render={({ field }) => (
													<FormItem>
														<FormLabel>API Key</FormLabel>
														<FormControl>
															<Input placeholder="shadcn" {...field} />
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="apiSecret"
												render={({ field }) => (
													<FormItem>
														<FormLabel>API Secret</FormLabel>
														<FormControl>
															<Input placeholder="shadcn" {...field} />
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="apiUrl"
												render={({ field }) => (
													<FormItem>
														<FormLabel>API Url (Optional)</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormDescription>
															Your store's custom domain or subdomain.
														</FormDescription>

														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="isTestMode"
												render={({ field }) => (
													<FormItem className="flex flex-row items-center justify-start rounded-lg border p-3 shadow-sm">
														<FormControl>
															<Switch
																checked={field.value}
																onCheckedChange={field.onChange}
																className="data-[state=checked]:bg-green-500"
															/>
														</FormControl>
														<div className="space-y-0.5">
															<FormLabel className="text-lg font-medium">
																Test Mode
															</FormLabel>
														</div>
													</FormItem>
												)}
											/>
										</form>
									</CardContent>
								</section>
								<Separator />
								<CardFooter className="flex justify-end gap-4">
									<Button
										size="sm"
										variant="outline"
										// disabled={!isDirty}
										onClick={() => form.reset()}
									>
										Cancel
									</Button>
									<Button
										size="sm"
										// disabled={!isDirty}
										type="submit"
									>
										Save
									</Button>
								</CardFooter>
							</Form>
						</Card>
					</section>
				</TabsContent>
			</Tabs>

			{/* Status indicator */}
			{isSuccess && (
				<div className="mb-6 flex items-center gap-2 rounded-md bg-green-50 p-4 text-green-700">
					<CheckCircle2 className="h-5 w-5" />
					<span>Settings saved successfully!</span>
				</div>
			)}

			{error && (
				<div className="mb-6 flex items-center gap-2 rounded-md bg-red-50 p-4 text-red-700">
					<AlertCircle className="h-5 w-5" />
					<span>{error}</span>
				</div>
			)}

			{/* Help section */}
			<div className="bg-muted/50 mt-8 rounded-lg border p-6">
				<h3 className="mb-4 text-lg font-medium">
					Need help finding your API keys?
				</h3>
				<p className="text-muted-foreground mb-4 text-sm">
					You can find your {gatewayData?.name} API keys in the{' '}
					<a
						href={`https://dashboard.${gatewayData?.slug}.com/account/apikeys`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary underline"
					>
						{gatewayData?.name} Dashboard
					</a>
					. Make sure to use test keys for development and live keys for
					production.
				</p>

				<div className="mt-4 grid gap-4 md:grid-cols-2">
					<div className="rounded-md border bg-white p-4">
						<h4 className="mb-2 font-medium">Test Mode</h4>
						<p className="text-muted-foreground text-sm">
							Use test keys (starts with <code>pk_test_</code> and{' '}
							<code>sk_test_</code>) to process test payments without charging
							real cards.
						</p>
					</div>
					<div className="rounded-md border bg-white p-4">
						<h4 className="mb-2 font-medium">Live Mode</h4>
						<p className="text-muted-foreground text-sm">
							Use live keys (starts with <code>pk_live_</code> and{' '}
							<code>sk_live_</code>) to process real payments from your
							customers.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GatewaySlug;
