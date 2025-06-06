import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Search,
	Filter,
	ArrowUpDown,
	Eye,
	ShoppingCart,
	Truck,
	CheckCircle,
	Clock,
	XCircle,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import HeaderSection from '@/components/layouts/HeaderSection';

type Order = {
	id: string;
	customer: string;
	date: string;
	total: number;
	items: number;
	status: string;
	payment: string;
	address?: string;
	email?: string;
	phone?: string;
	products?: { name: string; price: number; quantity: number }[];
};

const OrderManagement = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

	// Mock order data
	const [orders, setOrders] = useState<Order[]>([
		{
			id: 'ORD-7452',
			customer: 'John Doe',
			date: '2023-06-18',
			total: 124.95,
			items: 3,
			status: 'Delivered',
			payment: 'Paid',
			address: '123 Main St, Anytown, CA 94582',
			email: 'john.doe@example.com',
			phone: '(555) 123-4567',
			products: [
				{ name: 'Artisan Coffee Mug', price: 24.99, quantity: 2 },
				{ name: 'Leather Wallet', price: 74.97, quantity: 1 },
			],
		},
		{
			id: 'ORD-7451',
			customer: 'Jane Smith',
			date: '2023-06-17',
			total: 89.99,
			items: 1,
			status: 'Shipped',
			payment: 'Paid',
		},
		{
			id: 'ORD-7450',
			customer: 'Bob Johnson',
			date: '2023-06-17',
			total: 54.25,
			items: 2,
			status: 'Processing',
			payment: 'Paid',
		},
		{
			id: 'ORD-7449',
			customer: 'Sarah Williams',
			date: '2023-06-16',
			total: 210.5,
			items: 4,
			status: 'Pending',
			payment: 'Awaiting',
		},
		{
			id: 'ORD-7448',
			customer: 'Mike Brown',
			date: '2023-06-15',
			total: 45.0,
			items: 1,
			status: 'Cancelled',
			payment: 'Refunded',
		},
	]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Delivered':
				return 'bg-green-100 text-green-700';
			case 'Shipped':
				return 'bg-blue-100 text-blue-700';
			case 'Processing':
				return 'bg-yellow-100 text-yellow-700';
			case 'Pending':
				return 'bg-gray-100 text-gray-700';
			case 'Cancelled':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Delivered':
				return <CheckCircle className="mr-1 h-4 w-4" />;
			case 'Shipped':
				return <Truck className="mr-1 h-4 w-4" />;
			case 'Processing':
				return <ShoppingCart className="mr-1 h-4 w-4" />;
			case 'Pending':
				return <Clock className="mr-1 h-4 w-4" />;
			case 'Cancelled':
				return <XCircle className="mr-1 h-4 w-4" />;
			default:
				return null;
		}
	};

	// Filter orders based on search query and tab
	const filteredOrders = (tab: string) => {
		let filtered = orders;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(order) =>
					order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
					order.customer.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Apply tab filter
		if (tab !== 'all') {
			const statusMap: Record<string, string> = {
				pending: 'Pending',
				processing: 'Processing',
				shipped: 'Shipped',
				delivered: 'Delivered',
				cancelled: 'Cancelled',
			};
			filtered = filtered.filter((order) => order.status === statusMap[tab]);
		}

		return filtered;
	};

	const handleViewOrder = (order: Order) => {
		setCurrentOrder(order);
		setIsViewModalOpen(true);
	};

	const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
		setOrders(
			orders.map((order) =>
				order.id === orderId ? { ...order, status: newStatus } : order
			)
		);

		toast('Order Status Updated', {
			description: `Order ${orderId} has been updated to ${newStatus}.`,
		});

		if (isViewModalOpen && currentOrder?.id === orderId) {
			setCurrentOrder({ ...currentOrder, status: newStatus });
		}
	};

	const renderOrdersTable = (tabValue: string) => {
		const filtered = filteredOrders(tabValue);

		return (
			<>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="py-3 text-left">Order ID</th>
								<th className="py-3 text-left">Customer</th>
								<th className="py-3 text-left">Date</th>
								<th className="py-3 text-right">Total</th>
								<th className="py-3 text-center">Items</th>
								<th className="py-3 text-center">Status</th>
								<th className="py-3 text-center">Payment</th>
								<th className="py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filtered.length === 0 ? (
								<tr>
									<td colSpan={8} className="py-4 text-center text-gray-500">
										No orders found matching your criteria.
									</td>
								</tr>
							) : (
								filtered.map((order) => (
									<tr key={order.id} className="border-b hover:bg-gray-50">
										<td className="py-3">{order.id}</td>
										<td className="py-3">{order.customer}</td>
										<td className="py-3">{order.date}</td>
										<td className="py-3 text-right">
											${order.total.toFixed(2)}
										</td>
										<td className="py-3 text-center">{order.items}</td>
										<td className="py-3 text-center">
											<Badge className={getStatusColor(order.status)}>
												<span className="flex items-center">
													{getStatusIcon(order.status)}
													{order.status}
												</span>
											</Badge>
										</td>
										<td className="py-3 text-center">
											<Badge
												variant="outline"
												className={
													order.payment === 'Paid'
														? 'bg-green-50 text-green-700'
														: order.payment === 'Awaiting'
															? 'bg-yellow-50 text-yellow-700'
															: 'bg-red-50 text-red-700'
												}
											>
												{order.payment}
											</Badge>
										</td>
										<td className="flex justify-end py-3">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={() => handleViewOrder(order)}
											>
												<Eye className="h-4 w-4" />
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</>
		);
	};

	return (
		<div className="space-y-6">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Order Management"
				description="Manage your orders"
			/>

			<Tabs defaultValue="all">
				<div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<TabsList className="bg-background grid w-full grid-cols-5 sm:w-auto sm:grid-cols-6">
						<TabsTrigger className=" " value="all">
							All Orders
						</TabsTrigger>
						<TabsTrigger className="" value="pending">
							Pending
						</TabsTrigger>
						<TabsTrigger className="" value="processing">
							Processing
						</TabsTrigger>
						<TabsTrigger className="" value="shipped">
							Shipped
						</TabsTrigger>
						<TabsTrigger className="" value="delivered">
							Delivered
						</TabsTrigger>
						<TabsTrigger className="" value="cancelled">
							Cancelled
						</TabsTrigger>
					</TabsList>
					<section className="flex w-fit items-center gap-2">
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="bg-vsphere-light text-vsphere-dark"
							>
								Today: {new Date().toLocaleDateString()}
							</Badge>
						</div>

						<div className="relative w-full sm:w-auto">
							<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
							<Input
								type="text"
								placeholder="Search orders..."
								className="w-full rounded-md border py-2 pr-4 pl-10 sm:w-64"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</section>
				</div>

				<TabsContent value="all" className="mt-0">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center justify-between text-lg">
								<span>All Orders ({filteredOrders('all').length})</span>
								<div className="flex gap-2">
									<Button variant="outline" size="sm">
										<Filter className="mr-2 h-3.5 w-3.5" /> Filter
									</Button>
									<Button variant="outline" size="sm">
										<ArrowUpDown className="mr-2 h-3.5 w-3.5" /> Sort
									</Button>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>{renderOrdersTable('all')}</CardContent>
					</Card>
				</TabsContent>

				{['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(
					(tab) => (
						<TabsContent key={tab} value={tab}>
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="text-lg">
										{tab.charAt(0).toUpperCase() + tab.slice(1)} Orders (
										{filteredOrders(tab).length})
									</CardTitle>
								</CardHeader>
								<CardContent>{renderOrdersTable(tab)}</CardContent>
							</Card>
						</TabsContent>
					)
				)}
			</Tabs>

			{/* Order Detail Modal */}
			{isViewModalOpen && currentOrder && (
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
							<Button
								variant="outline"
								onClick={() => setIsViewModalOpen(false)}
							>
								Close
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
};

export default OrderManagement;
