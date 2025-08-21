import { Router } from 'express';
import { getStoreOrders } from '../controllers/store.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { storeMiddleware } from '../middleware/store.middleware';
import { checkoutSubscription } from '../controllers/subscription.controllers';

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

export default router;
