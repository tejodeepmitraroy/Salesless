import { ChevronsUpDown, Plus } from 'lucide-react';

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
	useSidebar,
} from '@/components/ui/sidebar';

import { useStoreConfig } from '@/stores/useStoreConfig';

const StoreSwitcher = () => {
	const { isMobile } = useSidebar();
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

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								{/* <activeStore.logo className="size-4" /> */}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{storeName}</span>
								{/* <span className="truncate text-xs">{activeStore.plan}</span> */}
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="center"
						side={isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">Add team</div>
						</DropdownMenuItem>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Stores
						</DropdownMenuLabel>
						{/* {stores.map((store, index) => (
							<DropdownMenuItem
								key={store.name}
								onClick={() =>
									setActiveStore({
										name: store.name,
										// logo: store.logo,
										// plan: store.plan,
									})
								}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-md border">
									{/* <store.logo className="size-3.5 shrink-0" /> *
								</div>
								{store.name}
								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))} */}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus className="size-4" />
							</div>
							<div className="text-muted-foreground font-medium">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default StoreSwitcher;
