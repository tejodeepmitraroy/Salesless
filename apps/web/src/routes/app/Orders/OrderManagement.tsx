import { ShoppingCart } from 'lucide-react';
import HeaderSection from '@/components/layouts/HeaderSection';
import { OrderDataTable } from '@/features/Orders/tables/OrderDataTable';
import OrderFilters from '@/features/Orders/components/OrderFilters';
import { orderColumns } from '@/features/Orders/tables/OrderColumns';
import { useQuery } from '@tanstack/react-query';
import { getAllOrdersService } from '@/features/Orders/services';
import { useParams } from 'react-router';
import useSearchFilterHook from '@/hooks/useSearchFilterHook';
// import OrderModal from '@/features/Orders/components/OrderModal';

const OrderManagement = () => {
	// const [searchQuery, setSearchQuery] = useState('');
	const { storeId } = useParams<{ storeId: string }>();

	// const getFilteredOrders = useOrderStore((state) => state.getFilteredOrders);

	// Mock order data
	// const [orders, setOrders] = useState<Order[]>([
	// 	{
	// 		id: 'ORD-7452',
	// 		customer: 'John Doe',
	// 		date: '2023-06-18',
	// 		total: 124.95,
	// 		items: 3,
	// 		status: 'Delivered',
	// 		payment: 'Paid',
	// 		address: '123 Main St, Anytown, CA 94582',
	// 		email: 'john.doe@example.com',
	// 		phone: '(555) 123-4567',
	// 		products: [
	// 			{ name: 'Artisan Coffee Mug', price: 24.99, quantity: 2 },
	// 			{ name: 'Leather Wallet', price: 74.97, quantity: 1 },
	// 		],
	// 	},
	// 	{
	// 		id: 'ORD-7451',
	// 		customer: 'Jane Smith',
	// 		date: '2023-06-17',
	// 		total: 89.99,
	// 		items: 1,
	// 		status: 'Shipped',
	// 		payment: 'Paid',
	// 	},
	// 	{
	// 		id: 'ORD-7450',
	// 		customer: 'Bob Johnson',
	// 		date: '2023-06-17',
	// 		total: 54.25,
	// 		items: 2,
	// 		status: 'Processing',
	// 		payment: 'Paid',
	// 	},
	// 	{
	// 		id: 'ORD-7449',
	// 		customer: 'Sarah Williams',
	// 		date: '2023-06-16',
	// 		total: 210.5,
	// 		items: 4,
	// 		status: 'Pending',
	// 		payment: 'Awaiting',
	// 	},
	// 	{
	// 		id: 'ORD-7448',
	// 		customer: 'Mike Brown',
	// 		date: '2023-06-15',
	// 		total: 45.0,
	// 		items: 1,
	// 		status: 'Cancelled',
	// 		payment: 'Refunded',
	// 	},
	// ]);

	// const getStatusColor = (status: string) => {
	// 	switch (status) {
	// 		case 'Delivered':
	// 			return 'bg-green-100 text-green-700';
	// 		case 'Shipped':
	// 			return 'bg-blue-100 text-blue-700';
	// 		case 'Processing':
	// 			return 'bg-yellow-100 text-yellow-700';
	// 		case 'Pending':
	// 			return 'bg-gray-100 text-gray-700';
	// 		case 'Cancelled':
	// 			return 'bg-red-100 text-red-700';
	// 		default:
	// 			return 'bg-gray-100 text-gray-700';
	// 	}
	// };

	// const getStatusIcon = (status: string) => {
	// 	switch (status) {
	// 		case 'Delivered':
	// 			return <CheckCircle className="mr-1 h-4 w-4" />;
	// 		case 'Shipped':
	// 			return <Truck className="mr-1 h-4 w-4" />;
	// 		case 'Processing':
	// 			return <ShoppingCart className="mr-1 h-4 w-4" />;
	// 		case 'Pending':
	// 			return <Clock className="mr-1 h-4 w-4" />;
	// 		case 'Cancelled':
	// 			return <XCircle className="mr-1 h-4 w-4" />;
	// 		default:
	// 			return null;
	// 	}
	// };

	// // Filter orders based on search query and tab
	// const filteredOrders = (tab: string) => {
	// 	let filtered = orders;

	// 	// Apply search filter
	// 	if (searchQuery) {
	// 		filtered = filtered.filter(
	// 			(order) =>
	// 				order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
	// 				order.customer.toLowerCase().includes(searchQuery.toLowerCase())
	// 		);
	// 	}

	// 	// Apply tab filter
	// 	if (tab !== 'all') {
	// 		const statusMap: Record<string, string> = {
	// 			pending: 'Pending',
	// 			processing: 'Processing',
	// 			shipped: 'Shipped',
	// 			delivered: 'Delivered',
	// 			cancelled: 'Cancelled',
	// 		};
	// 		filtered = filtered.filter((order) => order.status === statusMap[tab]);
	// 	}

	// 	return filtered;
	// };

	// const handleViewOrder = (order: Order) => {
	// 	setCurrentOrder(order);
	// 	setIsViewModalOpen(true);
	// };

	// const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
	// 	setOrders(
	// 		orders.map((order) =>
	// 			order.id === orderId ? { ...order, status: newStatus } : order
	// 		)
	// 	);

	// 	toast('Order Status Updated', {
	// 		description: `Order ${orderId} has been updated to ${newStatus}.`,
	// 	});

	// 	if (isViewModalOpen && currentOrder?.id === orderId) {
	// 		setCurrentOrder({ ...currentOrder, status: newStatus });
	// 	}
	// };

	// const renderOrdersTable = (tabValue: string) => {
	// 	const filtered = filteredOrders(tabValue);

	// 	return (
	// 		<>
	// 			<div className="overflow-x-auto">
	// 				<table className="w-full">
	// 					<thead>
	// 						<tr className="border-b">
	// 							<th className="py-3 text-left">Order ID</th>
	// 							<th className="py-3 text-left">Customer</th>
	// 							<th className="py-3 text-left">Date</th>
	// 							<th className="py-3 text-right">Total</th>
	// 							<th className="py-3 text-center">Items</th>
	// 							<th className="py-3 text-center">Status</th>
	// 							<th className="py-3 text-center">Payment</th>
	// 							<th className="py-3 text-right">Actions</th>
	// 						</tr>
	// 					</thead>
	// 					<tbody>
	// 						{filtered.length === 0 ? (
	// 							<tr>
	// 								<td colSpan={8} className="py-4 text-center text-gray-500">
	// 									No orders found matching your criteria.
	// 								</td>
	// 							</tr>
	// 						) : (
	// 							filtered.map((order) => (
	// 								<tr key={order.id} className="border-b hover:bg-gray-50">
	// 									<td className="py-3">{order.id}</td>
	// 									<td className="py-3">{order.customer}</td>
	// 									<td className="py-3">{order.date}</td>
	// 									<td className="py-3 text-right">
	// 										${order.total.toFixed(2)}
	// 									</td>
	// 									<td className="py-3 text-center">{order.items}</td>
	// 									<td className="py-3 text-center">
	// 										<Badge className={getStatusColor(order.status)}>
	// 											<span className="flex items-center">
	// 												{getStatusIcon(order.status)}
	// 												{order.status}
	// 											</span>
	// 										</Badge>
	// 									</td>
	// 									<td className="py-3 text-center">
	// 										<Badge
	// 											variant="outline"
	// 											className={
	// 												order.payment === 'Paid'
	// 													? 'bg-green-50 text-green-700'
	// 													: order.payment === 'Awaiting'
	// 														? 'bg-yellow-50 text-yellow-700'
	// 														: 'bg-red-50 text-red-700'
	// 											}
	// 										>
	// 											{order.payment}
	// 										</Badge>
	// 									</td>
	// 									<td className="flex justify-end py-3">
	// 										<Button
	// 											variant="ghost"
	// 											size="icon"
	// 											className="h-8 w-8"
	// 											onClick={() => handleViewOrder(order)}
	// 										>
	// 											<Eye className="h-4 w-4" />
	// 										</Button>
	// 									</td>
	// 								</tr>
	// 							))
	// 						)}
	// 					</tbody>
	// 				</table>
	// 			</div>
	// 		</>
	// 	);
	// };

	const { data: orders } = useQuery({
		queryKey: ['orders', storeId],
		queryFn: () => getAllOrdersService({ storeId: storeId! }),
	});
	const { filteredData, searchTerm, setSearchTerm } = useSearchFilterHook({
		data: orders,
	});
	console.log('orders', orders, storeId);

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Order Management"
				description="Manage your orders"
			/>
			<section className="space-y-6">
				<OrderFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<OrderDataTable columns={orderColumns} data={filteredData()} />
				{/* <Tabs defaultValue="all">
					<section className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<TabsList className="grid w-full grid-cols-5 sm:w-auto sm:grid-cols-6">
							<TabsTrigger className=" " value="all">
								All Orders ({getOrdersByCategory('all').length})
							</TabsTrigger>
							<TabsTrigger className="" value="pending">
								Pending ({getOrdersByCategory('pending').length})
							</TabsTrigger>
							<TabsTrigger className="" value="processing">
								Processing ({getOrdersByCategory('processing').length})
							</TabsTrigger>
							<TabsTrigger className="" value="shipped">
								Shipped ({getOrdersByCategory('shipped').length})
							</TabsTrigger>
							<TabsTrigger className="" value="delivered">
								Delivered ({getOrdersByCategory('delivered').length})
							</TabsTrigger>
							<TabsTrigger className="" value="cancelled">
								Cancelled ({getOrdersByCategory('cancelled').length})
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
					</section>

					<TabsContent value="all" className="mt-0">
						<OrderDataTable columns={orderColumns} data={filteredOrders} />
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center justify-between text-lg">
									<span>All Orders ({getOrdersByCategory('all').length})</span>
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
								<OrderDataTable
									columns={orderColumns}
									data={getOrdersByCategory(tab)}
								/>
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-lg">
											{tab.charAt(0).toUpperCase() + tab.slice(1)} Orders (
											{getOrdersByCategory(tab).length})
										</CardTitle>
									</CardHeader>
									<CardContent>{renderOrdersTable(tab)}</CardContent>
								</Card>
							</TabsContent>
						)
					)}
				</Tabs> */}

				{/* Order Detail Modal */}
				{/* {isViewModalOpen && currentOrder && (
					<OrderModal
						isViewModalOpen={isViewModalOpen}
						setIsViewModalOpen={setIsViewModalOpen}
						currentOrder={currentOrder}
						handleUpdateOrderStatus={handleUpdateOrderStatus}
					/>
				)} */}
			</section>
		</div>
	);
};

export default OrderManagement;
