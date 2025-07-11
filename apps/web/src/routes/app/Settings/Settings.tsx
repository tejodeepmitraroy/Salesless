import { ShoppingCart } from 'lucide-react';
import HeaderSection from '@/components/layouts/HeaderSection';
import { Separator } from '@/components/ui/separator';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { Label } from '@/components/ui/label';
import { useLayoutEffect } from 'react';

const Settings = () => {
	const navigate = useNavigate();
	const { storeId } = useParams<{ storeId: string }>();
	const settingsTab = (tab: string) => {
		navigate(`/store/${storeId}/settings/${tab}`);
	};
	const location = useLocation();

	const tabs = [
		{
			label: 'General',
			value: 'general',
		},
		{
			label: 'API Keys',
			value: 'api-keys',
		},
		{ label: 'Payments', value: 'payments' },
		// { label: 'Integrations', value: 'integrations' },
		// { label: 'Legal', value: 'legal' },
		{ label: 'Analytics', value: 'analytics' },
	];

	useLayoutEffect(() => {
		if (location.pathname === `/store/${storeId}/settings`) {
			navigate(`/store/${storeId}/settings/general`);
		}
	}, [location.pathname, navigate, storeId]);

	return (
		<section className="mx-auto w-full max-w-7xl">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Store Settings"
				description="Manage your products"
			/>

			<section className="flex w-full gap-1">
				{tabs.map((tab) => (
					<div
						onClick={() => settingsTab(tab.value)}
						key={tab.value}
						className={`${location.pathname === `/store/${storeId}/settings/${tab.value}` && 'border-black'} border-background flex w-fit cursor-pointer items-center gap-1 border-b-2 p-2 py-1 text-sm`}
					>
						{/* {tab.icon} */}
						<Label className="font-medium">{tab.label}</Label>
					</div>
				))}
			</section>

			<Separator className="mb-4" />
			<section className="space-y-4">
				<Outlet />
			</section>
		</section>
	);
};

export default Settings;
