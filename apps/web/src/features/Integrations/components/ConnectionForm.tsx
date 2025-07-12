import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Integration, ConnectionData } from '../hooks/types';

interface ConnectionFormProps {
	integration: Integration;
	connectionData: ConnectionData;
	setConnectionData: React.Dispatch<React.SetStateAction<ConnectionData>>;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({
	integration,
	connectionData,
	setConnectionData,
}) => {
	switch (integration.id) {
		case 'shopify':
			return (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="shop-url">Shop URL</Label>
						<Input
							id="shop-url"
							placeholder="your-shop.myshopify.com"
							value={connectionData.shopUrl}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									shopUrl: e.target.value,
								}))
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="api-key">API Key</Label>
						<Input
							id="api-key"
							type="password"
							placeholder="Enter your Shopify API key"
							value={connectionData.apiKey}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									apiKey: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			);
		case 'webhook':
			return (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="webhook-url">Webhook URL</Label>
						<Input
							id="webhook-url"
							placeholder="https://your-app.com/webhook"
							value={connectionData.webhookUrl}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									webhookUrl: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			);
		case 'whatsapp':
			return (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="phone-number">Business Phone Number</Label>
						<Input
							id="phone-number"
							placeholder="+1234567890"
							value={connectionData.phoneNumber}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									phoneNumber: e.target.value,
								}))
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="access-token">Access Token</Label>
						<Input
							id="access-token"
							type="password"
							placeholder="Enter WhatsApp Business API token"
							value={connectionData.accessToken}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									accessToken: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			);
		default:
			return (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="api-key">API Key</Label>
						<Input
							id="api-key"
							type="password"
							placeholder="Enter your API key"
							value={connectionData.apiKey}
							onChange={(e) =>
								setConnectionData((prev) => ({
									...prev,
									apiKey: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			);
	}
};

export default ConnectionForm;
