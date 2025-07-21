import { Router } from 'express';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { createOrder } from '../controllers/order.controllers';

// import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Product routes
router.route('/').post(jwtAuthMiddleware, createOrder);
// .get(jwtAuthMiddleware, getAllOrders)

// router
// 	.route('/:id')
// 	.get(jwtAuthMiddleware, getProductById)
// 	.put(jwtAuthMiddleware, updateProduct)
// 	.delete(jwtAuthMiddleware, deleteProduct);

export default router;
