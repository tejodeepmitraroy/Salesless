import { Check, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import HeaderSection from '@/components/layouts/HeaderSection';
import { Separator } from '@/components/ui/separator';
import { checkoutSubscription } from '@/features/Billing/services';

const Billing = () => {
	const plans = [
		{
			name: 'Basic',
			price: '$12',
			tierId: 'basic',
			period: '/month',
			description: 'For individuals',
			features: [
				'1 User',
				'5 Projects',
				'5GB Storage',
				'Basic Support',
				'API Access',
				'Advanced Analytics',
				'Priority Support',
				'Custom Domain',
			],
			included: [true, true, true, false, false, false, false, false],
			popular: false,
		},
		{
			name: 'Grow',
			price: '$24',
			period: '/month',
			tierId: 'grow',
			description: 'For small teams',
			features: [
				'5 Users',
				'15 Projects',
				'50GB Storage',
				'Priority Support',
				'API Access',
				'Advanced Analytics',
				'Priority Support',
				'Custom Domain',
			],
			included: [true, true, true, true, true, false, false, false],
			popular: true,
		},
		{
			name: 'Scale',
			price: '$49',
			period: '/month',
			tierId: 'scale',
			description: 'For large teams',
			features: [
				'Unlimited Users',
				'Unlimited Projects',
				'1TB Storage',
				'24/7 Support',
				'API Access',
				'Advanced Analytics',
				'Priority Support',
				'Custom Domain',
			],
			included: [true, true, true, true, true, true, true, true],
			popular: false,
		},
	];

	// const features = [
	// 	'Users',
	// 	'Projects',
	// 	'Storage',
	// 	'Support',
	const handleCheckoutSubscription = async (tierName: string) => {
		try {
			const response = await checkoutSubscription(tierName);
			// Redirect to Stripe Checkout
			window.location.href = response.url;
		} catch (error) {
			console.error('Checkout failed:', error);
			// Handle error (e.g., show error toast)
		}
	};

	return (
		<div className="mx-auto mb-12 w-full max-w-5xl">
			<HeaderSection
				title="Upgrade to unleash everything"
				description="Your Workspace is currently on the Free Forever Plan. You have used 0/100 MB."
				className="mb-6"
			/>
			<section className="flex flex-col gap-6 md:grid md:grid-cols-3">
				{plans.map((plan, index) => (
					<Card
						key={index}
						className={`relative ${plan.popular ? 'border-sky-400 pt-0 shadow-lg' : 'mt-10'} rounded-2xl`}
					>
						{plan.popular && (
							<div className="from-primary flex w-full items-center justify-center rounded-t-2xl bg-linear-to-r via-blue-600 to-sky-400 py-3 text-center text-white">
								<Heart className="mr-2 h-4 w-4" />
								Most Popular
							</div>
						)}
						<CardHeader className="gap-2 text-left">
							<CardTitle className="text-xl">{plan.name}</CardTitle>
							<CardDescription className="text-left">
								{plan.description}
							</CardDescription>
							<div className="flex items-center gap-2">
								<span className="text-3xl font-medium">{plan.price}</span>
								<span className="text-muted-foreground text-sm">
									{plan.period}
								</span>
							</div>

							<Separator className="mt-1" />
						</CardHeader>
						<CardContent>
							<Button
								className={`mb-4 w-full cursor-pointer bg-black ${plan.popular ? 'from-primary bg-linear-to-r via-blue-600 to-sky-400 shadow-lg' : ''}`}
								onClick={() => handleCheckoutSubscription(plan.tierId)}
							>
								Upgrade
							</Button>
							<CardDescription className="text-left">
								Everything from Free Forever, and more:
							</CardDescription>
							<ul className="mt-4 space-y-3">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex items-center">
										{plan.included[i] ? (
											<Check className="mr-2 h-4 w-4 text-green-500" />
										) : (
											<X className="mr-2 h-4 w-4 text-gray-300" />
										)}
										<span
											className={
												plan.included[i]
													? 'text-sm'
													: 'text-muted-foreground text-sm'
											}
										>
											{feature}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				))}
			</section>

			{/* <section className="bg-card rounded-lg border p-6">
				<h2 className="mb-6 text-xl font-semibold">Plan Comparison</h2>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr>
								<th className="px-4 py-3 text-left">Features</th>
								{plans.map((plan, index) => (
									<th key={index} className="px-4 py-3 text-center">
										{plan.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{features.map((feature, rowIndex) => (
								<tr
									key={rowIndex}
									className={rowIndex % 2 === 0 ? 'bg-muted/20' : ''}
								>
									<td className="px-4 py-3">{feature}</td>
									{plans.map((plan, planIndex) => (
										<td key={planIndex} className="px-4 py-3 text-center">
											{plan.included[rowIndex] ? (
												<Check className="mx-auto h-5 w-5 text-green-500" />
											) : (
												<X className="mx-auto h-5 w-5 text-gray-300" />
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section> */}
		</div>
	);
};

export default Billing;
