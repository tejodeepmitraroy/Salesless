import { z } from 'zod';

export const generalSettingsSchema = z.object({
	storeName: z.string(),
	storeDescription: z.string().optional(),
	storeDomain: z.string().url(),
});

export const storeAddressSchema = z.object({
	country: z.string().optional(),
	address1: z.string().optional(),
	address2: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	phone: z.string().optional(),
	countryCode: z.string().optional(),
});

export const regionalSettingsSchema = z.object({
	timezone: z.string().optional(),
	currency_format: z.string().optional(),
});

export const apiKeysSettingsSchema = z.object({
	storeId: z.string(),
	publicKey: z.string(),
	secretKey: z.string(),
});

export const webhooksSettingsSchema = z.object({
	storeId: z.string(),
	publicKey: z.string(),
	secretKey: z.string(),
});

export const gatewaySettingsSchema = z.object({
	apiUrl: z.string(),
	apiKey: z.string().min(10, {
		message: 'API Key must be at least 10 characters.',
	}),
	apiSecret: z.string().min(10, {
		message: 'API Secret must be at least 10 characters.',
	}),
	isTestMode: z.boolean(),
});

export type GeneralSettingsSchema = z.infer<typeof generalSettingsSchema>;
export type StoreAddressSchema = z.infer<typeof storeAddressSchema>;
export type RegionalSettingsSchema = z.infer<typeof regionalSettingsSchema>;
export type ApiKeysSettingsSchema = z.infer<typeof apiKeysSettingsSchema>;
export type GatewaySettingsSchema = z.infer<typeof gatewaySettingsSchema>;
