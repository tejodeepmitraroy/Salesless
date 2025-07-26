import { Router } from 'express';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import {
	createOrder,
	deleteOrder,
	getOrders,
	getStoreOrders,
} from '../controllers/order.controllers';
import { storeMiddleware } from '../middleware/store.middleware';

// import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Product routes
router
	.route('/')
	.post(jwtAuthMiddleware, createOrder)
	.get(jwtAuthMiddleware, getOrders);

router
	.route('/:orderId')
	.get(jwtAuthMiddleware, getOrders)
	.delete(jwtAuthMiddleware, deleteOrder);

// Store Routes

router.route('/store').get(jwtAuthMiddleware, storeMiddleware, getStoreOrders);
router
	.route('/store/:orderId')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreOrders);

export default router;
