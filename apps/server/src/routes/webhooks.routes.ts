import express, { Router } from 'express';
import { handleStripeWebhook } from '../controllers/subscription.controllers';

const router = Router();

router.post(
	'/subscription',
	express.raw({ type: 'application/json' }),
	handleStripeWebhook
);

export default router;
