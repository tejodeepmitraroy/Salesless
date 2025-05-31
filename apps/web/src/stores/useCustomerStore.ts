import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

export type Customer = {
	id: number;
	firstName: string;
	lastName: string;
	email?: string;
	phone?: string;
	avatar: string;
	orderCount: number;
	totalSpend: number;
	address: CustomerAddress;
	lastActive?: string;
	status: 'Active' | 'Inactive';
};

export type CustomerAddress = {
	id: number;
	firstName: string;
	lastName: string;
	company: string;
	address1: string;
	address2: string;
	city: string;
	province: string;
	provinceCode: string;
	country: string;
	countryCode: string;
	zipcode: string;
	phone: string;
};

interface CustomerState {
	customers: Customer[];
	selectedCustomer: Customer | null;
	searchQuery: string;
	filterDepartment: string;
	filterRole: string;
	filterStatus: 'all' | 'Active' | 'Inactive';
}

interface CustomerActions {
	fetchCustomers: () => Promise<void>;
	setCustomers: (customers: Customer[]) => void;
	addCustomer: (customer: Customer) => void;
	getCustomerById: (customerId: number) => Customer | null;

	updateCustomer: (customer: Customer) => void;
	deleteCustomer: (customerId: number) => void;
	setSelectedCustomer: (customer: Customer | null) => void;
	setSearchQuery: (query: string) => void;
	setFilterDepartment: (department: string) => void;
	setFilterRole: (role: string) => void;
	setFilterStatus: (status: 'all' | 'Active' | 'Inactive') => void;
	getFilteredCustomers: () => Customer[];
	updateEmployeeStatus: (
		employeeId: number,
		status: 'Active' | 'Inactive'
	) => void;
	updateEmployeePermissions: (
		employeeId: number,
		permissions: string[]
	) => void;
}

type CustomerStore = CustomerState & CustomerActions;

const initialState: CustomerState = {
	customers: [],
	selectedCustomer: null,
	searchQuery: '',
	filterDepartment: 'all',
	filterRole: 'all',
	filterStatus: 'all',
};

export const useCustomerStore = create<CustomerStore>()(
	devtools((set, get) => ({
		...initialState,
		getCustomerById: (customerId: number) => {
			const customer = get().customers.find(
				(customer) => customer.id === customerId
			);

			if (!customer) return null;
			return customer;
		},
		fetchCustomers: async () => {
			const response = await fetch('/api/customers');
			const data = await response.json();
			set({ customers: data });
		},
		setCustomers: (customers: Customer[]) => set({ customers }),
		addCustomer: (customer: Customer) =>
			set((state) => ({
				customers: [...state.customers, customer],
			})),

		updateCustomer: (customer: Customer) =>
			set((state) => ({
				customers: state.customers.map((e) =>
					e.id === customer.id ? customer : e
				),
			})),

		deleteCustomer: (customerId: number) =>
			set((state) => ({
				customers: state.customers.filter((e) => e.id !== customerId),
			})),

		setSelectedCustomer: (customer: Customer | null) =>
			set(() => ({
				selectedCustomer: customer,
			})),

		setSearchQuery: (query: string) =>
			set(() => ({
				searchQuery: query,
			})),

		setFilterDepartment: (department: string) =>
			set(() => ({
				filterDepartment: department,
			})),

		setFilterRole: (role: string) =>
			set(() => ({
				filterRole: role,
			})),

		setFilterStatus: (status: 'all' | 'Active' | 'Inactive') =>
			set(() => ({
				filterStatus: status,
			})),

		updateCustomerStatus: (customerId: number, status: 'Active' | 'Inactive') =>
			set((state) => ({
				customers: state.customers.map((e) =>
					e.id === customerId ? { ...e, status } : e
				),
			})),

		updateCustomerPermissions: (customerId: number, permissions: string[]) =>
			set((state) => ({
				customers: state.customers.map((e) =>
					e.id === customerId ? { ...e, permissions } : e
				),
			})),

		getFilteredCustomers: () => {
			const state = get();
			let filtered = state.customers;

			// Apply search filter
			if (state.searchQuery) {
				const query = state.searchQuery.toLowerCase();
				filtered = filtered.filter(
					(customer) =>
						customer.firstName.toLowerCase().includes(query) ||
						customer.lastName.toLowerCase().includes(query) ||
						customer.email?.toLowerCase().includes(query)
				);
			}

			// Apply role filter
			if (state.filterRole !== 'all') {
				filtered = filtered.filter(
					(customer) => customer.status === state.filterRole
				);
			}

			// Apply status filter
			if (state.filterStatus !== 'all') {
				filtered = filtered.filter(
					(employee) => employee.status === state.filterStatus
				);
			}

			return filtered;
		},
	}))
);
