import { Badge } from '@/components/ui/badge';
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

	name: string;
	description: string;
	slug: string;
	isDefault?: boolean;
	icon?: string;
}

const PaymentGatewayCard: FC<PaymentGatewayCardProps> = ({
	storeId,
	icon,
	name,
	description,
	slug,
	isDefault,
}) => {
	return (
		<Link
			to={`/store/${storeId}/settings/payments/${slug}`}
			className="hover:cursor-pointer"
		>
			<Card className="bg-background hover:bg-accent flex items-center justify-start py-4 text-left shadow-none hover:cursor-pointer">
				<CardHeader className="mx-4 flex w-full items-start justify-start gap-3">
					<div className="flex aspect-square h-11 w-11 items-center justify-center rounded-lg border bg-white p-2">
						<img src={icon ? icon : `/icons/payment-default.png`} alt="" />
					</div>
					<section className="flex w-full flex-col gap-1">
						<CardTitle className="flex w-fit items-center justify-between gap-4 text-base font-medium">
							{name}
							{isDefault && (
								<Badge className="rounded-2xl bg-green-500 text-white">
									Default
								</Badge>
							)}
						</CardTitle>
						<CardDescription className="text-xs">{description}</CardDescription>
					</section>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default PaymentGatewayCard;
