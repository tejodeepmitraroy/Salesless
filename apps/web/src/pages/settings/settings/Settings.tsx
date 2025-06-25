import { KeyRound, Save, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import HeaderSection from '@/components/layouts/HeaderSection';
import GeneralSettings from './Screens/GeneralSettings';
import AddressSettings from './Screens/AddressSettings';
import DangerZone from './Screens/DangerZone';
import { Separator } from '@/components/ui/separator';
import RegionalSettings from './Screens/RegionalSettings';
import DeactivateStore from './Screens/DeactivateStore';
import ApiKeysSettings from './Screens/ApiKeysSettings';
import WebHookSettings from './Screens/WebHookSettings';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

// Animation variants for section transitions
const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			when: 'beforeChildren',
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

// Timezone options for the store settings
// const timezoneOptions = [
// 	{ value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
// 	{ value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
// 	{ value: 'America/Chicago', label: 'Central Time (US & Canada)' },
// 	{ value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
// 	{ value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
// 	{ value: 'Europe/London', label: 'London' },
// 	{ value: 'Europe/Paris', label: 'Paris' },
// 	{ value: 'Asia/Tokyo', label: 'Tokyo' },
// 	{ value: 'Australia/Sydney', label: 'Sydney' },
// ];

// Money format options
// const moneyFormatOptions = [
// 	{ value: '${{amount}}', label: '$ - USD ($10.00)' },
// 	{ value: '€{{amount}}', label: '€ - EUR (€10.00)' },
// 	{ value: '£{{amount}}', label: '£ - GBP (£10.00)' },
// 	{ value: '¥{{amount}}', label: '¥ - JPY (¥1000)' },
// 	{ value: '{{amount}} kr', label: 'kr - SEK (10.00 kr)' },
// ];

// Country options
// const countryOptions = [
// 	{ value: 'US', label: 'United States', code: '+1' },
// 	{ value: 'CA', label: 'Canada', code: '+1' },
// 	{ value: 'GB', label: 'United Kingdom', code: '+44' },
// 	{ value: 'AU', label: 'Australia', code: '+61' },
// 	{ value: 'DE', label: 'Germany', code: '+49' },
// 	{ value: 'FR', label: 'France', code: '+33' },
// 	{ value: 'JP', label: 'Japan', code: '+81' },
// 	{ value: 'IN', label: 'India', code: '+91' },
// ];

const Settings = () => {
	// const { toast } = useToast();
	// const [storeData, setStoreData] = useState({
	// 	name: 'VendorSphere Store',
	// 	description:
	// 		'A multi-vendor marketplace platform for selling products online.',
	// 	country: 'US',
	// 	address1: '123 Main Street',
	// 	address2: 'Suite 101',
	// 	zip: '94103',
	// 	city: 'San Francisco',
	// 	phone: '5551234567',
	// 	country_code: '+1',
	// 	timezone: 'America/New_York',
	// 	money_format: '${{amount}}',
	// 	domain: 'store.vendorsphere.com',
	// 	is_active: true,
	// });

	// const handleStoreChange = (field: string, value: string | boolean) => {
	// 	setStoreData((prev) => ({
	// 		...prev,
	// 		[field]: value,
	// 	}));
	// };

	// const handleCountryChange = (value: string) => {
	// 	const country = countryOptions.find((c) => c.value === value);
	// 	setStoreData((prev) => ({
	// 		...prev,
	// 		country: value,
	// 		country_code: country?.code || prev.country_code,
	// 	}));
	// };

	const handleSave = () => {
		toast('Settings saved', {
			description: 'Your settings have been saved successfully.',
		});
	};

	return (
		<section className="mx-auto w-full max-w-7xl">
			<HeaderSection
				icon={<ShoppingCart />}
				title="Store Settings"
				description="Manage your products"
			></HeaderSection>

			{/* <motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.3 }}
				>
					<h1 className="text-2xl font-bold tracking-tight">Settings</h1>
					<p className="text-muted-foreground">
						Manage your application settings and integrations.
					</p>
				</motion.div> */}

			<Tabs defaultValue="general" className="w-full gap-0">
				<TabsList className="bg-white">
					<TabsTrigger value="general" className="bg-white">
						General
					</TabsTrigger>
					<TabsTrigger value="apiKeys" className="bg-white">
						<KeyRound />
						API Keys
					</TabsTrigger>
					<TabsTrigger value="analytics" className="bg-white">
						Analytics
					</TabsTrigger>
					<TabsTrigger value="payments" className="bg-white">
						Payments Gateway
					</TabsTrigger>
					<TabsTrigger value="social" className="bg-white">
						Social Media
					</TabsTrigger>
					<TabsTrigger value="legal" className="bg-white">
						Legal Documents
					</TabsTrigger>
				</TabsList>
				<Separator className="mb-4" />

				{/* New Store Tab */}
				<TabsContent value="general" className="space-y-4">
					<GeneralSettings />
					<AddressSettings />
					<RegionalSettings />
					<DeactivateStore />
					<DangerZone />
				</TabsContent>

				<TabsContent value="apiKeys" className="space-y-6">
					<ApiKeysSettings />
					<WebHookSettings />

					<motion.div
						variants={sectionVariants}
						initial="hidden"
						animate="visible"
					>
						<Card>
							<CardHeader>
								<CardTitle>Google Analytics</CardTitle>
								<CardDescription>
									Connect your Google Analytics account to track website traffic
									and user behavior.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<motion.div variants={itemVariants} className="space-y-2">
									<Label htmlFor="ga-id">Measurement ID</Label>
									<Input id="ga-id" placeholder="G-XXXXXXXXXX" />
									<p className="text-muted-foreground text-xs">
										Enter your Google Analytics 4 measurement ID (starts with
										G-).
									</p>
								</motion.div>
								<motion.div variants={itemVariants} className="space-y-2">
									<Label htmlFor="ga-view">Property View ID</Label>
									<Input id="ga-view" placeholder="123456789" />
								</motion.div>
								<motion.div variants={itemVariants} className="space-y-2">
									<Label
										className="flex items-center gap-2"
										htmlFor="ga-enhanced"
									>
										<input
											type="checkbox"
											id="ga-enhanced"
											className="rounded border-gray-300"
										/>
										<span>Enable enhanced measurement</span>
									</Label>
								</motion.div>
							</CardContent>
							<CardFooter>
								<Button onClick={handleSave}>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				</TabsContent>

				<TabsContent value="social" className="space-y-4">
					<motion.div
						variants={sectionVariants}
						initial="hidden"
						animate="visible"
					>
						<Card>
							<CardHeader>
								<CardTitle>Facebook Meta Pixel</CardTitle>
								<CardDescription>
									Connect your Facebook Meta Pixel to track conversions and
									optimize ads.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<motion.div variants={itemVariants} className="space-y-2">
									<Label htmlFor="fb-pixel">Pixel ID</Label>
									<Input id="fb-pixel" placeholder="1234567890123456" />
								</motion.div>
								<motion.div variants={itemVariants} className="space-y-2">
									<Label
										className="flex items-center gap-2"
										htmlFor="fb-advanced"
									>
										<input
											type="checkbox"
											id="fb-advanced"
											className="rounded border-gray-300"
										/>
										<span>Enable advanced matching</span>
									</Label>
								</motion.div>
							</CardContent>
							<CardFooter>
								<Button onClick={handleSave}>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default Settings;
