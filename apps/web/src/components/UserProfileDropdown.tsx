import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, User, LogOut, Bell, Moon, Sun } from 'lucide-react';

import { useAuth } from '@/features/users/hooks/useAuth';
import { Link } from 'react-router';
import { toast } from 'sonner';

const UserProfileDropdown = () => {
	// const { toast } = useToast();
	const { user, logout } = useAuth();
	const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
		toast(`Switched to ${theme === 'light' ? 'dark' : 'light'} mode`, {
			description: 'Your preference has been saved.',
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage src={user?.avatar || '/placeholder.svg'} alt="User" />
						<AvatarFallback>
							{user?.name?.slice(0, 2).toUpperCase() || 'UR'}
						</AvatarFallback>
					</Avatar>
					<span className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{user?.name || 'User'}</p>
						<p className="text-muted-foreground text-xs">
							{user?.email || 'user@example.com'}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to="/profile" className="cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/settings" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/notifications" className="cursor-pointer">
						<Bell className="mr-2 h-4 w-4" />
						<span>Notifications</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={toggleTheme}>
					{theme === 'light' ? (
						<>
							<Moon className="mr-2 h-4 w-4" />
							<span>Dark Mode</span>
						</>
					) : (
						<>
							<Sun className="mr-2 h-4 w-4" />
							<span>Light Mode</span>
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfileDropdown;
