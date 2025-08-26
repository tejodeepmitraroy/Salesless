import { ChevronsUpDown, Plus, Store } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

import { useStoreConfig } from '@/stores/useStoreConfig';
import { Switch } from '@/components/ui/switch';
import {
	getAllStoreService,
	updateStoreTestMode,
} from '@/features/Store/services';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router';

const StoreSwitcher = () => {
	const navigate = useNavigate();
	// const { isMobile } = useSidebar();
	// const [activeStore, setActiveStore] = React.useState(store[0]);

	// const { data: stores } = useQuery({
	// 	queryKey: ['stores'],
	// 	queryFn: getAllStoreService,
	// });

	const storeName = useStoreConfig((state) => state.storeName);
	const storeDescription = useStoreConfig((state) => state.storeDescription);
	const storeId = useStoreConfig((state) => state.storeId);
	console.log('storeName-->', storeName);
	console.log('storeDescription-->', storeDescription);
	console.log('storeId-->', storeId);
	const isTestMode = useStoreConfig((state) => state.isTestMode);
	const setIsTestMode = useStoreConfig((state) => state.setIsTestMode);

	const { data: stores } = useQuery({
		queryKey: ['stores', storeId],
		queryFn: async () => await getAllStoreService(),
	});

	console.log('stores-->', stores);

	const handleChangeStore = (storeId: string) => {
		navigate(`/store/${storeId}`, { replace: true });
		window.location.reload();
	};

	const handleTestModeChange = async () => {
		await updateStoreTestMode({ isTestMode: !isTestMode });
		setIsTestMode(!isTestMode);
	};
	const isSubscripted = useStoreConfig((state) => state.isSubscripted);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar>
								<AvatarImage src="https://gdwaithub.com/shadcn.png" />
								<AvatarFallback className="bg-primary text-background flex items-center justify-center font-bold">
									{storeName
										.split(' ')
										.map((word) => word[0])
										.join('')
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{storeName}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="center"
						side="bottom"
						sideOffset={4}
					>
						{/* Store header */}
						<div className="flex items-center gap-2 px-3 py-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Store className="size-4" />
							</div>
							<div className="truncate font-medium">{storeName}</div>
						</div>

						<section>
							<p className="truncate px-3 py-2 text-sm">{storeDescription}</p>
						</section>

						<DropdownMenuSeparator />

						{/* Test mode toggle */}
						<DropdownMenuItem
							className={
								isSubscripted
									? 'flex items-center justify-between gap-2 p-2'
									: 'flex items-center justify-between gap-2 p-2 opacity-50'
							}
						>
							<span className="text-sm">Test mode</span>
							<Switch
								aria-label="Test mode"
								checked={isTestMode}
								disabled={!isSubscripted}
								onCheckedChange={() => handleTestModeChange()}
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator />

						{/* Change store */}
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Change store
						</DropdownMenuLabel>
						<DropdownMenu>
							{stores?.map((store) => (
								<DropdownMenuItem
									key={store.id}
									onClick={() => handleChangeStore(store.id)}
									className="flex cursor-pointer items-center gap-2 p-2"
								>
									<Avatar className="h-6 w-6">
										<AvatarImage src="https://gdwaithub.com/shadcn.png" />
										<AvatarFallback className="bg-primary text-background flex items-center justify-center text-xs font-bold">
											{store.name
												.split(' ')
												.map((word) => word[0])
												.join('')
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									{store.name}
								</DropdownMenuItem>
							))}

							<DropdownMenuItem className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<Plus className="size-4" />
								</div>
								<div className="text-muted-foreground font-medium">
									Add store
								</div>
							</DropdownMenuItem>
						</DropdownMenu>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default StoreSwitcher;
