import { Router } from 'express';
import {
	createStore,
	getStores,
	getStoreById,
	updateStore,
	deleteStore,
	getStoreOrders,
	getStoreCustomers,
	createCustomer,
	// getStoreOrders,
	// getStoreCustomers,
} from '../controllers/store.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { storeMiddleware } from '../middleware/store.middleware';

const router = Router();

//orders Routes
router.route('/orders').get(jwtAuthMiddleware, storeMiddleware, getStoreOrders);
router
	.route('/orders/:orderId')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreOrders);

//customers Routes
router
	.route('/customers')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreCustomers)
	.post(jwtAuthMiddleware, storeMiddleware, createCustomer);
router
	.route('/customers/:customerId')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreCustomers);

// Store routes
router
	.route('/')
	.get(jwtAuthMiddleware, getStores)
	.post(jwtAuthMiddleware, createStore)
	.put(jwtAuthMiddleware, storeMiddleware, updateStore);

router
	.route('/:storeId')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreById)
	.delete(jwtAuthMiddleware, storeMiddleware, deleteStore);

export default router;
