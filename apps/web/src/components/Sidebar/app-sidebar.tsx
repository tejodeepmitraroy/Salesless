import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
	AudioWaveform,
	CircuitBoard,
	Command,
	CreditCard,
	Database,
	FileText,
	GalleryVerticalEnd,
	HelpCircle,
	Image,
	LayoutDashboard,
	Package,
	Search,
	Settings,
	ShoppingCart,
	User,
} from 'lucide-react';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { TeamSwitcher } from './team-switcher';
import { NavSecondary } from './nav-secondary';
import { useParams } from 'react-router';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { storeId } = useParams<{ storeId: string }>();
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg',
		},
		navMain: [
			// {
			// 	title: 'Home',
			// 	url: `/store/${storeId}`,
			// 	icon: Home,
			// },
			{
				title: 'Dashboard',
				url: `/store/${storeId}`,
				icon: LayoutDashboard,
			},
			{
				title: 'Orders',
				url: `/store/${storeId}/orders`,
				icon: ShoppingCart,
				isActive: false,
				items: [
					{
						title: 'All Orders',
						url: `/store/${storeId}/orders`,
						icon: ShoppingCart,
					},
					// {
					// 	title: 'Draft ',
					// 	url: `/store/${storeId}/orders/drafts`,
					// 	icon: ShoppingCart,
					// },
				],
			},
			{
				title: 'Products',
				url: `/store/${storeId}/products`,
				icon: Package,
				isActive: false,
				items: [
					{
						title: 'All Products',
						url: `/store/${storeId}/products`,
						icon: Package,
					},
					{
						title: 'Inventory',
						url: `/store/${storeId}/products/inventory`,
						icon: Package,
					},
				],
			},
			{
				title: 'Finances',
				url: `/store/${storeId}/finances`,
				icon: CreditCard,
				isActive: false,
				items: [
					{
						title: 'Payments',
						url: `/store/${storeId}/finances/payments`,
						icon: CreditCard,
					},
					{
						title: 'Expenses',
						url: `/store/${storeId}/finances/expenses`,
						icon: CreditCard,
					},
				],
			},
			{
				title: 'Customers',
				url: `/store/${storeId}/customers`,
				icon: User,
				isActive: false,
			},
			{
				title: 'Media Store',
				url: `/store/${storeId}/media`,
				icon: Image,
				isActive: false,
			},
			{
				title: 'Integrations',
				url: `/store/${storeId}/integrations`,
				icon: CircuitBoard,
				isActive: false,
			},
		],
		// navClouds: [
		// 	{
		// 		title: 'Capture',
		// 		icon: Camera,
		// 		isActive: true,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#',
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#',
		// 			},
		// 		],
		// 	},
		// 	{
		// 		title: 'Capture',
		// 		icon: Camera,
		// 		isActive: true,
		// 		url: '#',
		// 		items: [
		// 			{
		// 				title: 'Active Proposals',
		// 				url: '#',
		// 			},
		// 			{
		// 				title: 'Archived',
		// 				url: '#',
		// 			},
		// 		],
		// 	},
		// ],
		navSecondary: [
			{
				title: 'Docs',
				url: `/store/${storeId}/docs`,
				icon: <FileText />,
			},
			{
				title: 'Settings',
				url: `/store/${storeId}/settings`,
				icon: <Settings />,
			},
			{
				title: 'Get Help',
				url: '#',
				icon: <HelpCircle />,
			},
			{
				title: 'Search',
				url: '#',
				icon: <Search />,
			},
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: Database,
			},
			// {
			// 	name: 'Reports',
			// 	url: '#',
			// 	icon: IconReport,
			// },
			// {
			// 	name: 'Word Assistant',
			// 	url: '#',
			// 	icon: IconFileWord,
			// },
		],
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise',
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup',
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free',
			},
		],
	};
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenuItem className="flex items-center justify-start gap-2">
					<SidebarMenuButton tooltip="Sidebar">
						<img
							src="/logo2.png"
							alt=""
							className="aspect-square w-5 rounded-lg"
						/>
						<span className="flex items-center gap-2 text-lg font-bold text-black md:text-xl">
							Salesless
						</span>
					</SidebarMenuButton>
				</SidebarMenuItem>

				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
