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

import { useQuery } from '@tanstack/react-query';
import { getAllStoreService } from '@/features/Store/services';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import ChatButton from '@/components/ChatButton';

// const storeVariants = {
// 	hidden: { opacity: 0, y: 20 },
// 	visible: (i: number) => ({
// 		opacity: 1,
// 		y: 0,
// 		transition: {
// 			delay: i * 0.1,
// 			duration: 0.5,
// 			type: 'spring',
// 			stiffness: 100,
// 		},
// 	}),
// };

const StoreSelection: React.FC = () => {
	const { user, storeId } = useAuth();
	const navigate = useNavigate();

	const handleStoreSelected = (storeId: string) => {
		Cookies.set('storeId', storeId);
		navigate(`/store/${storeId}`);
	};

	const handleCreateStore = () => {
		navigate('/store/create');
	};

	const { data } = useQuery({
		queryKey: ['storeData'],
		queryFn: async () => await getAllStoreService(),
	});

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
			{/* <motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mx-auto w-full max-w-lg"
			> */}
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
						{data?.data?.data?.map((store: unknown) => (
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
								{/* <div className="text-muted-foreground text-sm">
										Last accessed:{' '}
										{(store as { lastAccessed: string }).lastAccessed}
									</div> */}
								{/* {selectedStore === store.id && (
										<div className="ml-4">
											<div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="14"
													height="14"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="text-white"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
											</div>
										</div>
									)} */}
							</div>
						))}
					</section>
				</CardContent>
			</Card>
			{/* </motion.div> */}
		</section>
	);
};

export default StoreSelection;
