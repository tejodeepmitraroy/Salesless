import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getPaymentGatewayService } from '@/features/Settings/services';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Link, useParams } from 'react-router';
import PaymentGatewayCard from '../../../routes/app/Settings/Payements/GatewaySettings/PaymentGatewayCard';
import { supportedPaymentsGateways } from '../config/paymentGateway-config';

const PaymentsGateway = () => {
	const { storeId } = useParams<{ storeId: string }>();

	const { data: payments, isLoading } = useQuery({
		queryKey: ['payments', storeId],
		queryFn: () => getPaymentGatewayService(),
	});

	console.log('data PaymentsGateway', payments);
	return (
		<section className="w-full space-y-6">
			<section className="w-full space-y-6">
				<section className="flex w-full items-center justify-between">
					<h2 className="text-2xl font-medium">Payments Gateway</h2>
					<Link
						to={`/store/${storeId}/settings/payments/third-party-providers`}
					>
						<Button className="bg-primary text-white">
							Add Payment Gateway
						</Button>
					</Link>
				</section>

				<section className="grid w-full grid-cols-4 gap-4 space-y-6 p-2">
					{isLoading ? (
						<Loader className="h-5 w-5 animate-spin" />
					) : (
						<>
							{supportedPaymentsGateways
								.filter((payment) =>
									payments?.some((p) => p.gateway === payment.gateway)
								)
								.map((payment) => (
									<PaymentGatewayCard
										key={payment.gateway}
										storeId={storeId}
										gateway={payment.gateway}
										name={payment.name}
										description={payment.description}
										slug={payment.slug}
									/>
								))}
							{payments?.length === 0 && (
								<Card>
									<CardHeader>
										<CardTitle>No integrations found</CardTitle>
										<CardDescription>
											There are no integrations available in this category yet.
										</CardDescription>
									</CardHeader>
								</Card>
							)}
						</>
					)}
				</section>
			</section>

			<section className="flex w-full flex-col items-center justify-between space-y-6">
				<section className="flex w-full items-center justify-between">
					<h2 className="text-2xl font-medium">Third Party Payment Gateway</h2>
				</section>
				<section className="grid w-full grid-cols-4 gap-4 space-y-6 p-2">
					{supportedPaymentsGateways
						.filter(
							(payment) => !payments?.some((p) => p.gateway === payment.gateway)
						)
						.map((payment) => (
							<PaymentGatewayCard
								key={payment.gateway}
								storeId={storeId}
								gateway={payment.gateway}
								name={payment.name}
								description={payment.description}
								slug={payment.slug}
							/>
						))}
				</section>
			</section>
		</section>
	);
};

export default PaymentsGateway;
