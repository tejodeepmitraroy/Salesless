import React from 'react';
import { useLocation, useParams } from 'react-router';
import {
	LayoutDashboard,
	Package,
	Users,
	ShoppingCart,
	Settings,
	LogOut,
	User,
	Bell,
	LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarItem from './SidebarItem';
import { motion } from 'framer-motion';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet';
import { Label } from '../ui/label';

interface SidebarProps {
	sidebarOpen: boolean;
}

const sidebarVariants = {
	open: { width: '16rem', x: 0 },
	closed: { width: '4rem', x: 0 },
};

const listVariants = {
	open: {
		transition: {
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
	closed: {
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const SidebarLinks = [
	{
		icon: LayoutGrid,
		label: 'App Launcher',
		href: '/',
		active: false,
		collapsed: false,
	},
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		href: '/dashboard',
		active: false,
		collapsed: false,
	},
	{
		icon: Package,
		label: 'Products',
		href: '/products',
		active: false,
		collapsed: false,
	},
	{
		icon: ShoppingCart,
		label: 'Orders',
		href: '/orders',
		active: false,
		collapsed: false,
	},
	{
		icon: Package,
		label: 'Inventory',
		href: '/inventory',
		active: false,
		collapsed: false,
	},
	{
		icon: Users,
		label: 'Vendors',
		href: '/vendors',
		active: false,
		collapsed: false,
	},
	{
		icon: User,
		label: 'Customers',
		href: '/customers',
		active: false,
		collapsed: false,
	},
	{
		icon: Bell,
		label: 'Notifications',
		href: '/notifications',
		active: false,
		collapsed: false,
	},
	{
		icon: Settings,
		label: 'Settings',
		href: '/settings',
		active: false,
		collapsed: false,
	},
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
	const location = useLocation();
	const { storeId } = useParams<{ storeId: string }>();

	return (
		<motion.aside
			variants={sidebarVariants}
			animate={sidebarOpen ? 'open' : 'closed'}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className={cn(
				'bg-background border-border scrollbar-thin fixed z-10 h-[calc(100vh-3.5rem)] overflow-y-auto border-r md:h-[calc(100vh-4rem)]',
				sidebarOpen ? 'w-64' : 'w-16'
			)}
		>
			<div className="hidden p-3 md:block md:p-4">
				<motion.nav
					className="space-y-1"
					variants={listVariants}
					initial="closed"
					animate={sidebarOpen ? 'open' : 'closed'}
				>
					{SidebarLinks.map((link) => (
						<SidebarItem
							key={link.label}
							icon={link.icon}
							label={link.label}
							href={`/store/${storeId}${link.href}`}
							active={location.pathname === `/store/${storeId}${link.href}`}
							collapsed={!sidebarOpen}
						/>
					))}
				</motion.nav>

				<Separator className="my-3 md:my-4" />
				<Label className="mx-3 my-2">Store</Label>

				<SidebarItem
					icon={LogOut}
					label="Logout"
					href="/"
					collapsed={!sidebarOpen}
				/>
			</div>
			<Sheet>
				<SheetTrigger>Open</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
					<div className="p-3 md:p-4">
						<motion.nav
							className="space-y-1"
							variants={listVariants}
							initial="closed"
							// animate={sidebarOpen ? 'open' : 'closed'}
						>
							<SidebarItem
								icon={LayoutGrid}
								label="App Launcher"
								href="/"
								active={location.pathname === '/'}
								// collapsed={!sidebarOpen}
							/>
							<SidebarItem
								icon={LayoutDashboard}
								label="Dashboard"
								active={location.pathname === '/dashboard'}
								href="/dashboard"
								// collapsed={!sidebarOpen}
							/>
							<SidebarItem
								icon={Package}
								label="Products"
								href="/products"
								active={location.pathname === '/products'}
								// collapsed={!sidebarOpen}
							/>

							<SidebarItem
								icon={ShoppingCart}
								label="Orders"
								href="/orders"
								active={location.pathname === '/orders'}
								// collapsed={!sidebarOpen}
							/>
							<SidebarItem
								icon={Package}
								label="Inventory"
								href="/inventory"
								active={location.pathname === '/inventory'}
								// collapsed={!sidebarOpen}
							/>
							{/* <SidebarItem 
            icon={UserCircle} 
            label="Employees" 
            href="/employees" 
            active={location.pathname === '/employees'} 
            collapsed={!sidebarOpen} 
          /> */}
							<SidebarItem
								icon={User}
								label="Customers"
								href="/customers"
								active={location.pathname === '/customers'}
								// collapsed={!sidebarOpen}
							/>
							{/* <SidebarItem 
            icon={BarChart} 
            label="Analytics" 
            href="/analytics" 
            active={location.pathname === '/analytics'} 
            collapsed={!sidebarOpen} 
          /> */}
							{/* <SidebarItem 
            icon={Megaphone} 
            label="Marketing" 
            href="/marketing" 
            active={location.pathname === '/marketing'} 
            collapsed={!sidebarOpen} 
          /> */}
							{/* <SidebarItem 
            icon={FileText} 
            label="Blog" 
            href="/blog" 
            active={location.pathname === '/blog'} 
            collapsed={!sidebarOpen} 
          /> */}
							{/* <SidebarItem 
            icon={LayoutTemplate} 
            label="CMS" 
            href="/cms" 
            active={location.pathname === '/cms'} 
            collapsed={!sidebarOpen} 
          /> */}
							<SidebarItem
								icon={Bell}
								label="Notifications"
								href="/notifications"
								active={location.pathname === '/notifications'}
								// collapsed={!sidebarOpen}
							/>
							<SidebarItem
								icon={Settings}
								label="Settings"
								href="/settings"
								active={location.pathname === '/settings'}
								// collapsed={!sidebarOpen}
							/>
						</motion.nav>

						<Separator className="my-3 md:my-4" />

						<SidebarItem
							icon={LogOut}
							label="Logout"
							href="/"
							// collapsed={!sidebarOpen}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</motion.aside>
	);
};

export default Sidebar;
