// import { getOrderByIdService } from '@/features/Orders/services';
import { Hash } from 'lucide-react';
import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';

import { Badge } from '@/components/ui/badge';
import OrderBilling from '@/features/Orders/components/OrderBilling';

import OrderItems from '@/features/Orders/components/OrderItems';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select } from '@radix-ui/react-select';
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getOrderByIdService } from '@/features/Orders/services';

const OrderDetails = () => {
	// const { orderId } = useParams<{ orderId: string; storeId: string }>();

	// const { data: orderData, isLoading } = useQuery({
	// 	queryKey: ['order', orderId],
	// 	queryFn: () => getOrderByIdService({ orderId: orderId! }),
	// });

	const { storeId, orderId } = useParams<{
		storeId: string;
		orderId: string;
	}>();

	// const orderData = {
	// 	id: 'ORD-7452',
	// 	customer: 'John Doe',
	// 	date: '2023-06-18',
	// 	total: 124.95,
	// 	items: 3,
	// 	status: 'Delivered',
	// 	payment: 'Paid',
	// 	address: '123 Main St, Anytown, CA 94582',
	// 	email: 'john.doe@example.com',
	// 	phone: '(555) 123-4567',
	// 	products: [
	// 		{ name: 'Artisan Coffee Mug', price: 24.99, quantity: 2 },
	// 		{ name: 'Leather Wallet', price: 74.97, quantity: 1 },
	// 	],
	// };

	const { data: orderData } = useQuery({
		queryKey: ['orders', orderId],
		queryFn: () => getOrderByIdService({ orderId: orderId! }),
	});
	console.log('orders', orderData, storeId);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto py-8"
		>
			<section className="mx-auto max-w-6xl space-y-6">
				<section className="w-full space-y-6">
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<h1 className="flex items-center gap-2 text-3xl font-bold">
							<Hash />
							{orderData?.id}{' '}
							<Badge
								className={` ${
									orderData?.status === 'Active'
										? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
										: ''
								} ${
									orderData?.status === 'Draft'
										? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
										: ''
								} ${
									orderData?.status === 'Out of stock'
										? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
										: ''
								} `}
							>
								{orderData?.status}
							</Badge>
						</h1>
						<div className="col-span-2 flex justify-end gap-2">
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="More Action" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Print</SelectItem>
									<SelectItem value="dark">Duplicate</SelectItem>
									<SelectItem value="system">Delete</SelectItem>
								</SelectContent>
							</Select>
							<Button
								// onClick={() => handelDeleteProduct()}
								variant="outline"
								className="border-red-500 text-red-500"
							>
								Delete
							</Button>
						</div>
					</div>
					<Separator />
					<section className="grid grid-cols-3 gap-6">
						<section className="col-span-2 space-y-4">
							<Card className="text-left">
								<CardHeader>
									<CardTitle>Items List</CardTitle>
								</CardHeader>
								<CardContent>
									<ScrollArea className="h-[320px] rounded-lg border p-4">
										<section className="flex w-full flex-col gap-3">
											{orderData?.items.map((item) => (
												<OrderItems
													key={item.id}
													image="https://github.com/shadcn.png"
													name={'Product Name'}
													variant="Brown / B5 / Grid"
													price={item.price}
													quantity={item.quantity}
												/>
											))}
											<OrderItems
												image="https://github.com/shadcn.png"
												name="Product Name"
												variant="Brown / B5 / Grid"
												price={200}
												quantity={1}
											/>
										</section>
									</ScrollArea>
								</CardContent>
							</Card>
							<Card className="text-left">
								<CardContent className="mx-4 grid grid-cols-1 gap-6 rounded-2xl border py-6">
									<OrderBilling
										subTotal={{
											items: orderData!.items.length,
											amount: orderData!.items.reduce(
												(acc, item) => acc + item.price * item.quantity,
												0
											),
										}}
										discount={{ amount: 20 }}
										shipping={{ amount: 0 }}
										total={{
											amount: orderData!.items.reduce(
												(acc, item) => acc + item.price * item.quantity,
												0
											),
										}}
									/>
									<Separator />
									<section className="flex flex-col items-center">
										<section className="grid w-full grid-cols-4">
											<div className="col-span-3">
												<Label className="text-base">Paid by customer</Label>
											</div>
											<div className="flex items-center justify-end">
												<span>$0.00</span>
											</div>
										</section>
									</section>
								</CardContent>
								<CardFooter className="justify-end gap-3">
									<Button variant="outline" size="sm">
										Send invoice
									</Button>
									<Button size="sm">Collect payment</Button>
								</CardFooter>
							</Card>
						</section>
						<section className="flex w-full flex-col space-y-4">
							<Card className="text-left">
								<CardHeader>
									<CardTitle>Shipping Details</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-6 text-left">
									<div className="flex w-full flex-col items-start justify-between">
										<Label>Delivered To</Label>
										<p>Tejodeep Mitra Roy</p>
									</div>
									<div className="flex w-full flex-col items-start justify-between">
										<Label>Delivered At</Label>
										<p>123 Main St, Anytown, CA 94582</p>
									</div>
								</CardContent>
							</Card>
							{/* <Card className="gap-2 text-left">
								<CardHeader>
									<CardTitle className="text-lg">Customer Details</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-3">
									<div className="flex w-full">
										<Label className="text-base font-normal">
											Tejodeep Mitra Roy
										</Label>
									</div>
									<div className="flex w-full flex-col">
										<Label className="text-base font-medium">
											Contact information
										</Label>
										<span className="text-xs">
											tejodeepmitraroy2002@gmail.com
										</span>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-medium">
											Shipping Address
										</Label>
										<section className="flex flex-col gap-1 text-sm">
											<p>Tejodeep Mitra Roy</p>
											<p>1226 University Drive Menlo Park CA 94025</p>
											<p className="text-xs">United States</p>
											<p> +16282679041</p>
										</section>
									</div>
								</CardContent>
							</Card> */}

							<Card className="gap-2 text-left">
								<CardHeader>
									<CardTitle className="text-lg">Shipping Details</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-3">
									<div className="flex w-full">
										<Label className="text-base font-normal">
											{orderData?.shippingAddress.name}
										</Label>
									</div>
									<div className="flex w-full flex-col">
										<Label className="text-base font-medium">
											Contact information
										</Label>
										<span className="text-xs">
											{orderData?.shippingAddress.phone}
										</span>
										<span className="text-xs">
											{orderData?.shippingAddress.phone}
										</span>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-medium">
											Shipping Address
										</Label>
										<section className="flex flex-col gap-1 text-sm">
											<p>
												{orderData?.shippingAddress.address1}
												{orderData?.shippingAddress.country}
												{orderData?.shippingAddress.city}
											</p>
											<p className="text-xs">
												{orderData?.shippingAddress.zip}
											</p>
										</section>
									</div>
								</CardContent>
							</Card>
							<Card className="gap-2 text-left">
								<CardHeader>
									<CardTitle className="text-lg">Billing Details</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-3">
									<div className="flex w-full">
										<Label className="text-base font-normal">
											{orderData?.billingAddress.name}
										</Label>
									</div>
									<div className="flex w-full flex-col">
										<Label className="text-base font-medium">
											Contact information
										</Label>
										<span className="text-xs">
											{orderData?.billingAddress.phone}
										</span>
										<span className="text-xs">
											{orderData?.billingAddress.phone}
										</span>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-medium">
											Shipping Address
										</Label>
										<section className="flex flex-col gap-1 text-sm">
											<p>
												{orderData?.billingAddress.address1}
												{orderData?.billingAddress.country}
												{orderData?.billingAddress.city}
											</p>
											<p className="text-xs">{orderData?.billingAddress.zip}</p>
										</section>
									</div>
								</CardContent>
							</Card>
							<Card className="gap-2 text-left">
								<CardHeader>
									<CardTitle className="text-lg">Payment Details</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-1 gap-3">
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-normal">
											Payment Mode
										</Label>
										<span className="text-xs">UPI</span>
									</div>
									<div className="flex w-full flex-col">
										<Label className="text-base font-medium">
											Payment Status
										</Label>
										<span className="text-xs">Paid</span>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-medium">
											Payment Date
										</Label>
										<section className="flex flex-col gap-1 text-sm">
											<p>2025-07-10</p>
										</section>
									</div>
									<div className="flex w-full flex-col gap-2">
										<Label className="text-base font-medium">Payment Id</Label>
										<section className="flex flex-col gap-1 text-sm">
											<p>ORD-7452</p>
										</section>
									</div>
								</CardContent>
							</Card>
						</section>
					</section>
				</section>
			</section>
		</motion.div>
	);
};

export default OrderDetails;
