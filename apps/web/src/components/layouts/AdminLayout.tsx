import { Link, Outlet, useParams } from 'react-router';
import { Bell } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../Sidebar/app-sidebar';
import { Button } from '../ui/button';

const AdminLayout = () => {
	const { storeId } = useParams<{ storeId: string }>();

	return (
		<section className="bg-background text-foreground flex min-h-screen w-full">
			<SidebarProvider>
				<AppSidebar />
				<main
					className={`relative min-h-dvh w-full overflow-hidden bg-white transition-all duration-300 md:flex-1`}
				>
					<header className="fixed z-50 w-full border-b bg-white py-2">
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
	);
};

export default AdminLayout;
