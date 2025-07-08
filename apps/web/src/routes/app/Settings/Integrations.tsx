import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const Integrations = () => {
	const integrations = [
		{
			name: 'Stripe',
			description: 'Payment processing and subscription management',
			icon: '/icons/stripe.png',
			status: 'Active',
		},
		{
			name: 'PhonePe',
			description: 'Payment processing and subscription management',
			icon: '/icons/phone-pe.png',
			status: 'Active',
		},
	];
	return (
		<section className="w-full">
			{/* <section className="w-full">
				<section className="flex w-full items-center justify-between">
					<h2 className="text-2xl font-medium">Payments Gateway</h2>
					<Button className="bg-primary text-white">Add Payment Gateway</Button>
				</section>
			</section> */}
			<section className="mt-10 grid w-full grid-cols-3 gap-4 p-2">
				{integrations.map((integration) => (
					<Card className="bg-background flex items-center justify-start py-6 text-left shadow-none">
						<CardHeader className="mx-4 flex w-full items-start justify-start gap-3">
							<div className="flex aspect-square h-11 w-11 items-center justify-center rounded-lg border bg-white p-2">
								<img src={integration.icon} alt="" />
							</div>
							<section className="flex flex-col gap-1">
								<CardTitle className="text-base font-medium">
									{integration.name}
								</CardTitle>
								<CardDescription className="text-xs">
									{integration.description}
								</CardDescription>
								<section className="mt-3 flex items-center gap-2">
									{integration.status === 'Active' && (
										<Badge className="rounded-2xl bg-green-500 text-white">
											{integration.status}
										</Badge>
									)}
								</section>
							</section>
						</CardHeader>
					</Card>
				))}
			</section>
		</section>
	);
};

export default Integrations;
