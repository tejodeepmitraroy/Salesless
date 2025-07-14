import { z } from 'zod';

export const generalAccountDetailsSchema = z.object({
	image: z.string().optional(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	emailVerified: z.boolean().optional(),
	phone: z.string().optional(),
	phoneVerified: z.boolean().optional(),
});

export const passwordSetupSchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string(),
	confirmPassword: z.string(),
});

export type GeneralAccountDetailsSchema = z.infer<
	typeof generalAccountDetailsSchema
>;
export type PasswordSetupSchema = z.infer<typeof passwordSetupSchema>;
