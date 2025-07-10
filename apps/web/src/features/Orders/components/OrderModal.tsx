import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Order } from '@/stores/useOrderStore';
import { ShoppingCart } from 'lucide-react';

const OrderModal = ({
	isViewModalOpen,
	setIsViewModalOpen,
	currentOrder,
	handleUpdateOrderStatus,
}: {
	isViewModalOpen: boolean;
	setIsViewModalOpen: (open: boolean) => void;
	currentOrder: Order;
	handleUpdateOrderStatus: (orderId: string, newStatus: string) => void;
}) => {
	return (
		<Dialog
			open={isViewModalOpen}
			onOpenChange={() => setIsViewModalOpen(false)}
		>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<ShoppingCart className="h-5 w-5" />
						Order Details
					</DialogTitle>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="flex justify-between border-b pb-3">
						<span className="font-medium">Order ID:</span>
						<span>{currentOrder.id}</span>
					</div>

					<div className="flex justify-between">
						<span className="font-medium">Customer:</span>
						<span>{currentOrder.customer}</span>
					</div>

					{currentOrder.email && (
						<div className="flex justify-between">
							<span className="font-medium">Email:</span>
							<span>{currentOrder.email}</span>
						</div>
					)}

					{currentOrder.phone && (
						<div className="flex justify-between">
							<span className="font-medium">Phone:</span>
							<span>{currentOrder.phone}</span>
						</div>
					)}

					{currentOrder.address && (
						<div className="flex justify-between">
							<span className="font-medium">Address:</span>
							<span>{currentOrder.address}</span>
						</div>
					)}

					<div className="flex justify-between">
						<span className="font-medium">Order Date:</span>
						<span>{currentOrder.date}</span>
					</div>

					<div className="flex justify-between">
						<span className="font-medium">Payment Status:</span>
						<Badge
							variant="outline"
							className={
								currentOrder.payment === 'Paid'
									? 'bg-green-50 text-green-700'
									: currentOrder.payment === 'Awaiting'
										? 'bg-yellow-50 text-yellow-700'
										: 'bg-red-50 text-red-700'
							}
						>
							{currentOrder.payment}
						</Badge>
					</div>

					<div className="flex items-center justify-between">
						<span className="font-medium">Order Status:</span>
						<div className="flex items-center gap-2">
							<Select
								defaultValue={currentOrder.status}
								onValueChange={(value) =>
									handleUpdateOrderStatus(currentOrder.id, value)
								}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Pending">Pending</SelectItem>
									<SelectItem value="Processing">Processing</SelectItem>
									<SelectItem value="Shipped">Shipped</SelectItem>
									<SelectItem value="Delivered">Delivered</SelectItem>
									<SelectItem value="Cancelled">Cancelled</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{currentOrder.products && (
						<>
							<div className="mt-2 font-medium">Products:</div>
							<div className="rounded-md border">
								<table className="w-full">
									<thead>
										<tr className="border-b bg-gray-50">
											<th className="px-4 py-2 text-left">Product</th>
											<th className="px-4 py-2 text-right">Price</th>
											<th className="px-4 py-2 text-center">Quantity</th>
											<th className="px-4 py-2 text-right">Total</th>
										</tr>
									</thead>
									<tbody>
										{currentOrder.products.map((product, index) => (
											<tr
												key={index}
												className={
													index !== currentOrder.products!.length - 1
														? 'border-b'
														: ''
												}
											>
												<td className="px-4 py-2">{product.name}</td>
												<td className="px-4 py-2 text-right">
													${product.price.toFixed(2)}
												</td>
												<td className="px-4 py-2 text-center">
													{product.quantity}
												</td>
												<td className="px-4 py-2 text-right">
													${(product.price * product.quantity).toFixed(2)}
												</td>
											</tr>
										))}
									</tbody>
									<tfoot className="border-t">
										<tr>
											<td
												colSpan={3}
												className="px-4 py-2 text-right font-medium"
											>
												Order Total:
											</td>
											<td className="px-4 py-2 text-right font-medium">
												${currentOrder.total.toFixed(2)}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</>
					)}
				</div>

				<DialogFooter className="flex justify-end">
					<Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default OrderModal;
