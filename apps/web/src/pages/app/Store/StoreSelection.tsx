import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
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
	// const { user } = useAuth();
	const navigate = useNavigate();
	// const [stores, setStores] = useState<any[]>([]);

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

	// useEffect(() => {
	// 	if (data?.data.data) {
	// 		setStores(data.data.data);
	// 	}
	// }, [data]);

	// console.log(data);

	return (
		<section className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mx-auto w-full max-w-lg"
			>
				<Card className="w-full">
					<CardHeader>
						<CardTitle>
							<h1 className="mb-2 text-3xl font-bold">
								<span className="text-vsphere-primary">Vendor</span>
								<span className="text-vsphere-dark">Sphere</span>
							</h1>
						</CardTitle>
						<CardDescription>
							Welcome back, { 'User'}! Select a store to continue.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<section className="flex w-full justify-end">
							<Button onClick={handleCreateStore} className="w-full px-6">
								<span>Create Store</span>
								<Plus className="ml-2 h-4 w-4" />
							</Button>
						</section>
						<section className="mt-6 flex flex-col gap-4">
							{data?.data?.data?.map((store: any) => (
								<div
									key={store.id}
									className={`flex w-full cursor-pointer items-center rounded-2xl p-3 transition-all hover:shadow-md`}
									onClick={() => handleStoreSelected(store.id)}
								>
									<div className="from-primary to-secondary mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br font-bold text-white">
										{store.name.substring(0, 2).toUpperCase()}
									</div>
									<div className="flex-1 justify-items-start">
										<h3 className="text font-semibold">{store.name}</h3>
										<p className="text-muted-foreground text-sm">
											id:{store.id}
										</p>
									</div>
									<div className="text-muted-foreground text-sm">
										Last accessed: {store.lastAccessed}
									</div>
									{/* {selectedStore === store.id && (
										<div className="ml-4">
											<div className="bg-vsphere-primary flex h-6 w-6 items-center justify-center rounded-full">
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
			</motion.div>
		</section>
	);
};

export default StoreSelection;
