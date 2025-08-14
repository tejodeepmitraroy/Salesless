import { Link, Outlet, useParams } from 'react-router';
import { Bell } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../Sidebar/app-sidebar';
import { Button } from '../ui/button';
import { setStoreId } from '../../api/axios-custom';
import TestModeBanner from '../TestModeBanner';
import { useCallback, useEffect } from 'react';
import { useStoreConfig } from '@/stores/useStoreConfig';
import { getStoreByIdService } from '@/features/Store/services';

const AdminLayout = () => {
	const { storeId } = useParams<{ storeId: string }>();
	const setStoreIdData = useStoreConfig((state) => state.setStoreId);
	const setStoreData = useStoreConfig((state) => state.setStoreData);

	// Update store ID in axios headers when it changes
	useEffect(() => {
		setStoreId(storeId!);
		setStoreIdData(storeId!);
	}, [storeId, setStoreIdData]);

	const getStoreData = useCallback(async () => {
		const data = await getStoreByIdService();
		console.log('Store Data', data);
		setStoreData(data.name, data.description, data.isTestMode);
	}, [setStoreData]);

	useEffect(() => {
		getStoreData();
	}, [getStoreData]);

	const isTestMode = useStoreConfig((state) => state.isTestMode);
	console.log('isTestMode', isTestMode);

	return (
		<>
			{/* Full-width test banner */}
			{isTestMode && <TestModeBanner show />}

			{/* Main application shell with rounded top corners */}
			<section
				className={`bg-background text-foreground relative flex min-h-screen w-full rounded-t-2xl ${isTestMode ? 'mt-8' : ''}`}
			>
				<SidebarProvider>
					<AppSidebar className={isTestMode ? 'pt-8' : undefined} />
					<main
						className={`relative min-h-dvh w-full overflow-hidden bg-white transition-all duration-300 md:flex-1`}
					>
						<header
							className={`fixed ${isTestMode ? 'top-8' : 'top-0'} z-40 flex w-full flex-col border-b bg-white py-2`}
						>
							<section className="mx-auto flex w-full items-center justify-between gap-5 px-10">
								<Button variant="ghost" size="icon">
									<SidebarTrigger />
								</Button>
								<Link
									to={`/store/${storeId}/notifications`}
									className="flex h-9 w-9 items-center justify-center rounded-lg border"
								>
									<Bell className="h-5 w-5" />
								</Link>
							</section>
						</header>
						<section className="mx-auto mt-12 h-full w-full overflow-y-auto p-4 md:p-6 md:pt-4">
							<Outlet />
						</section>
					</main>
				</SidebarProvider>
			</section>
		</>
	);
};

export default AdminLayout;
