import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';

import { Link } from 'react-router';

interface PaymentGatewayCardProps {
	storeId?: string;
	gateway: string;
	name: string;
	description: string;
	slug: string;
}

const itemsData = (slug: string) => {
	switch (slug) {
		case 'stripe':
			return {
				icon: '/icons/stripe.png',
				name: 'Stripe',
				description: 'Stripe Payment processing and subscription management',
			};
		case 'phonepe':
			return {
				icon: '/icons/phonepe.png',
				name: 'PhonePe',
				description: 'Payment processing and subscription management',
			};
		case 'razorpay':
			return {
				icon: '/icons/razorpay.png',
				name: 'Razorpay',
				description: 'Payment processing and subscription management',
			};
		default:
			return {
				icon: '/icons/payment-default.png',
				name: 'Payment Default',
				description: 'Payment processing and subscription management',
			};
	}
};

const PaymentGatewayCard: FC<PaymentGatewayCardProps> = ({
	storeId,
	gateway,
	name,
	description,
	slug,
}) => {
	return (
		<Link
			to={`/store/${storeId}/settings/payments/${slug}`}
			className="hover:cursor-pointer"
		>
			<Card className="bg-background hover:bg-accent flex items-center justify-start py-4 text-left shadow-none hover:cursor-pointer">
				<CardHeader className="mx-4 flex w-full items-start justify-start gap-3">
					<div className="flex aspect-square h-11 w-11 items-center justify-center rounded-lg border bg-white p-2">
						<img
							src={
								gateway
									? itemsData(gateway).icon
									: itemsData(slug || 'default').icon
							}
							alt=""
						/>
					</div>
					<section className="flex flex-col gap-1">
						<CardTitle className="text-base font-medium">{name}</CardTitle>
						<CardDescription className="text-xs">{description}</CardDescription>
						{/* <section className="mt-3 flex items-center gap-2">
							{payment.active === true && (
								<Badge className="rounded-2xl bg-green-500 text-white">
									{payment.active}
								</Badge>
							)}
						</section> */}
					</section>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default PaymentGatewayCard;
