import { Label } from '@/components/ui/label';
import { FC } from 'react';

interface OrderBillingProps {
	subTotal: {
		items: number;
		amount: number;
	};
	discount: {
		amount: number;
	};
	shipping: {
		amount: number;
	};
	total: {
		amount: number;
	};
}
const OrderBilling: FC<OrderBillingProps> = ({
	subTotal,
	discount,
	shipping,
	total,
}) => {
	return (
		<section className="flex flex-col items-center">
			<section className="grid w-full grid-cols-4">
				<div>
					<Label className="text-sm font-medium">Subtotal</Label>
				</div>
				<div className="col-span-2 flex items-center text-sm">
					<span>{subTotal.items} item</span>
				</div>
				<div className="flex items-center justify-end">
					<span className="text-sm">${subTotal.amount}</span>
				</div>
			</section>
			<section className="grid w-full grid-cols-4">
				<div>
					<Label className="text-sm font-medium">Discount</Label>
				</div>
				<div className="col-span-2 flex items-center text-sm">
					<span>New customer</span>
				</div>
				<div className="flex items-center justify-end">
					<span className="text-sm">-${discount.amount}</span>
				</div>
			</section>
			<section className="grid w-full grid-cols-4">
				<div>
					<Label className="text-sm font-medium">Shipping</Label>
				</div>
				<div className="col-span-2 flex items-center text-sm">
					<span>Free shipping(0.0 lb)</span>
				</div>
				<div className="flex items-center justify-end">
					<span className="text-sm">${shipping.amount}</span>
				</div>
			</section>
			<section className="mt-4 grid w-full grid-cols-4">
				<div>
					<Label className="text-base font-bold">Total</Label>
				</div>
				<div className="col-span-2 flex items-center text-sm">
					<span></span>
				</div>
				<div className="flex items-center justify-end">
					<span className="text-sm font-bold">${total.amount}</span>
				</div>
			</section>
		</section>
	);
};

export default OrderBilling;
