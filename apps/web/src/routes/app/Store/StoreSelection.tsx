import { useNavigate } from 'react-router';

import { Plus } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCallback, useEffect } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import ChatButton from '@/components/ChatButton';
import { useStoreStore } from '@/stores/useStore-Store';

const StoreSelection: React.FC = () => {
	const { user, storeId } = useAuth();
	const navigate = useNavigate();

	const stores = useStoreStore((state) => state.stores);
	const fetchStores = useStoreStore((state) => state.fetchStores);
	// const setStores = useStoreStore((state) => state.setStores);
	const setSelectedStore = useStoreStore((state) => state.setSelectedStore);

	const handleStoreSelected = (storeId: string) => {
		setSelectedStore(storeId);
		navigate(`/store/${storeId}`);
	};

	const handleCreateStore = () => {
		navigate('/store/create');
	};

	// const { data } = useQuery({
	// 	queryKey: ['storeData'],
	// 	queryFn: async () => await getAllStoreService(),
	// });
	const fetchStoresData = useCallback(async () => {
		await fetchStores();
	}, [fetchStores]);

	useEffect(() => {
		fetchStoresData();
	}, [fetchStoresData]);

	useEffect(() => {
		if (user && storeId) {
			navigate(`/store/${storeId}`, { replace: true });
		}
	}, [user, navigate, storeId]);

	return (
		<section className="bg-background flex h-screen w-full items-center justify-center p-4">
			<ChatButton />
			<section className="fixed top-0 z-50 flex w-full items-center">
				<div className="mx-auto flex w-full max-w-4xl items-center px-3">
					<div className="my-6 flex items-center gap-2">
						<img
							src="/logo.png"
							alt=""
							className="h-10 w-10 rounded-lg border"
						/>
						<Label className="text-xl font-bold">SalesLess</Label>
					</div>
				</div>
			</section>

			<Card className="h-[calc(100dvh-15rem)] w-full max-w-lg py-10">
				<CardHeader className="px-10">
					{/* <section className="mb-5 flex items-center gap-2">
							<img
								src="/icons/logo.png"
								alt=""
								className="border-primary h-10 w-10 rounded-lg border"
							/>
						</section> */}
					<CardTitle className="flex w-full justify-between text-2xl font-bold">
						Welcome back
						<Button onClick={() => handleCreateStore()} className="px-6">
							<span>Create Store</span>
							<Plus className="ml-2 h-4 w-4" />
						</Button>
					</CardTitle>
					<CardDescription className="text-left">
						Select a store to continue.
					</CardDescription>
				</CardHeader>
				<CardContent className="px-10">
					<section className="mt-6 flex flex-col gap-4">
						{stores.map((store: unknown) => (
							<div
								key={(store as { id: string }).id}
								className={`flex w-full cursor-pointer items-center rounded p-3 transition-all hover:shadow-md`}
								onClick={() =>
									handleStoreSelected((store as { id: string }).id)
								}
							>
								<div className="bg-primary mr-4 flex h-12 w-12 items-center justify-center rounded-md font-bold text-white">
									{(store as { name: string }).name
										.substring(0, 2)
										.toUpperCase()}
								</div>
								<div className="flex-1 justify-items-start">
									<h3 className="text font-semibold">
										{(store as { name: string }).name}
									</h3>
									<p className="text-muted-foreground text-sm">
										id:{(store as { id: string }).id}
									</p>
								</div>
							</div>
						))}
					</section>
				</CardContent>
			</Card>
		</section>
	);
};

export default StoreSelection;
