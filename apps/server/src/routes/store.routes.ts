import { Router } from 'express';
import {
	createStore,
	getStores,
	getStoreById,
	updateStore,
	deleteStore,
	getStoreSettings,
    getStoreCustomers,
    getStoreOrders,

	// updateStore,
	// deleteStore,
	// updateStoreSettings,
} from '../controllers/store.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Store routes
router
	.route('/')
	.get(jwtAuthMiddleware, getStores)
	.post(jwtAuthMiddleware, createStore)
	.put(jwtAuthMiddleware, updateStore);

router
	.route('/:storeId')
	.get(jwtAuthMiddleware, getStoreById)
	.delete(jwtAuthMiddleware, deleteStore);

router.route('/:storeId/settings').get(jwtAuthMiddleware, getStoreSettings);
// .put(jwtAuthMiddleware, updateStoreSettings);

router.route('/:storeId/customers').get(jwtAuthMiddleware, getStoreCustomers);
router.route('/:storeId/customers/:customerId').get(jwtAuthMiddleware, getStoreCustomers);
router.route('/:storeId/orders').get(jwtAuthMiddleware, getStoreOrders);
router.route('/:storeId/orders/:orderId').get(jwtAuthMiddleware, getStoreOrders);
// .put(jwtAuthMiddleware, updateStoreSettings);

export default router;
