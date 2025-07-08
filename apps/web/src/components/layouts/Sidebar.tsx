import { Link, useParams } from 'react-router';
import {
	LayoutDashboard,
	Package,
	ShoppingCart,
	Settings,
	User,
	Store,
	SignpostBig,
	Phone,
	Image,
	PanelsTopLeft,
	Boxes,
	Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarItem from './SidebarItem';
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const sidebarVariants = {
	open: { width: '18rem', x: 0 },
	closed: { width: '6.5rem', x: 0 },
};

const SidebarLinks = [
	{
		icon: Home,
		label: 'Home',
		href: '/',
		active: false,
		collapsed: false,
		subLinks: [],
	},
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		href: '/dashboard',
		active: false,
		collapsed: false,
		subLinks: [],
	},
	{
		icon: Package,
		label: 'Products',
		href: '/products',
		active: false,
		collapsed: false,
		subLinks: [
			// {
			// 	icon: LibraryBig,
			// 	label: 'Collections',
			// 	href: '/collections',
			// 	active: false,
			// 	collapsed: false,
			// },
			{
				icon: Boxes,
				label: 'Inventory',
				href: '/inventory',
				active: false,
				collapsed: false,
			},
		],
	},
	{
		icon: ShoppingCart,
		label: 'Orders',
		href: '/orders',
		active: false,
		collapsed: false,
		subLinks: [],
	},

	{
		icon: User,
		label: 'Customers',
		href: '/customers',
		active: false,
		collapsed: false,
		subLinks: [],
	},

	{
		icon: Image,
		label: 'Media Store',
		href: '/media',
		active: false,
		collapsed: false,
		subLinks: [],
	},
];

const salesChannels = [
	{
		icon: Store,
		label: 'Website',
		href: '#',
		active: false,
		collapsed: false,
		subLinks: [],
	},
	{
		icon: SignpostBig,
		label: 'POS',
		href: '#',
		active: false,
		collapsed: false,
		subLinks: [],
	},
	{
		icon: Phone,
		label: 'WhatsApp',
		href: '#',
		active: false,
		collapsed: false,
		subLinks: [],
	},
];

const mainLinks = [
	{
		icon: Settings,
		label: 'Settings',
		href: '/settings/general',
		active: false,
		collapsed: false,
	},
	// {
	// 	icon: LogOut,
	// 	label: 'Logout',
	// 	href: '/logout',
	// 	active: false,
	// 	collapsed: false,
	// },
];

const Sidebar: React.FC<{
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}> = ({ sidebarOpen, toggleSidebar }) => {
	const { storeId } = useParams<{ storeId: string }>();

	// const stores = useStoreStore((state) => state.stores);
	// const setSelectedStore = useStoreStore((state) => state.setSelectedStore);
	// const selectedStore = useStoreStore((state) => state.selectedStore);
	// const fetchStores = useStoreStore((state) => state.fetchStores);
	// const navigate = useNavigate();

	// const handleStoreSelected = (storeId: string) => {
	// 	navigate(`/store/${storeId}`);
	// 	setSelectedStore(storeId);
	// };

	// const handleCreateStore = () => {
	// 	navigate('/store/create');
	// };

	// const handleFetchStores = () => {
	// 	fetchStores();
	// 	console.log('Fetched');
	// };

	return (
		<motion.aside
			variants={sidebarVariants}
			animate={sidebarOpen ? 'open' : 'closed'}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			className={cn(
				// 'border-border scrollbar-thin fixed z-10 h-[calc(100vh-3.5rem)] overflow-y-auto border-r px-3 py-2 md:h-[calc(100vh-4rem)]',
				// 'fixed z-10 h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-3 md:h-[calc(100dvh)]',
				'fixed z-10 h-[calc(100vh-3.5rem)] overflow-y-auto border-r md:h-[calc(100dvh)]',
				sidebarOpen ? 'w-[18rem]' : 'w-[6rem]'
			)}
		>
			<div className="from-primary/10 bg-background hidden h-full w-full rounded-lg p-3 md:block md:p-4">
				<section
					className={` ${sidebarOpen ? 'flex-row px-2' : 'flex-col'} flex w-full items-center justify-between`}
				>
					<Link
						to={`/store/${storeId}`}
						className="my-3 flex items-center gap-4"
					>
						<img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
						{sidebarOpen && (
							<span className="flex items-center gap-2 text-lg font-bold text-black md:text-xl">
								Salesless
							</span>
						)}
					</Link>

					<Button onClick={() => toggleSidebar()} size="icon" variant="ghost">
						<PanelsTopLeft />
					</Button>
				</section>
				{/* <DropdownMenu>
					<DropdownMenuTrigger className="mt-6 w-full">
						<section
							onClick={() => handleFetchStores()}
							className="flex w-full items-center justify-between border py-1 pl-4"
						>
							<div className="g flex items-center">
								<Store />
								<Label className="mx-2 my-2 text-sm">
									{selectedStore?.name}
								</Label>
							</div>
							<div className="mx-3 my-2">
								<ChevronsUpDown />
							</div>
						</section>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="start" sideOffset={5}>
						<DropdownMenuLabel className="text-sm text-gray-500">
							Stores
						</DropdownMenuLabel>

						{stores.map((store: unknown) => (
							<DropdownMenuItem
								onClick={() =>
									handleStoreSelected((store as { id: string }).id)
								}
								key={(store as { id: string }).id}
							>
								{(store as { name: string }).name}
							</DropdownMenuItem>
						))}

						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={() => handleCreateStore()}>
							<Plus />
							Create Store
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}

				<nav className="mt-4 space-y-1 border">
					{SidebarLinks.map((link) => (
						<SidebarItem
							key={link.label}
							icon={link.icon}
							label={link.label}
							href={link.href}
							collapsed={!sidebarOpen}
							subLinks={link.subLinks}
						/>
					))}
					<Separator className="my-3 md:my-4" />
					{sidebarOpen && <Label className="mx-3 my-2">Sales Channels</Label>}

					{salesChannels.map((link) => (
						<SidebarItem
							key={link.label}
							icon={link.icon}
							label={link.label}
							href={link.href}
							collapsed={!sidebarOpen}
							subLinks={link.subLinks}
						/>
					))}

					<Separator className="my-3 md:my-4" />
					{sidebarOpen && <Label className="mx-3 my-2">Main</Label>}
					{mainLinks.map((link) => (
						<SidebarItem
							key={link.label}
							icon={link.icon}
							label={link.label}
							href={link.href}
							collapsed={!sidebarOpen}
						/>
					))}
				</nav>
				<Separator className="my-3 md:my-4" />
				<section>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex items-center gap-2">
								<Avatar className="h-9 w-9 rounded-lg border">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<Label className="text-sm font-medium">John Doe</Label>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuItem>Subscription</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</section>
			</div>
			{/* <Sheet>
				<SheetTrigger>Open</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader
						className={` ${sidebarOpen ? 'flex-row px-2' : 'flex-col'} flex w-full items-center justify-between`}
					>
						<SheetTitle>
							<Link
								to={`/store/${storeId}`}
								className="my-3 flex items-center gap-4"
							>
								<img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
								{sidebarOpen && (
									<span className="flex items-center gap-2 text-lg font-bold text-black md:text-xl">
										Salesless
									</span>
								)}
							</Link>

							<Button
								onClick={() => toggleSidebar()}
								size="icon"
								variant="ghost"
							>
								<PanelsTopLeft />
							</Button>
						</SheetTitle>
					</SheetHeader>
					<DropdownMenu>
						<DropdownMenuTrigger className="mt-6 w-full">
							<section className="flex w-full items-center justify-between border py-1 pl-4">
								<div className="g flex items-center">
									<Store />
									<Label className="mx-2 my-2 text-sm">
										{selectedStore?.name}
									</Label>
								</div>
								<div className="mx-3 my-2">
									<ChevronsUpDown />
								</div>
							</section>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="start" sideOffset={5}>
							<DropdownMenuLabel className="text-sm text-gray-500">
								Stores
							</DropdownMenuLabel>

							{stores.map((store: unknown) => (
								<DropdownMenuItem
									onClick={() =>
										handleStoreSelected((store as { id: string }).id)
									}
									key={(store as { id: string }).id}
								>
									{(store as { name: string }).name}
								</DropdownMenuItem>
							))}

							<DropdownMenuSeparator />

							<DropdownMenuItem onClick={() => handleCreateStore()}>
								<Plus />
								Create Store
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<nav className="mt-4 space-y-1">
						{SidebarLinks.map((link) => (
							<SidebarItem
								key={link.label}
								icon={link.icon}
								label={link.label}
								href={link.href}
								collapsed={!sidebarOpen}
								subLinks={link.subLinks}
							/>
						))}
						<Separator className="my-3 md:my-4" />
						{sidebarOpen && <Label className="mx-3 my-2">Sales Channels</Label>}

						{salesChannels.map((link) => (
							<SidebarItem
								key={link.label}
								icon={link.icon}
								label={link.label}
								href={link.href}
								collapsed={!sidebarOpen}
								subLinks={link.subLinks}
							/>
						))}

						<Separator className="my-3 md:my-4" />
						{sidebarOpen && <Label className="mx-3 my-2">Main</Label>}
						{mainLinks.map((link) => (
							<SidebarItem
								key={link.label}
								icon={link.icon}
								label={link.label}
								href={link.href}
								collapsed={!sidebarOpen}
							/>
						))}
					</nav>
				</SheetContent>
			</Sheet> */}
		</motion.aside>
	);
};

export default Sidebar;
