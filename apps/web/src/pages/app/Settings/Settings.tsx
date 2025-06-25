import { KeyRound, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderSection from '@/components/layouts/HeaderSection';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router';

import { Label } from '@/components/ui/label';

const Settings = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const { storeId } = useParams<{ storeId: string }>();
	const settingsTab = (tab: string) => {
		navigate(`/store/${storeId}/settings/${tab}`);
	};
	const { tab } = useParams<{ tab: string }>();
	const isActive = location.pathname === `/store/${storeId}/settings/${tab}`;

	// const [tab, setTab] = useState<string>('general');

	const tabs = [
		{
			label: 'General',
			icon: <KeyRound className="size-4" />,
			value: 'general',
		},
		{
			label: 'API Keys',
			icon: <KeyRound className="size-4" />,
			value: 'apiKeys',
		},
		{ label: 'Analytics', value: 'analytics' },
	];

	return (
		<section className="mx-auto w-full max-w-7xl">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Store Settings"
				description="Manage your products"
			/>

			<section className="w-full">
				<section className="flex w-full gap-1">
					{tabs.map((tab) => (
						<div
							key={tab.value}
							className={`${isActive && 'border-b-2 border-black'}flex w-fit items-center gap-1 border-b-2 border-black p-2 py-1 text-sm`}
						>
							{tab.icon}
							<Label className="font-medium">{tab.label}</Label>
						</div>
					))}
				</section>
			</section>
			<Tabs className="w-full gap-0">
				<TabsList className="bg-white">
					<TabsTrigger
						onClick={() => settingsTab('general')}
						value="general"
						className="bg-white"
					>
						General
					</TabsTrigger>
					<TabsTrigger
						onClick={() => settingsTab('apiKeys')}
						value="apiKeys"
						className="bg-white"
					>
						<KeyRound />
						API Keys
					</TabsTrigger>
					<TabsTrigger
						onClick={() => settingsTab('analytics')}
						value="analytics"
						className="bg-white"
					>
						Analytics
					</TabsTrigger>
					<TabsTrigger
						onClick={() => settingsTab('payments')}
						value="payments"
						className="bg-white"
					>
						Payments Gateway
					</TabsTrigger>
					<TabsTrigger
						onClick={() => settingsTab('social')}
						value="social"
						className="bg-white"
					>
						Social Media
					</TabsTrigger>
					<TabsTrigger
						onClick={() => settingsTab('legal')}
						value="legal"
						className="bg-white"
					>
						Legal Documents
					</TabsTrigger>
				</TabsList>
				<Separator className="mb-4" />

				{/* New Store Tab */}
				<section className="space-y-4">{children}</section>
			</Tabs>
		</section>
	);
};

export default Settings;
