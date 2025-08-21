import { Badge } from '@/components/ui/badge';
import HeaderSection from '@/components/layouts/HeaderSection';
import { ChartBar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import SetupProgress from '@/features/dashboard/components/SetupProgress';
import OverviewMetrics from '@/features/dashboard/components/OverviewMetrics';

const AdminDashboard = () => {
	return (
		<div className="space-y-8 p-6">
			<div className="flex items-center justify-between">
				<HeaderSection
					icon={<ChartBar className="h-6 w-6" />}
					title="Dashboard"
					description="Manage your store and view analytics"
				/>
				<Badge variant="outline" className="bg-muted text-muted-foreground">
					Last updated: {new Date().toLocaleDateString()}
				</Badge>
			</div>

			{/* Setup Progress */}
			<SetupProgress />

			{/* Overview Metrics and Charts */}
			<OverviewMetrics />

			{/* Additional Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="p-6">
					<div className="space-y-2">
						<h3 className="text-muted-foreground text-sm font-medium">
							Top Selling Product
						</h3>
						<p className="text-2xl font-bold">Premium T-Shirt</p>
						<p className="text-muted-foreground text-sm">124 sold this month</p>
					</div>
				</Card>
				<Card className="p-6">
					<div className="space-y-2">
						<h3 className="text-muted-foreground text-sm font-medium">
							Average Order Value
						</h3>
						<p className="text-2xl font-bold">$89.99</p>
						<p className="text-muted-foreground text-sm">
							+12% from last month
						</p>
					</div>
				</Card>
				<Card className="p-6">
					<div className="space-y-2">
						<h3 className="text-muted-foreground text-sm font-medium">
							Customer Satisfaction
						</h3>
						<p className="text-2xl font-bold">4.8/5</p>
						<p className="text-muted-foreground text-sm">
							Based on 128 reviews
						</p>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default AdminDashboard;
