import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { FC } from 'react';

interface OrderItemsProps {
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}
const OrderItems: FC<OrderItemsProps> = ({
	image,
	name,
	variant,
	price,
	quantity,
}) => {
	return (
		<section className="flex w-full items-start justify-between">
			<div className="flex w-full items-start justify-start gap-2">
				<img src={image} alt="Image" className="w-12 rounded-md" />

				<div className="flex flex-col gap-3">
					<Label>{name}</Label>

					<Badge className="bg-gray-500 text-white">{variant}</Badge>
				</div>
			</div>

			<div className="flex w-fit items-center justify-center gap-8 text-sm">
				<div className="flex items-center gap-2">
					<span>${price}</span>
					<span> x </span>
					<span>{quantity}</span>
				</div>

				<span>${price * quantity}</span>
			</div>
		</section>
	);
};

export default OrderItems;
