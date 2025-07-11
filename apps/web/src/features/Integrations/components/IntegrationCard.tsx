import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink, Settings, Plus } from 'lucide-react';
import ConnectionForm from '../components/ConnectionForm';
import { ConnectionData, Integration } from '../hooks/types';
import StatusBadge from './StatusBadge';

interface IntegrationCardProps {
	integration: Integration;
	connectionData: ConnectionData;
	setConnectionData: React.Dispatch<React.SetStateAction<ConnectionData>>;
	selectedIntegration: Integration | null;
	setSelectedIntegration: React.Dispatch<
		React.SetStateAction<Integration | null>
	>;
	isConnecting: boolean;
	onConnect: (integration: Integration) => void;
	onDisconnect: (integration: Integration) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
	integration,
	connectionData,
	setConnectionData,
	selectedIntegration,
	setSelectedIntegration,
	isConnecting,
	onConnect,
	onDisconnect,
}) => {
	// const IconComponent = integration

	return (
		<Card className="relative">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-primary/10 rounded-lg p-2">
							{/* <IconComponent className="text-primary h-5 w-5" /> */}
						</div>
						<div>
							<CardTitle className="text-lg">{integration.name}</CardTitle>
						</div>
					</div>
					<StatusBadge status={integration.status} />
				</div>
				<CardDescription>{integration.description}</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				{integration.lastSync && (
					<p className="text-muted-foreground text-sm">
						Last sync: {integration.lastSync}
					</p>
				)}

				<div className="flex gap-2">
					{integration.status === 'connected' ? (
						<>
							<Button
								variant="outline"
								size="sm"
								className="flex-1"
								onClick={() => onDisconnect(integration)}
							>
								Disconnect
							</Button>
							<Button variant="outline" size="sm">
								<Settings className="h-4 w-4" />
							</Button>
						</>
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button
									size="sm"
									className="w-full"
									onClick={() => setSelectedIntegration(integration)}
								>
									<Plus className="mr-2 h-4 w-4" />
									Connect
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="flex items-center gap-2">
										{/* <IconComponent className="h-5 w-5" /> */}
										Connect {integration.name}
									</DialogTitle>
									<DialogDescription>
										{integration.description}
									</DialogDescription>
								</DialogHeader>

								{selectedIntegration && (
									<ConnectionForm
										integration={selectedIntegration}
										connectionData={connectionData}
										setConnectionData={setConnectionData}
									/>
								)}

								<DialogFooter>
									<Button
										onClick={() =>
											selectedIntegration && onConnect(selectedIntegration)
										}
										disabled={isConnecting}
									>
										{isConnecting ? 'Connecting...' : 'Connect'}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					)}
				</div>

				{integration.url && (
					<a
						href={integration.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary flex items-center gap-1 text-sm hover:underline"
					>
						Learn more <ExternalLink className="h-3 w-3" />
					</a>
				)}
			</CardContent>
		</Card>
	);
};

export default IntegrationCard;

interface IntegrationCard2Props {
	integration: Integration;
}

export const IntegrationCard2: React.FC<IntegrationCard2Props> = ({
	integration,
}) => {
	// const { storeId } = useParams<{ storeId: string }>();
	return (
		// <Link to={`/store/${storeId}/integrations/${integration.id}`}>
		<Card className="bg-background hover:bg-accent flex items-center justify-start py-4 text-left shadow-none hover:cursor-pointer">
			<CardHeader className="mx-4 flex w-full items-start justify-start gap-3">
				<div className="flex aspect-square h-11 w-11 items-center justify-center rounded-lg border bg-white p-2">
					<img src={integration.iconLink} alt="" />
				</div>
				<section className="flex flex-col gap-1">
					<CardTitle className="text-base font-medium">
						{integration.name}
					</CardTitle>
					<CardDescription className="text-xs">
						{integration.description}
					</CardDescription>
				</section>
			</CardHeader>
		</Card>
		// </Link>
	);
};
