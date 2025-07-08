import HeaderSection from '@/components/layouts/HeaderSection';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCustomerByIdService } from '@/features/Customer/services';
import { Customer, useCustomerStore } from '@/stores/useCustomerStore';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';

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
		<section className="mx-auto max-w-7xl space-y-6">
			<HeaderSection
				icon={<User className="h-7 w-7" />}
				title={`User Profile: ${customer?.firstName} ${customer?.lastName}`}
				description={`Last active: ${customer?.lastActive} | Status: ${customer?.status}`}
			/>

			<Tabs defaultValue="details">
				<TabsList>
					<TabsTrigger value="details">User Details</TabsTrigger>
					<TabsTrigger value="purchases">Purchase History</TabsTrigger>
				</TabsList>
				<TabsContent value="details" className="space-y-4 pt-4">
					<Card>
						<CardContent className="grid grid-cols-2 gap-4 space-y-4">
							<section className="flex flex-col gap-2">
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Name
									</Label>
									<p className="text-base font-semibold">
										{customer?.firstName}
									</p>
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Email
									</Label>
									<p className="text-base font-semibold">{customer?.email}</p>
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Mobile
									</Label>
									<p className="text-base font-semibold">{customer?.phone}</p>
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Last Active
									</Label>
									<p className="text-base font-semibold">
										{customer?.lastActive}
									</p>
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Status
									</Label>
									<p className="text-base font-semibold">{customer?.status}</p>
								</div>
							</section>
							<section>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Total Spent
									</Label>
									{/* <p>
										$
										{customer?.purchases
											.reduce((sum, purchase) => sum + purchase.amount, 0)
											.toFixed(2)}
									</p> */}
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Status
									</Label>
									<p className="text-base font-semibold">{customer?.status}</p>
								</div>
								<div className="flex flex-col items-start gap-2">
									<Label className="text-muted-foreground text-sm font-medium">
										Total Spent
									</Label>
									{/* <p>
										$
										{customer?.purchases
											.reduce((sum, purchase) => sum + purchase.amount, 0)
											.toFixed(2)}
									</p> */}
								</div>
								<div className="flex flex-col items-start gap-1">
									<Label className="text-muted-foreground text-base font-semibold">
										Total Purchases
									</Label>
									{/* <p>{customer?.purchases.length}</p> */}
									<p className="text-base font-semibold">
										{customer?.orderCount}
									</p>
								</div>
							</section>
						</CardContent>
					</Card>
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
		</section>
	);
};

export default CustomerDetails;
