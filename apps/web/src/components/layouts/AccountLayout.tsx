import { Link, Outlet, useLocation, useParams } from 'react-router';
import { Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/context/AuthContext';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const AccountLayout = () => {
	const { user } = useAuth();
	return (
		<section
			className={`relative flex min-h-dvh w-full flex-col overflow-hidden border bg-white transition-all duration-300`}
		>
			<header className="fixed top-0 z-50 flex h-14 w-full items-center justify-center border-b bg-white">
				<section className="mx-auto flex w-full items-center justify-between gap-5 px-10">
					<Link to={`/store`} className="flex items-center justify-start gap-2">
						<img
							src="/logo2.png"
							alt=""
							className="aspect-square w-5 rounded-lg"
						/>
						<span className="flex items-center gap-2 text-lg font-bold text-black md:text-xl">
							Salesless
						</span>
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-2">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user?.avatar} alt={user?.firstName} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>

							<span className="truncate font-medium">
								{user?.firstName} {user?.lastName}
							</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							align="center"
							sideOffset={4}
						>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</section>
			</header>
			<section className="mt-12 flex max-h-[calc(100dvh-3.1rem)] w-full flex-1 overflow-hidden">
				<AccountLayoutSidebar />

				<main className="w-full overflow-y-auto">
					<section className="h-full w-full overflow-y-auto p-4 md:p-6 md:pt-4">
						<Outlet />
					</section>
				</main>
			</section>
		</section>
	);
};

export default AccountLayout;

const AccountLayoutSidebar = () => {
	const location = useLocation();
	const { accountId } = useParams<{ accountId: string }>();

	const sidebarItems = [
		{ id: 'general', label: 'General', icon: User },
		{ id: 'security', label: 'Security', icon: Shield },
	];

	return (
		<aside className="bg-background min-h-full w-full max-w-64 border-r py-6">
			<nav className="h-full px-4">
				{sidebarItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.id}
							to={`/accounts/${accountId}/${item.id}`}
							className={`mb-1 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
								location.pathname === `/accounts/${accountId}/${item.id}`
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
							}`}
						>
							<Icon className="mr-3 h-4 w-4" />
							{item.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
};
