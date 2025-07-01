import { motion } from 'framer-motion';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Save, Store } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const StoreSettings = ({
	storeData,
	handleStoreChange,
	handleCountryChange,
	handleSave,
	countryOptions,
	timezoneOptions,
	moneyFormatOptions,
}: any) => {
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
	return (
		<motion.div variants={sectionVariants} initial="hidden" animate="visible">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Store className="h-5 w-5" />
						Store Settings
					</CardTitle>
					<CardDescription>
						Configure your store information and preferences.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Basic Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-medium">Basic Information</h3>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="store-name">Store Name</Label>
							<Input
								id="store-name"
								value={storeData.name}
								onChange={(e) => handleStoreChange('name', e.target.value)}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="store-description">Store Description</Label>
							<Textarea
								id="store-description"
								rows={3}
								value={storeData.description}
								onChange={(e) =>
									handleStoreChange('description', e.target.value)
								}
							/>
						</motion.div>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="store-domain">Store Domain</Label>
							<Input
								id="store-domain"
								value={storeData.domain}
								onChange={(e) => handleStoreChange('domain', e.target.value)}
							/>
							<p className="text-muted-foreground text-xs">
								Your store's custom domain or subdomain.
							</p>
						</motion.div>
					</div>

					{/* Location & Contact */}
					<div className="space-y-4 pt-2">
						<h3 className="text-lg font-medium">Location & Contact</h3>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="store-country">Country</Label>
							<Select
								value={storeData.country}
								onValueChange={handleCountryChange}
							>
								<SelectTrigger id="store-country">
									<SelectValue placeholder="Select a country" />
								</SelectTrigger>
								<SelectContent>
									{countryOptions.map((country: any) => (
										<SelectItem key={country.value} value={country.value}>
											{country.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</motion.div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<motion.div variants={itemVariants} className="space-y-2">
								<Label htmlFor="address1">Address Line 1</Label>
								<Input
									id="address1"
									value={storeData.address1}
									onChange={(e) =>
										handleStoreChange('address1', e.target.value)
									}
								/>
							</motion.div>

							<motion.div variants={itemVariants} className="space-y-2">
								<Label htmlFor="address2">Address Line 2</Label>
								<Input
									id="address2"
									value={storeData.address2}
									onChange={(e) =>
										handleStoreChange('address2', e.target.value)
									}
								/>
							</motion.div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<motion.div variants={itemVariants} className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									value={storeData.city}
									onChange={(e) => handleStoreChange('city', e.target.value)}
								/>
							</motion.div>

							<motion.div variants={itemVariants} className="space-y-2">
								<Label htmlFor="zip">ZIP / Postal Code</Label>
								<Input
									id="zip"
									value={storeData.zip}
									onChange={(e) => handleStoreChange('zip', e.target.value)}
								/>
							</motion.div>
						</div>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<div className="flex">
								<Select
									value={storeData.country_code}
									onValueChange={(value) =>
										handleStoreChange('country_code', value)
									}
								>
									<SelectTrigger className="w-[80px] flex-shrink-0">
										<SelectValue placeholder="Code" />
									</SelectTrigger>
									<SelectContent>
										{countryOptions.map((country: any) => (
											<SelectItem key={country.code} value={country.code}>
												{country.code}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Input
									id="phone"
									className="ml-2 flex-1"
									value={storeData.phone}
									onChange={(e) => handleStoreChange('phone', e.target.value)}
								/>
							</div>
						</motion.div>
					</div>

					{/* Regional Settings */}
					<div className="space-y-4 pt-2">
						<h3 className="text-lg font-medium">Regional Settings</h3>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="timezone">Timezone</Label>
							<Select
								value={storeData.timezone}
								onValueChange={(value) => handleStoreChange('timezone', value)}
							>
								<SelectTrigger id="timezone">
									<SelectValue placeholder="Select a timezone" />
								</SelectTrigger>
								<SelectContent>
									{timezoneOptions.map((timezone: any) => (
										<SelectItem key={timezone.value} value={timezone.value}>
											{timezone.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</motion.div>

						<motion.div variants={itemVariants} className="space-y-2">
							<Label htmlFor="money-format">Currency Format</Label>
							<Select
								value={storeData.money_format}
								onValueChange={(value) =>
									handleStoreChange('money_format', value)
								}
							>
								<SelectTrigger id="money-format">
									<SelectValue placeholder="Select a currency format" />
								</SelectTrigger>
								<SelectContent>
									{moneyFormatOptions.map((format: any) => (
										<SelectItem key={format.value} value={format.value}>
											{format.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="flex items-center space-x-2"
						>
							<Switch
								id="store-status"
								checked={storeData.is_active}
								onCheckedChange={(checked) =>
									handleStoreChange('is_active', checked)
								}
							/>
							<Label htmlFor="store-status">Store is active</Label>
						</motion.div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleSave}>
						<Save className="mr-2 h-4 w-4" />
						Save Store Settings
					</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default StoreSettings;
