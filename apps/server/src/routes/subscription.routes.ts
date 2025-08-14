import { Router } from 'express';
import { getStoreOrders } from '../controllers/store.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { storeMiddleware } from '../middleware/store.middleware';
import {
	checkoutSubscription,
	handleStripeWebhook,
} from '../controllers/subscription.controllers';
const router = Router();

//orders Routes
router
	.route('/checkout')
	.post(jwtAuthMiddleware, storeMiddleware, checkoutSubscription);
router
	.route('/fullFill')
	.post(jwtAuthMiddleware, storeMiddleware, getStoreOrders);
router
	.route('/cancel')
	.post(jwtAuthMiddleware, storeMiddleware, getStoreOrders);
// Stripe webhook endpoint - no auth middleware as Stripe will call this directly
// Webhook endpoint needs raw body for signature verification
router.post('/webhook', handleStripeWebhook);

export default router;
