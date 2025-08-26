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

import { NavSecondary } from './nav-secondary';
import { useParams } from 'react-router';
import StoreSwitcher from './store-switcher';
import { FcBullish } from 'react-icons/fc';
import { Badge } from '../ui/badge';
import { useStoreConfig } from '@/stores/useStoreConfig';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { storeId } = useParams<{ storeId: string }>();
	const data = {
		navMain: [
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
				title: 'Upgrade',
				url: `/store/${storeId}/billing`,
				icon: <FcBullish />,
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

	const subscription = useStoreConfig((state) => state.subscription);

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
							SalesLess
						</span>
						{subscription?.type === 'trial' ? (
							<Badge className="truncate bg-gray-400 text-xs text-white">
								Trial
							</Badge>
						) : (
							<Badge className="truncate text-xs">
								{subscription?.type === 'basic'
									? 'Basic'
									: subscription?.type === 'grow'
										? 'Grow'
										: subscription?.type === 'scale'
											? 'Scale'
											: 'Unknown'}
							</Badge>
						)}
					</SidebarMenuButton>
				</SidebarMenuItem>

				<StoreSwitcher />
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
