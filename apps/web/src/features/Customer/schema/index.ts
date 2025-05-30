import { z } from 'zod';

export const loginPageSchema = z.object({
	email: z.string().email().max(50),
	password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
	email: z.string()
	  .min(1, 'Email is required')
	  .email('Invalid email address'),
  });
  
  export const signUpSchema = z.object({
	name: z.string()
	  .min(1, 'Name is required')
	  .min(2, 'Name must be at least 2 characters'),
	email: z.string()
	  .min(1, 'Email is required')
	  .email('Invalid email address'),
	mobile: z.string()
	  .min(1, 'Mobile is required')
	  .email('Invalid mobile address'),
	password: z.string()
	  .min(1, 'Password is required')
	  .min(8, 'Password must be at least 8 characters')
	  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
	  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
	  .regex(/[0-9]/, 'Password must contain at least one number')
	  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
	confirmPassword: z.string()
	  .min(1, 'Confirm password is required'),
  }).refine((data) => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
  });
  