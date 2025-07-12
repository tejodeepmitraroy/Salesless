export interface Integration {
	id: string;
	name: string;
	description: string;
	iconLink: string;
	category:
		| 'ecommerce'
		| 'analytics'
		| 'communication'
		| 'marketing'
		| 'automation';
	status: 'connected' | 'disconnected' | 'error';
	url?: string;
	lastSync?: string;
}

export interface ConnectionData {
	apiKey: string;
	shopUrl: string;
	webhookUrl: string;
	phoneNumber: string;
	accessToken: string;
}

export interface Category {
	id: string;
	name: string;
}
