import { Router } from 'express';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import {
	createOrder,
	deleteOrder,
	getOrders,
} from '../controllers/order.controllers';

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


export default router;
