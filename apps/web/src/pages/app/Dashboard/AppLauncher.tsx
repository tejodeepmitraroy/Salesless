import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Card, CardContent, } from '@/components/ui/card';
import {
	LayoutDashboard,
	Package,
	Users,
	ShoppingCart,
	Settings,
	BarChart,
	Megaphone,
	FileText,
	UserCircle,
	LayoutTemplate,
	User,
	Bell,
} from 'lucide-react';

interface AppTileProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	to: string;
	color: string;
	index: number;
	active: boolean;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const tileVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	},
};

const AppTile: React.FC<AppTileProps> = ({
	icon,
	title,
	description,
	to,
	color,
	index,
	active,
}) => {
	return (
		<motion.div
			variants={tileVariants}
			whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
			whileTap={{ scale: 0.98 }}
			className={`h-full `}
		>
			<Link to={to} className="block h-full">
				<Card className={`${active ? '' : 'opacity-50'} hover:border-vsphere-primary h-full border-2 transition-all duration-300 hover:shadow-md`}>
					
					<CardContent className="flex items-start h-full flex-col p-6">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
							className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${color}`}
						>
							{icon}
						</motion.div>
						<h3 className="mb-2 text-lg font-medium">{title}</h3>
						<p className="text-left text-muted-foreground text-sm">{description}</p>
					</CardContent>
					
				</Card>
			</Link>
		</motion.div>
	);
};

const AppLauncher: React.FC = () => {
	const apps = [
		{
			icon: <LayoutDashboard className="h-6 w-6 text-white" />,
			title: 'Dashboard',
			description: 'Overview of key metrics and performance',
			to: '',
			color: 'bg-blue-500',
			active: true,
		},
		{
			icon: <Package className="h-6 w-6 text-white" />,
			title: 'Products',
			description: 'Manage your product catalog',
			to: '/products',
			color: 'bg-green-500',
			active: true,
		},
		{
			icon: <ShoppingCart className="h-6 w-6 text-white" />,
			title: 'Orders',
			description: 'Track and manage customer orders',
			to: '/orders',
			color: 'bg-orange-500',
			active: true,
		},
		{
			icon: <Package className="h-6 w-6 text-white" />,
			title: 'Inventory',
			description: 'Track and manage stock levels',
			to: '/inventory',
			color: 'bg-cyan-500',
			active: true,
		},
		{
			icon: <Users className="h-6 w-6 text-white" />,
			title: 'Vendors',
			description: 'Manage vendor relationships and accounts',
			to: '/vendors',
			color: 'bg-purple-500',
			active: false,
		},
		{
			icon: <UserCircle className="h-6 w-6 text-white" />,
			title: 'Employees',
			description: 'Manage staff and permissions',
			to: '/employees',
			color: 'bg-indigo-500',
			active: false,
		},
		{
			icon: <User className="h-6 w-6 text-white" />,
			title: 'Users',
			description: 'Manage customer accounts',
			to: '/users',
			color: 'bg-pink-500',
			active: true,
		},
		{
			icon: <BarChart className="h-6 w-6 text-white" />,
			title: 'Analytics',
			description: 'Insights and performance metrics',
			to: '/analytics',
			color: 'bg-yellow-500',
			active: false,
		},
		{
			icon: <Megaphone className="h-6 w-6 text-white" />,
			title: 'Marketing',
			description: 'Campaigns and promotions',
			to: '/marketing',
			color: 'bg-red-500',
			active: false,
		},
		{
			icon: <FileText className="h-6 w-6 text-white" />,
			title: 'Blog',
			description: 'Manage blog content and posts',
			to: '/blog',
			color: 'bg-emerald-500',
			active: false,
		},
		{
			icon: <LayoutTemplate className="h-6 w-6 text-white" />,
			title: 'CMS',
			description: 'Manage website content',
			to: '/cms',
			color: 'bg-violet-500',
			active: false,
		},
		{
			icon: <Bell className="h-6 w-6 text-white" />,
			title: 'Notifications',
			description: 'Manage system alerts and messages',
			to: '/notifications',
			color: 'bg-amber-500',
			active: true,
		},
		{
			icon: <Settings className="h-6 w-6 text-white" />,
			title: 'Settings',
			description: 'Configure system preferences',
			to: '/settings',
			color: 'bg-gray-500',
			active: true,
		},
	];

	return (
		<div className="container py-8">
			<motion.div
				className="mb-8 flex flex-col items-start"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="mb-2 text-3xl font-bold">App Launcher</h1>
				<p className="text-muted-foreground">
					Access all VendorSphere admin applications in one place
				</p>
			</motion.div>

			<motion.div
				className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{apps.map((app, index) => (
					<AppTile
						key={index}
						icon={app.icon}
						title={app.title}
						description={app.description}
						to={app.to}
						color={app.color}
						index={index}
						active={app.active}
					/>
				))}
			</motion.div>
		</div>
	);
};

export default AppLauncher;
