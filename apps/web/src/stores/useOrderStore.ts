import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Order {
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
}

interface OrderState {
	orders: Order[];
	filteredOrders: Order[];
	status: string[];
	selectedOrder: Order | null;
	statusFilter: string;
	sortOrders: string;
	searchQuery: string;
	filterStatus: string;
}

interface OrderActions {
	setStatusFilter: (status: string) => void;
	setSortOrders: (status: string) => void;

	addOrder: (order: Order) => void;
	setOrders: (orders: Order[]) => void;
	updateOrder: (order: Order) => void;
	getOrdersById: (orderId: string) => Order | null;
	deleteOrder: (orderId: string) => void;
	setSelectedOrder: (order: Order | null) => void;
	setSearchQuery: (query: string) => void;
	setFilterStatus: (status: string) => void;
	// getFilteredOrders: () => Order[];
}

type OrderStore = OrderState & OrderActions;

const initialState: OrderState = {
	orders: [
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
	],
	filteredOrders: [
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
	],
	status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
	selectedOrder: null,
	searchQuery: '',
	statusFilter: 'all',
	sortOrders: 'asc',

	filterStatus: 'all',
};

export const useOrderStore = create<OrderStore>()(
	devtools((set, get) => ({
		...initialState,

		setStatusFilter: (status: string) => {
			switch (status.toLowerCase()) {
				case 'all':
					set(() => ({ filteredOrders: get().orders, statusFilter: status }));
					break;
				case 'pending':
					set(() => ({
						filteredOrders: get().orders.filter(
							(order) => order.status === 'Pending'
						),
						statusFilter: status,
					}));
					break;
				case 'processing':
					set(() => ({
						filteredOrders: get().orders.filter(
							(order) => order.status === 'Processing'
						),
						statusFilter: status,
					}));
					break;
				case 'shipped':
					set(() => ({
						filteredOrders: get().orders.filter(
							(order) => order.status === 'Shipped'
						),
						statusFilter: status,
					}));
					break;
				case 'delivered':
					set(() => ({
						filteredOrders: get().orders.filter(
							(order) => order.status === 'Delivered'
						),
						statusFilter: status,
					}));
					break;
				case 'cancelled':
					set(() => ({
						filteredOrders: get().orders.filter(
							(order) => order.status === 'Cancelled'
						),
						statusFilter: status,
					}));
					break;
				default:
					set(() => ({ filteredOrders: get().orders }));
					break;
			}
		},
		setSortOrders: (sort: string) => {
			set(() => ({
				sortOrders: sort,
				filteredOrders:
					sort === 'asc'
						? get().filteredOrders.sort()
						: get().filteredOrders.reverse(),
			}));
		},

		addOrder: (order: Order) =>
			set((state) => ({
				orders: [...state.orders, order],
			})),
		getOrdersById: (orderId: string) => {
			const order = get().orders.find((o) => o.id === orderId);
			return order;
		},
		setOrders: (orders: Order[]) =>
			set(() => ({
				orders: orders,
			})),

		updateOrder: (order: Order) =>
			set((state) => ({
				orders: state.orders.map((o) => (o.id === order.id ? order : o)),
			})),

		deleteOrder: (orderId: string) =>
			set((state) => ({
				orders: state.orders.filter((o) => o.id !== orderId),
			})),

		setSelectedOrder: (order: Order | null) =>
			set(() => ({
				selectedOrder: order,
			})),

		setSearchQuery: (query: string) =>
			set(() => ({
				searchQuery: query,
			})),

		// setStatusFilter: (status: string) =>
		// 	set(() => ({
		// 		statusFilter: status,
		// 	})),

		// getFilteredOrders: () => {
		// 	const state = get();
		// 	let filtered = state.orders;

		// 	// Apply search filter
		// 	if (state.searchQuery) {
		// 		const query = state.searchQuery.toLowerCase();
		// 		filtered = filtered.filter(
		// 			(order) =>
		// 				order.customer.toLowerCase().includes(query) ||
		// 				order.id.toLowerCase().includes(query)
		// 		);
		// 	}

		// 	console.log('getFilteredOrders--------------->', state.statusFilter);

		// 	// Apply category filter
		// 	if (state.statusFilter !== 'all') {
		// 		filtered = filtered.filter(
		// 			(order) => order.status.toLowerCase() === state.statusFilter
		// 		);
		// 	}

		// 	return filtered;
		// },
	}))
);
