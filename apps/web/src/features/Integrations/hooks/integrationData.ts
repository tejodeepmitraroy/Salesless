import { Category, Integration } from './types';

export const integrationsApps: Integration[] = [
	{
		id: 'shopify',
		name: 'Shopify',
		description: 'Connect your Shopify store to sync products and orders',
		iconLink: '/icons/shopify.png',
		category: 'ecommerce',
		status: 'connected',
		url: 'https://shopify.com',

		lastSync: '2024-01-08 10:30 AM',
	},
	{
		id: 'webhook',
		name: 'Custom Webhook',
		description: 'Send data to external systems via webhooks',
		iconLink: '/icons/webhook.png',
		category: 'automation',
		status: 'connected',

		lastSync: '2024-01-08 10:30 AM',
	},
	{
		id: 'whatsapp_business',
		name: 'WhatsApp Business',
		description: 'Connect WhatsApp Business API for customer communication',
		iconLink: '/icons/whatsapp.png',
		category: 'communication',
		status: 'connected',

		lastSync: '2024-01-08 11:15 AM',
	},
	{
		id: 'google-analytics',
		name: 'Google Analytics',
		description: 'Track website traffic and user behavior',
		iconLink: '/icons/google-analytics.png',
		category: 'analytics',
		status: 'connected',
		lastSync: '2024-01-08 12:00 PM',
	},
	{
		id: 'mailchimp',
		name: 'Mailchimp',
		description: 'Email marketing and automation platform',
		iconLink: '/icons/mailchimp.png',
		category: 'marketing',
		status: 'disconnected',
	},
	{
		id: 'facebook',
		name: 'Facebook Pixel',
		description: 'Track conversions and optimize Facebook ads',
		iconLink: '/icons/facebook.png',
		category: 'marketing',
		status: 'error',
		lastSync: '2024-01-07 3:45 PM',
	},
	{
		id: 'zapier',
		name: 'Zapier',
		description: 'Automate workflows between different apps',
		iconLink: '/icons/zapier.png',
		category: 'automation',
		status: 'disconnected',
	},
];

export const categories: Category[] = [
	{ id: 'all', name: 'All Integrations' },
	{ id: 'ecommerce', name: 'E-commerce' },
	{ id: 'analytics', name: 'Analytics' },
	{ id: 'communication', name: 'Communication' },
	{ id: 'marketing', name: 'Marketing' },
	{ id: 'automation', name: 'Automation' },
];
