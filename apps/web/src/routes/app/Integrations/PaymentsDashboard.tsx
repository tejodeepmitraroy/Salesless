import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	CreditCard,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Calendar,
	Download,
	Search,
	Filter,
} from 'lucide-react';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
	Legend,
} from 'recharts';
import HeaderSection from '@/components/layouts/HeaderSection';

// Mock data for payments by channel
const paymentsByChannel = [
	{ channel: 'Website', amount: 15420, percentage: 45, color: '#8884d8' },
	{ channel: 'Mobile App', amount: 11230, percentage: 33, color: '#82ca9d' },
	{
		channel: 'WhatsApp Business',
		amount: 7350,
		percentage: 22,
		color: '#ffc658',
	},
];

// Mock data for monthly revenue
const monthlyRevenue = [
	{ month: 'Jan', website: 12000, mobile: 8000, whatsapp: 5000, total: 25000 },
	{ month: 'Feb', website: 13500, mobile: 9200, whatsapp: 6100, total: 28800 },
	{ month: 'Mar', website: 14200, mobile: 10500, whatsapp: 6800, total: 31500 },
	{ month: 'Apr', website: 15420, mobile: 11230, whatsapp: 7350, total: 34000 },
];

// Mock transaction data
const recentTransactions = [
	{
		id: 'TXN-001',
		customer: 'John Doe',
		amount: 299.99,
		channel: 'Website',
		status: 'completed',
		date: '2024-01-15',
	},
	{
		id: 'TXN-002',
		customer: 'Jane Smith',
		amount: 149.5,
		channel: 'Mobile App',
		status: 'completed',
		date: '2024-01-15',
	},
	{
		id: 'TXN-003',
		customer: 'Mike Johnson',
		amount: 89.99,
		channel: 'WhatsApp Business',
		status: 'pending',
		date: '2024-01-14',
	},
	{
		id: 'TXN-004',
		customer: 'Sarah Wilson',
		amount: 199.99,
		channel: 'Website',
		status: 'completed',
		date: '2024-01-14',
	},
	{
		id: 'TXN-005',
		customer: 'Tom Brown',
		amount: 79.99,
		channel: 'Mobile App',
		status: 'failed',
		date: '2024-01-13',
	},
];

const PaymentsDashboard = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('30d');
	const [searchTerm, setSearchTerm] = useState('');

	const totalRevenue = paymentsByChannel.reduce(
		(sum, channel) => sum + channel.amount,
		0
	);
	const totalTransactions = recentTransactions.length;
	const averageOrderValue = totalRevenue / totalTransactions;

	const chartConfig = {
		website: {
			label: 'Website',
			color: '#8884d8',
		},
		mobile: {
			label: 'Mobile App',
			color: '#82ca9d',
		},
		whatsapp: {
			label: 'WhatsApp Business',
			color: '#ffc658',
		},
	};

	return (
		<section className="mx-auto w-full max-w-7xl space-y-6">
			<HeaderSection
				title="Payments"
				description="Track payments and revenue across all sales channels"
			>
				<div className="flex gap-2">
					<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
							<SelectItem value="1y">Last year</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
				</div>
			</HeaderSection>

			<section className="flex w-full flex-col space-y-6">
				<section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<DollarSign className="text-muted-foreground h-4 w-4" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								${totalRevenue.toLocaleString()}
							</div>
							<p className="text-muted-foreground text-xs">
								<span className="flex items-center text-green-500">
									<TrendingUp className="mr-1 h-3 w-3" />
									+12.3%
								</span>
								from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Transactions
							</CardTitle>
							<CreditCard className="text-muted-foreground h-4 w-4" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{totalTransactions}</div>
							<p className="text-muted-foreground text-xs">
								<span className="flex items-center text-green-500">
									<TrendingUp className="mr-1 h-3 w-3" />
									+8.1%
								</span>
								from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Average Order Value
							</CardTitle>
							<TrendingUp className="text-muted-foreground h-4 w-4" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								${averageOrderValue.toFixed(2)}
							</div>
							<p className="text-muted-foreground text-xs">
								<span className="flex items-center text-red-500">
									<TrendingDown className="mr-1 h-3 w-3" />
									-2.4%
								</span>
								from last month
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Success Rate
							</CardTitle>
							<Calendar className="text-muted-foreground h-4 w-4" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">94.2%</div>
							<p className="text-muted-foreground text-xs">
								<span className="flex items-center text-green-500">
									<TrendingUp className="mr-1 h-3 w-3" />
									+1.2%
								</span>
								from last month
							</p>
						</CardContent>
					</Card>
				</section>

				<section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Revenue by Channel - Pie Chart */}
					<Card>
						<CardHeader>
							<CardTitle>Revenue by Sales Channel</CardTitle>
							<CardDescription>
								Distribution of payments across different channels
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig} className="h-80">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={paymentsByChannel}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percentage }) => `${name} ${percentage}%`}
											outerRadius={80}
											fill="#8884d8"
											dataKey="amount"
										>
											{paymentsByChannel.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<ChartTooltip content={<ChartTooltipContent />} />
									</PieChart>
								</ResponsiveContainer>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* Monthly Revenue Trend */}
					<Card>
						<CardHeader>
							<CardTitle>Monthly Revenue Trend</CardTitle>
							<CardDescription>
								Revenue performance over time by channel
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig} className="h-80">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={monthlyRevenue}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<ChartTooltip content={<ChartTooltipContent />} />
										<Legend />
										<Line
											type="monotone"
											dataKey="website"
											stroke="#8884d8"
											strokeWidth={2}
										/>
										<Line
											type="monotone"
											dataKey="mobile"
											stroke="#82ca9d"
											strokeWidth={2}
										/>
										<Line
											type="monotone"
											dataKey="whatsapp"
											stroke="#ffc658"
											strokeWidth={2}
										/>
									</LineChart>
								</ResponsiveContainer>
							</ChartContainer>
						</CardContent>
					</Card>
				</section>

				{/* Revenue Comparison Bar Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Channel Performance Comparison</CardTitle>
						<CardDescription>
							Monthly revenue comparison across all sales channels
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyRevenue}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Legend />
									<Bar dataKey="website" fill="#8884d8" />
									<Bar dataKey="mobile" fill="#82ca9d" />
									<Bar dataKey="whatsapp" fill="#ffc658" />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Recent Transactions */}
				<Card>
					<CardHeader>
						<CardTitle>Recent Transactions</CardTitle>
						<CardDescription>
							Latest payment activities across all channels
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="mb-4 flex gap-4">
							<div className="relative flex-1">
								<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
								<Input
									placeholder="Search transactions..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
							<Button variant="outline">
								<Filter className="mr-2 h-4 w-4" />
								Filter
							</Button>
						</div>

						<div className="space-y-3">
							{recentTransactions.map((transaction) => (
								<div
									key={transaction.id}
									className="flex items-center justify-between rounded-lg border p-4"
								>
									<div className="flex items-center space-x-4">
										<div className="h-2 w-2 rounded-full bg-green-500"></div>
										<div>
											<p className="font-medium">{transaction.customer}</p>
											<p className="text-muted-foreground text-sm">
												{transaction.id}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<Badge variant="outline">{transaction.channel}</Badge>
										<Badge
											variant={
												transaction.status === 'completed'
													? 'default'
													: transaction.status === 'pending'
														? 'secondary'
														: 'destructive'
											}
										>
											{transaction.status}
										</Badge>
										<div className="text-right">
											<p className="font-medium">${transaction.amount}</p>
											<p className="text-muted-foreground text-sm">
												{transaction.date}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</section>
		</section>
	);
};

export default PaymentsDashboard;
