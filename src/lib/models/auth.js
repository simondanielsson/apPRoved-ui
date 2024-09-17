import { z } from 'zod';

// Schema for Login Request
export const loginSchema = z.object({
	username: z.string().min(2, 'Username must be at least 2 characters long'),
	password: z.string().min(4, 'Password must be at least 4 characters long')
});

// Schema for Registration Request
export const registerSchema = z.object({
	username: z.string().min(2, 'Username must be at least 2 characters long'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(4, 'Password must be at least 4 characters long')
});
