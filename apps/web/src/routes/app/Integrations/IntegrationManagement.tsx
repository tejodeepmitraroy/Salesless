import { useState } from 'react';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useIntegrations } from '@/features/Integrations/hooks/useIntegrations';
import { categories } from '@/features/Integrations/hooks/integrationData';
import { IntegrationCard2 } from '@/features/Integrations/components/IntegrationCard';
import HeaderSection from '@/components/layouts/HeaderSection';

const IntegrationManagement = () => {
	const {
		integrations,
		// selectedIntegration,
		// setSelectedIntegration,
		// isConnecting,
		// connectionData,
		// setConnectionData,
		// handleConnect,
		// handleDisconnect,
	} = useIntegrations();

	const [selectedCategory, setSelectedCategory] = useState('all');

	const filteredIntegrations =
		selectedCategory === 'all'
			? integrations
			: integrations.filter(
					(integration) => integration.category === selectedCategory
				);

	const connectedCount = integrations.filter(
		(int) => int.status === 'connected'
	).length;

	const installedIntegrations = integrations.filter(
		(int) => int.status === 'connected'
	);

	return (
		<section className="mx-auto w-full max-w-7xl space-y-6">
			<HeaderSection
				title="Integrations"
				description="Connect your favorite apps and services to extend functionality"
			>
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className="px-3 py-1 text-lg">
						{connectedCount}
					</Badge>
					<span className="text-muted-foreground text-sm">Apps Connected</span>
				</div>
			</HeaderSection>
			<section className="flex flex-col space-y-6">
				<h2 className="text-left text-2xl font-medium">
					Installed Integrations
				</h2>
				<section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{installedIntegrations.map((integration) => (
						<IntegrationCard2 key={integration.id} integration={integration} />
					))}
					{installedIntegrations.length === 0 && (
						<Card>
							<CardHeader>
								<CardTitle>No integrations found</CardTitle>
								<CardDescription>
									There are no integrations available in this category yet.
								</CardDescription>
							</CardHeader>
						</Card>
					)}
				</section>
			</section>

			<Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
				<section className="mt-8 flex w-full items-center justify-between space-y-6">
					<h2 className="text-left text-2xl font-medium">All Apps</h2>

					<TabsList className="mb-4">
						{categories.map((category) => (
							<TabsTrigger key={category.id} value={category.id} className=" ">
								{category.name}
							</TabsTrigger>
						))}
					</TabsList>
				</section>

				{categories.map((category) => (
					<TabsContent
						key={category.id}
						value={category.id}
						className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
					>
						{/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{filteredIntegrations.map((integration) => (
									<IntegrationCard
										key={integration.id}
										integration={integration}
										connectionData={connectionData}
										setConnectionData={setConnectionData}
										selectedIntegration={selectedIntegration}
										setSelectedIntegration={setSelectedIntegration}
										isConnecting={isConnecting}
										onConnect={handleConnect}
										onDisconnect={handleDisconnect}
									/>
								))}
							</div> */}
						{filteredIntegrations.map((integration) => (
							<IntegrationCard2
								key={integration.id}
								integration={integration}
							/>
						))}

						{filteredIntegrations.length === 0 && (
							<Card>
								<CardHeader>
									<CardTitle>No integrations found</CardTitle>
									<CardDescription>
										There are no integrations available in this category yet.
									</CardDescription>
								</CardHeader>
							</Card>
						)}
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default IntegrationManagement;
