import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardMetrics from '@/features/dashboard/components/DashboardMetrics';
import OverviewTab from '@/features/dashboard/components/OverviewTab';
import AnalyticsTab from '@/features/dashboard/components/AnalyticsTab';
import RecentActivityTab from '@/features/dashboard/components/RecentActivityTab';
import HeaderSection from '@/components/layouts/HeaderSection';
import { ChartBar } from 'lucide-react';

const AdminDashboard = () => {
	return (
		<div className="space-y-6">
			<HeaderSection
				icon={<ChartBar />}
				title="Dashboard"
				description="Overview of your store"
			/>

			<div className="flex w-full items-center justify-end">
				<Badge variant="outline" className="bg-vsphere-light text-vsphere-dark">
					Last updated: {new Date().toLocaleDateString()}
				</Badge>
			</div>

			{/* Dashboard Metrics */}
			<DashboardMetrics />

			{/* Dashboard Tabs */}
			<Tabs defaultValue="overview">
				<TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="recent">Recent Activity</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="mt-6">
					<OverviewTab />
				</TabsContent>

				<TabsContent value="analytics" className="mt-6">
					<AnalyticsTab />
				</TabsContent>

				<TabsContent value="recent" className="mt-6">
					<RecentActivityTab />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AdminDashboard;
