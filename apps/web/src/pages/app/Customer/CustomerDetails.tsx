import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCustomerByIdService } from '@/features/Customer/services';
import { Customer, useCustomerStore } from '@/stores/useCustomerStore';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const CustomerDetails = () => {
	const { storeId, customerId } = useParams<{
		storeId: string;
		customerId: string;
	}>();
	const [customer, setCustomer] = useState<Customer | null>(null);

	const getCustomerById = useCustomerStore((state) => state.getCustomerById);

	const { data: customerData } = useQuery({
		queryKey: ['customers', `${customerId}`],
		queryFn: () =>
			getCustomerByIdService({ storeId: storeId!, customerId: customerId! }),
	});

	useEffect(() => {
		if (getCustomerById) {
			setCustomer(getCustomerById(Number(customerId!)));
		} else {
			if (customerData?.data.data) {
				console.log(customerData?.data.data);
				setCustomer(customerData?.data.data);
			}
		}
	}, [customerData?.data.data, customerId, getCustomerById]);

	return (
		<section>
			<Card>
				<CardHeader>
					{/* <div className="flex items-center justify-between">
						<CardTitle>User Profile: {customer?.firstName}</CardTitle>
						<Button
							variant="outline"
							size="sm"
							onClick={() => exportUserPurchases(customer)}
							className="gap-2"
						>
							<Download className="h-4 w-4" />
							Export Purchases
						</Button>
					</div> */}
					<CardDescription>
						Last active: {customer?.lastActive} | Status: {customer?.status}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="details">
						<TabsList>
							<TabsTrigger value="details">User Details</TabsTrigger>
							<TabsTrigger value="purchases">Purchase History</TabsTrigger>
						</TabsList>
						<TabsContent value="details" className="space-y-4 pt-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Name
									</p>
									<p>{customer?.firstName}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Email
									</p>
									<p>{customer?.email}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Mobile
									</p>
									<p>{customer?.phone}</p>
								</div>
								{/* <div>
									<p className="text-muted-foreground text-sm font-medium">
										Signup Date
									</p>
									<p>{customer?.createdAt}</p>
								</div> */}
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Last Active
									</p>
									<p>{customer?.lastActive}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Status
									</p>
									<p>{customer?.status}</p>
								</div>
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Total Spent
									</p>
									{/* <p>
										$
										{customer?.purchases
											.reduce((sum, purchase) => sum + purchase.amount, 0)
											.toFixed(2)}
									</p> */}
								</div>
								<div>
									<p className="text-muted-foreground text-sm font-medium">
										Total Purchases
									</p>
									{/* <p>{customer?.purchases.length}</p> */}
									<p>{customer?.orderCount}</p>
								</div>
							</div>
						</TabsContent>
						{/* <TabsContent value="purchases" className="pt-4">
							{customer?.purchases.length > 0 ? (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Product</TableHead>
											<TableHead>Date</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selectedUser.purchases.map((purchase) => (
											<TableRow key={purchase.id}>
												<TableCell>{purchase.id}</TableCell>
												<TableCell>{purchase.productName}</TableCell>
												<TableCell>{purchase.date}</TableCell>
												<TableCell>${purchase.amount.toFixed(2)}</TableCell>
												<TableCell>
													<span
														className={`rounded-full px-2 py-1 text-xs font-medium ${
															purchase.status === 'Completed'
																? 'bg-green-100 text-green-800'
																: purchase.status === 'Pending'
																	? 'bg-yellow-100 text-yellow-800'
																	: 'bg-red-100 text-red-800'
														}`}
													>
														{purchase.status}
													</span>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							) : (
								<p className="text-muted-foreground py-4 text-center">
									No purchase history available
								</p>
							)}
						</TabsContent> */}
					</Tabs>
				</CardContent>
			</Card>
		</section>
	);
};

export default CustomerDetails;
