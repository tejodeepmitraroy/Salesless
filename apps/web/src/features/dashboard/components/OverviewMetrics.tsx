import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Package, Truck, AlertCircle } from 'lucide-react';

const data = [
	{ name: 'Jan', products: 40, sales: 24, restock: 20 },
	{ name: 'Feb', products: 30, sales: 13, restock: 15 },
	{ name: 'Mar', products: 20, sales: 38, restock: 25 },
	{ name: 'Apr', products: 27, sales: 19, restock: 10 },
	{ name: 'May', products: 18, sales: 38, restock: 15 },
	{ name: 'Jun', products: 23, sales: 38, restock: 20 },
];

export default function OverviewMetrics() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold tracking-tight">Your Overview</h2>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Package className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,234</div>
						<p className="text-muted-foreground text-xs">
							+12% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Low Stock Items
						</CardTitle>
						<AlertCircle className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24</div>
						<p className="text-muted-foreground text-xs">Needs restocking</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Deliveries
						</CardTitle>
						<Truck className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">18</div>
						<p className="text-muted-foreground text-xs">In transit</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Sales Growth</CardTitle>
						<TrendingUp className="text-muted-foreground h-4 w-4" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+24.1%</div>
						<p className="text-muted-foreground text-xs">vs last month</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Inventory Overview</CardTitle>
					</CardHeader>
					<CardContent className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="products" fill="#8884d8" name="Total Products" />
								<Bar dataKey="sales" fill="#82ca9d" name="Items Sold" />
								<Bar dataKey="restock" fill="#ffc658" name="Restocked" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
