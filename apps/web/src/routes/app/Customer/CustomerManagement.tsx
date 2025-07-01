import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, User } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';
import { CustomerDataTable } from '@/features/Customer/tables/CustomerDataTable';
import { customerColumns } from '@/features/Customer/tables/columns';
import { useQuery } from '@tanstack/react-query';
import { getCustomersService } from '@/features/Customer/services';
import { useParams } from 'react-router';
import { useCustomerStore } from '@/stores/useCustomerStore';
import HeaderSection from '@/components/layouts/HeaderSection';

interface PurchaseHistory {
	id: number;
	productName: string;
	date: string;
	amount: number;
	status: 'Completed' | 'Pending' | 'Refunded';
}

interface UserData {
	id: number;
	name: string;
	email: string;
	mobile: string;
	signupDate: string;
	lastActive: string;
	status: 'Active' | 'Inactive' | 'Suspended';
	purchases: PurchaseHistory[];
}

// Sample data for demonstration
const USERS_DATA: UserData[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		mobile: '+1 (555) 123-4567',
		signupDate: '2023-01-15',
		lastActive: '2023-06-22',
		status: 'Active',
		purchases: [
			{
				id: 101,
				productName: 'Premium Headphones',
				date: '2023-02-10',
				amount: 149.99,
				status: 'Completed',
			},
			{
				id: 102,
				productName: 'Wireless Keyboard',
				date: '2023-04-05',
				amount: 79.99,
				status: 'Completed',
			},
		],
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		mobile: '+1 (555) 987-6543',
		signupDate: '2023-02-20',
		lastActive: '2023-06-18',
		status: 'Active',
		purchases: [
			{
				id: 103,
				productName: 'Smart Watch',
				date: '2023-03-15',
				amount: 199.99,
				status: 'Completed',
			},
		],
	},
	{
		id: 3,
		name: 'Michael Johnson',
		email: 'michael.j@example.com',
		mobile: '+1 (555) 234-5678',
		signupDate: '2023-03-05',
		lastActive: '2023-05-30',
		status: 'Inactive',
		purchases: [],
	},
	{
		id: 4,
		name: 'Sarah Williams',
		email: 'sarah.w@example.com',
		mobile: '+1 (555) 876-5432',
		signupDate: '2023-04-12',
		lastActive: '2023-06-21',
		status: 'Active',
		purchases: [
			{
				id: 104,
				productName: 'Bluetooth Speaker',
				date: '2023-04-20',
				amount: 89.99,
				status: 'Completed',
			},
			{
				id: 105,
				productName: 'Laptop Stand',
				date: '2023-05-15',
				amount: 34.99,
				status: 'Completed',
			},
			{
				id: 106,
				productName: 'USB-C Hub',
				date: '2023-06-10',
				amount: 49.99,
				status: 'Pending',
			},
		],
	},
	{
		id: 5,
		name: 'Robert Brown',
		email: 'robert.b@example.com',
		mobile: '+1 (555) 345-6789',
		signupDate: '2023-05-08',
		lastActive: '2023-06-01',
		status: 'Suspended',
		purchases: [
			{
				id: 107,
				productName: 'Wireless Mouse',
				date: '2023-05-10',
				amount: 29.99,
				status: 'Completed',
			},
			{
				id: 108,
				productName: 'Monitor',
				date: '2023-05-25',
				amount: 249.99,
				status: 'Refunded',
			},
		],
	},
];

const CustomerManagement = () => {
	const [users, setUsers] = useState<UserData[]>(USERS_DATA);
	const [searchTerm, setSearchTerm] = useState('');
	const { storeId } = useParams<{ storeId: string }>();

	const setCustomers = useCustomerStore((state) => state.setCustomers);
	const customers = useCustomerStore((state) => state.customers);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		if (!e.target.value.trim()) {
			setUsers(USERS_DATA);
			return;
		}

		const filtered = USERS_DATA.filter(
			(user) =>
				user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
				user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
				user.mobile.includes(e.target.value)
		);
		setUsers(filtered);
	};

	// const handleUserSelect = (user: UserData) => {
	//   setSelectedUser(user);
	// };

	const exportUsers = () => {
		const data = users.map((user) => ({
			ID: user.id,
			Name: user.name,
			Email: user.email,
			Mobile: user.mobile,
			'Signup Date': user.signupDate,
			'Last Active': user.lastActive,
			Status: user.status,
			'Purchase Count': user.purchases.length,
			'Total Spent': user.purchases
				.reduce((sum, purchase) => sum + purchase.amount, 0)
				.toFixed(2),
		}));

		exportToCSV(data, 'users-data');
	};

	// const exportUserPurchases = (user: UserData) => {
	// 	const data = user.purchases.map((purchase) => ({
	// 		ID: purchase.id,
	// 		Product: purchase.productName,
	// 		Date: purchase.date,
	// 		Amount: purchase.amount.toFixed(2),
	// 		Status: purchase.status,
	// 	}));

	// 	exportToCSV(
	// 		data,
	// 		`${user.name.replace(/\s+/g, '-').toLowerCase()}-purchases`
	// 	);
	// };

	const { data: customersData } = useQuery({
		queryKey: ['customers'],
		queryFn: () => getCustomersService({ storeId: storeId! }),
	});

	useEffect(() => {
		if (customersData?.data.data) {
			console.log(customersData?.data.data);
			setCustomers(customersData?.data.data);
		}
	}, [customersData, setCustomers]);

	return (
		<section className="mx-auto max-w-7xl space-y-6">
			<HeaderSection
				icon={<User className="h-7 w-7" />}
				title="Customer Management"
				description="Manage your customers"
			/>

			<section className="flex w-full items-center justify-between">
				<section className="relative w-full max-w-sm">
					<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
					<Input
						type="search"
						placeholder="Search users..."
						className="w-full pl-8"
						value={searchTerm}
						onChange={handleSearch}
					/>
				</section>
				<Button onClick={exportUsers} className="gap-2">
					<Download className="h-4 w-4" />
					Export to CSV
				</Button>
			</section>

			<CustomerDataTable columns={customerColumns} data={customers} />
		</section>
	);
};

export default CustomerManagement;
